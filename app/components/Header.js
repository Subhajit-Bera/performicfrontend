"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
    User, LogOut, Menu, X, LayoutDashboard, ChevronDown, Briefcase,
    GraduationCap, Stethoscope, FlaskConical, CalendarCheck, ArrowUpRight, Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

const EASE = [0.22, 1, 0.36, 1];

const STREAM_ICONS = {
    engineering: FlaskConical,
    medical: Stethoscope,
    pharmacy: FlaskConical,
};

function Logo({ compact = false }) {
    return (
        <Link href="/" aria-label="PerFormic home" className="group flex items-center">
            <span className="rounded-xl bg-[#F7F8FC] px-2.5 py-1.5 shadow-plate ring-1 ring-white/20 transition-transform duration-500 ease-premium group-hover:scale-[1.03]">
                <Image
                    src="/Logo.png"
                    alt="PerFormic Consultancy Services"
                    width={compact ? 118 : 148}
                    height={compact ? 38 : 48}
                    priority
                    className="h-auto w-auto"
                    style={{ height: compact ? 30 : 38, width: 'auto' }}
                />
            </span>
        </Link>
    );
}

function ProfileProgressCircle({ percentage }) {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return (
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
            <circle className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
            <motion.circle
                className="text-gold"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="20"
                cy="20"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.1, ease: EASE }}
            />
        </svg>
    );
}

