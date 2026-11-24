// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import api from '../../utils/api';
// import { Info, ClipboardList, CalendarDays, FileText, PencilRuler, CreditCard, Trophy, BookMarked, BarChart2 } from 'lucide-react';
// import Loader from '@/app/components/Loader';

// const TABS = [ "Info", "Application Form", "Important Dates", "Syllabus", "Exam Pattern", "Admit Card", "Result", "Cut Off" ];

// // Reusable component for displaying key-value pairs (defined outside)
// const InfoGrid = ({ data, title }) => (
//     <div>
//         <h3 className="text-xl font-semibold text-accent mb-4">{title}</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {Object.entries(data).map(([key, value]) => (
//                 <div key={key} className="bg-secondary/50 p-4 rounded-lg">
//                     <p className="text-sm text-text-secondary capitalize">{key.replace(/_/g, ' ')}</p>
//                     <p className="font-bold text-text">{value}</p>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// export default function ExamDetailPage() {
//     const [exam, setExam] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState(TABS[0]);
//     const { slug } = useParams();

//     useEffect(() => {
//         if (slug) {
//             const fetchExam = async () => {
//                 try {
//                     const { data } = await api.get(`/exams/${slug}`);
//                     setExam(data);
//                 } catch (err) {
//                     setError("Exam details not found.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchExam();
//         }
//     }, [slug]);

//     const renderTabContent = () => {
//         if (!exam) return null;
//         switch (activeTab) {
//             case "Info":
//                 return <InfoGrid data={exam.info} title={`${exam.name} Info`} />;
//             case "Application Form":
//                 return <InfoGrid data={exam.application_form} title="Application Details" />;
//             case "Important Dates":
//                 return <InfoGrid data={exam.important_dates} title="Exam Timeline" />;
//             case "Syllabus":
//                 return (
//                     <div className="space-y-6">
//                         {Object.entries(exam.syllabus).map(([subject, topics]) => (
//                             <div key={subject}>
//                                 <h3 className="text-xl font-semibold text-accent mb-2">{subject}</h3>
//                                 {topics && topics.length > 0 ? (
//                                     <ul className="list-disc list-inside text-text-secondary space-y-1">
//                                         {topics.map(topic => <li key={topic}>{topic}</li>)}
//                                     </ul>
//                                 ) : (
//                                     <p className="text-text-secondary">Details not available.</p>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case "Exam Pattern":
//                 return <InfoGrid data={exam.exam_pattern} title="Exam Pattern Details" />;
//             case "Admit Card":
//                 return <p className="text-text-secondary leading-relaxed">{exam.admit_card_details}</p>;
//             case "Result":
//                 return <p className="text-text-secondary leading-relaxed">{exam.result_details}</p>;
//             case "Cut Off":
//                 return <p className="text-text-secondary leading-relaxed">{exam.cutoff_details}</p>;
//             default:
//                 return null;
//         }
//     };


//     if (loading) return <Loader/>;
//     if (error) return <div className="min-h-screen flex items-center justify-center bg-background">{error}</div>;
//     if (!exam) return null;

//     const ICONS = { "Info": <Info size={16} />, "Application Form": <CreditCard size={16} />, "Important Dates": <CalendarDays size={16} />, "Syllabus": <BookMarked size={16} />, "Exam Pattern": <PencilRuler size={16} />, "Admit Card": <FileText size={16} />, "Result": <Trophy size={16} />, "Cut Off": <BarChart2 size={16} /> };

//     return (
//         <>
//             <Header />
//             <main className="pt-20 bg-background min-h-screen">
//                 <div className="container mx-auto px-4 py-8">
//                     <div className="mb-8">
//                         <h1 className="text-4xl md:text-5xl font-bold">{exam.name}</h1>
//                         <p className="text-text-secondary mt-2">All you need to know about the {exam.name} exam.</p>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                         {/* Left Column: Tab Navigation */}
//                         <div className="lg:col-span-1">
//                             <div className="bg-primary p-4 rounded-xl border border-secondary sticky top-24">
//                                 <nav className="flex flex-col space-y-1">
//                                     {TABS.map(tab => (
//                                         <button key={tab} onClick={() => setActiveTab(tab)}
//                                             className={`w-full text-left px-4 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center gap-3 ${activeTab === tab ? 'bg-accent text-white' : 'text-text-secondary hover:bg-secondary/50 hover:text-text'}`}>
//                                             {ICONS[tab]}
//                                             {tab}
//                                         </button>
//                                     ))}
//                                 </nav>
//                             </div>
//                         </div>

//                         {/* Right Column: Tab Content */}
//                         <div className="lg:col-span-3">
//                             <div className="bg-primary p-6 md:p-8 rounded-xl border border-secondary">
//                                 {renderTabContent()}
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
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../utils/api';
import { Info, CreditCard, CalendarDays, BookMarked, PencilRuler, FileText, Trophy, BarChart2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ["Info", "Application Form", "Important Dates", "Syllabus", "Exam Pattern", "Admit Card", "Result", "Cut Off"];

// Reusable component for displaying key-value pairs
const InfoGrid = ({ data, title }) => (
    <div>
        <h3 className="text-xl font-semibold text-accent mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm text-text-secondary capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-bold text-text">{value}</p>
                </div>
            ))}
        </div>
    </div>
);

