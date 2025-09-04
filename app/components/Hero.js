// "use client";
// import React from 'react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// export default function Hero() {
//     return (
//         <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
//             <div
//                 className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
//                 style={{ backgroundImage: "url('https://placehold.co/1920x1080/020617/ffffff?text=EduElevate+Campus')" }}
//             ></div>
//             <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="relative z-10 px-4"
//             >
//                 <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
//                     Chart Your Course to Success
//                 </h1>
//                 <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
//                     Discover top-tier universities, get expert guidance, and take the confident next step in your academic journey.
//                 </p>
//                 <div className="flex justify-center gap-4">
//                     <Link href="/universities" className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105">
//                         Explore Universities
//                     </Link>
//                     <Link href="/book-appointment" className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105">
//                         Book a Session
//                     </Link>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }



"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 px-4"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
                    Chart Your Course to Success
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                    Discover top-tier universities, get expert guidance, and take the confident next step in your academic journey.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/universities" className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105">
                        Explore Universities
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}