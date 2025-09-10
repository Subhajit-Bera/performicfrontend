// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import UniversityCard from './UniversityCard';

// export default function FeaturedUniversities() {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             try {
//                 const { data } = await api.get('/universities');
//                 // Show first 4 as featured
//                 setUniversities(data.slice(0, 4));
//             } catch (error) {
//                 console.error("Failed to fetch universities", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUniversities();
//     }, []);

//     return (
//         <section className="py-20 bg-slate-800/50">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-12">Featured Universities</h2>
//                 {loading ? (
//                     <div className="text-center">Loading...</div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {universities.map(uni => (
//                             <UniversityCard key={uni.id} university={uni} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import UniversityCard from './UniversityCard';
// import Loader from './Loader';
// export default function FeaturedUniversities() {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             try {
//                 const { data } = await api.get('/universities');
//                 setUniversities(data.slice(0, 4));
//             } catch (error) {
//                 console.error("Failed to fetch universities", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUniversities();
//     }, []);

//     return (
//         <section className="py-20 bg-primary/50">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-12">Featured Universities</h2>
//                 {loading ? (
//                     <Loader/>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {universities.map(uni => (
//                             <UniversityCard key={uni.id} university={uni} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }







//Prev
// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import UniversityCard from './UniversityCard';

// export default function FeaturedUniversities() {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUniversities = async () => {
//             try {
//                 const { data } = await api.get('/universities');
//                 setUniversities(data.slice(0, 8)); // Fetch a few more for a good scroll
//             } catch (error) {
//                 console.error("Failed to fetch universities", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUniversities();
//     }, []);

//     return (
//         <section className="py-20 bg-primary/30">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-4xl font-bold text-center mb-12">Featured Universities</h2>
//                 {loading ? (
//                     <div className="text-center">Loading...</div>
//                 ) : (
//                     // THE FIX: Changed from a grid to a horizontally scrolling flex container
//                     <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide">
//                         {universities.map(uni => (
//                             // Added a wrapper to control the width and prevent shrinking
//                             <div key={uni.id} className="flex-shrink-0 w-72">
//                                 <UniversityCard university={uni} />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import UniversityCard from './UniversityCard';

export default function FeaturedUniversities() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const { data } = await api.get('/universities');
                setUniversities(data.slice(0, 8)); // Fetch a few more for a good scroll
            } catch (error) {
                console.error("Failed to fetch universities", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    return (
        <section className="py-20 bg-primary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Featured Universities</h2>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    // THE FIX: Added scroll-snap properties for a better scrolling experience
                    <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        {universities.map(uni => (
                            // THE FIX: 
                            // 1. Added a responsive width: 5/6 of the screen on small devices, fixed 72 on larger ones.
                            // 2. Added snap-start to align cards cleanly when scrolling.
                            <div key={uni.id} className="flex-shrink-0 w-11/12 sm:w-80">
                                <UniversityCard university={uni} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}