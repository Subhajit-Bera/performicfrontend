"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import api from '../utils/api';
import { SectionHeading, Reveal } from './ui';

const COURSE_COPY = {
    bpharm: 'Four years into formulation, quality assurance and clinical pharmacy practice.',
    'b-tech': 'Engineering across CSE, ECE, mechanical and civil — with placement-linked specialisations.',
    mpharm: 'Postgraduate depth in pharmaceutics, pharmacology and regulatory affairs.',
    mba: 'Management intake through CAT, MAT and state CETs, with finance and analytics tracks.',
    mbbs: 'Clinical medicine from first-year anatomy to internship and PG counselling.',
    pharmd: 'Six-year doctor of pharmacy programme built around hospital rotations.',
};

const TONES = [
    'from-brand-500/25 to-violet/10 text-brand-300',
    'from-cyan/25 to-brand-500/10 text-cyan',
    'from-gold/25 to-rose/10 text-gold',
    'from-emerald/25 to-cyan/10 text-emerald',
    'from-rose/25 to-violet/10 text-rose-soft',
    'from-violet/25 to-brand-500/10 text-violet-soft',
];

export default function CareerOptions() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let alive = true;
        api.get('/courses').then((res) => alive && setCourses(res.data)).catch(() => {});
        return () => { alive = false; };
    }, []);

    return (
        <section id="careers" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[140px]" />
            <div className="container relative mx-auto px-5 sm:px-6">
                <SectionHeading
                    eyebrow="Career options"
                    title="Pick the course that"
                    highlight="compounds for a decade"
                    description="Not just a degree name — duration, eligibility, fee band and the roles each programme actually feeds into."
                />

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, i) => {
                        const Icon = LucideIcons[course.icon_name] || LucideIcons.GraduationCap;
                        const tone = TONES[i % TONES.length];
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={`/courses/${course.slug}`} className="group surface surface-hover flex h-full flex-col p-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tone}`}>
                                            <Icon size={22} />
                                        </span>
                                        <ArrowUpRight size={18} className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                                    </div>
                                    <h3 className="mt-5 font-display text-lg font-bold text-text transition-colors duration-300 group-hover:text-brand-300">
                                        {course.name}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">
                                        {course.description || COURSE_COPY[course.slug] || 'Eligibility, fees and campus options curated by our counsellors.'}
                                    </p>
                                    <span className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-brand-300">
                                        View programme
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <Reveal delay={0.15} className="mt-10 flex justify-center">
                    <Link href="/universities" className="btn-ghost btn-md group">
                        Browse campuses offering these programmes
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}