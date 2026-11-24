"use client";
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'sonner';
import { TableSkeleton } from '@/app/components/Skeleton';

export default function MyReferralsPage() {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/agent/my-referrals', { params: { limit: 100 } })
            .then(res => setReferrals(res.data.data ?? res.data))
            .catch(() => toast.error("Failed to fetch your referrals."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Referrals</h1>
            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[600px]">
                     <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Stream Choice</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <TableSkeleton rows={5} cols={5} colWidths={['25%', '30%', '20%', '20%', '15%']} />
                        ) : referrals.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-4 text-text-secondary">You have not referred any students yet.</td></tr>
                        ) : (
                            referrals.map(user => (
                                <tr key={user.id} className="border-b border-secondary">
                                    <td className="p-4">{user.full_name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.phone_number || 'N/A'}</td>
                                    <td className="p-4">{user.choice_of_stream || 'N/A'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            user.referral_status === 'Converted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {user.referral_status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}