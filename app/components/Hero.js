"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    ArrowRight, CalendarCheck, Search, ShieldCheck, Sparkles, Star,
    GraduationCap, Target, Clock3, CheckCircle2, TrendingUp,
} from 'lucide-react';
import { CountUp } from './ui';

const EASE = [0.22, 1, 0.36, 1];

const MATCHES = [
    { name: 'Bharath University', course: 'B.Pharm · Chennai', match: 94, tone: 'from-emerald to-cyan' },
    { name: 'Dhanalakshmi Srinivasan', course: 'MBBS · Chennai', match: 88, tone: 'from-brand-400 to-violet' },
    { name: 'Chanakya University', course: 'B.Tech · Bangalore', match: 81, tone: 'from-gold to-rose' },
];

const STATS = [
    { value: 2400, suffix: '+', label: 'Students counselled' },
    { value: 98, suffix: '%', label: 'Offer conversion' },
    { value: 120, suffix: '+', label: 'Partner campuses' },
    { value: 14, suffix: ' yrs', label: 'Admissions experience' },
];

const AVATARS = [
    { initials: 'AR', tone: 'from-brand-500 to-violet' },
    { initials: 'SK', tone: 'from-cyan to-brand-500' },
    { initials: 'MP', tone: 'from-gold to-rose' },
    { initials: 'DV', tone: 'from-emerald to-cyan' },
];

