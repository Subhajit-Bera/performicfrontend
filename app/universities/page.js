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
//             <main className="pt-24 min-h-screen bg-background">
//                 <div className="container mx-auto px-6 py-12">
//                     <h1 className="text-4xl font-bold text-center mb-4">Find Your University</h1>
//                     <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
//                         Explore our curated list of top institutions. Use the filters below to find the perfect match.
//                     </p>

//                     <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm py-4 mb-8 rounded-lg">
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="relative flex-grow">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                                 <input
//                                     type="text"
//                                     placeholder="Search by name or location..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full bg-primary border-2 border-secondary rounded-lg p-3 pl-12 focus:outline-none focus:border-accent"
//                                 />
//                             </div>
//                             <div className="relative flex-shrink-0">
//                                 <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                                 <select
//                                     value={streamFilter}
//                                     onChange={(e) => setStreamFilter(e.target.value)}
//                                     className="w-full md:w-auto bg-primary border-2 border-secondary rounded-lg p-3 pl-12 appearance-none focus:outline-none focus:border-accent"
//                                 >
//                                     {streams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {loading ? (
//                         <div className="text-center py-10">Loading universities...</div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                             {filteredUniversities.length > 0 ? (
//                                 filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
//                             ) : (
//                                 <p className="col-span-full text-center text-text-secondary py-10">No universities match your criteria.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }



// "use client";
// import React, { useState, useEffect, useMemo, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import UniversityCard from '../components/UniversityCard';
// import api from '../utils/api';
// import { Search, SlidersHorizontal } from 'lucide-react';
// import Loader from '@/app/components/Loader';

// // A new component to handle the logic, wrapped in Suspense
// const UniversityFilterComponent = () => {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [streamFilter, setStreamFilter] = useState('All');

//     const searchParams = useSearchParams();
//     const streamQuery = searchParams.get('stream');

//     useEffect(() => {
//         // Set the filter from the URL query on initial load
//         if (streamQuery) {
//             // A simple way to convert slug back to title case for matching
//             const formattedStream = streamQuery.charAt(0).toUpperCase() + streamQuery.slice(1);
//             setStreamFilter(formattedStream);
//         }

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
//     }, [streamQuery]);

//     const filteredUniversities = useMemo(() => {
//         return universities.filter(uni => {
//             const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                                   uni.location.toLowerCase().includes(searchTerm.toLowerCase());

//             // THE FIX: Check if the university's 'streams' array includes the filter
//             const matchesStream = streamFilter === 'All' || (uni.streams && uni.streams.includes(streamFilter));

//             return matchesSearch && matchesStream;
//         });
//     }, [universities, searchTerm, streamFilter]);

//     // Create a unique list of all available streams from the fetched universities
//     const allStreams = useMemo(() => {
//         const streamSet = new Set(['All']);
//         universities.forEach(uni => {
//             if (uni.streams) {
//                 uni.streams.forEach(stream => streamSet.add(stream));
//             }
//         });
//         return Array.from(streamSet);
//     }, [universities]);

//     return (
//         <div className="container mx-auto px-6 py-12">
//             <h1 className="text-4xl font-bold text-center mb-4">Find Your University</h1>
//             <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
//                 Explore our curated list of top institutions. Use the filters below to find the perfect match for your career goals.
//             </p>

//             <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm py-4 mb-8 rounded-lg">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="relative flex-grow">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search by name or location..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full bg-primary border-2 border-secondary rounded-lg p-3 pl-12 focus:outline-none focus:border-accent"
//                         />
//                     </div>
//                     <div className="relative flex-shrink-0">
//                         <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                         <select
//                             value={streamFilter}
//                             onChange={(e) => setStreamFilter(e.target.value)}
//                             className="w-full md:w-auto bg-primary border-2 border-secondary rounded-lg p-3 pl-12 pr-8 appearance-none focus:outline-none focus:border-accent"
//                         >
//                             {allStreams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {loading ? (
//                 <div className="text-center py-10">Loading universities...</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                     {filteredUniversities.length > 0 ? (
//                         filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
//                     ) : (
//                         <p className="col-span-full text-center text-text-secondary py-10">No universities match your criteria.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default function UniversitiesPage() {
//     return (
//         <>
//             <Header />
//             <main className="pt-24 min-h-screen bg-background">
//                  {/* Suspense is needed because useSearchParams is a client-side hook */}
//                 <Suspense fallback={<Loader/>}>
//                     <UniversityFilterComponent />
//                 </Suspense>
//             </main>
//             <Footer />
//         </>
//     );
// }


// "use client";
// import React, { useState, useEffect, useMemo, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import UniversityCard from '../components/UniversityCard';
// import api from '../utils/api';
// import { Search, SlidersHorizontal } from 'lucide-react';

