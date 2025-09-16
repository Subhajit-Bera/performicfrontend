"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Flag, UserCircle } from 'lucide-react';

const StatCard = ({ icon, title, children }) => (
    <motion.div 
        className="bg-primary p-8 rounded-xl border border-secondary text-center"
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 168, 150, 0.1)" }}
    >
        <div className="flex justify-center mb-4 text-accent">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-text-secondary">{children}</p>
    </motion.div>
);

export default function AboutUsPage() {
    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-16">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl font-extrabold mb-4">About Performic Consultancy</h1>
                        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                            Simplifying education and career planning through a reliable, user-friendly platform designed for your success.
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <StatCard icon={<Target size={40} />} title="Our Vision">
                            To become India's most trusted educational and career guidance platform, empowering students to achieve their full potential.
                        </StatCard>
                        <StatCard icon={<Flag size={40} />} title="Our Mission">
                            To make the path to higher education clear and accessible by providing comprehensive resources and personalized support.
                        </StatCard>
                         <StatCard icon={<UserCircle size={40} />} title="Our Founder">
                            Founded by Mahaveer Jain, Performic was born from a passion to guide students through complex career decisions with clarity and confidence.
                        </StatCard>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12 bg-primary p-8 md:p-12 rounded-xl border border-secondary">
                        <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-4">Our Approach</h2>
                            <p className="text-text-secondary leading-relaxed">
                                At Performic, we believe that every student deserves a clear path to their dream career. Our approach is built on three pillars: comprehensive data, personalized guidance, and unwavering support. We meticulously gather information on universities, exams, and courses to ensure you have the most accurate and up-to-date resources at your fingertips. Our expert counselors then work with you to understand your unique aspirations and challenges, helping you craft a personalized roadmap to success. From application to admission, we're with you every step of the way.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                                alt="Team working collaboratively"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}