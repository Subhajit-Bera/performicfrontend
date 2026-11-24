"use client";
import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.25 }}
            transition={{ duration: 0.75, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export function SectionHeading({ eyebrow, title, highlight, description, align = 'center', className = '' }) {
    const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';
    return (
        <Reveal className={`flex flex-col ${alignment} gap-4 ${className}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="text-display-lg font-bold text-text max-w-3xl">
                {title}{' '}
                {highlight && <span className="font-editorial italic font-normal text-gradient">{highlight}</span>}
            </h2>
            {description && (
                <p className={`max-w-2xl text-base leading-relaxed text-text-secondary ${align === 'center' ? 'mx-auto' : ''}`}>
                    {description}
                </p>
            )}
        </Reveal>
    );
}

export function CountUp({ to, decimals = 0, duration = 1.8 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const value = useMotionValue(0);
    const text = useTransform(value, (v) =>
        v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    );

    React.useEffect(() => {
        if (!inView) return;
        const controls = animate(value, to, { duration, ease: EASE });
        return () => controls.stop();
    }, [inView, to, duration, value]);

    return <motion.span ref={ref}>{text}</motion.span>;
}

export function Marquee({ children, className = '', duration = 38 }) {
    return (
        <div className={`mask-fade-x overflow-hidden pause-on-hover ${className}`}>
            <div className="flex w-max animate-marquee gap-4" style={{ animationDuration: `${duration}s` }}>
                <div className="flex shrink-0 gap-4">{children}</div>
                <div className="flex shrink-0 gap-4" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
}

export function Ambient({ className = '' }) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <div className="absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand-600/25 blur-[130px] animate-aurora" />
            <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet/20 blur-[120px] animate-aurora-slow" />
            <div className="absolute -bottom-40 left-0 h-[26rem] w-[26rem] rounded-full bg-cyan/10 blur-[120px] animate-aurora" />
        </div>
    );
}