function UniversitiesMenu({ streams, onNavigate }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[30rem] -translate-x-1/2"
        >
            <div className="surface overflow-hidden !rounded-2xl p-2 shadow-lift">
                <div className="grid grid-cols-2 gap-1">
                    <Link href="/top-universities" onClick={onNavigate} className="group col-span-2 flex items-center justify-between rounded-xl bg-brand-gradient px-4 py-3 text-white transition-transform duration-300 hover:scale-[1.01]">
                        <span className="flex items-center gap-2.5">
                            <Sparkles size={17} className="text-gold-soft" />
                            <span>
                                <span className="block text-sm font-bold">Top universities 2026</span>
                                <span className="block text-[11px] text-white/75">Ranked by outcomes, not brochures</span>
                            </span>
                        </span>
                        <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <Link href="/universities" onClick={onNavigate} className="col-span-2 flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-white/[0.06]">
                        Browse the full catalogue
                        <ArrowUpRight size={15} className="text-muted" />
                    </Link>
                    <div className="col-span-2 my-1 h-px bg-white/[0.07]" />
                    {streams.map((stream) => {
                        const Icon = STREAM_ICONS[stream.slug] || GraduationCap;
                        return (
                            <Link
                                key={stream.id}
                                href={`/universities?stream=${stream.slug}`}
                                onClick={onNavigate}
                                className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.06]"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-300 transition-colors group-hover:border-brand-400/50 group-hover:text-gold">
                                    <Icon size={15} />
                                </span>
                                <span className="text-sm font-medium text-text-secondary transition-colors group-hover:text-text">{stream.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

function Underline({ active }) {
    return (
        <span
            className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-brand-400 via-violet to-gold transition-opacity duration-300 ${
                active ? 'opacity-100' : 'opacity-0'
            }`}
        />
    );
}

export default function Header() {
    const { isAuthenticated, user, logout, profileCompletion } = useAuth();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileUniMenuOpen, setIsMobileUniMenuOpen] = useState(false);
    const [uniMenuOpen, setUniMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [streams, setStreams] = useState([]);
    const closeTimer = useRef(null);

    useEffect(() => {
        api.get('/streams').then((res) => setStreams(res.data)).catch(() => {});
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setUniMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    useEffect(() => {
        if (pathname !== '/') { setActiveSection(''); return; }
        const ids = ['universities', 'exams', 'careers', 'partners', 'faq'];
        const attach = () => {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(`#${e.target.id}`); }),
                { rootMargin: '-40% 0px -55% 0px' }
            );
            ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
            return observer;
        };
        let observer = attach();
        const retry = setTimeout(() => { observer.disconnect(); observer = attach(); }, 900);
        return () => { clearTimeout(retry); observer.disconnect(); };
    }, [pathname]);

    const openMenu = () => { clearTimeout(closeTimer.current); setUniMenuOpen(true); };
    const scheduleClose = () => { closeTimer.current = setTimeout(() => setUniMenuOpen(false), 140); };
    const closeMobileMenu = () => { setIsMenuOpen(false); setIsMobileUniMenuOpen(false); };

    const isActive = (href) => {
        if (href.startsWith('/#')) return pathname === '/' && activeSection === href.slice(1);
        if (href === '/') return pathname === '/' && !activeSection;
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navClass = (href) =>
        `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
            isActive(href) ? 'text-text' : 'text-text-secondary hover:text-text'
        }`;

    const desktopLinks = (
        <>
            <Link href="/" className={navClass('/')}>Home<Underline active={isActive('/')} /></Link>
            <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                <button
                    type="button"
                    onClick={() => setUniMenuOpen((v) => !v)}
                    aria-expanded={uniMenuOpen}
                    className={`${navClass('/universities')} flex items-center gap-1`}
                >
                    Universities
                    <ChevronDown size={15} className={`transition-transform duration-300 ${uniMenuOpen ? 'rotate-180' : ''}`} />
                    <Underline active={isActive('/universities')} />
                </button>
                <AnimatePresence>
                    {uniMenuOpen && <UniversitiesMenu streams={streams} onNavigate={() => setUniMenuOpen(false)} />}
                </AnimatePresence>
            </div>
            <Link href="/#exams" className={navClass('/#exams')}>Exams<Underline active={isActive('/#exams')} /></Link>
            <Link href="/#careers" className={navClass('/#careers')}>Careers<Underline active={isActive('/#careers')} /></Link>
            <Link href="/contact" className={navClass('/contact')}>Contact<Underline active={isActive('/contact')} /></Link>
            {isAuthenticated && user?.role === 'admin' && (
                <Link href="/admin" className={`${navClass('/admin')} flex items-center gap-1.5`}>
                    <LayoutDashboard size={15} /> Admin
                </Link>
            )}
            {isAuthenticated && user?.role === 'agent' && (
                <Link href="/agent" className={`${navClass('/agent')} flex items-center gap-1.5`}>
                    <Briefcase size={15} /> Agent
                </Link>
            )}
        </>
    );

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
                    scrolled
                        ? 'border-b border-white/[0.08] bg-ink-950/85 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl'
                        : 'border-b border-transparent bg-transparent'
                }`}
            >
                <div className={`container mx-auto flex items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-6 ${scrolled ? 'py-2.5' : 'py-4'}`}>
                    <Logo compact={scrolled} />

                    <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">{desktopLinks}</nav>

                    <div className="flex items-center gap-2.5">
                        <Link href="/book-appointment" className="btn-gold btn-sm hidden md:inline-flex">
                            <CalendarCheck size={15} /> Book a session
                        </Link>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link href="/profile" aria-label={`Profile ${profileCompletion}% complete`} className="relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105">
                                    <ProfileProgressCircle percentage={profileCompletion} />
                                    <User className="absolute text-text" size={16} />
                                </Link>
                                <button onClick={logout} aria-label="Sign out" className="hidden rounded-lg p-2 text-text-secondary transition-colors hover:bg-rose/10 hover:text-rose-soft md:flex">
                                    <LogOut size={17} />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden items-center gap-1.5 md:flex">
                                <Link href="/login" className="btn-ghost btn-sm">Login</Link>
                                <Link href="/register" className="btn-primary btn-sm">Sign up</Link>
                            </div>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open menu"
                            className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-text transition-colors hover:border-brand-400/50 lg:hidden"
                        >
                            <Menu size={19} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-ink-900/95 backdrop-blur-2xl lg:hidden"
                            role="dialog"
                            aria-label="Menu"
                        >
                            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                                <Logo compact />
                                <button onClick={closeMobileMenu} aria-label="Close menu" className="rounded-lg border border-white/10 p-2 text-text-secondary transition-colors hover:text-text">
                                    <X size={18} />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile">
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                                    className="flex flex-col gap-1"
                                >
                                    {[
                                        { href: '/', label: 'Home' },
                                        { href: '/#exams', label: 'Exams' },
                                        { href: '/#careers', label: 'Career options' },
                                        { href: '/#partners', label: 'Partner campuses' },
                                        { href: '/#faq', label: 'FAQ' },
                                        { href: '/contact', label: 'Contact' },
                                    ].map((item) => (
                                        <motion.div key={item.href} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                                            <Link href={item.href} onClick={closeMobileMenu} className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text">
                                                {item.label}
                                                <ArrowUpRight size={15} className="text-muted" />
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                                        <button
                                            onClick={() => setIsMobileUniMenuOpen((v) => !v)}
                                            aria-expanded={isMobileUniMenuOpen}
                                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text"
                                        >
                                            Universities
                                            <ChevronDown size={17} className={`transition-transform duration-300 ${isMobileUniMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isMobileUniMenuOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: EASE }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="ml-3 flex flex-col gap-0.5 border-l border-white/10 pl-4 py-1">
                                                        <Link href="/top-universities" onClick={closeMobileMenu} className="rounded-lg px-2 py-2 text-sm font-semibold text-gold transition-colors hover:bg-white/[0.05]">Top universities</Link>
                                                        <Link href="/universities" onClick={closeMobileMenu} className="rounded-lg px-2 py-2 text-sm text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text">All universities</Link>
                                                        {streams.map((s) => (
                                                            <Link key={s.id} href={`/universities?stream=${s.slug}`} onClick={closeMobileMenu} className="rounded-lg px-2 py-2 text-sm text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text">
                                                                {s.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {isAuthenticated && user?.role === 'admin' && (
                                        <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                                            <Link href="/admin" onClick={closeMobileMenu} className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-text-secondary hover:bg-white/[0.05] hover:text-text">
                                                <LayoutDashboard size={17} /> Admin dashboard
                                            </Link>
                                        </motion.div>
                                    )}
                                    {isAuthenticated && user?.role === 'agent' && (
                                        <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                                            <Link href="/agent" onClick={closeMobileMenu} className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-text-secondary hover:bg-white/[0.05] hover:text-text">
                                                <Briefcase size={17} /> Agent dashboard
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </nav>

                            <div className="border-t border-white/[0.07] px-5 py-4">
                                <Link href="/book-appointment" onClick={closeMobileMenu} className="btn-gold btn-md w-full">
                                    <CalendarCheck size={16} /> Book a session
                                </Link>
                                {isAuthenticated ? (
                                    <button onClick={() => { closeMobileMenu(); logout(); }} className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm text-text-secondary transition-colors hover:border-rose/40 hover:text-rose-soft">
                                        <LogOut size={15} /> Sign out
                                    </button>
                                ) : (
                                    <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                                        <Link href="/login" onClick={closeMobileMenu} className="btn-ghost btn-md">Login</Link>
                                        <Link href="/register" onClick={closeMobileMenu} className="btn-primary btn-md">Sign up</Link>
                                    </div>
                                )}
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}