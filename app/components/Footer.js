// import React from 'react';
// import Link from 'next/link';
// import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// export default function Footer() {
//     return (
//         <footer className="bg-slate-900 border-t border-slate-800">
//             <div className="container mx-auto px-6 py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                     {/* Column 1: Brand & About */}
//                     <div className="md:col-span-1">
//                         <h3 className="text-xl font-bold text-white mb-4">Edu<span className="text-cyan-400">Elevate</span></h3>
//                         <p className="text-slate-400 text-sm">Your trusted partner in navigating the path to higher education and a successful career.</p>
//                     </div>

//                     {/* Column 2: Quick Links */}
//                     <div>
//                         <h4 className="font-semibold text-white mb-4">Quick Links</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li><Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home</Link></li>
//                             <li><Link href="/universities" className="text-slate-400 hover:text-cyan-400 transition-colors">Universities</Link></li>
//                             <li><Link href="/book-appointment" className="text-slate-400 hover:text-cyan-400 transition-colors">Book Appointment</Link></li>
//                             <li><Link href="/profile" className="text-slate-400 hover:text-cyan-400 transition-colors">My Profile</Link></li>
//                         </ul>
//                     </div>

//                     {/* Column 3: Contact */}
//                     <div>
//                         <h4 className="font-semibold text-white mb-4">Contact Us</h4>
//                         <ul className="space-y-2 text-sm text-slate-400">
//                             <li>Email: support@eduelevate.com</li>
//                             <li>Phone: +1 (234) 567-890</li>
//                             <li>Kolkata, West Bengal, India</li>
//                         </ul>
//                     </div>
                    
//                     {/* Column 4: Social Media */}
//                     <div>
//                         <h4 className="font-semibold text-white mb-4">Follow Us</h4>
//                         <div className="flex space-x-4">
//                             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Facebook size={20} /></a>
//                             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
//                             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Instagram size={20} /></a>
//                             <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-12 border-t border-slate-800 pt-6 text-center">
//                     <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} EduElevate. All Rights Reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// }





import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary border-t border-secondary">
            <div className="container mx-auto px-6 py-12 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Per<span className="text-accent">Formic</span></h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto">Your trusted partner in navigating the path to higher education and a successful career.</p>
                <div className="flex justify-center space-x-4 my-6">
                    <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Linkedin size={20} /></a>
                </div>
                <div className="mt-8 border-t border-secondary pt-6">
                    <p className="text-text-secondary text-sm">&copy; {new Date().getFullYear()} PerFormic. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}