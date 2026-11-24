"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ShieldCheck, Wallet, CalendarClock, Users, FileSearch, ArrowRight,
    PhoneCall, ListChecks, Send, BadgeCheck,
} from 'lucide-react';
import { SectionHeading, Reveal, CountUp } from './ui';

const VALUES = [
    {
        icon: FileSearch,
        title: 'Shortlists built on evidence',
        body: 'We score every campus against your percentile, budget and city preference, then show you the working — not a sponsored list.',
        tone: 'from-brand-500/25 to-violet/10 text-brand-300',
        span: 'lg:col-span-2 lg:row-span-2',
        stat: { value: 120, suffix: '+', label: 'campuses audited each intake' },
    },
    {
        icon: Wallet,
        title: 'Fee transparency',
        body: 'Total cost of attendance, including hostel and exam fees, before you pay anyone.',
        tone: 'from-gold/25 to-rose/10 text-gold',
    },
    {
        icon: CalendarClock,
        title: 'Deadline custody',
        body: 'Application windows, counselling rounds and document dates tracked for you.',
        tone: 'from-cyan/25 to-brand-500/10 text-cyan',
    },
    {
        icon: Users,
        title: 'One counsellor, end to end',
        body: 'The person who shortlists your campuses is the person who sees you through enrolment.',
        tone: 'from-emerald/25 to-cyan/10 text-emerald',
    },
    {
        icon: ShieldCheck,
        title: 'No hidden commissions',
        body: 'Our advice is paid for by you, so a campus never buys its way onto your list.',
        tone: 'from-rose/25 to-violet/10 text-rose-soft',
    },
];

const STEPS = [
    { icon: PhoneCall, title: 'Discovery call', body: '20 minutes on scores, budget, city and the career you actually want.' },
    { icon: ListChecks, title: 'Evidence shortlist', body: 'Three to five campuses with fees, cutoffs and placement data side by side.' },
    { icon: Send, title: 'Managed applications', body: 'Forms, documents and deadlines handled; you approve every submission.' },
    { icon: BadgeCheck, title: 'Offer to enrolment', body: 'Counselling rounds, seat acceptance and hostel paperwork through to day one.' },
];

export default function WhyPerformic() {
    return (
        <section id="why" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-900/40" />
            <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] bottom-0 h-[26rem] w-[26rem] rounded-full bg-emerald/[0.07] blur-[130px]" />

            <div className="container relative mx-auto px-5 sm:px-6">
                <SectionHeading
                    eyebrow="Why PerFormic"
                    title="A consultancy that behaves like"
                    highlight="your own admissions office"
                    description="Fourteen years of intake cycles, distilled into a process you can inspect at every step."
                />

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className={`group surface surface-hover flex flex-col p-6 ${v.span || ''}`}
                        >
                            <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.tone}`}>
                                <v.icon size={22} />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-bold text-text">{v.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{v.body}</p>
                            {v.stat && (
                                <div className="mt-auto pt-8">
                                    <p className="font-display text-5xl font-extrabold text-text">
                                        <CountUp to={v.stat.value} />
                                        <span className="text-gradient-gold">{v.stat.suffix}</span>
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-secondary">{v.stat.label}</p>
                                    <div className="mt-6 grid grid-cols-3 gap-2">
                                        {['Fees', 'Cutoffs', 'Placements'].map((label) => (
                                            <span key={label} className="rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 dark:bg-white/[0.03] px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-700 dark:text-text-secondary">
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24">
                    <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="eyebrow">How it works</span>
                            <h3 className="mt-4 text-display-md font-bold text-text">
                                Four steps from confused to <span className="font-editorial italic font-normal text-gradient">enrolled.</span>
                            </h3>
                        </div>
                        <Link href="/book-appointment" className="btn-primary btn-md group">
                            Start step one
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>

                    <div className="relative mt-12 grid gap-6 md:grid-cols-4">
                        <div aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-500/0 via-brand-400/50 to-gold/0 md:block" />
                        {STEPS.map((s, i) => (
                            <Reveal key={s.title} delay={i * 0.12}>
                                <div className="group relative">
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 shadow-card transition-all duration-500 group-hover:border-brand-400/60 group-hover:shadow-glow">
                                        <s.icon size={22} className="text-brand-300 transition-colors duration-300 group-hover:text-gold" />
                                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient font-display text-[11px] font-bold text-white">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <h4 className="mt-5 font-display text-base font-bold text-text">{s.title}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}