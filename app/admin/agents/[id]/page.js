"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../utils/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { TableSkeleton } from '@/app/components/Skeleton';

export default function AgentDetailPage() {
    const [agentData, setAgentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchAgentDetails = useCallback(() => {
        api.get(`/admin/agents/${id}`)
            .then(res => setAgentData(res.data))
            .catch(err => toast.error(err.response?.data?.message || 'Could not load this agent.'))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (id) fetchAgentDetails();
    }, [id, fetchAgentDetails]);

    const handleStatusChange = (referralId, status) => {
        toast.promise(api.put(`/admin/referrals/${referralId}/status`, { status }), {
            loading: 'Updating status...',
            success: () => {
                fetchAgentDetails();
                return 'Status updated successfully.';
            },
            error: 'Failed to update status.'
        });
    };

    if (loading) {
        return (
            <div>
                <div className="h-4 w-32 rounded bg-secondary/60 animate-pulse mb-4" />
                <div className="h-8 w-64 rounded bg-secondary/70 animate-pulse mb-2" />
                <div className="h-4 w-44 rounded bg-secondary/50 animate-pulse mb-8" />
                <div className="h-6 w-48 rounded bg-secondary/60 animate-pulse mb-4" />
                <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                    <table className="w-full text-left text-sm min-w-[500px]">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="p-4">Student Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableSkeleton rows={4} cols={3} colWidths={['35%', '40%', '25%']} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    if (!agentData) return <div>Agent not found.</div>;

    return (
         <div>
            <Link href="/admin/agents" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
                <ChevronLeft size={18} /> Back to Agents List
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Agent: {agentData.agent.full_name}</h1>
            <p className="text-text-secondary text-sm sm:text-base mb-6 sm:mb-8">{agentData.agent.email}</p>

            <h2 className="text-xl sm:text-2xl font-bold mb-4">Referred Students</h2>
            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[500px]">
                     <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">Student Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                     <tbody>
                        {agentData.referrals.length === 0 ? (
                            <tr><td colSpan="3" className="text-center p-4 text-text-secondary">This agent has no referrals.</td></tr>
                        ) : agentData.referrals.map(ref => (
                            <tr key={ref.id} className="border-b border-secondary">
                                <td className="p-4">{ref.full_name}</td>
                                <td className="p-4">{ref.email}</td>
                                <td className="p-4">
                                     <select 
                                        value={ref.referral_status} 
                                        onChange={(e) => handleStatusChange(ref.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        <option value="Referred">Referred</option>
                                        <option value="Converted">Converted</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}