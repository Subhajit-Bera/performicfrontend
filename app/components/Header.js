// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
// import { User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ProfileProgressCircle = ({ percentage }) => {
//     const radius = 18;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (percentage / 100) * circumference;

//     return (
//         <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
//             <circle
//                 className="text-slate-700"
//                 strokeWidth="4"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={radius}
//                 cx="20"
//                 cy="20"
//             />
//             <motion.circle
//                 className="text-cyan-400"
//                 strokeWidth="4"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={radius}
//                 cx="20"
//                 cy="20"
//                 initial={{ strokeDashoffset: circumference }}
//                 animate={{ strokeDashoffset: offset }}
//                 transition={{ duration: 1, ease: "easeInOut" }}
//             />
//         </svg>
//     );
// };


// export default function Header() {
//     const { isAuthenticated, user, logout, profileCompletion } = useAuth();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const NavLinks = ({ inMobileMenu = false }) => (
//         <>
//             <Link href="/" className="hover:text-cyan-400 transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Home</Link>
//             <Link href="/universities" className="hover:text-cyan-400 transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Universities</Link>
//             <Link href="/book-appointment" className="hover:text-cyan-400 transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Book Appointment</Link>
//             {isAuthenticated && user?.role === 'admin' && (
//                 <Link href="/admin" className="flex items-center gap-2 hover:text-cyan-400 transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>
//                     <LayoutDashboard size={18} /> Admin
//                 </Link>
//             )}
//         </>
//     );

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md shadow-cyan-500/10">
//             <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                 <Link href="/" className="text-2xl font-bold">
//                     Edu<span className="text-cyan-400">Elevate</span>
//                 </Link>

//                 <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
//                     <NavLinks />
//                 </nav>

//                 <div className="flex items-center gap-4">
//                     {isAuthenticated ? (
//                         <div className="flex items-center gap-4">
//                             <Link href="/profile" className="relative flex items-center justify-center">
//                                 <ProfileProgressCircle percentage={profileCompletion} />
//                                 <User className="absolute text-slate-300" size={18} />
//                             </Link>
//                             <button onClick={logout} className="hidden md:flex items-center gap-2 text-slate-300 hover:text-red-400 transition-colors">
//                                 <LogOut size={18} />
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="hidden md:flex items-center gap-2">
//                             <Link href="/login" className="px-4 py-2 text-sm rounded-md hover:bg-slate-700 transition-colors">Login</Link>
//                             <Link href="/register" className="px-4 py-2 text-sm bg-cyan-600 rounded-md hover:bg-cyan-500 transition-colors">Sign Up</Link>
//                         </div>
//                     )}
//                     <div className="md:hidden">
//                         <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                             {isMenuOpen ? <X /> : <Menu />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {isMenuOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="md:hidden bg-slate-800"
//                     >
//                         <nav className="flex flex-col items-center space-y-4 py-4 text-slate-300">
//                             <NavLinks inMobileMenu={true} />
//                             {isAuthenticated ? (
//                                 <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition-colors">
//                                     <LogOut size={18} /> Logout
//                                 </button>
//                             ) : (
//                                 <>
//                                     <Link href="/login" className="w-full text-center py-2 hover:bg-slate-700" onClick={() => setIsMenuOpen(false)}>Login</Link>
//                                     <Link href="/register" className="w-full text-center py-2 bg-cyan-600 hover:bg-cyan-500" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
//                                 </>
//                             )}
//                         </nav>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </header>
//     );
// }


"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileProgressCircle = ({ percentage }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
            <circle className="text-secondary" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20"/>
            <motion.circle className="text-accent" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeInOut" }}/>
        </svg>
    );
};

export default function Header() {
    const { isAuthenticated, user, logout, profileCompletion } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavLinks = ({ inMobileMenu = false }) => (
        <>
            <Link href="/" className="hover:text-accent transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Home</Link>
            <Link href="/universities" className="hover:text-accent transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Universities</Link>
            <Link href="/#exams" className="hover:text-accent transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Exams</Link>
            <Link href="/book-appointment" className="hover:text-accent transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>Book Appointment</Link>
            {isAuthenticated && user?.role === 'admin' && (
                <Link href="/admin" className="flex items-center gap-2 hover:text-accent transition-colors" onClick={() => inMobileMenu && setIsMenuOpen(false)}>
                    <LayoutDashboard size={18} /> Admin
                </Link>
            )}
        </>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-secondary/50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">Edu<span className="text-accent">Elevate</span></Link>
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text"><NavLinks /></nav>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="relative flex items-center justify-center">
                                <ProfileProgressCircle percentage={profileCompletion} />
                                <User className="absolute text-text" size={18} />
                            </Link>
                            <button onClick={logout} className="hidden md:flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors"><LogOut size={18} /></button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/login" className="px-4 py-2 text-sm rounded-md hover:bg-primary transition-colors">Login</Link>
                            <Link href="/register" className="px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent-hover transition-colors">Sign Up</Link>
                        </div>
                    )}
                    <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button></div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-primary">
                        <nav className="flex flex-col items-center space-y-4 py-4 text-text"><NavLinks inMobileMenu={true} /></nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}