// // We create a new component to use the `useSearchParams` hook.
// // The main page will wrap this in `<Suspense>` for server-side rendering compatibility.
// const UniversityFilterComponent = () => {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [streamFilter, setStreamFilter] = useState('All');

//     const searchParams = useSearchParams();
//     // Read URL query parameters
//     const streamQuery = searchParams.get('stream');
//     const filterQuery = searchParams.get('filter');

//     useEffect(() => {
//         // This effect runs when the component mounts or URL params change
//         if (streamQuery) {
//             // Convert slug from URL (e.g., "engineering") to Title Case ("Engineering") for matching
//             const formattedStream = streamQuery.charAt(0).toUpperCase() + streamQuery.slice(1);
//             setStreamFilter(formattedStream);
//         } else {
//             // If no stream is in the URL, reset to 'All'
//             setStreamFilter('All');
//         }

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
//     }, [streamQuery, filterQuery]); // Rerun this effect if the URL parameters change

//     // This memoized value calculates the list of universities to display
//     const filteredUniversities = useMemo(() => {
//         let results = universities;

//         // Handle "Top Universities" filter from the header link
//         if (filterQuery === 'top') {
//             const topPerStream = new Map();
//             // Go through all universities and find the one with the highest rating for each stream
//             universities.forEach(uni => {
//                 if (uni.streams) {
//                     uni.streams.forEach(stream => {
//                         if (!topPerStream.has(stream) || uni.rating > topPerStream.get(stream).rating) {
//                             topPerStream.set(stream, uni);
//                         }
//                     });
//                 }
//             });
//             results = Array.from(topPerStream.values());
//         }

//         // Apply stream and search filters to the results
//         return results.filter(uni => {
//             const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 uni.location.toLowerCase().includes(searchTerm.toLowerCase());

//             // THE FIX: Check if the university's 'streams' array includes the filter
//             // This correctly handles universities with multiple streams
//             const matchesStream = streamFilter === 'All' || (uni.streams && uni.streams.includes(streamFilter));

//             return matchesSearch && matchesStream;
//         });
//     }, [universities, searchTerm, streamFilter, filterQuery]);

//     // This memoized value dynamically creates the list of options for the filter dropdown
//     const allStreams = useMemo(() => {
//         const streamSet = new Set(['All']);
//         universities.forEach(uni => {
//             if (uni.streams) {
//                 uni.streams.forEach(stream => {
//                     if (stream) streamSet.add(stream);
//                 });
//             }
//         });
//         return Array.from(streamSet);
//     }, [universities]);

//     return (
//         <div className="container mx-auto px-6 py-12">
//             <h1 className="text-4xl font-bold text-center mb-4">Find Your University</h1>
//             <p className="text-text-secondary text-center mb-8 max-w-2xl mx-auto">
//                 Explore our curated list of top institutions. Use the filters below to find the perfect match for your career goals.
//             </p>

//             <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm py-4 mb-8 rounded-lg">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="relative flex-grow">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search by name or location..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full bg-primary border-2 border-secondary rounded-lg p-3 pl-12 focus:outline-none focus:border-accent"
//                         />
//                     </div>
//                     <div className="relative flex-shrink-0">
//                         <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
//                         <select
//                             value={streamFilter}
//                             onChange={(e) => setStreamFilter(e.target.value)}
//                             className="w-full md:w-auto bg-primary border-2 border-secondary rounded-lg p-3 pl-12 pr-8 appearance-none focus:outline-none focus:border-accent"
//                         >
//                             {allStreams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {loading ? (
//                 <div className="text-center py-10">Loading universities...</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                     {filteredUniversities.length > 0 ? (
//                         filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
//                     ) : (
//                         <p className="col-span-full text-center text-text-secondary py-10">No universities match your criteria.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// // The main page component that gets exported
// export default function UniversitiesPage() {
//     return (
//         <>
//             <Header />
//             <main className="pt-24 min-h-screen bg-background">
//                 <Suspense fallback={<div className="text-center text-text-secondary py-10">Loading filters...</div>}>
//                     <UniversityFilterComponent />
//                 </Suspense>
//             </main>
//             <Footer />
//         </>
//     );
// }




"use client";
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UniversityCard from '../components/UniversityCard';
import api from '../utils/api';
import { Search } from 'lucide-react';