export default function ExamDetailPage() {
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            api.get(`/exams/${slug}`)
                .then(res => setExam(res.data))
                .catch(() => setError("Exam details not found."))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    // const renderTabContent = () => { /* ... unchanged ... */ };
    const renderTabContent = () => {
        if (!exam) return null;
        switch (activeTab) {
            case "Info":
                return <InfoGrid data={exam.info} title={`${exam.name} Info`} />;
            case "Application Form":
                return <InfoGrid data={exam.application_form} title="Application Details" />;
            case "Important Dates":
                return <InfoGrid data={exam.important_dates} title="Exam Timeline" />;
            case "Syllabus":
                return (
                    <div className="space-y-6">
                        {Object.entries(exam.syllabus).map(([subject, topics]) => (
                            <div key={subject}>
                                <h3 className="text-xl font-semibold text-accent mb-2">{subject}</h3>
                                {topics && topics.length > 0 ? (
                                    <ul className="list-disc list-inside text-text-secondary space-y-1">
                                        {topics.map(topic => <li key={topic}>{topic}</li>)}
                                    </ul>
                                ) : (
                                    <p className="text-text-secondary">Details not available.</p>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case "Exam Pattern":
                return <InfoGrid data={exam.exam_pattern} title="Exam Pattern Details" />;
            case "Admit Card":
                return <p className="text-text-secondary leading-relaxed">{exam.admit_card_details}</p>;
            case "Result":
                return <p className="text-text-secondary leading-relaxed">{exam.result_details}</p>;
            case "Cut Off":
                return <p className="text-text-secondary leading-relaxed">{exam.cutoff_details}</p>;
            default:
                return null;
        }
    };
    const ICONS = { "Info": <Info size={16} />, "Application Form": <CreditCard size={16} />, "Important Dates": <CalendarDays size={16} />, "Syllabus": <BookMarked size={16} />, "Exam Pattern": <PencilRuler size={16} />, "Admit Card": <FileText size={16} />, "Result": <Trophy size={16} />, "Cut Off": <BarChart2 size={16} /> };


    if (loading) {
        return (
            <>
                <Header />
                <main className="pt-20 bg-background min-h-screen">
                    <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
                        <div className="space-y-3">
                            <div className="h-10 md:h-12 w-2/3 max-w-md rounded bg-secondary/70" />
                            <div className="h-4 w-1/2 max-w-xs rounded bg-secondary/50" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="h-44 rounded-xl bg-secondary/30 border border-secondary/40 p-5 space-y-3">
                                <div className="h-5 w-1/2 rounded bg-secondary/60" />
                                <div className="h-4 w-3/4 rounded bg-secondary/40" />
                                <div className="h-4 w-2/3 rounded bg-secondary/40" />
                            </div>
                            <div className="h-44 rounded-xl bg-secondary/30 border border-secondary/40 p-5 space-y-3">
                                <div className="h-5 w-1/2 rounded bg-secondary/60" />
                                <div className="h-4 w-3/4 rounded bg-secondary/40" />
                                <div className="h-4 w-2/3 rounded bg-secondary/40" />
                            </div>
                            <div className="h-44 rounded-xl bg-secondary/30 border border-secondary/40 p-5 space-y-3">
                                <div className="h-5 w-1/2 rounded bg-secondary/60" />
                                <div className="h-4 w-3/4 rounded bg-secondary/40" />
                                <div className="h-4 w-2/3 rounded bg-secondary/40" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
    if (error) return <div className="min-h-screen flex items-center justify-center bg-background">{error}</div>;
    if (!exam) return null;

    return (
        <>
            <Header />
            <main className="pt-20 bg-background min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold">{exam.name}</h1>
                        <p className="text-text-secondary mt-2">All you need to know about the {exam.name} exam.</p>
                    </div>

                    {/* Mobile Dropdown Navigation */}
                    <div className="lg:hidden mb-4">
                        <button onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} className="w-full flex justify-between items-center bg-primary p-4 rounded-lg border border-secondary">
                            <span className="font-semibold text-text">{activeTab}</span>
                            <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isMobileDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-primary border border-t-0 border-secondary rounded-b-lg overflow-hidden"
                                >
                                    <nav className="flex flex-col">
                                        {TABS.map(tab => (
                                            <button key={tab} onClick={() => { setActiveTab(tab); setIsMobileDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 font-medium text-sm text-text-secondary hover:bg-secondary/50 hover:text-text flex items-center gap-3">
                                                {ICONS[tab]} {tab}
                                            </button>
                                        ))}
                                    </nav>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Desktop Sidebar Navigation */}
                        <div className="hidden lg:block lg:col-span-1">
                            <div className="bg-primary p-4 rounded-xl border border-secondary sticky top-24">
                                <nav className="flex flex-col space-y-1">
                                    {TABS.map(tab => (
                                        <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center gap-3 ${activeTab === tab ? 'bg-accent text-white' : 'text-text-secondary hover:bg-secondary/50 hover:text-text'}`}>
                                            {ICONS[tab]} {tab}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3">
                            <div className="bg-primary p-6 md:p-8 rounded-xl border border-secondary">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}