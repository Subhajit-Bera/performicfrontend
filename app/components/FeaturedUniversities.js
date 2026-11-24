"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass, CalendarCheck, GraduationCap } from 'lucide-react';
import api from '../utils/api';
import UniversityCard from './UniversityCard';
import { SectionHeading, Reveal } from './ui';

function SkeletonCard() {
    return (
        <div className="surface h-[22rem] w-[20rem] shrink-0 overflow-hidden sm:w-[22rem]">
            <div className="h-44 animate-pulse bg-white/[0.05]" />
            <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.07]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.05]" />
                <div className="flex gap-2 pt-2">
                    <div className="h-5 w-16 animate-pulse rounded bg-white/[0.05]" />
                    <div className="h-5 w-16 animate-pulse rounded bg-white/[0.05]" />
                </div>
                <div className="h-9 w-full animate-pulse rounded-xl bg-white/[0.05]" />
            </div>
        </div>
    );
}

export default function FeaturedUniversities() {
    const [universities, setUniversities] = useState([]);
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [progress, setProgress] = useState(0);
    const railRef = useRef(null);

    useEffect(() => {
        let alive = true;
        Promise.all([api.get('/universities'), api.get('/streams')])
            .then(([uniRes, streamRes]) => {
                if (!alive) return;
                setUniversities(uniRes.data);
                setStreams(streamRes.data);
            })
            .catch(() => {})
            .finally(() => alive && setLoading(false));
        return () => { alive = false; };
    }, []);

    const visible = useMemo(() => {
        if (filter === 'all') return universities;
        return universities.filter((u) => (u.streams || []).some((s) => s.toLowerCase() === filter.toLowerCase()));
    }, [universities, filter]);

    const scrollRail = (dir) => {
        const rail = railRef.current;
        if (!rail) return;
        rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 380), behavior: 'smooth' });
    };

    useEffect(() => {
        railRef.current?.scrollTo({ left: 0 });
    }, [filter]);

    const onRailScroll = () => {
        const rail = railRef.current;
        if (!rail) return;
        const max = rail.scrollWidth - rail.clientWidth;
        setProgress(max > 0 ? rail.scrollLeft / max : 0);
    };

    const filters = [{ label: 'All campuses', value: 'all' }, ...streams.map((s) => ({ label: s.name, value: s.name }))];

    return (
        <section id="universities" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-10%] top-1/4 h-[26rem] w-[26rem] rounded-full bg-brand-600/10 blur-[130px]" />
                <div className="absolute bottom-0 right-[-8%] h-[22rem] w-[22rem] rounded-full bg-gold/[0.06] blur-[120px]" />
            </div>

            <div className="container relative mx-auto px-5 sm:px-6">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        align="left"
                        eyebrow="Partner campuses"
                        title="Universities we"
                        highlight="actually place students in"
                        description="Every campus on this list is verified by our counsellors — fees, intake dates and placement records checked against the registrar, not the brochure."
                        className="max-w-2xl"
                    />
                    <Reveal delay={0.15} className="flex items-center gap-2">
                        <button onClick={() => scrollRail(-1)} aria-label="Scroll universities left" className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-text-secondary transition-all duration-300 hover:border-brand-500 dark:hover:border-brand-400/50 hover:text-text shadow-xs dark:shadow-none">
                            <ArrowLeft size={17} />
                        </button>
                        <button onClick={() => scrollRail(1)} aria-label="Scroll universities right" className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-text-secondary transition-all duration-300 hover:border-brand-500 dark:hover:border-brand-400/50 hover:text-text shadow-xs dark:shadow-none">
                            <ArrowRight size={17} />
                        </button>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                                filter === f.value
                                    ? 'bg-brand-gradient text-white shadow-glow'
                                    : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-600 dark:text-text-secondary hover:border-slate-300 dark:hover:border-brand-400/40 hover:text-slate-900 dark:hover:text-text shadow-xs dark:shadow-none'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </Reveal>

                <div
                    ref={railRef}
                    onScroll={onRailScroll}
                    className="scrollbar-hide -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scroll-pl-5 sm:-mx-6 sm:px-6 sm:scroll-pl-6"
                >
                    {loading ? (
                        [0, 1, 2].map((i) => <SkeletonCard key={i} />)
                    ) : (
                        <>
                            {visible.map((uni, i) => (
                                <motion.div
                                    key={uni.id}
                                    initial={{ opacity: 0, y: 26 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
                                    className="w-[85vw] shrink-0 snap-start sm:w-[22rem]"
                                >
                                    <UniversityCard university={uni} />
                                </motion.div>
                            ))}

                            {visible.length === 0 && (
                                <div className="surface flex w-[85vw] shrink-0 flex-col items-center justify-center gap-3 p-10 text-center sm:w-[22rem]">
                                    <GraduationCap size={28} className="text-muted" />
                                    <p className="text-sm text-text-secondary">No campuses in this stream yet.</p>
                                    <button onClick={() => setFilter('all')} className="btn-ghost btn-sm">Show all campuses</button>
                                </div>
                            )}

                            <div className="surface flex w-[85vw] shrink-0 snap-start flex-col justify-between p-6 sm:w-[22rem]">
                                <div>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                                        <Compass size={19} />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-text">Browse by stream</h3>
                                    <p className="mt-1.5 text-sm text-text-secondary">Jump straight to the discipline you are aiming for.</p>
                                </div>
                                <div className="mt-5 flex flex-col gap-2">
                                    {streams.map((s) => (
                                        <Link
                                            key={s.id}
                                            href={`/universities?stream=${s.slug}`}
                                            className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50/80 dark:bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-brand-500 hover:text-text"
                                        >
                                            {s.name}
                                            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-brand-gradient p-6 sm:w-[22rem]">
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                                <div className="relative">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                                        <CalendarCheck size={19} />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-white">Not sure where you fit?</h3>
                                    <p className="mt-1.5 text-sm text-white/80">
                                        A 20-minute call with a counsellor narrows 120 campuses down to the three worth your application fee.
                                    </p>
                                </div>
                                <Link href="/book-appointment" className="btn-gold btn-md relative mt-6 w-full">
                                    Book free counselling
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-gold transition-[width] duration-200"
                        style={{ width: `${Math.max(progress * 100, 8)}%` }}
                    />
                </div>

                <Reveal delay={0.1} className="mt-8 flex justify-center">
                    <Link href="/universities" className="btn-ghost btn-md group">
                        View the full catalogue
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}