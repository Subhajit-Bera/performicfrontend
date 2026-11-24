import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const TOKEN_KEY = 'accessToken';
const SIGNED_OUT_EVENT = 'performic:signed-out';

const isBrowser = () => typeof window !== 'undefined';

export const getAccessToken = () => (isBrowser() ? localStorage.getItem(TOKEN_KEY) : null);

export const setAccessToken = (token) => {
    if (!isBrowser()) return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
};

export const clearAccessToken = () => setAccessToken(null);

const api = axios.create({ baseURL: API_URL, withCredentials: true, timeout: 60000 });

// Refresh calls must not go through `api`, otherwise a failed refresh would
// re-enter the interceptor and loop.
const authClient = axios.create({ baseURL: API_URL, withCredentials: true, timeout: 45000 });

const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout', '/auth/oauth/exchange'];
const isAuthPath = (url = '') => AUTH_PATHS.some((path) => url.startsWith(path));

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let refreshInFlight = null;
const waiting = [];

const runQueue = (error, token) => {
    while (waiting.length > 0) {
        const { resolve, reject } = waiting.shift();
        if (error) reject(error);
        else resolve(token);
    }
};

const refreshAccessToken = () => {
    if (!refreshInFlight) {
        refreshInFlight = authClient
            .post('/auth/refresh')
            .then(({ data }) => {
                setAccessToken(data.accessToken);
                runQueue(null, data.accessToken);
                return data.accessToken;
            })
            .catch((error) => {
                clearAccessToken();
                runQueue(error, null);
                if (isBrowser()) window.dispatchEvent(new CustomEvent(SIGNED_OUT_EVENT));
                throw error;
            })
            .finally(() => {
                refreshInFlight = null;
            });
    }
    return refreshInFlight;
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        const status = error.response?.status;

        // 401 means the access token is missing/expired; 403 means the caller is
        // authenticated but not allowed, which must never trigger a refresh.
        const canRetry =
            original &&
            !original._retry &&
            status === 401 &&
            !isAuthPath(original.url) &&
            isBrowser();

        if (!canRetry) return Promise.reject(error);

        original._retry = true;

        try {
            const token = refreshInFlight
                ? await new Promise((resolve, reject) => waiting.push({ resolve, reject }))
                : await refreshAccessToken();
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);

export { SIGNED_OUT_EVENT };
export default api;
