"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UniversityCard from '../../components/UniversityCard';
import api from '../../utils/api';

export default function CourseDetailPage() {
    const [course, setCourse] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            api.get(`/courses/${slug}`)
                .then(res => {
                    setCourse(res.data.course);
                    setUniversities(res.data.universities);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="pt-24 bg-background min-h-screen">
                    <div className="container mx-auto px-6 py-12">
                        <div className="bg-primary p-8 rounded-xl border border-secondary mb-12 space-y-4 animate-pulse">
                            <div className="h-10 w-2/3 max-w-md rounded bg-secondary/70" />
                            <div className="h-4 w-full max-w-2xl rounded bg-secondary/50" />
                            <div className="h-4 w-4/5 max-w-xl rounded bg-secondary/40" />
                        </div>
                        <div className="h-8 w-60 rounded bg-secondary/60 animate-pulse mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="surface h-72 rounded-xl bg-secondary/30 border border-secondary/40 p-5 space-y-4 animate-pulse">
                                    <div className="h-32 rounded-lg bg-secondary/50" />
                                    <div className="h-5 w-3/4 rounded bg-secondary/60" />
                                    <div className="h-3 w-1/2 rounded bg-secondary/40" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
    if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-12">
                    <div className="bg-primary p-8 rounded-xl border border-secondary mb-12">
                        <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
                        <p className="text-text-secondary">{course.description}</p>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-8">Colleges Offering {course.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {universities.map(uni => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
