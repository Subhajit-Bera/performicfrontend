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
                setUniversities(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch universities", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    return (
        <section className="py-20 bg-primary/50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Featured Universities</h2>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {universities.map(uni => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}