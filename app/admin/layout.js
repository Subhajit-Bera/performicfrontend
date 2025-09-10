// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuth } from '../context/AuthContext';
// import { LayoutDashboard, Building, BookOpen, GraduationCap, LogOut,Star } from 'lucide-react';

// const AdminSidebar = () => {
//     const pathname = usePathname();
//     const { logout } = useAuth();
//     const navItems = [
//         { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
//         { href: '/admin/universities', label: 'Universities', icon: <Building size={20} /> },
//         { href: '/admin/exams', label: 'Exams', icon: <BookOpen size={20} /> },
//         { href: '/admin/streams', label: 'Streams', icon: <GraduationCap size={20} /> },
//         { href: '/admin/courses', label: 'Career Options', icon: <GraduationCap size={20} /> },
//         { href: '/admin/partners', label: 'Career Partners', icon: <Star size={20} /> },
//     ];

//     return (
//         <aside className="w-64 bg-primary h-screen fixed top-0 left-0 p-4 border-r border-secondary flex flex-col">
//             <div className="mb-8 text-center">
//                  <Link href="/" className="text-2xl font-bold">Per<span className="text-accent">Formic</span></Link>
//                  <p className="text-xs text-text-secondary">Admin Panel</p>
//             </div>
//             <nav className="flex flex-col space-y-2 flex-grow">
//                 {navItems.map(item => (
//                     <Link key={item.href} href={item.href}
//                         className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors ${
//                             pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin') ? 'bg-accent text-white' : 'text-text-secondary hover:bg-secondary/50 hover:text-text'
//                         }`}>
//                         {item.icon}
//                         <span>{item.label}</span>
//                     </Link>
//                 ))}
//             </nav>
//             <div className="w-full">
//                  <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-red-400 hover:bg-secondary/50 rounded-md">
//                     <LogOut size={20} /> Logout
//                  </button>
//             </div>
//         </aside>
//     );
// };

// export default function AdminLayout({ children }) {
//     const { user, loading } = useAuth();
//     const router = useRouter();

//     if (loading) {
//         return <div className="min-h-screen flex items-center justify-center bg-background">Authenticating...</div>;
//     }

//     if (!user || user.role !== 'admin') {
//         if (typeof window !== 'undefined') router.push('/login');
//         return <div className="min-h-screen flex items-center justify-center bg-background">Redirecting...</div>;
//     }
    
//     return (
//         <div className="flex bg-background min-h-screen">
//             <AdminSidebar />
//             <main className="ml-64 w-[calc(100%-16rem)] p-8">
//                 {children}
//             </main>
//         </div>
//     );
// }


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
        <div className="flex bg-background min-h-screen">
            <AdminSidebar navItems={adminNavItems} title="Admin Panel" />
            <main className="ml-64 w-[calc(100%-16rem)] p-8">
                {children}
            </main>
        </div>
    );
}