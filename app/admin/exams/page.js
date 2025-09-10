"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Loader from '@/app/components/Loader';

export default function ManageExamsPage() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExams = () => {
        setLoading(true);
        api.get('/admin/exams')
            .then(res => setExams(res.data))
            .catch(err => toast.error("Failed to fetch exams."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this exam? This action cannot be undone.")) {
            const deletePromise = api.delete(`/admin/exams/${id}`);
            toast.promise(deletePromise, {
                loading: 'Deleting exam...',
                success: () => {
                    fetchExams(); // Refresh the list
                    return 'Exam deleted successfully.';
                },
                error: 'Failed to delete exam.',
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Exams</h1>
                <Link href="/admin/exams/add" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <Plus size={20} /> Add Exam
                </Link>
            </div>
            
            <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="p-4 font-semibold text-sm">Exam Name</th>
                                <th className="p-4 font-semibold text-sm">Exam Date</th>
                                <th className="p-4 font-semibold text-sm">Level</th>
                                <th className="p-4 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <Loader/>
                            ) : exams.length === 0 ? (
                                <tr><td colSpan="4" className="text-center p-4 text-text-secondary">No exams found.</td></tr>
                            ) : (
                                exams.map(exam => (
                                    <tr key={exam.id} className="border-b border-secondary">
                                        <td className="p-4 text-text">{exam.name}</td>
                                        <td className="p-4 text-text-secondary">{exam.exam_date}</td>
                                        <td className="p-4 text-text-secondary">{exam.exam_level}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link href={`/admin/exams/edit/${exam.id}`} className="text-text-secondary hover:text-accent p-1"><Edit size={16}/></Link>
                                                <button onClick={() => handleDelete(exam.id)} className="text-text-secondary hover:text-red-500 p-1"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}