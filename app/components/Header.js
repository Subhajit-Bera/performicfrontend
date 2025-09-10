// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
// import { User, LogOut, Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from '../utils/api';

// // Mega Menu Component for Desktop
// const MegaMenu = ({ streams, onLinkClick }) => (
//     <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-sm bg-primary border border-secondary rounded-lg shadow-lg p-4"
//     >
//         <div className="grid grid-cols-2 gap-x-6 gap-y-2">
//             <Link href="/universities" onClick={onLinkClick} className="font-semibold text-text hover:text-accent p-2 rounded-md transition-colors text-sm">All Universities</Link>
//             {streams.map(stream => (
//                 <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={onLinkClick} className="text-text-secondary hover:text-accent p-2 rounded-md transition-colors text-sm">{stream.name}</Link>
//             ))}
//         </div>
//     </motion.div>
// );

// // Navigation Item with Hover Logic for Desktop
// const NavItemWithMenu = ({ label, children }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     return (
//         <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//             <div className="flex items-center gap-1 cursor-pointer">
//                 {label} <ChevronDown size={16} className={`transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
//             </div>
//             <AnimatePresence>{isHovered && children}</AnimatePresence>
//         </div>
//     );
// };

// export default function Header() {
//     const { isAuthenticated, user, logout, profileCompletion } = useAuth();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isMobileUniMenuOpen, setIsMobileUniMenuOpen] = useState(false);
//     const [streams, setStreams] = useState([]);

//     useEffect(() => {
//         api.get('/streams').then(res => setStreams(res.data)).catch(err => console.error("Failed to fetch streams"));
//     }, []);

//     const closeMobileMenu = () => setIsMenuOpen(false);

//     // const ProfileProgressCircle = ({ percentage }) => { /* ... unchanged ... */ };
//     const ProfileProgressCircle = ({ percentage }) => {
//         const radius = 18;
//         const circumference = 2 * Math.PI * radius;
//         const offset = circumference - (percentage / 100) * circumference;

//         return (
//             <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
//                 <circle className="text-secondary" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
//                 <motion.circle className="text-accent" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeInOut" }} />
//             </svg>
//         );
//     };

//     const NavLinks = ({ inMobileMenu = false }) => (
//         <>
//             <Link href="/" className="hover:text-accent transition-colors py-2" onClick={() => inMobileMenu && closeMobileMenu()}>Home</Link>

//             {/* Desktop University Menu */}
//             <div className="hidden md:block">
//                 <NavItemWithMenu label="Universities">
//                     <MegaMenu streams={streams} onLinkClick={() => { }} />
//                 </NavItemWithMenu>
//             </div>

//             {/* Mobile University Menu */}
//             <div className="md:hidden w-full">
//                 <button onClick={() => setIsMobileUniMenuOpen(!isMobileUniMenuOpen)} className="flex justify-between items-center w-full hover:text-accent transition-colors py-2">
//                     <span>Universities</span>
//                     <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileUniMenuOpen ? 'rotate-180' : ''}`} />
//                 </button>
//                 <AnimatePresence>
//                     {isMobileUniMenuOpen && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden pl-4 border-l border-secondary"
//                         >
//                             <div className="flex flex-col items-start py-2">
//                                 <Link href="/universities" onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">All Universities</Link>
//                                 {streams.map(stream => (
//                                     <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">{stream.name}</Link>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             <Link href="/#exams" className="hover:text-accent transition-colors py-2" onClick={() => inMobileMenu && closeMobileMenu()}>Exams</Link>
//             <Link href="/book-appointment" className="hover:text-accent transition-colors py-2" onClick={() => inMobileMenu && closeMobileMenu()}>Book Appointment</Link>
//             {isAuthenticated && user?.role === 'admin' && (
//                 <Link href="/admin" className="flex items-center gap-2 hover:text-accent transition-colors py-2" onClick={() => inMobileMenu && closeMobileMenu()}>
//                     <LayoutDashboard size={18} /> Admin
//                 </Link>
//             )}
//         </>
//     );

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-secondary/50">
//             <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                 <Link href="/" className="text-2xl font-bold">Per<span className="text-accent">Formic</span></Link>
//                 <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text"><NavLinks /></nav>
//                 <div className="flex items-center gap-4">
//                     {/* ... Auth Buttons and Mobile Menu Icon ... */}
//                     {isAuthenticated ? (
//                         <div className="flex items-center gap-4">
//                             <Link href="/profile" className="relative flex items-center justify-center">
//                                 <ProfileProgressCircle percentage={profileCompletion} />
//                                 <User className="absolute text-text" size={18} />
//                             </Link>
//                             <button onClick={logout} className="hidden md:flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors"><LogOut size={18} /></button>
//                         </div>
//                     ) : (
//                         <div className="hidden md:flex items-center gap-2">
//                             <Link href="/login" className="px-4 py-2 text-sm rounded-md hover:bg-primary transition-colors">Login</Link>
//                             <Link href="/register" className="px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent-hover transition-colors">Sign Up</Link>
//                         </div>
//                     )}
//                     <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button></div>
//                 </div>
//             </div>
//             <AnimatePresence>
//                 {isMenuOpen && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-primary border-t border-secondary">
//                         <nav className="flex flex-col items-center divide-y divide-secondary/50 px-6 pt-2 pb-4 text-text"><NavLinks inMobileMenu={true} /></nav>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </header>
//     );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
// import { User, LogOut, Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from '../utils/api';

