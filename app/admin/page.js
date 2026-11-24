"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, Building, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-primary p-5 sm:p-6 rounded-xl flex items-center gap-4 sm:gap-6 border border-secondary shadow-sm">
        <div className="bg-secondary p-3 sm:p-4 rounded-full text-accent flex-shrink-0">{icon}</div>
        <div className="min-w-0">
            <p className="text-text-secondary text-xs sm:text-sm truncate">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-text truncate">{value}</p>
        </div>
    </div>
);

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        api.get('/admin/dashboard-stats')
            .then(res => setStats(res.data))
            .catch(err => console.error("Failed to fetch admin stats", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-text-secondary">Loading dashboard...</div>;

    const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Admin';

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Welcome back, {firstName}!</h1>
            <p className="text-text-secondary text-sm sm:text-base mb-6 sm:mb-8">Here&apos;s a snapshot of your platform.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={<Users size={28} />} />
                <StatCard title="Total Universities" value={stats?.totalUniversities || 0} icon={<Building size={28} />} />
                <StatCard title="Total Exams" value={stats?.totalExams || 0} icon={<BookOpen size={28} />} />
                <StatCard title="Total Applications" value={stats?.totalApplications || 0} icon={<FileText size={28} />} />
            </div>
        </div>
    );
}
