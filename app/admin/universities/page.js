"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Loader from '@/app/components/Loader';

export default function ManageUniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUniversities = () => {
        setLoading(true);
        setError(null);
        api.get('/admin/universities', { params: { limit: 100 } })
            .then(res => setUniversities(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(err => setError(err.response?.data?.message || "Failed to fetch universities."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this university? This action cannot be undone.")) {
            const deletePromise = api.delete(`/admin/universities/${id}`);
            toast.promise(deletePromise, {
                loading: 'Deleting university...',
                success: () => {
                    fetchUniversities(); // Refresh the list
                    return 'University deleted successfully.';
                },
                error: 'Failed to delete university.',
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Universities</h1>
                <Link href="/admin/universities/add" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base">
                    <Plus size={18} /> Add University
                </Link>
            </div>
            
            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchUniversities} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">Retry</button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[640px]">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Location</th>
                                <th className="p-4 font-semibold">Streams</th>
                                <th className="p-4 font-semibold">Rating</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-text-secondary">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : universities.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-text-secondary">No universities found.</td>
                                </tr>
                            ) : (
                                universities.map(uni => (
                                    <tr key={uni.id} className="border-b border-secondary hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 font-medium text-text">{uni.name}</td>
                                        <td className="p-4 text-text-secondary">{uni.location}</td>
                                        <td className="p-4 text-text-secondary max-w-xs truncate" title={uni.stream_names?.join(', ')}>
                                            {uni.stream_names?.join(', ') || 'N/A'}
                                        </td>
                                        <td className="p-4 text-text-secondary">{uni.rating || 'N/A'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link href={`/admin/universities/edit/${uni.id}`} aria-label={`Edit ${uni.name}`} className="text-text-secondary hover:text-accent p-1.5 rounded hover:bg-secondary/50 transition-colors">
                                                    <Edit size={16} aria-hidden="true" />
                                                </Link>
                                                <button onClick={() => handleDelete(uni.id)} aria-label={`Delete ${uni.name}`} className="text-text-secondary hover:text-red-500 p-1.5 rounded hover:bg-secondary/50 transition-colors">
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
