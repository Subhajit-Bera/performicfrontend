"use client";
import React, { useState, useId } from 'react';
import Link from 'next/link';
import { Plus, PhoneCall, MessagesSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui';

const faqData = [
    {
        category: 'General',
        questions: [
            {
                q: 'What services does PerFormic Consultancy offer?',
                a: 'Career guidance, university admission assistance, entrance-exam resources and personalised counselling — from the first discovery call through to enrolment day.',
            },
            {
                q: 'How do I book an appointment with a counsellor?',
                a: 'Open the Book Appointment page, pick a slot and confirm. You need to be signed in with a completed profile so your counsellor arrives prepared with your scores and preferences.',
            },
            {
                q: 'Are the services offered by PerFormic free?',
                a: 'Browsing universities, exams and career options is completely free, and so is the first discovery call. Ongoing counselling and application management are part of our premium packages.',
            },
        ],
    },
    {
        category: 'Admissions',
        questions: [
            {
                q: 'How can I apply to a university through your platform?',
                a: 'Open any university page and press Apply Now. Your profile must be 100% complete first — it is the document set the admissions office actually receives.',
            },
            {
                q: 'What happens after I submit an application?',
                a: 'The application is forwarded to the university admissions department and tracked by our team. Status changes — Applied, Called, Converted — appear against your application, and your counsellor walks you through each counselling round.',
            },
            {
                q: 'Can I apply to more than one university?',
                a: 'Yes. Most students apply to three to five campuses. We sequence the applications so acceptance deadlines never collide.',
            },
        ],
    },
    {
        category: 'Fees & refunds',
        questions: [
            {
                q: 'Do you charge universities a commission for placements?',
                a: 'No. Our fee comes from the families we serve, which is exactly why a campus cannot buy its way onto your shortlist.',
            },
            {
                q: 'What is covered in the fee you quote?',
                a: 'The full cost of attendance: tuition per year, hostel and mess, examination fees, and one-time admission charges — presented as a single sheet per campus.',
            },
            {
                q: 'What is the refund policy?',
                a: 'Refund terms are published in full on our Terms & Refund Policy page and are confirmed in writing before any payment is taken.',
            },
        ],
    },
];

function FaqItem({ question, answer, open, onToggle }) {
    const panelId = useId();
    return (
        <div className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${open ? 'border-brand-500/50 bg-brand-50/50 dark:bg-white/[0.04]' : 'border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/15 shadow-xs dark:shadow-none'}`}>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <span className={`font-display text-sm font-semibold transition-colors duration-300 md:text-base ${open ? 'text-text' : 'text-text-secondary'}`}>
                    {question}
                </span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-gold/50 bg-gold/15 text-gold' : 'border-slate-200 dark:border-white/10 text-text-secondary'}`}>
                    <Plus size={16} />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqSection() {
    const [activeCategory, setActiveCategory] = useState(faqData[0].category);
    const [openIndex, setOpenIndex] = useState(0);

    const active = faqData.find((c) => c.category === activeCategory);

    return (
        <section id="faq" aria-label="Frequently asked questions" className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute left-[-12%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-brand-600/10 blur-[130px]" />
            <div className="container relative mx-auto px-5 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Reveal className="lg:sticky lg:top-28">
                            <span className="eyebrow">Answers</span>
                            <h2 className="mt-4 text-display-md font-bold text-text">
                                Everything families ask{' '}
                                <span className="font-editorial italic font-normal text-gradient">before signing.</span>
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                                If your question is not here, a counsellor will answer it on a call — no sales script.
                            </p>

                            <div className="surface mt-8 p-5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/15 text-emerald">
                                    <MessagesSquare size={19} />
                                </span>
                                <p className="mt-4 font-display text-sm font-bold text-text">Still unsure?</p>
                                <p className="mt-1 text-xs text-text-secondary">Talk to a senior counsellor, weekdays 10am – 7pm IST.</p>
                                <a href="tel:+918207283226" className="btn-ghost btn-sm mt-4 w-full">
                                    <PhoneCall size={14} className="text-gold" /> +91 82072 83226
                                </a>
                            </div>

                            <nav className="mt-6 flex flex-wrap gap-2 lg:flex-col" aria-label="FAQ categories">
                                {faqData.map((cat) => (
                                    <button
                                        key={cat.category}
                                        type="button"
                                        onClick={() => { setActiveCategory(cat.category); setOpenIndex(0); }}
                                        aria-current={activeCategory === cat.category}
                                        className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all duration-300 ${
                                            activeCategory === cat.category
                                                ? 'bg-brand-gradient text-white shadow-glow'
                                                : 'border border-white/[0.07] bg-white/[0.02] text-text-secondary hover:border-brand-400/40 hover:text-text'
                                        }`}
                                    >
                                        {cat.category}
                                    </button>
                                ))}
                            </nav>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-8">
                        <Reveal delay={0.1} className="flex flex-col gap-3">
                            {active?.questions.map((faq, index) => (
                                <FaqItem
                                    key={faq.q}
                                    question={faq.q}
                                    answer={faq.a}
                                    open={openIndex === index}
                                    onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            ))}
                        </Reveal>
                        <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
                            <p className="text-sm text-text-secondary">Prefer to read the fine print first?</p>
                            <Link href="/terms" className="text-sm font-semibold text-brand-300 transition-colors hover:text-gold">
                                Terms & refund policy →
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}