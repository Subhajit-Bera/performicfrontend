// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import api from '../../utils/api';
// import Image from 'next/image';
// import { MapPin, Star, GraduationCap } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'sonner';

// export default function UniversityDetailPage() {
//     const [university, setUniversity] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { id } = useParams();
//     const router = useRouter();
//     const { isAuthenticated, profileCompletion } = useAuth();

//     useEffect(() => {
//         if (id) {
//             const fetchUniversity = async () => {
//                 try {
//                     const { data } = await api.get(`/universities/${id}`);
//                     setUniversity(data);
//                 } catch (err) {
//                     setError("University not found.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchUniversity();
//         }
//     }, [id]);

//     const handleApply = () => {
//         if (!isAuthenticated) {
//             toast.error("Please log in to apply.");
//             router.push('/login');
//             return;
//         }
//         if (profileCompletion < 100) {
//             toast.info("Please complete your profile before applying.");
//             router.push(`/profile?action=complete&redirect=/universities/${id}`);
//             return;
//         }

//         const applyPromise = api.post('/users/apply', { universityId: id });
//         toast.promise(applyPromise, {
//             loading: `Submitting application to ${university.name}...`,
//             success: 'Application submitted successfully!',
//             error: (err) => err.response?.data?.message || 'Error submitting application.',
//         });
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;
//     if (!university) return null;

//     return (
//         <>
//             <Header />
//             <main className="pt-24 bg-slate-900 min-h-screen">
//                 <div className="container mx-auto px-6 py-12">
//                     <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
//                         <Image src={university.image_url} alt={university.name} layout="fill" objectFit="cover" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                         <div className="absolute bottom-8 left-8 text-white">
//                             <h1 className="text-4xl md:text-5xl font-bold">{university.name}</h1>
//                             <p className="flex items-center gap-2 mt-2 text-lg"><MapPin size={20} /> {university.location}</p>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         <div className="lg:col-span-2 bg-slate-800/50 p-8 rounded-xl">
//                             <h2 className="text-2xl font-bold mb-4">About the University</h2>
//                             <p className="text-slate-300 leading-relaxed">{university.description}</p>
//                         </div>
//                         <div className="lg:col-span-1">
//                             <div className="bg-slate-800 p-6 rounded-xl">
//                                 <h3 className="text-xl font-bold mb-6">Key Details</h3>
//                                 <div className="space-y-4">
//                                     <div className="flex items-center gap-3"><Star className="text-yellow-400" size={20} /><span className="text-slate-300">Rating:</span><span className="font-bold">{university.rating}/5.0</span></div>
//                                     <div className="flex items-center gap-3"><GraduationCap className="text-cyan-400" size={20} /><span className="text-slate-300">Primary Stream:</span><span className="font-bold">{university.stream}</span></div>
//                                 </div>
//                                 <button onClick={handleApply} className="w-full mt-8 bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 transform hover:scale-105">
//                                     Apply Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }





"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../utils/api';
import Image from 'next/image';
import { MapPin, Building, Award, Ruler, BookOpen, Briefcase, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

// Helper component for detail items (defined outside the main component)
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-md">{icon}</div>
        <div>
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="font-semibold text-text">{value}</p>
        </div>
    </div>
);

