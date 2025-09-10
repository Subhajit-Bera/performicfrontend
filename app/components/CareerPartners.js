// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import api from '../utils/api';
// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';

// const PartnerCard = ({ partner }) => {
//     return (
//         <Link href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`} className="relative flex-shrink-0 w-64 h-80 rounded-2xl bg-primary border-2 border-secondary overflow-hidden group shadow-lg">
//             <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${partner.logo_url.replace('?text=', '?w=300&h=400&text=')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-5 text-white">
//                 <h3 className="text-xl font-bold">{partner.location}</h3>
//                 <p className="text-sm opacity-80 mt-1">{partner.featured_text}</p>
//             </div>
//         </Link>
//     );
// };


// export default function CareerPartners() {
//     const [partners, setPartners] = useState([]);
//     const targetRef = useRef(null);
//     const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

//     // Parallax effect for the section title
//     const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

//     useEffect(() => {
//         api.get('/partners').then(res => setPartners(res.data)).catch(err => console.error(err));
//     }, []);

//     return (
//         <section ref={targetRef} className="py-24 bg-background overflow-hidden">
//             <div className="container mx-auto px-6">
//                 <motion.h2 style={{ y }} className="text-4xl font-bold text-center mb-12">Choose the Best Career Partner</motion.h2>
//                 <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
//                     {partners.map((partner, i) => (
//                         <motion.div
//                             key={partner.id}
//                             initial={{ opacity: 0, x: 50 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true, amount: 0.5 }}
//                             transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out
//                         >
//                             <PartnerCard partner={partner} />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// // Add to globals.css for better scrollbar hiding
// // .scrollbar-hide::-webkit-scrollbar { display: none; }
// // .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }



// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import api from '../utils/api';
// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';

// const PartnerCard = ({ partner }) => {
//     return (
//         <Link href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`} className="relative flex-shrink-0 w-64 h-80 rounded-2xl bg-primary border-2 border-secondary overflow-hidden group shadow-lg">
//             <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
//                 <Image src={partner.logo_url} alt={partner.name} fill style={{objectFit: 'contain'}} className="p-8" />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-5 text-white">
//                 <h3 className="text-xl font-bold">{partner.location}</h3>
//                 <p className="text-sm opacity-80 mt-1">{partner.featured_text}</p>
//             </div>
//         </Link>
//     );
// };


// export default function CareerPartners() {
//     const [partners, setPartners] = useState([]);
//     const targetRef = useRef(null);
//     const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

//     // Parallax effect for the section title
//     const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

//     useEffect(() => {
//         api.get('/partners').then(res => setPartners(res.data)).catch(err => console.error(err));
//     }, []);

//     return (
//         <section ref={targetRef} className="py-24 bg-background overflow-hidden">
//             <div className="container mx-auto">
//                 <motion.h2 style={{ y }} className="text-4xl font-bold text-center mb-12 px-6">Choose the Best Career Partner</motion.h2>
//                 <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
//                     {partners.map((partner, i) => (
//                         <motion.div
//                             key={partner.id}
//                             initial={{ opacity: 0, x: 50 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true, amount: 0.5 }}
//                             transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                         >
//                             <PartnerCard partner={partner} />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }


// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import api from '../utils/api';
// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';

// const PartnerCard = ({ partner }) => {
//     return (
//         <Link href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`} className="relative flex-shrink-0 w-64 h-80 rounded-2xl bg-primary border-2 border-secondary overflow-hidden group shadow-lg">
//             <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
//                 <Image
//                     src={partner.logo_url}
//                     alt={partner.name}
//                     fill
//                     style={{ objectFit: 'contain' }}
//                     className="p-8"
//                     // THE FIX: This prop solves both SVG and timeout errors
//                     unoptimized={true}
//                 />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-5 text-white">
//                 <h3 className="text-xl font-bold">{partner.location}</h3>
//                 <p className="text-sm opacity-80 mt-1">{partner.featured_text}</p>
//             </div>
//         </Link>
//     );
// };


