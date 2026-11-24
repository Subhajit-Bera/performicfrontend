"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, GraduationCap, MoveHorizontal, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UniversityCard from '../components/UniversityCard';
import { Reveal } from '../components/ui';
import api from '../utils/api';

const TONES = [
    'from-rose/25 to-violet/10 text-rose-soft',
    'from-cyan/25 to-brand-500/10 text-cyan',
    'from-gold/25 to-rose/10 text-gold',
    'from-emerald/25 to-cyan/10 text-emerald',
];

function StreamShowcase({ streamData, index }) {
    const railRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const tone = TONES[index % TONES.length];
    const count = streamData.universities?.length || 0;

    const onRailScroll = () => {
        const rail = railRef.current;
        if (!rail) return;
        const max = rail.scrollWidth - rail.clientWidth;
        setProgress(max > 0 ? rail.scrollLeft / max : 0);
    };

    return (
        <motion.section
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone}`}>
                        <Trophy size={19} />
                    </span>
                    <div className="min-w-0">
                        <h2 className="truncate font-display text-xl font-bold text-text md:text-2xl">
                            Top {streamData.stream_name} colleges
                        </h2>
                        <p className="text-xs text-text-secondary">
                            {count} {count === 1 ? 'campus' : 'campuses'} ranked by placement and cutoff outcomes
                        </p>
                    </div>
                </div>
                <Link
                    href={`/universities?stream=${streamData.stream_slug}`}
                    className="btn-ghost btn-sm shrink-0 whitespace-nowrap"
                >
                    Explore more <ChevronRight size={14} />
                </Link>
            </div>

            <div
                ref={railRef}
                onScroll={onRailScroll}
                className="scrollbar-hide -mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scroll-pl-5 sm:-mx-6 sm:px-6 sm:scroll-pl-6"
            >
                {(streamData.universities || []).map((uni) => (
                    <div key={uni.id} className="w-[85vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem]">
                        <UniversityCard university={uni} />
                    </div>
                ))}
                {count === 0 && (
                    <div className="surface flex w-[85vw] shrink-0 flex-col items-center justify-center gap-3 p-10 text-center sm:w-[22rem]">
                        <GraduationCap size={26} className="text-muted" />
                        <p className="text-sm text-text-secondary">Rankings for this stream are being refreshed.</p>
                    </div>
                )}
                <Link
                    href={`/universities?stream=${streamData.stream_slug}`}
                    className="group surface surface-hover flex w-[70vw] shrink-0 snap-start flex-col justify-between p-6 sm:w-[16rem]"
                >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone}`}>
                        <ArrowUpRight size={18} />
                    </span>
                    <div className="mt-6">
                        <p className="font-display text-base font-bold text-text transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                            See every {streamData.stream_name} campus
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">Full catalogue with fees and cutoffs.</p>
                    </div>
                </Link>
            </div>

            <div className="mt-1 flex items-center gap-3">
                <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                    <div
                        className="h-full rounded-full bg-brand-gradient transition-[width] duration-300"
                        style={{ width: `${Math.max(progress * 100, 8)}%` }}
                    />
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted sm:hidden">
                    <MoveHorizontal size={12} /> Swipe
                </span>
            </div>
        </motion.section>
    );
}

export default function TopUniversitiesPage() {
    const [topUniversities, setTopUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        api.get('/universities/top-by-stream')
            .then((res) => alive && setTopUniversities(res.data))
            .catch(() => {})
            .finally(() => alive && setLoading(false));
        return () => { alive = false; };
    }, []);

    return (
        <>
            <Header />
            <main id="main-content" className="relative min-h-screen overflow-hidden bg-background pt-24">
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-16rem] h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[140px]" />
                <div className="container relative mx-auto px-5 py-14 sm:px-6 md:py-20">
                    <Reveal>
                        <span className="eyebrow">Ranked by outcomes</span>
                        <h1 className="mt-4 max-w-3xl text-display-md font-bold text-text">
                            The strongest campus{' '}
                            <span className="font-editorial italic font-normal text-gradient">in every stream.</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
                            One leaderboard per discipline — built from placement records, cutoff trends and
                            fee transparency, not from brochures.
                        </p>
                    </Reveal>

                    <div className="mt-14 space-y-16">
                        {loading ? (
                            [0, 1].map((i) => (
                                <div key={i}>
                                    <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-white/[0.07]" />
                                    <div className="mt-6 flex gap-5 overflow-hidden">
                                        {[0, 1, 2].map((j) => (
                                            <div key={j} className="surface h-80 w-[85vw] max-w-[22rem] shrink-0 animate-pulse p-6 sm:w-[22rem]">
                                                <div className="h-36 w-full rounded-xl bg-slate-200/80 dark:bg-white/[0.06]" />
                                                <div className="mt-5 h-5 w-2/3 rounded bg-slate-200 dark:bg-white/[0.07]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : topUniversities.length > 0 ? (
                            topUniversities.map((streamData, index) => (
                                <StreamShowcase key={streamData.stream_id} streamData={streamData} index={index} />
                            ))
                        ) : (
                            <div className="surface flex flex-col items-center gap-4 p-14 text-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300">
                                    <Trophy size={24} />
                                </span>
                                <p className="font-display text-lg font-bold text-text">Leaderboards are being compiled.</p>
                                <p className="max-w-md text-sm text-text-secondary">
                                    Meanwhile, browse the full catalogue — every campus carries verified fees and cutoffs.
                                </p>
                                <Link href="/universities" className="btn-primary btn-md">Browse universities</Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}