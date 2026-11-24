"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from './ui';

const STORIES = [
    {
        quote: 'I had a 91 percentile and no idea which campuses would actually take me. PerFormic showed me the cutoff working for five colleges and handled every form. I joined Bharath with a scholarship I did not know existed.',
        name: 'Ananya Raghavan',
        detail: 'B.Pharm · Bharath University, Chennai',
        initials: 'AR',
        tone: 'from-brand-500 to-violet',
    },
    {
        quote: 'The deadline tracking alone was worth it. NEET counselling rounds moved fast and my counsellor called me before every seat-acceptance window. Zero missed dates across three rounds.',
        name: 'Soham Kundu',
        detail: 'MBBS · Dhanalakshmi Srinivasan, Chennai',
        initials: 'SK',
        tone: 'from-cyan to-brand-500',
    },
    {
        quote: 'As a parent I wanted the full fee picture, not a brochure. They put hostel, exam and tuition costs in one sheet and compared it against two other campuses. That honesty is why we signed.',
        name: 'Meera Pillai',
        detail: 'Parent · MBA intake, Bangalore',
        initials: 'MP',
        tone: 'from-gold to-rose',
    },
];

export default function Testimonials() {
    return (
        <section id="stories" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-1/4 h-[26rem] w-[26rem] rounded-full bg-violet/10 blur-[130px]" />
            <div className="container relative mx-auto px-5 sm:px-6">
                <SectionHeading
                    eyebrow="Student outcomes"
                    title="Families who stopped"
                    highlight="guessing"
                    description="Real intake stories from the last two admission cycles."
                />

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {STORIES.map((s, i) => (
                        <motion.figure
                            key={s.name}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="group surface surface-hover relative flex h-full flex-col p-7"
                        >
                            <Quote size={30} className="absolute right-6 top-6 text-slate-200 dark:text-white/[0.07] transition-colors duration-500 group-hover:text-brand-400/25" />
                            <div className="flex items-center gap-1 text-gold">
                                {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={14} className="fill-current" />)}
                            </div>
                            <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-text-secondary">
                                “{s.quote}”
                            </blockquote>
                            <figcaption className="mt-7 flex items-center gap-3 border-t border-slate-200 dark:border-white/[0.07] pt-5">
                                <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${s.tone} font-display text-sm font-bold text-white`}>
                                    {s.initials}
                                </span>
                                <span>
                                    <span className="block text-sm font-bold text-text">{s.name}</span>
                                    <span className="block text-xs text-text-secondary">{s.detail}</span>
                                </span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}