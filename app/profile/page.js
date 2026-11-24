// "use client";
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useRouter, useSearchParams } from 'next/navigation';
// import CompleteProfileModal from '../components/CompleteProfileModal';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { User, Mail, Phone, MapPin, GraduationCap, Building2, HelpCircle } from 'lucide-react';

// export default function ProfilePage() {
//     const { user, isAuthenticated, loading, profileCompletion } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         if (!loading && !isAuthenticated) {
//             router.push('/login');
//         }
//         if (searchParams.get('action') === 'complete') {
//             setIsModalOpen(true);
//         }
//     }, [isAuthenticated, loading, router, searchParams]);

//     if (loading || !user) {
//         return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
//     }

//     const ProfileDetail = ({ icon, label, value }) => (
//         <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
//             <div className="text-cyan-400">{icon}</div>
//             <div>
//                 <p className="text-sm text-slate-400">{label}</p>
//                 <p className="font-medium text-white">{value || 'Not provided'}</p>
//             </div>
//         </div>
//     );
    
//     return (
//         <>
//             <Header />
//             <main className="min-h-screen pt-24 bg-slate-900">
//                 <div className="container mx-auto px-6 py-12">
//                     <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl shadow-lg p-8">
//                         <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
//                              <div className="relative">
//                                 <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
//                                     <User size={64} className="text-cyan-400" />
//                                 </div>
//                                 <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-1">
//                                     <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-lg">
//                                         {profileCompletion}%
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-center md:text-left">
//                                 <h1 className="text-4xl font-bold">{user.full_name}</h1>
//                                 <p className="text-slate-400">{user.email}</p>
//                                 {profileCompletion < 100 && (
//                                     <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
//                                         Complete Your Profile
//                                     </button>
//                                 )}
//                             </div>
//                         </div>

//                         <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-2">Profile Details</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <ProfileDetail icon={<Phone size={24} />} label="Phone Number" value={user.phone_number} />
//                             <ProfileDetail icon={<i className="fab fa-whatsapp text-2xl"></i>} label="WhatsApp Number" value={user.whatsapp_number} />
//                             <ProfileDetail icon={<MapPin size={24} />} label="State / Hometown" value={user.state_hometown} />
//                             <ProfileDetail icon={<GraduationCap size={24} />} label="Choice of Stream" value={user.choice_of_stream === 'Other' ? user.choice_of_stream_other : user.choice_of_stream} />
//                              <ProfileDetail icon={<Building2 size={24} />} label="Entry Level" value={user.entry_level === 'Other' ? user.entry_level_other : user.entry_level} />
//                             <ProfileDetail icon={<HelpCircle size={24} />} label="Where did you hear about us?" value={user.how_heard === 'Other' ? user.how_heard_other : user.how_heard} />
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//             <CompleteProfileModal
//                 isOpen={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     // If user was redirected here, send them back
//                     const redirectUrl = searchParams.get('redirect');
//                     if(redirectUrl) router.push(redirectUrl);
//                 }}
//             />
//         </>
//     );
// }



"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CompleteProfileModal from '../components/CompleteProfileModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../utils/api';
import { User, Mail, Phone, MapPin, GraduationCap, Building2, HelpCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

function ProfileDetail({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="text-accent">{icon}</div>
            <div>
                <p className="text-sm text-text-secondary">{label}</p>
                <p className="font-medium text-text">{value || 'Not provided'}</p>
            </div>
        </div>
    );
}

function ProfilePageContent() {
    const { user, isAuthenticated, loading, profileCompletion } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
        if (searchParams.get('action') === 'complete') {
            setIsModalOpen(true);
        }
        if (isAuthenticated) {
            setLoadingApps(true);
            api.get('/users/applications')
                .then(res => setApplications(res.data))
                .catch(err => console.error('Failed to load applications:', err))
                .finally(() => setLoadingApps(false));
        }
    }, [isAuthenticated, loading, router, searchParams]);

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-background">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-4xl mx-auto bg-primary rounded-xl shadow-lg p-8 border border-secondary">
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                             <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                                    <User size={64} className="text-accent" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1">
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-lg text-white">
                                        {profileCompletion}%
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-bold">{user.full_name}</h1>
                                <p className="text-text-secondary">{user.email}</p>
                                {profileCompletion < 100 && (
                                    <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                        Complete Your Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 border-b border-secondary pb-2">Profile Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <ProfileDetail icon={<Phone size={24} />} label="Phone Number" value={user.phone_number} />
                            <ProfileDetail icon={<FaWhatsapp size={24} />} label="WhatsApp Number" value={user.whatsapp_number} />
                            <ProfileDetail icon={<MapPin size={24} />} label="State / Hometown" value={user.state_hometown} />
                            <ProfileDetail icon={<GraduationCap size={24} />} label="Choice of Stream" value={user.choice_of_stream === 'Other' ? user.choice_of_stream_other : user.choice_of_stream} />
                             <ProfileDetail icon={<Building2 size={24} />} label="Entry Level" value={user.entry_level === 'Other' ? user.entry_level_other : user.entry_level} />
                            <ProfileDetail icon={<HelpCircle size={24} />} label="Where did you hear about us?" value={user.how_heard === 'Other' ? user.how_heard_other : user.how_heard} />
                        </div>

                        {/* My Applications Section */}
                        <h2 className="text-2xl font-bold mb-6 border-b border-secondary pb-2 flex items-center gap-2">
                            <FileText className="text-accent" size={24} /> My University Applications ({applications.length})
                        </h2>
                        {loadingApps ? (
                            <div className="text-center py-6 text-text-secondary text-sm">Loading applications...</div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-8 bg-secondary/20 rounded-lg p-6">
                                <p className="text-text-secondary text-sm mb-4">You have not submitted applications to any universities yet.</p>
                                <Link href="/universities" className="bg-accent hover:bg-accent-hover text-white text-xs font-semibold py-2 px-5 rounded-md transition-colors inline-block">
                                    Explore Universities
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {applications.map(app => (
                                    <div key={app.id} className="p-4 bg-secondary/30 rounded-lg border border-secondary/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div>
                                            <Link href={`/universities/${app.university_slug}`} className="font-bold text-text hover:text-accent transition-colors">
                                                {app.university_name}
                                            </Link>
                                            <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1.5">
                                                <MapPin size={12} /> {app.location} {app.course_name ? `• ${app.course_name}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                                app.status === 'Converted' ? 'bg-purple-500/20 text-purple-400' :
                                                app.status === 'Called' ? 'bg-sky-500/20 text-sky-400' :
                                                'bg-emerald-500/20 text-emerald-400'
                                            }`}>
                                                {app.status}
                                            </span>
                                            <span className="text-xs text-text-secondary">
                                                {new Date(app.applied_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
            <CompleteProfileModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    const redirectUrl = searchParams.get('redirect');
                    if(redirectUrl) router.push(redirectUrl);
                }}
            />
        </>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={null}>
            <ProfilePageContent />
        </Suspense>
    );
}