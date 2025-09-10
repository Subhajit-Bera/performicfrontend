// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import UniversityCard from '../../../components/UniversityCard';
// import api from '../../../utils/api';

// export default function CollegeListPage() {
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [title, setTitle] = useState('');
//     const params = useParams();

//     useEffect(() => {
//         const { city, stream } = params;
//         if (city && stream) {
//             // Format for display title
//             const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
//             const formattedStream = stream.charAt(0).toUpperCase() + stream.slice(1);
//             setTitle(`Top ${formattedStream} Colleges in ${formattedCity}`);

//             api.get('/universities')
//                 .then(res => {
//                     const filtered = res.data.filter(uni => 
//                         uni.location.toLowerCase().includes(city.toLowerCase()) &&
//                         (uni.streams && uni.streams.some(s => s.toLowerCase().includes(stream.toLowerCase())))
//                     );
//                     setUniversities(filtered);
//                 })
//                 .catch(err => console.error(err))
//                 .finally(() => setLoading(false));
//         }
//     }, [params]);

//     return (
//         <>
//             <Header />
//             <main className="pt-24 bg-background min-h-screen">
//                 <div className="container mx-auto px-6 py-12">
//                     <h1 className="text-4xl font-bold mb-8">{title}</h1>
//                      {loading ? (
//                         <div className="text-center py-10">Loading colleges...</div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                             {universities.length > 0 ? (
//                                 universities.map(uni => <UniversityCard key={uni.id} university={uni} />)
//                             ) : (
//                                 <p className="col-span-full text-center text-text-secondary py-10">No colleges found for this criteria.</p>
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UniversityCard from '../../../components/UniversityCard';
import api from '../../../utils/api';

export default function CollegeListPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const params = useParams();

    useEffect(() => {
        const { city, stream } = params;
        if (city && stream) {
            const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
            const formattedStream = stream.charAt(0).toUpperCase() + stream.slice(1);
            setTitle(`Top ${formattedStream} Colleges in ${formattedCity}`);

            api.get('/universities')
                .then(res => {
                    const filtered = res.data.filter(uni => 
                        uni.location.toLowerCase().includes(city.toLowerCase()) &&
                        (uni.streams && uni.streams.some(s => s.toLowerCase().includes(stream.toLowerCase())))
                    );
                    setUniversities(filtered);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [params]);

    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold mb-8">{title}</h1>
                     {loading ? (
                        <div className="text-center py-10">Loading colleges...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {universities.length > 0 ? (
                                universities.map(uni => <UniversityCard key={uni.id} university={uni} />)
                            ) : (
                                <p className="col-span-full text-center text-text-secondary py-10">No colleges found for this criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}