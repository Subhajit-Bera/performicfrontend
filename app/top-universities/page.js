"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UniversityCard from '../components/UniversityCard';
import api from '../utils/api';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StreamShowcase = ({ streamData, index }) => (
    <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
    >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Top {streamData.stream_name} Colleges</h2>
            <Link href={`/universities?stream=${streamData.stream_slug}`} className="text-accent hover:underline flex items-center gap-1 text-sm font-semibold">
                Explore more <ChevronRight size={16} />
            </Link>
        </div>
        {/* Reusing the responsive carousel pattern from FeaturedUniversities */}
        <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {streamData.universities.map(uni => (
                <div key={uni.id} className="flex-shrink-0 w-5/6 sm:w-80 snap-start">
                    <UniversityCard university={uni} />
                </div>
            ))}
        </div>
    </motion.section>
);


export default function TopUniversitiesPage() {
    const [topUniversities, setTopUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/universities/top-by-stream')
            .then(res => {
                setTopUniversities(res.data);
            })
            .catch(err => console.error("Failed to fetch top universities", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center mb-16">Top Universities by Stream</h1>
                    {loading ? (
                        <div className="text-center text-text-secondary py-10">Loading top universities...</div>
                    ) : (
                        <div className="space-y-12">
                            {topUniversities.map((streamData, index) => (
                                <StreamShowcase key={streamData.stream_id} streamData={streamData} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}