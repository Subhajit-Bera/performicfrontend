"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Beaker, Briefcase, HeartPulse, Microscope, ArrowUpRight, CalendarDays, AlarmClock } from 'lucide-react';
import api from '../utils/api';
import { SectionHeading, Reveal } from './ui';

const TONES = [
    { ring: 'border-cyan/30', tile: 'bg-cyan/15 text-cyan', glow: 'group-hover:shadow-[0_24px_70px_-30px_rgba(34,211,238,0.55)]' },
    { ring: 'border-gold/30', tile: 'bg-gold/15 text-gold', glow: 'group-hover:shadow-[0_24px_70px_-30px_rgba(245,179,1,0.5)]' },
    { ring: 'border-rose/30', tile: 'bg-rose/15 text-rose-soft', glow: 'group-hover:shadow-[0_24px_70px_-30px_rgba(244,63,94,0.5)]' },
    { ring: 'border-emerald/30', tile: 'bg-emerald/15 text-emerald', glow: 'group-hover:shadow-[0_24px_70px_-30px_rgba(52,211,153,0.5)]' },
];

const CALENDAR = [
    { month: 'Jan – Apr', exam: 'JEE Main · both sessions', tone: 'bg-cyan' },
    { month: 'May', exam: 'NEET UG · national slot', tone: 'bg-rose' },
    { month: 'Jun – Jul', exam: 'State CET & counselling rounds', tone: 'bg-emerald' },
    { month: 'Nov', exam: 'CAT · MBA intake', tone: 'bg-gold' },
];

const EXAM_COPY = {
    'jee-mains': 'Joint Entrance Examination — the national gateway to NITs, IIITs and GFTIs, held in two sessions a year.',
    neet: 'National Eligibility cum Entrance Test — the single national gate for MBBS, BDS and AYUSH seats.',
    cat: 'Common Admission Test — the IIM gateway for MBA and postgraduate management intake.',
    mat: 'Management Aptitude Test — accepted by 600+ B-schools across four seasonal cycles.',
};

const EXAM_ICONS = { tech: Beaker, mba: Briefcase, medical: HeartPulse, other: Microscope };

const iconKey = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('jee') || n.includes('tech') || n.includes('gate')) return 'tech';
    if (n.includes('cat') || n.includes('mat') || n.includes('mba')) return 'mba';
    if (n.includes('neet') || n.includes('mbbs')) return 'medical';
    return 'other';
};

function ExamCard({ exam, index }) {
    const Icon = EXAM_ICONS[iconKey(exam.name)];
    const tone = TONES[index % TONES.length];
    return (
        <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={`/exams/${exam.slug}`}
                className={`group surface surface-hover flex h-full flex-col border ${tone.ring} p-6 ${tone.glow}`}
            >
                <div className="flex items-start justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone.tile}`}>
                        <Icon size={22} />
                    </span>
                    <span className="chip">{exam.exam_level || 'National level'}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-text">{exam.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                    {EXAM_COPY[exam.slug] || exam.info?.exam_full_name || `Complete syllabus, pattern and cutoff analysis for ${exam.name}.`}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                        <CalendarDays size={14} /> {exam.exam_date || 'Dates announced soon'}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-brand-300 transition-transform duration-300 group-hover:translate-x-1">
                        Syllabus & pattern <ArrowUpRight size={14} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function UpcomingExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        api.get('/exams')
            .then((res) => alive && setExams(res.data.slice(0, 6)))
            .catch(() => {})
            .finally(() => alive && setLoading(false));
        return () => { alive = false; };
    }, []);

    return (
        <section id="exams" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-900/40" />
            <div aria-hidden="true" className="pointer-events-none absolute right-[-12%] top-0 h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-[140px]" />

            <div className="container relative mx-auto px-5 sm:px-6">
                <SectionHeading
                    eyebrow="Entrance exams"
                    title="The deadlines that decide"
                    highlight="your intake year"
                    description="Syllabus, exam pattern, admit-card windows and cutoffs — tracked per exam so nothing slips past you."
                />

                <div className="mt-14 grid gap-6 lg:grid-cols-12">
                    <Reveal className="lg:col-span-4">
                        <div className="surface sticky top-28 p-6">
                            <div className="flex items-center gap-2.5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                                    <AlarmClock size={19} />
                                </span>
                                <div>
                                    <h3 className="font-display text-base font-bold text-text">2026 exam calendar</h3>
                                    <p className="text-xs text-text-secondary">Indicative windows, confirmed on registration</p>
                                </div>
                            </div>
                            <ol className="mt-6 space-y-0">
                                {CALENDAR.map((row, i) => (
                                    <li key={row.month} className="relative flex gap-4 pb-6 last:pb-0">
                                        {i < CALENDAR.length - 1 && (
                                            <span className="absolute left-[5px] top-4 h-full w-px bg-gradient-to-b from-white/20 to-transparent" />
                                        )}
                                        <span className={`relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${row.tone} shadow-[0_0_0_4px_rgba(255,255,255,0.05)]`} />
                                        <div>
                                            <p className="font-display text-sm font-bold text-text">{row.month}</p>
                                            <p className="text-xs text-text-secondary">{row.exam}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <Link href="/book-appointment" className="btn-ghost btn-md mt-6 w-full">
                                Get a personalised timeline
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                        {loading
                            ? [0, 1, 2, 3].map((i) => (
                                <div key={i} className="surface h-56 animate-pulse p-6">
                                    <div className="h-12 w-12 rounded-xl bg-white/[0.06]" />
                                    <div className="mt-5 h-5 w-2/3 rounded bg-white/[0.07]" />
                                    <div className="mt-3 h-3 w-full rounded bg-white/[0.05]" />
                                </div>
                            ))
                            : exams.map((exam, i) => <ExamCard key={exam.id} exam={exam} index={i} />)}
                        {!loading && exams.length === 0 && (
                            <div className="surface col-span-full p-10 text-center text-sm text-text-secondary">
                                Exam guides are being updated. Book a session and we will walk you through the current cycle.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}