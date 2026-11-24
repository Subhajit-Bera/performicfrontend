"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import { LayoutDashboard, Building, BookOpen, GraduationCap, Users, CalendarCheck, FileText, Star, UserSquare } from 'lucide-react';

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background">Authenticating...</div>;
    }

    if (!user || user.role !== 'admin') {
        if (typeof window !== 'undefined') router.push('/login');
        return <div className="min-h-screen flex items-center justify-center bg-background">Redirecting...</div>;
    }
    
    const adminNavItems = [
        { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { href: '/admin/users', label: 'Users', icon: <Users size={20} /> },
        { href: '/admin/agents', label: 'Agents', icon: <UserSquare size={20} /> },
        { href: '/admin/applications', label: 'Applications', icon: <FileText size={20} /> },
        { href: '/admin/appointments', label: 'Appointments', icon: <CalendarCheck size={20} /> },
        { href: '/admin/universities', label: 'Universities', icon: <Building size={20} /> },
        { href: '/admin/exams', label: 'Exams', icon: <BookOpen size={20} /> },
        { href: '/admin/streams', label: 'Streams', icon: <GraduationCap size={20} /> },
        { href: '/admin/courses', label: 'Career Options', icon: <GraduationCap size={20} /> },
        { href: '/admin/partners', label: 'Career Partners', icon: <Star size={20} /> },
    ];
    
    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <AdminSidebar navItems={adminNavItems} title="Admin Panel" />
            <main className="flex-1 w-full lg:ml-64 lg:w-[calc(100%-16rem)] p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
