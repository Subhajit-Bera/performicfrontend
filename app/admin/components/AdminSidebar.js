"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';

export default function AdminSidebar({ navItems = [], title = "Admin Panel" }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Auto-close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent background scrolling when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileOpen]);

    return (
        <>
            {/* Mobile Top Navigation Bar (Visible only on < lg screens) */}
            <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-primary/95 backdrop-blur border-b border-secondary px-4 py-3 shadow-md w-full">
                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className="p-2 -ml-2 rounded-lg text-text hover:text-accent hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-label="Open navigation menu"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        Per<span className="text-accent">Formic</span>
                    </Link>
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary text-text-secondary font-medium">
                        {title}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={logout}
                    className="p-2 -mr-2 text-text-secondary hover:text-red-400 hover:bg-secondary/50 rounded-lg transition-colors"
                    title="Logout"
                    aria-label="Logout"
                >
                    <LogOut size={20} />
                </button>
            </header>

            {/* Mobile Backdrop Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar (Drawer on mobile, Fixed persistent sidebar on desktop) */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-primary p-4 border-r border-secondary flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                {/* Sidebar Header */}
                <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-secondary">
                        <div>
                            <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-bold tracking-tight">
                                Per<span className="text-accent">Formic</span>
                            </Link>
                            <p className="text-xs text-text-secondary font-medium mt-0.5">{title}</p>
                        </div>
                        {/* Mobile close button */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text hover:bg-secondary/50 transition-colors"
                            aria-label="Close navigation menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col space-y-1.5 overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
                        {navItems.map(item => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== '/admin' && item.href !== '/agent' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-accent text-white shadow-sm font-semibold'
                                            : 'text-text-secondary hover:bg-secondary/50 hover:text-text'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer with User info & Logout */}
                <div className="pt-4 border-t border-secondary space-y-2">
                    {user && (
                        <div className="px-3 py-2 rounded-lg bg-secondary/30 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm">
                                {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-text truncate">{user.full_name || user.email}</p>
                                <p className="text-[10px] text-text-secondary uppercase tracking-wider">{user.role}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
