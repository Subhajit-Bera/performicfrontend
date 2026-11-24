"use client";
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function ManageAgentsPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAgents = useCallback(() => {
        setLoading(true);
        setError(null);
        api.get('/admin/agents', { params: { limit: 100 } })
            .then(res => setAgents(res.data.data ?? res.data))
            .catch(err => setError(err.response?.data?.message || 'Could not load agents.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Agents</h1>

            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchAgents} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">
                        Retry
                    </button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">Agent Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Students Referred</th>
                            <th className="p-4">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center p-4">Loading agents...</td></tr>
                        ) : agents.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-4 text-text-secondary">No agents found.</td></tr>
                        ) : agents.map(agent => (
                            <tr key={agent.id} className="border-b border-secondary">
                                <td className="p-4">{agent.full_name}</td>
                                <td className="p-4">{agent.email}</td>
                                <td className="p-4">{agent.phone_number || 'N/A'}</td>
                                <td className="p-4 text-center">{agent.referral_count}</td>
                                <td className="p-4">
                                    <Link href={`/admin/agents/${agent.id}`} aria-label={`View referrals for ${agent.full_name}`} className="text-accent hover:underline">
                                        <Eye size={18} aria-hidden="true" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
