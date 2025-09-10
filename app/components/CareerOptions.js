// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import Link from 'next/link';
// import * as LucideIcons from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function CareerOptions() {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         api.get('/courses').then(res => setCourses(res.data)).catch(err => console.error(err));
//     }, []);

//     const cardVariants = {
//         hidden: { opacity: 0, scale: 0.9 },
//         visible: i => ({
//             opacity: 1,
//             scale: 1,
//             transition: { delay: i * 0.05, duration: 0.3 }
//         })
//     };

//     return (
//         <section className="py-20 bg-primary/30">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-12">Choose The Best Career Options for Study</h2>
//                 <div className="flex flex-wrap justify-center gap-3">
//                     {courses.map((course, i) => {
//                         const Icon = LucideIcons[course.icon_name] || LucideIcons['GraduationCap'];
//                         return (
//                             <motion.div
//                                 key={course.id}
//                                 custom={i}
//                                 initial="hidden"
//                                 whileInView="visible"
//                                 viewport={{ once: true, amount: 0.5 }}
//                                 variants={cardVariants}
//                             >
//                                 <Link href={`/courses/${course.slug}`} className="block bg-primary border-2 border-secondary text-text-secondary hover:border-accent hover:text-accent font-semibold px-4 py-2 rounded-lg transition-all duration-300">
//                                     {course.name}
//                                 </Link>
//                             </motion.div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }





"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CareerOptions() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get('/courses').then(res => setCourses(res.data)).catch(err => console.error(err));
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: i => ({
            opacity: 1,
            scale: 1,
            transition: { delay: i * 0.05, duration: 0.3 }
        })
    };

    return (
        <section className="py-20 bg-primary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Choose The Best Career Options for Study</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <Link href={`/courses/${course.slug}`} className="block bg-primary border-2 border-secondary text-text-secondary hover:border-accent hover:text-accent font-semibold px-4 py-2 rounded-lg transition-all duration-300">
                                {course.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}



