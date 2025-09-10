// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import UniversityCard from '../../components/UniversityCard';
// import api from '../../utils/api';

// export default function CourseDetailPage() {
//     const [course, setCourse] = useState(null);
//     const [universities, setUniversities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { slug } = useParams();

//     useEffect(() => {
//         if (slug) {
//             api.get(`/courses/${slug}`)
//                 .then(res => {
//                     setCourse(res.data.course);
//                     setUniversities(res.data.universities);
//                 })
//                 .catch(err => console.error(err))
//                 .finally(() => setLoading(false));
//         }
//     }, [slug]);

//     if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

//     return (
//         <>
//             <Header />
//             <main className="pt-24 bg-background min-h-screen">
//                 <div className="container mx-auto px-6 py-12">
//                     <div className="bg-primary p-8 rounded-xl border border-secondary mb-12">
//                         <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
//                         <p className="text-text-secondary">{course.description}</p>
//                     </div>
                    
//                     <h2 className="text-3xl font-bold mb-8">Colleges Offering {course.name}</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                         {universities.map(uni => (
//                             <UniversityCard key={uni.id} university={uni} />
//                         ))}
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
import UniversityCard from '../../components/UniversityCard';
import api from '../../utils/api';

export default function CourseDetailPage() {
    const [course, setCourse] = useState(null);
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            api.get(`/courses/${slug}`)
                .then(res => {
                    setCourse(res.data.course);
                    setUniversities(res.data.universities);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

    return (
        <>
            <Header />
            <main className="pt-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 py-12">
                    <div className="bg-primary p-8 rounded-xl border border-secondary mb-12">
                        <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
                        <p className="text-text-secondary">{course.description}</p>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-8">Colleges Offering {course.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {universities.map(uni => (
                            <UniversityCard key={uni.id} university={uni} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}