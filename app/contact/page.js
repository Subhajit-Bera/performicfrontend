"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', formData);
            toast.success("Your message has been sent successfully!");
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not send your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-5xl font-extrabold mb-4">Get In Touch</h1>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            We&apos;re here to help you on your educational journey. Reach out to us with any questions or to schedule a counseling session.
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div 
                            className="bg-primary p-8 rounded-xl border border-secondary"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent"></textarea>
                                <button type="submit" disabled={loading} className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center disabled:bg-accent/50">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>
                        
                        {/* Contact Details & Map */}
                        <motion.div 
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-primary p-8 rounded-xl border border-secondary">
                                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-3 text-text-secondary">
                                    <a href="tel:+918207283226" className="flex items-center gap-3 hover:text-accent"><Phone size={18} /> +91 8207283226</a>
                                    <a href="mailto:performic45@gmail.com" className="flex items-center gap-3 hover:text-accent"><Mail size={18} /> performic45@gmail.com</a>
                                    <p className="flex items-start gap-3"><MapPin size={18} className="mt-1" /> 2/1, Russel St, Park Street area, Kolkata, West Bengal 700071</p>
                                </div>
                            </div>
                             <div className="rounded-xl overflow-hidden border border-secondary">
                                <iframe 
                                    title="Map showing the Performic office at 2/1 Russel St, Park Street area, Kolkata"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.331490288806!2d88.3503382759367!3d22.566637833075677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770252516625%3A0x33b33b72c676ef5c!2s2%2F1%2C%20Russel%20St%2C%20Park%20Street%20area%2C%20Kolkata%2C%20West%20Bengal%20700071!5e0!3m2!1sen!2sin!4v1726487965902!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="300" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}