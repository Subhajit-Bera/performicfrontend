"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, Building, BookOpen, GraduationCap, Users, CalendarCheck, FileText, UserSquare } from 'lucide-react';

export default function AdminSidebar({ navItems, title }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    
    return (
        <aside className="w-64 bg-primary h-screen fixed top-0 left-0 p-4 border-r border-secondary flex flex-col">
            <div className="mb-8 text-center">
                 <Link href="/" className="text-2xl font-bold">Edu<span className="text-accent">Elevate</span></Link>
                 <p className="text-xs text-text-secondary">{title}</p>
            </div>
            <nav className="flex flex-col space-y-2 flex-grow">
                {navItems.map(item => (
                    <Link key={item.href} href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors ${
                            pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin') && (item.href !== '/agent' || pathname === '/agent') ? 'bg-accent text-white' : 'text-text-secondary hover:bg-secondary/50 hover:text-text'
                        }`}>
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="w-full">
                 <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-red-400 hover:bg-secondary/50 rounded-md">
                    <LogOut size={20} /> Logout
                 </button>
            </div>
        </aside>
    );
}