// A new component to handle the logic, wrapped in Suspense
const UniversityFilterComponent = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [streamFilter, setStreamFilter] = useState('All');

    const searchParams = useSearchParams();
    const streamQuery = searchParams.get('stream');
    const filterQuery = searchParams.get('filter');
    const searchQuery = searchParams.get('search');
    const cityQuery = searchParams.get('city');

    useEffect(() => {
        let initialStream = 'All';
        if (streamQuery) {
            const formattedStream = streamQuery.charAt(0).toUpperCase() + streamQuery.slice(1).replace('-', ' ');
            initialStream = formattedStream;
        }
        setStreamFilter(initialStream);
        setSearchTerm(searchQuery || cityQuery || '');

        const fetchUniversities = async () => {
            setLoading(true);
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
        // Only URL queries drive initial state; the university fetch is unfiltered,
        // so typing in the search box must not re-trigger it.
    }, [streamQuery, searchQuery, cityQuery]);

    const filteredUniversities = useMemo(() => {
        let results = universities;

        if (filterQuery === 'top') {
            const topPerStream = new Map();
            universities.forEach(uni => {
                if (uni.streams) {
                    uni.streams.forEach(stream => {
                        if (stream && (!topPerStream.has(stream) || uni.rating > topPerStream.get(stream).rating)) {
                            topPerStream.set(stream, uni);
                        }
                    });
                }
            });
            const uniqueTopUnis = Array.from(new Set(topPerStream.values()));
            results = uniqueTopUnis;
        }

        return results.filter(uni => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = !term || uni.name.toLowerCase().includes(term) ||
                uni.location.toLowerCase().includes(term) ||
                (uni.streams || []).some(s => s.toLowerCase().includes(term));
            const matchesStream = streamFilter === 'All' || (uni.streams && uni.streams.includes(streamFilter));
            return matchesSearch && matchesStream;
        });
    }, [universities, searchTerm, streamFilter, filterQuery]);

    const allStreams = useMemo(() => {
        const streamSet = new Set(['All']);
        universities.forEach(uni => {
            if (uni.streams) {
                uni.streams.forEach(stream => {
                    if (stream) streamSet.add(stream);
                });
            }
        });
        return Array.from(streamSet);
    }, [universities]);

    return (
        <div className="relative overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-16rem] h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[140px]" />
            <div className="container relative mx-auto px-5 py-14 sm:px-6 md:py-20">
                <span className="eyebrow">Campus catalogue</span>
                <h1 className="mt-4 max-w-3xl text-display-md font-bold text-text">
                    Find the campus{' '}
                    <span className="font-editorial italic font-normal text-gradient">your scores deserve.</span>
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
                    Every listing carries verified fees, cutoffs and placement records — filter by stream,
                    search by name or city, and apply when your profile is ready.
                </p>

                <div className="surface sticky top-24 z-40 mt-10 p-4 backdrop-blur-xl md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={17} aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search by name, city or stream…"
                                aria-label="Search universities"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="field pl-11"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by stream">
                            {allStreams.map(stream => (
                                <button
                                    key={stream}
                                    type="button"
                                    onClick={() => setStreamFilter(stream)}
                                    aria-pressed={streamFilter === stream}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                                        streamFilter === stream
                                            ? 'bg-brand-gradient text-white shadow-glow'
                                            : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-600 dark:text-text-secondary hover:border-slate-300 dark:hover:border-brand-400/40 hover:text-slate-900 dark:hover:text-text shadow-xs dark:shadow-none'
                                    }`}
                                >
                                    {stream}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="surface h-80 animate-pulse p-6">
                                <div className="h-36 w-full rounded-xl bg-white/[0.06]" />
                                <div className="mt-5 h-5 w-2/3 rounded bg-white/[0.07]" />
                                <div className="mt-3 h-3 w-full rounded bg-white/[0.05]" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted" aria-live="polite">
                            {filteredUniversities.length} {filteredUniversities.length === 1 ? 'campus' : 'campuses'}
                            {searchTerm ? ` matching “${searchTerm}”` : ''}
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredUniversities.length > 0 ? (
                                filteredUniversities.map(uni => <UniversityCard key={uni.id} university={uni} />)
                            ) : (
                                <div className="surface col-span-full flex flex-col items-center gap-4 p-14 text-center">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300">
                                        <Search size={24} />
                                    </span>
                                    <p className="font-display text-lg font-bold text-text">No campuses match that search.</p>
                                    <p className="max-w-md text-sm text-text-secondary">
                                        Try a different name, city or stream — or ask a counsellor to build the shortlist for you.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => { setSearchTerm(''); setStreamFilter('All'); }}
                                        className="btn-ghost btn-sm"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default function UniversitiesPage() {
    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen bg-background">
                <Suspense fallback={
                    <div className="container mx-auto px-5 py-14">
                        <div className="h-10 w-64 rounded bg-secondary/70 animate-pulse mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="surface h-72 rounded-xl bg-secondary/30 border border-secondary/40 p-5 space-y-4 animate-pulse">
                                    <div className="h-32 rounded-lg bg-secondary/50" />
                                    <div className="h-5 w-3/4 rounded bg-secondary/60" />
                                    <div className="h-3 w-1/2 rounded bg-secondary/40" />
                                </div>
                            ))}
                        </div>
                    </div>
                }>
                    <UniversityFilterComponent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}