function MatchRow({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.16, duration: 0.7, ease: EASE }}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.06]"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text">{item.name}</p>
                    <p className="truncate text-xs text-text-secondary">{item.course}</p>
                </div>
                <span className="shrink-0 font-display text-sm font-bold text-text">{item.match}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.match}%` }}
                    transition={{ delay: 1.1 + index * 0.16, duration: 1.1, ease: EASE }}
                />
            </div>
        </motion.div>
    );
}

export default function Hero() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const sectionRef = useRef(null);
    const panelRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const panelY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
    const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

    const handleTilt = (e) => {
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltY.set(px * 10);
        tiltX.set(py * -8);
    };
    const resetTilt = () => { tiltX.set(0); tiltY.set(0); };

    const submitSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/universities?search=${encodeURIComponent(q)}` : '/universities');
    };

    return (
        <section ref={sectionRef} className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
            {/* Layered atmosphere */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute inset-0 grid-lines mask-fade-b opacity-70" />
                <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0">
                    <div className="absolute -top-48 left-[8%] h-[38rem] w-[38rem] rounded-full bg-brand-600/30 blur-[140px] animate-aurora" />
                    <div className="absolute top-[12%] right-[4%] h-[32rem] w-[32rem] rounded-full bg-violet/25 blur-[130px] animate-aurora-slow" />
                    <div className="absolute bottom-[-10%] left-[35%] h-[26rem] w-[26rem] rounded-full bg-cyan/15 blur-[120px] animate-aurora" />
                    <div className="absolute top-[38%] left-[46%] h-[18rem] w-[18rem] rounded-full bg-gold/10 blur-[110px] animate-aurora-slow" />
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.16),transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-fade-down" />
                <div className="grain absolute inset-0" />
            </div>

            <div className="container mx-auto px-5 sm:px-6">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
                    {/* Copy column */}
                    <motion.div style={{ y: copyY }} className="min-w-0 lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            <span className="eyebrow">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald animate-pulse-ring" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                                </span>
                                Admissions open · 2026
                            </span>
                            <span className="chip">
                                <ShieldCheck size={13} className="text-cyan" /> Verified university data
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
                            className="mt-6 text-display-xl font-extrabold text-text"
                        >
                            Your admission,
                            <br className="hidden sm:block" />{' '}
                            <span className="font-editorial italic font-normal text-gradient">engineered.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
                            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
                        >
                            A dedicated counsellor shortlists universities against your real scores and budget,
                            then tracks every deadline from first application to enrolment. No guesswork, no missed dates.
                        </motion.p>

                        <motion.form
                            onSubmit={submitSearch}
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
                            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-ink-900/70 p-2 shadow-sm dark:shadow-card backdrop-blur-xl focus-within:border-brand-500 dark:focus-within:border-brand-400/60 focus-within:ring-2 focus-within:ring-brand-500/20"
                        >
                            <Search size={18} className="ml-3 shrink-0 text-muted" aria-hidden="true" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search universities, cities or streams…"
                                aria-label="Search universities"
                                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-text placeholder:text-muted focus:outline-none"
                            />
                            <button type="submit" className="btn-primary btn-sm shrink-0">
                                Search <ArrowRight size={15} />
                            </button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
                            className="mt-6 flex flex-wrap items-center gap-3"
                        >
                            <Link href="/universities" className="btn-primary btn-lg group overflow-hidden">
                                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                                    <span className="absolute inset-y-0 w-1/3 bg-white/25 blur-md animate-shine" />
                                </span>
                                Explore universities
                                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link href="/book-appointment" className="btn-ghost btn-lg">
                                <CalendarCheck size={18} className="text-gold" />
                                Book free counselling
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.6 }}
                            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
                        >
                            <div className="flex items-center">
                                <div className="flex -space-x-3">
                                    {AVATARS.map((a) => (
                                        <span
                                            key={a.initials}
                                            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${a.tone} ring-2 ring-ink-950 text-[11px] font-bold text-white`}
                                        >
                                            {a.initials}
                                        </span>
                                    ))}
                                </div>
                                <div className="ml-3">
                                    <div className="flex items-center gap-1 text-gold">
                                        {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} className="fill-current" />)}
                                        <span className="ml-1 text-xs font-semibold text-text">4.9</span>
                                    </div>
                                    <p className="text-xs text-text-secondary">2,400+ students counselled</p>
                                </div>
                            </div>
                            <div className="hidden h-8 w-px bg-slate-300/80 dark:bg-white/10 sm:block" />
                            <p className="flex items-center gap-2 text-xs text-text-secondary">
                                <CheckCircle2 size={15} className="text-emerald" />
                                Zero spam. One counsellor, end to end.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Admission desk panel */}
                    <motion.div style={{ y: panelY }} className="relative min-w-0 lg:col-span-5">
                        <div className="relative mx-auto max-w-md [perspective:1400px]">
                            <motion.div
                                ref={panelRef}
                                onMouseMove={handleTilt}
                                onMouseLeave={resetTilt}
                                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.35, ease: EASE }}
                                className="surface relative p-5"
                            >
                                <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-brand-500/40 via-transparent to-gold/30 blur-sm" />
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                                            <Target size={17} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate font-display text-sm font-bold text-text">Your admission desk</p>
                                            <p className="truncate text-[11px] text-text-secondary">Ananya R. · JEE 92.4 percentile</p>
                                        </div>
                                    </div>
                                    <span className="chip shrink-0 !border-emerald/30 !bg-emerald/10 !text-emerald">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Live
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2.5">
                                    {MATCHES.map((m, i) => <MatchRow key={m.name} item={m} index={i} />)}
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200/80 dark:border-gold/25 bg-amber-50/80 dark:bg-gold/[0.07] px-3.5 py-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <Clock3 size={16} className="shrink-0 text-amber-600 dark:text-gold" />
                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-semibold text-text">Next counselling slot</p>
                                            <p className="truncate text-[11px] text-text-secondary">Today · 4:30 PM IST</p>
                                        </div>
                                    </div>
                                    <Link href="/book-appointment" className="shrink-0 text-xs font-bold text-amber-600 dark:text-gold transition-colors hover:text-amber-700 dark:hover:text-gold-soft">
                                        Confirm
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Floating satellites */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
                                className="pointer-events-none absolute -left-4 -top-9 hidden animate-floaty sm:block"
                            >
                                <div className="surface flex items-center gap-2.5 !rounded-xl px-3.5 py-2.5 shadow-lift">
                                    <TrendingUp size={16} className="text-emerald" />
                                    <div>
                                        <p className="font-display text-sm font-bold text-text">98% offer rate</p>
                                        <p className="text-[10px] text-text-secondary">2025 intake cohort</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
                                className="pointer-events-none absolute -bottom-12 -right-5 hidden animate-floaty-slow sm:block"
                            >
                                <div className="surface flex items-center gap-2.5 !rounded-xl px-3.5 py-2.5 shadow-lift">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-brand-500 text-[10px] font-bold text-white">
                                        RK
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold text-text">Rahul K. assigned</p>
                                        <p className="text-[10px] text-text-secondary">Senior admissions counsellor</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* KPI strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
                    className="surface mt-16 grid grid-cols-2 divide-y divide-slate-200 dark:divide-white/[0.06] md:mt-20 md:grid-cols-4 md:divide-y-0 md:divide-x"
                >
                    {STATS.map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
                            <p className="font-display text-3xl font-extrabold text-text md:text-4xl">
                                <CountUp to={s.value} />
                                <span className="text-gradient-gold">{s.suffix}</span>
                            </p>
                            <p className="text-xs uppercase tracking-[0.14em] text-text-secondary">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <a href="#universities" aria-label="Scroll to universities" className="group flex flex-col items-center gap-2 text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-300 dark:border-white/15 p-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-scroll-dot" />
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}