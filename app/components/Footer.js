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





// import React from 'react';
// import Link from 'next/link';
// import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// export default function Footer() {
//     return (
//         <footer className="bg-primary border-t border-secondary">
//             <div className="container mx-auto px-6 py-12 text-center">
//                 <h3 className="text-xl font-bold text-white mb-4">Per<span className="text-accent">Formic</span></h3>
//                 <p className="text-text-secondary text-sm max-w-md mx-auto">Your trusted partner in navigating the path to higher education and a successful career.</p>
//                 <div className="flex justify-center space-x-4 my-6">
//                     <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Facebook size={20} /></a>
//                     <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Twitter size={20} /></a>
//                     <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Instagram size={20} /></a>
//                     <a href="#" className="text-text-secondary hover:text-accent transition-colors"><Linkedin size={20} /></a>
//                 </div>
//                 <div className="mt-8 border-t border-secondary pt-6">
//                     <p className="text-text-secondary text-sm">&copy; {new Date().getFullYear()} PerFormic. All Rights Reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// }



import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary border-t border-secondary">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
                    {/* Column 1: Logo & Socials */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                             <Image 
                                src="/Logo.png" 
                                alt="Performic Consultancy Services Logo" 
                                width={180} 
                                height={40}
                            />
                        </Link>
                    </div>

                    {/* Column 2: Company Links */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-base text-text mb-4">Company</h4>
                        <Link href="/about" className="block text-text-secondary hover:text-accent transition-colors">About Us</Link>
                        <Link href="/universities" className="block text-text-secondary hover:text-accent transition-colors">Universities</Link>
                        <Link href="/contact" className="block text-text-secondary hover:text-accent transition-colors">Contact Us</Link>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-base text-text mb-4">Quick Links</h4>
                        <Link href="/privacy-policy" className="block text-text-secondary hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="block text-text-secondary hover:text-accent transition-colors">Terms & Refund Policy</Link>
                        <Link href="/#faq" className="block text-text-secondary hover:text-accent transition-colors">FAQ</Link>
                    </div>
                    
                    {/* Column 4: Contact Us */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-base text-text mb-4">Contact Us</h4>
                        <a href="tel:+918207283226" className="flex items-start gap-2 text-text-secondary hover:text-accent transition-colors">
                            <Phone size={16} className="mt-1 flex-shrink-0" />
                            <span>+91 8207283226</span>
                        </a>
                         <a href="mailto:performic45@gmail.com" className="flex items-start gap-2 text-text-secondary hover:text-accent transition-colors">
                            <Mail size={16} className="mt-1 flex-shrink-0" />
                            <span>performic45@gmail.com</span>
                        </a>
                        <p className="flex items-start gap-2 text-text-secondary">
                            <MapPin size={16} className="mt-1 flex-shrink-0" />
                            <span>2/1, Russel St, Park Street area, Kolkata, West Bengal 700071</span>
                        </p>
                    </div>
                </div>

                <div className="mt-12 border-t border-secondary pt-6 text-center">
                    <p className="text-text-secondary text-xs">&copy; {new Date().getFullYear()} Performic Consultancy Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}