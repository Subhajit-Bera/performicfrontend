"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../admin/components/AdminSidebar';
import Loader from '../components/Loader';
import { Users, UserPlus } from 'lucide-react';

export default function AgentLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <Loader text="Authenticating..." />;
    }

    if (!user || user.role !== 'agent') {
        if (typeof window !== 'undefined') router.push('/login');
        return <Loader text="Redirecting..." />;
    }
    
    const agentNavItems = [
        { href: '/agent', label: 'My Referrals', icon: <Users size={20} /> },
        { href: '/agent/referral', label: 'Refer a Student', icon: <UserPlus size={20} /> },
    ];
    
    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <AdminSidebar navItems={agentNavItems} title="Agent Panel" />
            <main className="flex-1 w-full lg:ml-64 lg:w-[calc(100%-16rem)] p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
