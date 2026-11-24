import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const COLUMNS = [
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About us' },
            { href: '/universities', label: 'Universities' },
            { href: '/top-universities', label: 'Top universities' },
            { href: '/contact', label: 'Contact us' },
        ],
    },
    {
        title: 'Students',
        links: [
            { href: '/book-appointment', label: 'Book counselling' },
            { href: '/#exams', label: 'Entrance exams' },
            { href: '/#careers', label: 'Career options' },
            { href: '/profile', label: 'My profile' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { href: '/privacy-policy', label: 'Privacy policy' },
            { href: '/terms', label: 'Terms & refund policy' },
            { href: '/#faq', label: 'FAQ' },
        ],
    },
];

const SOCIALS = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'X / Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-900">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-14rem] h-[24rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[130px]" />

            <div className="container relative mx-auto px-5 py-16 sm:px-6">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Link href="/" aria-label="PerFormic home" className="inline-block rounded-xl bg-[#F7F8FC] px-3 py-2 shadow-plate ring-1 ring-white/15">
                            <Image src="/Logo.png" alt="PerFormic Consultancy Services" width={150} height={48} style={{ height: 40, width: 'auto' }} />
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
                            An admissions consultancy that behaves like your own admissions office — evidence-led
                            shortlists, transparent fees and one counsellor from first call to enrolment.
                        </p>
                        <div className="mt-6 flex gap-2.5">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-300"
                                >
                                    <s.icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {COLUMNS.map((col) => (
                        <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
                            <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-text">{col.title}</h4>
                            <ul className="mt-5 space-y-3">
                                {col.links.map((l) => (
                                    <li key={l.href + l.label}>
                                        <Link href={l.href} className="link-quiet text-sm">{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    <div className="lg:col-span-2">
                        <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-text">Reach us</h4>
                        <ul className="mt-5 space-y-4 text-sm">
                            <li>
                                <a href="tel:+918207283226" className="group flex items-start gap-2.5 text-text-secondary transition-colors hover:text-text">
                                    <Phone size={15} className="mt-0.5 shrink-0 text-gold" /> +91 82072 83226
                                </a>
                            </li>
                            <li>
                                <a href="mailto:performic45@gmail.com" className="group flex items-start gap-2.5 break-all text-text-secondary transition-colors hover:text-text">
                                    <Mail size={15} className="mt-0.5 shrink-0 text-cyan" /> performic45@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5 text-text-secondary">
                                <MapPin size={15} className="mt-0.5 shrink-0 text-rose-soft" />
                                2/1, Russel St, Park Street area, Kolkata, West Bengal 700071
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 md:flex-row">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} PerFormic Consultancy Services. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <p className="text-xs text-muted">Kolkata · Chennai · Bangalore</p>
                        <a
                            href="#main-content"
                            aria-label="Back to top"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-gold"
                        >
                            <ArrowUp size={15} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}