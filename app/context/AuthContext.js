"use client";
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api, { getAccessToken, setAccessToken, clearAccessToken, SIGNED_OUT_EVENT } from '../utils/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AuthContext = createContext(null);

const PROFILE_FIELDS = [
    'phone_number', 'whatsapp_number', 'state_hometown',
    'choice_of_stream', 'entry_level', 'how_heard',
];

export const calculateProfileCompletion = (user) => {
    if (!user) return 0;
    const filled = PROFILE_FIELDS.filter((field) => {
        const value = user[field];
        return value !== null && value !== undefined && String(value).trim() !== '';
    }).length;
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
};

export const homePathForRole = (role) => {
    if (role === 'admin') return '/admin';
    if (role === 'agent') return '/agent';
    return '/';
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompletion, setProfileCompletion] = useState(0);

    const router = useRouter();

    const applyUser = useCallback((data) => {
        const nextUser = data?.user ?? data ?? null;
        setUser(nextUser);
        setProfileCompletion(calculateProfileCompletion(nextUser));
        return nextUser;
    }, []);

    const signOutLocally = useCallback(() => {
        clearAccessToken();
        setUser(null);
        setProfileCompletion(0);
    }, []);

    const revalidateUser = useCallback(async () => {
        if (!getAccessToken()) {
            setLoading(false);
            return null;
        }
        try {
            const { data } = await api.get('/users/me');
            setLoading(false);
            return applyUser(data);
        } catch (error) {
            // A network failure must not log the user out; only a real 401/403 does.
            const status = error?.response?.status;
            if (status === 401 || status === 403) signOutLocally();
            setLoading(false);
            return null;
        }
    }, [applyUser, signOutLocally]);

    useEffect(() => {
        revalidateUser();
    }, [revalidateUser]);

    useEffect(() => {
        const onSignedOut = () => {
            signOutLocally();
            if (!window.location.pathname.startsWith('/login')) {
                toast.info('Your session expired. Please sign in again.');
                router.push('/login');
            }
        };
        window.addEventListener(SIGNED_OUT_EVENT, onSignedOut);
        return () => window.removeEventListener(SIGNED_OUT_EVENT, onSignedOut);
    }, [router, signOutLocally]);

    const login = (authResult) => {
        setAccessToken(authResult.accessToken);
        const nextUser = applyUser(authResult);
        toast.success('Login successful!');
        router.push(homePathForRole(nextUser?.role));
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // The server session may already be gone; finish the local sign-out regardless.
        } finally {
            signOutLocally();
            toast.info('You have been logged out.');
            router.push('/login');
        }
    };

    const updateUser = (updatedUserData) => applyUser(updatedUserData);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
                profileCompletion,
                updateUser,
                revalidateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