// Helper component for tables (defined outside the main component)
const InfoTable = ({ data, headers }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-secondary/50">
                    {headers.map(h => <th key={h} className="p-3 font-semibold text-sm">{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="border-b border-secondary">
                        {Object.values(row).map((cell, i) => <td key={i} className="p-3 text-sm text-text-secondary">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default function UniversityDetailPage() {
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Courses');
    const { slug } = useParams();
    const router = useRouter();
    const { isAuthenticated, profileCompletion } = useAuth();

    useEffect(() => {
        if (slug) {
            const fetchUniversity = async () => {
                try {
                    const { data } = await api.get(`/universities/${slug}`);
                    setUniversity(data);
                } catch (err) {
                    setError("University not found.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUniversity();
        }
    }, [slug]);

    const handleApply = () => {
        if (!isAuthenticated) {
            toast.error("Please log in to apply.");
            router.push('/login');
            return;
        }
        if (profileCompletion < 100) {
            toast.info("Please complete your profile before applying.");
            router.push(`/profile?action=complete&redirect=/universities/${slug}`);
            return;
        }

        const applyPromise = api.post('/users/apply', { universityId: university.id });
        toast.promise(applyPromise, {
            loading: `Submitting application to ${university.name}...`,
            success: 'Application submitted successfully!',
            error: (err) => err.response?.data?.message || 'Error submitting application.',
        });
    };


    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-background">{error}</div>;
    if (!university) return null;

    return (
        <>
            <Header />
            <main className="pt-20 bg-background min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* --- Header Section --- */}
                    <div className="relative w-full h-52 md:h-72 rounded-xl overflow-hidden mb-8">
                        <Image src={university.image_url} alt={university.name} fill style={{ objectFit: 'cover' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h1 className="text-3xl md:text-5xl font-bold">{university.name}</h1>
                            <p className="flex items-center gap-2 mt-2"><MapPin size={18} /> {university.location}</p>
                        </div>
                    </div>

                    {/* --- Main Content Grid --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- Left Column (Details) --- */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            <div className="bg-primary p-6 rounded-xl border border-secondary">
                                <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
                                <p className="text-text-secondary leading-relaxed">{university.description}</p>
                            </div>

                            {/* University Details Grid */}
                            <div className="bg-primary p-6 rounded-xl border border-secondary">
                                <h2 className="text-2xl font-bold mb-6">University Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <DetailItem icon={<Award size={22} className="text-accent" />} label="Established Year" value={university.details.established_year} />
                                    <DetailItem icon={<Building size={22} className="text-accent" />} label="University Type" value={university.details.university_type} />
                                    <DetailItem icon={<CheckCircle size={22} className="text-accent" />} label="Accredited By" value={university.details.accredited_by} />
                                    <DetailItem icon={<Ruler size={22} className="text-accent" />} label="Campus Size" value={`${university.details.campus_size_acres} Acres`} />
                                </div>
                            </div>

                            {/* Tabbed Section for Courses & Placements */}
                            <div className="bg-primary rounded-xl border border-secondary">
                                <div className="flex border-b border-secondary">
                                    <button onClick={() => setActiveTab('Courses')} className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'Courses' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text'}`}>
                                        <BookOpen className="inline-block mr-2" size={18} /> Courses & Fees
                                    </button>
                                    <button onClick={() => setActiveTab('Placements')} className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'Placements' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text'}`}>
                                        <Briefcase className="inline-block mr-2" size={18} /> Placements
                                    </button>
                                </div>
                                <div className="p-6">
                                    {activeTab === 'Courses' && (
                                        <InfoTable data={university.courses_and_fees} headers={['Course Name', 'Fees Per Year', 'Duration']} />
                                    )}
                                    {activeTab === 'Placements' && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold">Placement Highlights</h3>
                                            <p><strong>Highest Package:</strong> <span className="text-text-secondary">{university.placements.highest_package}</span></p>
                                            <p><strong>Average Package:</strong> <span className="text-text-secondary">{university.placements.average_package}</span></p>
                                            <div>
                                                <strong>Top Recruiters:</strong>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {university.placements.top_recruiters.map(r => (
                                                        <span key={r} className="bg-secondary text-xs font-semibold px-2 py-1 rounded">{r}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- Right Column (Apply & Facilities) --- */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-primary p-6 rounded-xl border border-secondary sticky top-24">
                                <h3 className="text-xl font-bold mb-4">Admission {new Date().getFullYear() + 1}</h3>
                                <p className="text-sm text-text-secondary mb-6">Applications are open. Apply now to secure your seat.</p>
                                <button onClick={handleApply} className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105">
                                    Apply Now
                                </button>
                            </div>
                            <div className="bg-primary p-6 rounded-xl border border-secondary">
                                <h3 className="text-xl font-bold mb-4"><Sparkles size={20} className="inline-block mr-2 text-accent" /> Facilities</h3>
                                <ul className="space-y-2">
                                    {university.facilities.map(facility => (
                                        <li key={facility} className="flex items-center gap-2 text-text-secondary text-sm">
                                            <CheckCircle size={16} className="text-accent" /> {facility}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}