// // Mega Menu Component for Desktop (UPDATED for better styling)
// const MegaMenu = ({ streams, onLinkClick }) => (
//     <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-primary border border-secondary rounded-lg shadow-lg p-2"
//     >
//         <div className="flex flex-col">
//             <Link href="/universities?filter=top" onClick={onLinkClick} className="font-semibold text-text hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm">Top Universities</Link>
//             <hr className="border-secondary my-1" />
//             <Link href="/universities" onClick={onLinkClick} className="font-semibold text-text hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm">All Universities</Link>
//             {streams.map(stream => (
//                 <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={onLinkClick} className="text-text-secondary hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm">{stream.name}</Link>
//             ))}
//         </div>
//     </motion.div>
// );

// // Navigation Item with Hover Logic for Desktop
// const NavItemWithMenu = ({ label, children }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     return (
//         <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//             <div className="flex items-center gap-1 cursor-pointer py-2">
//                 {label} <ChevronDown size={16} className={`transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
//             </div>
//             <AnimatePresence>{isHovered && children}</AnimatePresence>
//         </div>
//     );
// };


// export default function Header() {
//     const { isAuthenticated, user, logout, profileCompletion } = useAuth();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isMobileUniMenuOpen, setIsMobileUniMenuOpen] = useState(false);
//     const [streams, setStreams] = useState([]);

//     useEffect(() => {
//         api.get('/streams').then(res => setStreams(res.data)).catch(err => console.error("Failed to fetch streams"));
//     }, []);

//     const closeMobileMenu = () => {
//         setIsMenuOpen(false);
//         setIsMobileUniMenuOpen(false); // Also close submenu
//     };
    
//     const ProfileProgressCircle = ({ percentage }) => {
//         const radius = 18;
//         const circumference = 2 * Math.PI * radius;
//         const offset = circumference - (percentage / 100) * circumference;

//         return (
//             <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
//                 <circle className="text-secondary" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
//                 <motion.circle className="text-accent" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeInOut" }} />
//             </svg>
//         );
//     };

//     const NavLinks = ({ inMobileMenu = false }) => (
//         <>
//             <Link href="/" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Home</Link>

//             {/* Desktop University Menu */}
//             <div className="hidden md:block">
//                 <NavItemWithMenu label="Universities">
//                     <MegaMenu streams={streams} onLinkClick={() => { }} />
//                 </NavItemWithMenu>
//             </div>
            
//             {/* Mobile University Menu (UPDATED for left alignment) */}
//             <div className="md:hidden w-full">
//                 <button onClick={() => setIsMobileUniMenuOpen(!isMobileUniMenuOpen)} className="flex justify-between items-center w-full hover:text-accent transition-colors py-2 text-left">
//                     <span>Universities</span>
//                     <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileUniMenuOpen ? 'rotate-180' : ''}`} />
//                 </button>
//                 <AnimatePresence>
//                     {isMobileUniMenuOpen && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden pl-4 border-l border-secondary"
//                         >
//                             <div className="flex flex-col items-start pt-2">
//                                 <Link href="/universities?filter=top" onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">Top Universities</Link>
//                                 <Link href="/universities" onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">All Universities</Link>
//                                 {streams.map(stream => (
//                                     <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">{stream.name}</Link>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             <Link href="/#exams" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Exams</Link>
//             <Link href="/book-appointment" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Book Appointment</Link>
//             {isAuthenticated && user?.role === 'admin' && (
//                 <Link href="/admin" className="flex items-center gap-2 hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>
//                     <LayoutDashboard size={18} /> Admin
//                 </Link>
//             )}
//         </>
//     );

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-secondary/50">
//             <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                 <Link href="/" className="text-2xl font-bold">Per<span className="text-accent">Formic</span></Link>
//                 <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text"><NavLinks /></nav>
//                 <div className="flex items-center gap-4">
//                     {isAuthenticated ? (
//                         <div className="flex items-center gap-4">
//                             <Link href="/profile" className="relative flex items-center justify-center">
//                                 <ProfileProgressCircle percentage={profileCompletion} />
//                                 <User className="absolute text-text" size={18} />
//                             </Link>
//                             <button onClick={logout} className="hidden md:flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors"><LogOut size={18} /></button>
//                         </div>
//                     ) : (
//                         <div className="hidden md:flex items-center gap-2">
//                             <Link href="/login" className="px-4 py-2 text-sm rounded-md hover:bg-primary transition-colors">Login</Link>
//                             <Link href="/register" className="px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent-hover transition-colors">Sign Up</Link>
//                         </div>
//                     )}
//                     <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button></div>
//                 </div>
//             </div>
//             <AnimatePresence>
//                 {isMenuOpen && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-primary border-t border-secondary">
//                         <nav className="flex flex-col items-start divide-y divide-secondary/50 px-6 pt-2 pb-4 text-text"><NavLinks inMobileMenu={true} /></nav>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </header>
//     );
// }



