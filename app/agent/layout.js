"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../admin/components/AdminSidebar';
import { Users, UserPlus } from 'lucide-react';

export default function AgentLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background">Authenticating...</div>;
    }

    if (!user || user.role !== 'agent') {
        if (typeof window !== 'undefined') router.push('/login');
        return <div className="min-h-screen flex items-center justify-center bg-background">Redirecting...</div>;
    }
    
    const agentNavItems = [
        { href: '/agent', label: 'My Referrals', icon: <Users size={20} /> },
        { href: '/agent/referral', label: 'Refer a Student', icon: <UserPlus size={20} /> },
    ];
    
    return (
        <div className="flex bg-background min-h-screen">
            <AdminSidebar navItems={agentNavItems} title="Agent Panel" />
            <main className="ml-64 w-[calc(100%-16rem)] p-8">
                {children}
            </main>
        </div>
    );
}