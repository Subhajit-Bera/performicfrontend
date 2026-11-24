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
    const [error, setError] = useState(null);

    const fetchExams = () => {
        setLoading(true);
        setError(null);
        api.get('/admin/exams', { params: { limit: 100 } })
            .then(res => setExams(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(err => setError(err.response?.data?.message || "Failed to fetch exams."))
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Exams</h1>
                <Link href="/admin/exams/add" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base">
                    <Plus size={18} /> Add Exam
                </Link>
            </div>
            
            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchExams} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">Retry</button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[640px]">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Level</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-text-secondary">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : exams.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-text-secondary">No exams found.</td>
                                </tr>
                            ) : (
                                exams.map(exam => (
                                    <tr key={exam.id} className="border-b border-secondary hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 font-medium text-text">{exam.name}</td>
                                        <td className="p-4 text-text-secondary">{exam.exam_date || 'TBD'}</td>
                                        <td className="p-4 text-text-secondary">{exam.exam_level || 'N/A'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link href={`/admin/exams/edit/${exam.id}`} aria-label={`Edit ${exam.name}`} className="text-text-secondary hover:text-accent p-1.5 rounded hover:bg-secondary/50 transition-colors">
                                                    <Edit size={16} aria-hidden="true" />
                                                </Link>
                                                <button onClick={() => handleDelete(exam.id)} aria-label={`Delete ${exam.name}`} className="text-text-secondary hover:text-red-500 p-1.5 rounded hover:bg-secondary/50 transition-colors">
                                                    <Trash2 size={16} aria-hidden="true" />
                                                </button>
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
