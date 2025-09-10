// "use client";
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Star, MapPin } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import api from '../utils/api';

// export default function UniversityCard({ university }) {
//     const { isAuthenticated, profileCompletion } = useAuth();
//     const router = useRouter();

//     const handleApply = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (!isAuthenticated) {
//             toast.error("Please log in to apply.");
//             router.push('/login');
//             return;
//         }
//         if (profileCompletion < 100) {
//             toast.info("Please complete your profile before applying.");
//             router.push(`/profile?action=complete&redirect=/universities/${university.slug}`);
//             return;
//         }
//         const applyPromise = api.post('/users/apply', { universityId: university.id });
//         toast.promise(applyPromise, {
//             loading: `Submitting application to ${university.name}...`,
//             success: 'Application submitted successfully!',
//             error: (err) => err.response?.data?.message || 'Error submitting application.',
//         });
//     };

//     return (
//         <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-primary rounded-xl overflow-hidden shadow-lg border border-secondary hover:border-accent">
//             <Link href={`/universities/${university.slug}`} className="block group">
//                 <div className="relative h-48 overflow-hidden">
//                     <Image src={university.image_url} alt={university.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
//                 </div>
//                 <div className="p-5">
//                     <h3 className="text-lg font-bold text-text truncate">{university.name}</h3>
//                     <p className="text-sm text-text-secondary flex items-center gap-1 mb-3"><MapPin size={14} /> {university.location}</p>
//                     <div className="flex items-center gap-1 text-sm">
//                         <Star size={16} className="text-yellow-400 fill-current" />
//                         <span className="text-text font-bold">{university.rating}</span>
//                         <span className="text-text-secondary">({university.stream})</span>
//                     </div>
//                     <div className="mt-4 flex gap-2">
//                         <div className="w-full text-center bg-secondary text-text text-sm py-2 px-4 rounded-md group-hover:bg-primary transition-colors">Details</div>
//                         <button onClick={handleApply} className="w-full bg-accent text-white text-sm py-2 px-4 rounded-md hover:bg-accent-hover transition-colors">Apply Now</button>
//                     </div>
//                 </div>
//             </Link>
//         </motion.div>
//     );
// }



"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import api from '../utils/api';

export default function UniversityCard({ university }) {
    const { isAuthenticated, profileCompletion } = useAuth();
    const router = useRouter();

    const handleApply = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            toast.error("Please log in to apply.");
            router.push('/login');
            return;
        }
        if (profileCompletion < 100) {
            toast.info("Please complete your profile before applying.");
            router.push(`/profile?action=complete&redirect=/universities/${university.slug}`);
            return;
        }
        const applyPromise = api.post('/users/apply', { universityId: university.id });
        toast.promise(applyPromise, {
            loading: `Submitting application to ${university.name}...`,
            success: 'Application submitted successfully!',
            error: (err) => err.response?.data?.message || 'Error submitting application.',
        });
    };

    return (
        <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-primary rounded-xl overflow-hidden shadow-lg border border-secondary hover:border-accent">
            <Link href={`/universities/${university.slug}`} className="block group">
                <div className="relative h-48 overflow-hidden">
                    <Image src={university.image_url} alt={university.name} fill style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-105" />
                    {university.admission_open && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                            ADMISSION {university.admission_year} OPEN
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-bold text-text truncate">{university.name}</h3>
                    <p className="text-sm text-text-secondary flex items-center gap-1 mb-3"><MapPin size={14} /> {university.location}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-text font-bold">{university.rating}</span>
                        {/* Display first stream if available */}
                        {/* {university.streams && university.streams[0] && (
                            <span className="text-text-secondary">({university.streams[0]})</span>
                        )} */}
                        {/* {university.streams && university.streams.length > 0 && (
                            <span className="text-text-secondary">
                                ({university.streams.map((stream, index) => (
                                    index === university.streams.length - 1 ? stream : `${stream}, `
                                ))})
                            </span>
                        )} */}

                        {university.streams && university.streams.length > 0 && (
                            <span className="text-text-secondary">
                                ({university.streams.slice(0, 3).join(", ")})
                            </span>
                        )}
                    </div>
                    <div className="mt-4 flex gap-2">
                        {/* <div className="w-full text-center bg-secondary text-text text-sm py-2 px-4 rounded-md group-hover:bg-primary transition-colors">Details</div> */}
                        <div className="w-full flex items-center justify-center bg-secondary text-text text-sm py-2 px-4 rounded-md group-hover:bg-primary transition-colors">
                            Details
                        </div>
                        <button onClick={handleApply} className="w-full bg-accent text-white text-sm py-2 px-4 rounded-md hover:bg-accent-hover transition-colors">Apply Now</button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}