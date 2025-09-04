// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../context/AuthContext';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import api from '../utils/api';
// import { Users, FileText, CalendarCheck } from 'lucide-react';

// const StatCard = ({ title, value, icon }) => (
//     <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-6 shadow-lg">
//         <div className="bg-slate-700 p-4 rounded-full text-cyan-400">
//             {icon}
//         </div>
//         <div>
//             <p className="text-slate-400 text-sm">{title}</p>
//             <p className="text-3xl font-bold">{value}</p>
//         </div>
//     </div>
// );

// export default function AdminPage() {
//     const { user, isAuthenticated, loading } = useAuth();
//     const router = useRouter();
//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         if (!loading) {
//             if (!isAuthenticated || user?.role !== 'admin') {
//                 router.push('/'); // Redirect non-admins to home
//             } else {
//                 api.get('/admin/dashboard-stats')
//                     .then(res => setStats(res.data))
//                     .catch(err => console.error("Failed to fetch admin stats", err));
//             }
//         }
//     }, [user, isAuthenticated, loading, router]);

//     if (loading || !stats) {
//         return <div className="min-h-screen flex items-center justify-center">Loading Admin Dashboard...</div>;
//     }

//     return (
//         <>
//             <Header />
//             <main className="pt-24 min-h-screen bg-slate-900">
//                 <div className="container mx-auto px-6 py-12">
//                     <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         <StatCard title="Total Users" value={stats.totalUsers} icon={<Users size={32} />} />
//                         <StatCard title="Total Applications" value={stats.totalApplications} icon={<FileText size={32} />} />
//                         <StatCard title="Total Appointments" value={stats.totalAppointments} icon={<CalendarCheck size={32} />} />
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }


"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, Building, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-primary p-6 rounded-xl flex items-center gap-6 border border-secondary">
        <div className="bg-secondary p-4 rounded-full text-accent">{icon}</div>
        <div>
            <p className="text-text-secondary text-sm">{title}</p>
            <p className="text-3xl font-bold text-text">{value}</p>
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

    if (loading) return <div>Loading dashboard...</div>

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.full_name.split(' ')[0]}!</h1>
            <p className="text-text-secondary mb-8">Here's a snapshot of your platform.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={<Users size={32} />} />
                <StatCard title="Total Universities" value={stats?.totalUniversities || 0} icon={<Building size={32} />} />
                <StatCard title="Total Exams" value={stats?.totalExams || 0} icon={<BookOpen size={32} />} />
                <StatCard title="Total Applications" value={stats?.totalApplications || 0} icon={<FileText size={32} />} />
            </div>
        </div>
    );
}
