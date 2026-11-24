"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';
import { SectionHeading, Reveal, Marquee } from './ui';

const CITIES = [
    { name: 'Chennai', slug: 'chennai', note: 'Medical & pharmacy hub' },
    { name: 'Bangalore', slug: 'bangalore', note: 'Engineering & management' },
    { name: 'Kolkata', slug: 'kolkata', note: 'Home base, east India' },
];

function PartnerTile({ partner }) {
    return (
        <Link
            href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`}
            className="group surface surface-hover flex w-[19rem] shrink-0 items-center gap-4 p-5"
        >
            <span className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7F8FC] p-2 ring-1 ring-white/15">
                <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    width={96}
                    height={48}
                    unoptimized
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </span>
            <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-display text-base font-bold text-text">
                    <MapPin size={14} className="shrink-0 text-amber-600 dark:text-gold" /> {partner.location}
                </span>
                <span className="mt-1 block truncate text-xs text-text-secondary">{partner.featured_text}</span>
                <span className="mt-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                    Explore <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
            </span>
        </Link>
    );
}

export default function CareerPartners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        let alive = true;
        api.get('/partners').then((res) => alive && setPartners(res.data)).catch(() => {});
        return () => { alive = false; };
    }, []);

    return (
        <section id="partners" className="relative overflow-hidden py-20 md:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-900/40" />
            <div className="container relative mx-auto px-5 sm:px-6">
                <SectionHeading
                    eyebrow="Where our students land"
                    title="Campus partners across"
                    highlight="India's education cities"
                />
            </div>

            <Reveal delay={0.1} className="mt-12">
                {partners.length > 0 ? (
                    <Marquee duration={80}>
                        {partners.map((p) => <PartnerTile key={p.id} partner={p} />)}
                    </Marquee>
                ) : (
                    <div className="container mx-auto px-6">
                        <div className="surface p-8 text-center text-sm text-text-secondary">
                            Partner campus profiles are being refreshed for the 2026 intake.
                        </div>
                    </div>
                )}
            </Reveal>

            <div className="container relative mx-auto mt-12 px-5 sm:px-6">
                <div className="grid gap-4 sm:grid-cols-3">
                    {CITIES.map((city, i) => (
                        <Reveal key={city.slug} delay={i * 0.1}>
                            <Link
                                href={`/universities?city=${city.slug}`}
                                className="group flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] px-5 py-4 shadow-xs dark:shadow-none transition-all duration-300 hover:border-gold/60 hover:bg-gold/5 dark:hover:border-gold/40 dark:hover:bg-gold/[0.06] hover:shadow-md"
                            >
                                <span>
                                    <span className="block font-display text-base font-bold text-text">{city.name}</span>
                                    <span className="block text-xs text-text-secondary">{city.note}</span>
                                </span>
                                <ArrowUpRight size={17} className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}