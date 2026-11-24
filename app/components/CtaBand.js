"use client";
import React from 'react';
import Link from 'next/link';
import { CalendarCheck, ArrowRight, PhoneCall, Clock3 } from 'lucide-react';
import { Reveal } from './ui';

export default function CtaBand() {
    return (
        <section className="relative px-5 py-10 sm:px-6 md:py-16">
            <Reveal className="container mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 shadow-lift md:px-14 md:py-16">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan/30 blur-[90px] animate-aurora" />
                        <div className="absolute -bottom-28 right-[-6rem] h-80 w-80 rounded-full bg-gold/30 blur-[100px] animate-aurora-slow" />
                        <div className="absolute inset-0 grid-lines opacity-30" />
                        <div className="grain absolute inset-0" />
                    </div>

                    <div className="relative grid items-center gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                <Clock3 size={13} /> Replies within 4 working hours
                            </span>
                            <h2 className="mt-5 text-display-lg font-extrabold text-white">
                                The 2026 intake is open.{' '}
                                <span className="font-editorial italic font-normal text-gold-soft">Your seat is not reserved yet.</span>
                            </h2>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                                Book a free discovery call and leave with a written shortlist — three to five campuses,
                                full fee sheets, and the exact deadlines you need to hit.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 lg:col-span-4">
                            <Link href="/book-appointment" className="btn-gold btn-lg w-full">
                                <CalendarCheck size={18} /> Book free counselling
                            </Link>
                            <Link href="/universities" className="btn btn-lg w-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:bg-white/20">
                                Browse universities <ArrowRight size={17} />
                            </Link>
                            <a href="tel:+918207283226" className="flex items-center justify-center gap-2 py-1 text-sm font-semibold text-white/85 transition-colors hover:text-white">
                                <PhoneCall size={15} /> +91 82072 83226
                            </a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}