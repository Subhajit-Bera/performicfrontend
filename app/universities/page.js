// "use client";
// import React, { useState, useEffect, useMemo } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import UniversityCard from '../components/UniversityCard';
// import api from '../utils/api';
// import { Search, SlidersHorizontal } from 'lucide-react';

// export default function UniversitiesPage() {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [streamFilter, setStreamFilter] = useState('All');

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             try {
//                 const { data } = await api.get('/universities');
//                 setUniversities(data);
//             } catch (error) {
//                 console.error("Failed to fetch universities", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUniversities();
//     }, []);

//     const filteredUniversities = useMemo(() => {
//         return universities.filter(uni => {
//             const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                                   uni.location.toLowerCase().includes(searchTerm.toLowerCase());
//             const matchesStream = streamFilter === 'All' || uni.stream === streamFilter;
//             return matchesSearch && matchesStream;
//         });
//     }, [universities, searchTerm, streamFilter]);

//     const streams = ['All', 'Engineering', 'Medical', 'Management', 'Arts'];

//     return (
//         <>
//             <Header />
//             <main className="pt-24 min-h-screen bg-slate-900">
//                 <div className="container mx-auto px-6 py-12">
//                     <h1 className="text-4xl font-bold text-center mb-4">Find Your University</h1>
//                     <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
//                         Explore our curated list of top institutions. Use the filters below to find the perfect match for your career goals.
//                     </p>

//                     {/* Filter Section */}
//                     <div className="sticky top-20 z-40 bg-slate-900/80 backdrop-blur-sm py-4 mb-8 rounded-lg">
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="relative flex-grow">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                                 <input
//                                     type="text"
//                                     placeholder="Search by name or location..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg p-3 pl-12 focus:outline-none focus:border-cyan-500 transition-colors"
//                                 />
//                             </div>
//                             <div className="relative flex-shrink-0">
//                                 <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                                 <select
//                                     value={streamFilter}
//                                     onChange={(e) => setStreamFilter(e.target.value)}
//                                     className="w-full md:w-auto bg-slate-800 border-2 border-slate-700 rounded-lg p-3 pl-12 appearance-none focus:outline-none focus:border-cyan-500 transition-colors"
//                                 >
//                                     {streams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* University Grid */}
//                     {loading ? (
//                         <div className="text-center py-10">Loading universities...</div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                             {filteredUniversities.length > 0 ? (
//                                 filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
//                             ) : (
//                                 <p className="col-span-full text-center text-slate-400 py-10">No universities match your criteria.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }




"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UniversityCard from '../components/UniversityCard';
import api from '../utils/api';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function UniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [streamFilter, setStreamFilter] = useState('All');

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const { data } = await api.get('/universities');
                setUniversities(data);
            } catch (error) {
                console.error("Failed to fetch universities", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    const filteredUniversities = useMemo(() => {
        return universities.filter(uni => {
            const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  uni.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStream = streamFilter === 'All' || uni.stream === streamFilter;
            return matchesSearch && matchesStream;
        });
    }, [universities, searchTerm, streamFilter]);

    const streams = ['All', 'Engineering', 'Medical', 'Management', 'Arts'];

    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen bg-background">
                <div className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center mb-4">Find Your University</h1>
                    <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
                        Explore our curated list of top institutions. Use the filters below to find the perfect match.
                    </p>

                    <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm py-4 mb-8 rounded-lg">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-primary border-2 border-secondary rounded-lg p-3 pl-12 focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="relative flex-shrink-0">
                                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                <select
                                    value={streamFilter}
                                    onChange={(e) => setStreamFilter(e.target.value)}
                                    className="w-full md:w-auto bg-primary border-2 border-secondary rounded-lg p-3 pl-12 appearance-none focus:outline-none focus:border-accent"
                                >
                                    {streams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">Loading universities...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredUniversities.length > 0 ? (
                                filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
                            ) : (
                                <p className="col-span-full text-center text-text-secondary py-10">No universities match your criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}