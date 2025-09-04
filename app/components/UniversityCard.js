// "use client";
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Star, MapPin } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// export default function UniversityCard({ university }) {
//     const { isAuthenticated, user, profileCompletion } = useAuth();
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
//             router.push('/profile?action=complete&redirect=/universities/' + university.id);
//             return;
//         }
        
//         // Add actual apply logic here
//         toast.promise(
//             new Promise(resolve => setTimeout(() => resolve({ name: 'EduElevate' }), 2000)),
//              {
//                loading: `Submitting application to ${university.name}...`,
//                success: (data) => {
//                  return `Your application has been submitted successfully!`;
//                },
//                error: 'Error submitting application.',
//              }
//            );
//     };

//     return (
//         <motion.div
//             whileHover={{ y: -8, scale: 1.02 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//             className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20"
//         >
//             <Link href={`/universities/${university.id}`} className="block">
//                 <div className="relative h-48">
//                     <Image
//                         src={university.image_url}
//                         alt={university.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="transition-transform duration-300 group-hover:scale-105"
//                     />
//                 </div>
//                 <div className="p-5">
//                     <h3 className="text-lg font-bold text-white truncate">{university.name}</h3>
//                     <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
//                         <MapPin size={14} /> {university.location}
//                     </p>
//                     <div className="flex items-center gap-1 text-sm">
//                         <Star size={16} className="text-yellow-400 fill-current" />
//                         <span className="text-white font-bold">{university.rating}</span>
//                         <span className="text-slate-400">({university.stream})</span>
//                     </div>
//                     <div className="mt-4 flex gap-2">
//                         <button className="flex-1 bg-slate-700 text-white text-sm py-2 px-4 rounded-md hover:bg-slate-600 transition-colors">Details</button>
//                         <button onClick={handleApply} className="flex-1 bg-cyan-600 text-white text-sm py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors">Apply Now</button>
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
                    <Image src={university.image_url} alt={university.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-bold text-text truncate">{university.name}</h3>
                    <p className="text-sm text-text-secondary flex items-center gap-1 mb-3"><MapPin size={14} /> {university.location}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-text font-bold">{university.rating}</span>
                        <span className="text-text-secondary">({university.stream})</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <div className="w-full text-center bg-secondary text-text text-sm py-2 px-4 rounded-md group-hover:bg-primary transition-colors">Details</div>
                        <button onClick={handleApply} className="w-full bg-accent text-white text-sm py-2 px-4 rounded-md hover:bg-accent-hover transition-colors">Apply Now</button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}