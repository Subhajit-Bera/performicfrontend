// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
//     withCredentials: true, // Important for sending cookies
// });

// // Request interceptor to add the access token to headers
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor to handle token refresh
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/auth/refresh`, {}, { withCredentials: true });
//                 localStorage.setItem('accessToken', data.accessToken);
//                 api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // Handle logout if refresh fails
//                 localStorage.removeItem('accessToken');
//                 window.location.href = '/login'; // Force redirect
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default api;


import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await api.post('/auth/refresh');
                localStorage.setItem('accessToken', data.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                if (typeof window !== 'undefined') {
                    // Prevent redirect loops for failed refreshes on public pages
                    if (!window.location.pathname.startsWith('/login')) {
                       window.location.href = '/login';
                    }
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;