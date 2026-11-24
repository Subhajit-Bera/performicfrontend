"use client";
import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        category: "General Queries",
        questions: [
            {
                q: "What services does Performic Consultancy offer?",
                a: "We provide comprehensive career guidance, university admission assistance, exam preparation resources, and personalized counseling to help students make informed decisions about their future."
            },
            {
                q: "How do I book an appointment with a counselor?",
                a: "You can book an appointment by navigating to the 'Book Appointment' page. You must be logged in and have a completed profile to schedule a session."
            },
            {
                q: "Are the services offered by Performic free?",
                a: "Browsing universities, exams, and career options is completely free. Our personalized counseling and application assistance services are part of our premium packages."
            }
        ]
    },
    {
        category: "Admissions",
        questions: [
            {
                q: "How can I apply to a university through your platform?",
                a: "Simply navigate to the university's detail page and click the 'Apply Now' button. Please ensure your profile is 100% complete before applying."
            },
            {
                q: "What happens after I submit an application?",
                a: "Once submitted, your application is forwarded to the university's admission department. Our admin team tracks the application and will update you on its status. You can see the status in your user dashboard (coming soon)."
            }
        ]
    },
    // Add more categories and questions as needed
];

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();
    return (
        <div className="border-b border-secondary">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex justify-between items-center text-left py-4 px-2"
            >
                <span className="font-semibold text-text">{question}</span>
                <ChevronDown size={20} aria-hidden="true" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 px-2 text-text-secondary text-sm">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function FaqSection() {
    const [activeCategory, setActiveCategory] = useState(faqData[0].category);

    return (
        <section id="faq" aria-label="Frequently asked questions" className="py-24 bg-primary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Category Sidebar */}
                    <div className="w-full md:w-1/4">
                        <nav className="flex flex-col space-y-2">
                            {faqData.map(cat => (
                                <button 
                                    key={cat.category}
                                    type="button"
                                    onClick={() => setActiveCategory(cat.category)}
                                    aria-current={activeCategory === cat.category}
                                    className={`w-full text-left p-3 rounded-lg font-semibold transition-colors ${
                                        activeCategory === cat.category ? 'bg-accent text-white' : 'bg-primary hover:bg-secondary'
                                    }`}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Questions List */}
                    <div className="w-full md:w-3/4">
                        {faqData.find(cat => cat.category === activeCategory)?.questions.map((faq, index) => (
                            <FaqItem key={index} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}