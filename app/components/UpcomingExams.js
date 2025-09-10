// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import { ChevronRight } from 'lucide-react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function UpcomingExams() {
//     const [exams, setExams] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchExams = async () => {
//             try {
//                 const { data } = await api.get('/exams');
//                 setExams(data.slice(0, 8));
//             } catch (error) {
//                 console.error("Failed to fetch exams", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchExams();
//     }, []);

//     const cardVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: i => ({
//             opacity: 1, y: 0,
//             transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
//         })
//     };

//     return (
//         <section id="exams" className="py-20 bg-background">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-12 text-text">Trending Exams</h2>
//                 {loading ? (
//                     <div className="text-center text-text-secondary">Loading exams...</div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {exams.map((exam, i) => (
//                             <motion.div key={exam.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}>
//                                 <Link href={`/exams/${exam.slug}`} className="block bg-primary p-6 rounded-lg border border-secondary hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-lg">
//                                     <h3 className="font-bold text-text text-lg">{exam.name}</h3>
//                                     <p className="text-sm text-text-secondary mt-1">{exam.exam_level}</p>
//                                     <div className="flex justify-between items-center mt-4 text-xs">
//                                         <span className="text-accent font-semibold">{exam.exam_date}</span>
//                                         <span className="flex items-center text-text-secondary hover:text-accent">
//                                             Know More <ChevronRight size={16} />
//                                         </span>
//                                     </div>
//                                 </Link>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }






"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Beaker, Briefcase, HeartPulse, Microscope, ChevronRight } from 'lucide-react';

// New Reusable Exam Card Component
const ExamCard = ({ exam, index }) => {
    // A simple function to pick an icon based on the exam name
    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('jee') || lowerName.includes('tech')) return <Beaker size={24} className="text-accent" />;
        if (lowerName.includes('cat') || lowerName.includes('mat')) return <Briefcase size={24} className="text-accent" />;
        if (lowerName.includes('neet') || lowerName.includes('mbbs')) return <HeartPulse size={24} className="text-accent" />;
        return <Microscope size={24} className="text-accent" />;
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
        })
    };

    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
        >
            <Link href={`/exams/${exam.slug}`} className="block bg-primary p-6 rounded-2xl border border-secondary hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-lg h-full">
                {console.log(exam)}
                <div className="flex items-start gap-4">
                    <div className="bg-secondary/50 p-3 rounded-full">
                        {getIcon(exam.name)}
                    </div>
                    <div className="flex-1">
                         <h3 className="font-bold text-text text-lg mb-1">{exam.name}</h3>
                         <p className="text-sm text-text-secondary mb-4 line-clamp-2">{exam.info?.exam_full_name || `Exam for ${exam.exam_level}`}</p>
                         <div className="text-accent font-semibold text-sm flex items-center gap-1">
                            Explore More <ChevronRight size={16} />
                         </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


export default function UpcomingExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const { data } = await api.get('/exams');
                setExams(data.slice(0, 8));
            } catch (error) {
                console.error("Failed to fetch exams", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, []);

    return (
        <section id="exams" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-text">Trending Exams</h2>
                {loading ? (
                    <div className="text-center text-text-secondary">Loading exams...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map((exam, i) => (
                           <ExamCard key={exam.id} exam={exam} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}