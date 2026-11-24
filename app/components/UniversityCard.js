"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, ArrowUpRight, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import api from '../utils/api';

const MONOGRAM_TONES = [
    'from-brand-600 via-violet to-rose',
    'from-cyan-deep via-brand-500 to-violet',
    'from-gold-deep via-rose to-violet',
    'from-emerald-deep via-cyan-deep to-brand-600',
];

export default function UniversityCard({ university }) {
    const { isAuthenticated, profileCompletion } = useAuth();
    const router = useRouter();
    const [imageFailed, setImageFailed] = useState(false);

    const handleApply = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            toast.error('Please log in to apply.');
            router.push('/login');
            return;
        }
        if (profileCompletion < 100) {
            toast.info('Please complete your profile before applying.');
            router.push(`/profile?action=complete&redirect=/universities/${university.slug}`);
            return;
        }
        const applyPromise = api.post('/users/apply', { universityId: university.id });
        toast.promise(applyPromise, {
            loading: `Submitting application to ${university.name}…`,
            success: 'Application submitted successfully!',
            error: (err) => err.response?.data?.message || 'Error submitting application.',
        });
    };

    const tone = MONOGRAM_TONES[university.id % MONOGRAM_TONES.length];
    const initials = university.name
        .split(/\s+/)
        .filter((w) => /^[A-Za-z]/.test(w))
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');
    const location = (university.location || '').replace(/^\s+/, '').replace(/,/g, ', ');
    const showImage = university.image_url && !imageFailed;

    return (
        <motion.article
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="group surface surface-hover flex h-full flex-col overflow-hidden"
        >
            <Link href={`/universities/${university.slug}`} className="flex h-full flex-col">
                <div className="relative h-44 overflow-hidden">
                    {showImage ? (
                        <Image
                            src={university.image_url}
                            alt={university.name}
                            fill
                            sizes="(max-width: 768px) 90vw, 360px"
                            style={{ objectFit: 'cover' }}
                            onError={() => setImageFailed(true)}
                            className="transition-transform duration-700 ease-premium group-hover:scale-110"
                        />
                    ) : (
                        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tone}`}>
                            <span className="font-display text-5xl font-extrabold text-white/90 drop-shadow-lg">{initials || 'PU'}</span>
                            <div className="absolute inset-0 grid-lines opacity-40" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {university.admission_open && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-rose/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-plate backdrop-blur">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            Admission {university.admission_year} open
                        </span>
                    )}
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                        <Star size={12} className="fill-current" /> {university.rating}
                    </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold leading-snug text-text transition-colors duration-300 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                        {university.name}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary">
                        <MapPin size={13} className="shrink-0 text-[#0891B2] dark:text-cyan" />
                        <span className="truncate">{location || 'Location on request'}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {(university.streams || []).slice(0, 3).map((stream) => (
                            <span key={stream} className="rounded-md border border-slate-200 dark:border-white/[0.08] bg-slate-100/90 dark:bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700 dark:text-text-secondary">
                                {stream}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-5">
                        <span className="btn-ghost btn-sm flex-1 !py-2 !px-2.5 text-xs whitespace-nowrap justify-center">
                            Details <ArrowUpRight size={13} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <button
                            onClick={handleApply}
                            className="btn-primary btn-sm flex-1 !py-2 !px-2.5 text-xs whitespace-nowrap justify-center"
                        >
                            <BadgeCheck size={14} className="shrink-0" />
                            <span>Apply now</span>
                        </button>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}