"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import api, { setAccessToken } from '../../utils/api';
import { homePathForRole } from '../../context/AuthContext';
import Loader from '../../components/Loader';

function CallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        const code = searchParams.get('code');
        if (!code) {
            setError('The sign-in link is incomplete. Please try again.');
            return;
        }

        const finish = async () => {
            try {
                const { data } = await api.post('/auth/oauth/exchange', { code });
                setAccessToken(data.accessToken);
                const me = await api.get('/users/me');
                const role = me.data?.role;
                router.replace(homePathForRole(role));
            } catch (exchangeError) {
                setError(
                    exchangeError?.response?.data?.message ||
                    'Google sign-in could not be completed. Please try again.'
                );
            }
        };

        finish();
    }, [router, searchParams]);

    if (error) {
        return (
            <main id="main-content" className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="max-w-md w-full bg-surface border border-border rounded-xl p-8 text-center shadow-lg">
                    <h1 className="text-xl font-bold text-text mb-3">Sign-in failed</h1>
                    <p className="text-text-secondary mb-6">{error}</p>
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Back to sign in
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main id="main-content" className="min-h-screen flex items-center justify-center bg-background">
            <Loader />
        </main>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <CallbackHandler />
        </Suspense>
    );
}
