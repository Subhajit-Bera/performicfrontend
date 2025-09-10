"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function ManageAgentsPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/agents').then(res => setAgents(res.data)).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Agents</h1>
            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto">
                <table className="w-full text-left text-sm">
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
                        ) : agents.map(agent => (
                            <tr key={agent.id} className="border-b border-secondary">
                                <td className="p-4">{agent.full_name}</td>
                                <td className="p-4">{agent.email}</td>
                                <td className="p-4">{agent.phone_number || 'N/A'}</td>
                                <td className="p-4 text-center">{agent.referral_count}</td>
                                <td className="p-4">
                                    <Link href={`/admin/agents/${agent.id}`} className="text-accent hover:underline">
                                        <Eye size={18} />
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