"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X, LayoutDashboard, ChevronDown, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

// Mega Menu Component for Desktop (UPDATED for single-column, left-aligned layout)
const MegaMenu = ({ streams, onLinkClick }) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-2 w-60 bg-primary border border-secondary rounded-lg shadow-lg p-2"
    >
        <div className="flex flex-col">
            <Link href="/universities?filter=top" onClick={onLinkClick} className="font-semibold text-text hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm text-left">Top Universities</Link>
            <hr className="border-secondary my-1" />
            <Link href="/universities" onClick={onLinkClick} className="font-semibold text-text hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm text-left">All Universities</Link>
            {streams.map(stream => (
                <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={onLinkClick} className="text-text-secondary hover:bg-secondary/50 p-2 rounded-md transition-colors text-sm text-left">{stream.name}</Link>
            ))}
        </div>
    </motion.div>
);

// Navigation Item with Hover Logic for Desktop
const NavItemWithMenu = ({ label, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex items-center gap-1 cursor-pointer py-2">
                {label} <ChevronDown size={16} className={`transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
            </div>
            <AnimatePresence>{isHovered && children}</AnimatePresence>
        </div>
    );
};


export default function Header() {
    const { isAuthenticated, user, logout, profileCompletion } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileUniMenuOpen, setIsMobileUniMenuOpen] = useState(false);
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        api.get('/streams').then(res => setStreams(res.data)).catch(err => console.error("Failed to fetch streams"));
    }, []);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        setIsMobileUniMenuOpen(false);
    };
    
    const ProfileProgressCircle = ({ percentage }) => {
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                <circle className="text-secondary" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" />
                <motion.circle className="text-accent" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="20" cy="20" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeInOut" }} />
            </svg>
        );
    };

    const NavLinks = ({ inMobileMenu = false }) => (
        <>
            <Link href="/" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Home</Link>
            
            <div className="hidden md:block">
                <NavItemWithMenu label="Universities">
                    <MegaMenu streams={streams} onLinkClick={() => {}} />
                </NavItemWithMenu>
            </div>
            
            <div className="md:hidden w-full">
                <button onClick={() => setIsMobileUniMenuOpen(!isMobileUniMenuOpen)} className="flex justify-between items-center w-full hover:text-accent transition-colors py-2 text-left">
                    <span>Universities</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileUniMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isMobileUniMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l border-secondary"
                        >
                            <div className="flex flex-col items-start pt-2">
                                <Link href="/universities?filter=top" onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">Top Universities</Link>
                                <Link href="/universities" onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">All Universities</Link>
                                {streams.map(stream => (
                                     <Link key={stream.id} href={`/universities?stream=${stream.slug}`} onClick={closeMobileMenu} className="text-text-secondary hover:text-accent py-1.5 transition-colors text-sm w-full text-left">{stream.name}</Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Link href="/#exams" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Exams</Link>
            <Link href="/book-appointment" className="hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>Book Appointment</Link>
            {isAuthenticated && user?.role === 'admin' && (
                <Link href="/admin" className="flex items-center gap-2 hover:text-accent transition-colors py-2 w-full text-left" onClick={() => inMobileMenu && closeMobileMenu()}>
                    <LayoutDashboard size={18} /> Admin
                </Link>
            )}
             {isAuthenticated && user?.role === 'agent' && (
                <Link href="/agent" className="flex items-center gap-2 hover:text-accent transition-colors py-2" onClick={() => inMobileMenu && closeMobileMenu()}>
                    <Briefcase size={18} /> Agent Dashboard
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
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-primary border-t border-secondary">
                        <nav className="flex flex-col items-start divide-y divide-secondary/50 px-6 pt-2 pb-4 text-text"><NavLinks inMobileMenu={true} /></nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}