// export default function CareerPartners() {
//     const [partners, setPartners] = useState([]);
//     const targetRef = useRef(null);
//     const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

//     const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

//     useEffect(() => {
//         api.get('/partners').then(res => setPartners(res.data)).catch(err => console.error(err));
//     }, []);

//     return (
//         <section ref={targetRef} className="py-24 bg-background overflow-hidden">
//             <div className="container mx-auto">
//                 <motion.h2 style={{ y }} className="text-4xl font-bold text-center mb-12 px-6">Choose the Best Career Partner</motion.h2>
//                 {/* THE FIX: Using a Tailwind utility class for the scrollbar */}
//                 <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
//                     {partners.map((partner, i) => (
//                         <motion.div
//                             key={partner.id}
//                             initial={{ opacity: 0, x: 50 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true, amount: 0.5 }}
//                             transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                         >
//                             <PartnerCard partner={partner} />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }








// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import api from '../utils/api';
// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';

// const PartnerCard = ({ partner }) => {
//     return (
//         // The Link tag is now the direct parent for the Image component.
//         // It has `relative` positioning and a fixed height (`h-80`), which is what the Image needs.
//         <Link 
//             href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`} 
//             className="relative flex-shrink-0 w-64 h-80 rounded-2xl bg-primary border-2 border-secondary overflow-hidden group shadow-lg block"
//         >
//             <Image 
//                 src={partner.logo_url} 
//                 alt={partner.name} 
//                 fill 
//                 style={{objectFit: 'contain'}} 
//                 className="p-8 transition-transform duration-500 group-hover:scale-110"
//                 unoptimized={true} 
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//             <div className="absolute bottom-0 left-0 p-5 text-white">
//                 <h3 className="text-xl font-bold">{partner.location}</h3>
//                 <p className="text-sm opacity-80 mt-1">{partner.featured_text}</p>
//             </div>
//         </Link>
//     );
// };


// export default function CareerPartners() {
//     const [partners, setPartners] = useState([]);
//     const targetRef = useRef(null);
//     const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

//     const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

//     useEffect(() => {
//         api.get('/partners').then(res => setPartners(res.data)).catch(err => console.error(err));
//     }, []);

//     return (
//         <section ref={targetRef} className="py-24 bg-background overflow-hidden">
//             <div className="container mx-auto">
//                 <motion.h2 style={{ y }} className="text-4xl font-bold text-center mb-12 px-6">Choose the Best Career Partner</motion.h2>
//                 <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto" style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}>
//                     {partners.map((partner, i) => (
//                         <motion.div
//                             key={partner.id}
//                             initial={{ opacity: 0, x: 50 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true, amount: 0.5 }}
//                             transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                         >
//                             <PartnerCard partner={partner} />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }





"use client";
import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const PartnerCard = ({ partner }) => {
    return (
        <Link href={`/colleges/${partner.link_city_slug}/${partner.link_stream_slug}`} className="relative flex-shrink-0 w-64 h-80 rounded-2xl bg-primary border-2 border-secondary overflow-hidden group shadow-lg block">
            <Image 
                src={partner.logo_url} 
                alt={partner.name} 
                fill 
                style={{objectFit: 'contain'}} 
                className="p-8 transition-transform duration-500 group-hover:scale-110"
                unoptimized={true} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white">
                <h3 className="text-xl font-bold">{partner.location}</h3>
                <p className="text-sm opacity-80 mt-1">{partner.featured_text}</p>
            </div>
        </Link>
    );
};


export default function CareerPartners() {
    const [partners, setPartners] = useState([]);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    useEffect(() => {
        api.get('/partners').then(res => setPartners(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <section ref={targetRef} className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto">
                <motion.h2 style={{ y }} className="text-4xl font-bold text-center mb-12 px-6">Choose the Best Career Partner</motion.h2>
                <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <PartnerCard partner={partner} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}