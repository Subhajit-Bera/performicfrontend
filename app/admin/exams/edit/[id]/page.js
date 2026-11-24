// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import ExamForm from '../../ExamForm';
// import api from '../../../../utils/api';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import { ChevronLeft } from 'lucide-react';

// export default function EditExamPage() {
//     const router = useRouter();
//     const { id } = useParams();
//     const [examData, setExamData] = useState(null);

//     useEffect(() => {
//         if (id) {
//             api.get(`/admin/exams/${id}`)
//                 .then(res => setExamData(res.data))
//                 .catch(() => toast.error("Failed to fetch exam data."));
//         }
//     }, [id]);

//     const handleSave = async (data) => {
//         try {
//             await api.put(`/admin/exams/${id}`, data);
//             toast.success("Exam updated successfully!");
//             router.push('/admin/exams');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to update exam.");
//             throw error;
//         }
//     };

//     return (
//         <div>
//             <Link href="/admin/exams" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
//                 <ChevronLeft size={18} /> Back to Exams
//             </Link>
//             <h1 className="text-3xl font-bold mb-8">Edit Exam</h1>
//             <div className="bg-primary p-8 rounded-xl border border-secondary">
//                 {examData ? (
//                     <ExamForm onSave={handleSave} initialData={examData} />
//                 ) : (
//                     <div>Loading form...</div>
//                 )}
//             </div>
//         </div>
//     );
// }




"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ExamForm from '../../ExamForm';
import api from '../../../../utils/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function EditExamPage() {
    const router = useRouter();
    const { id } = useParams();
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // THE FIX: Call the new admin-specific route
            api.get(`/admin/exams/${id}`)
                .then(res => setExamData(res.data))
                .catch(() => toast.error("Failed to fetch exam data."))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSave = async (data) => {
        try {
            await api.put(`/admin/exams/${id}`, data);
            toast.success("Exam updated successfully!");
            router.push('/admin/exams');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update exam.");
            throw error;
        }
    };

    return (
        <div>
            <Link href="/admin/exams" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
                <ChevronLeft size={18} /> Back to Exams
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Edit Exam</h1>
            <div className="bg-primary p-4 sm:p-6 lg:p-8 rounded-xl border border-secondary shadow-sm">
                {loading ? (
                    <div>Loading form...</div>
                ) : examData ? (
                    <ExamForm onSave={handleSave} initialData={examData} />
                ) : (
                    <div>Exam not found.</div>
                )}
            </div>
        </div>
    );
}