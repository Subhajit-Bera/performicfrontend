"use client";
import React from 'react';

export function Skeleton({ className = '', style, ...props }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-secondary/60 ${className}`}
            style={style}
            {...props}
        />
    );
}

export function TableSkeleton({ rows = 5, cols = 4, colWidths = [] }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rIdx) => (
                <tr key={rIdx} className="border-b border-secondary/40">
                    {Array.from({ length: cols }).map((_, cIdx) => {
                        const width = colWidths[cIdx] || `${50 + ((rIdx * 19 + cIdx * 29) % 40)}%`;
                        return (
                            <td key={cIdx} className="p-4">
                                <div
                                    className="h-4 rounded bg-secondary/60 animate-pulse"
                                    style={{ width }}
                                />
                            </td>
                        );
                    })}
                </tr>
            ))}
        </>
    );
}

export function StatCardsSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="bg-primary p-5 sm:p-6 rounded-xl flex items-center gap-4 sm:gap-6 border border-secondary shadow-sm">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/60 animate-pulse flex-shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                        <div className="h-3.5 w-1/2 rounded bg-secondary/60 animate-pulse" />
                        <div className="h-7 w-2/5 rounded bg-secondary/70 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FormSkeleton({ fields = 4 }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: fields }).map((_, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="h-4 w-28 rounded bg-secondary/60 animate-pulse" />
                        <div className="h-11 w-full rounded-lg bg-secondary/40 animate-pulse" />
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-secondary/60 animate-pulse" />
                <div className="h-28 w-full rounded-lg bg-secondary/40 animate-pulse" />
            </div>
            <div className="h-11 w-36 rounded-lg bg-secondary/60 animate-pulse" />
        </div>
    );
}

export function StreamListSkeleton({ count = 4 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-secondary/40 p-3.5 sm:p-4 rounded-lg gap-3">
                    <div className="h-5 w-40 rounded bg-secondary/60 animate-pulse" />
                    <div className="flex items-center gap-4">
                        <div className="h-4 w-24 rounded bg-secondary/50 animate-pulse" />
                        <div className="h-7 w-16 rounded bg-secondary/50 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function DetailPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
            <div className="h-56 sm:h-72 w-full rounded-xl bg-secondary/40" />
            <div className="space-y-3">
                <div className="h-8 sm:h-10 w-2/3 max-w-lg rounded bg-secondary/60" />
                <div className="h-4 w-1/3 max-w-xs rounded bg-secondary/40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="h-40 rounded-xl bg-secondary/30 border border-secondary/40 p-4 space-y-3">
                    <div className="h-4 w-1/2 rounded bg-secondary/60" />
                    <div className="h-3 w-3/4 rounded bg-secondary/40" />
                </div>
                <div className="h-40 rounded-xl bg-secondary/30 border border-secondary/40 p-4 space-y-3">
                    <div className="h-4 w-1/2 rounded bg-secondary/60" />
                    <div className="h-3 w-3/4 rounded bg-secondary/40" />
                </div>
                <div className="h-40 rounded-xl bg-secondary/30 border border-secondary/40 p-4 space-y-3">
                    <div className="h-4 w-1/2 rounded bg-secondary/60" />
                    <div className="h-3 w-3/4 rounded bg-secondary/40" />
                </div>
            </div>
        </div>
    );
}

