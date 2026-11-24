"use client";
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';
import { TableSkeleton } from '@/app/components/Skeleton';

const APPLICATION_STATUSES = ['Applied', 'Called', 'Converted', 'Rejected'];

export default function ManageApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = useCallback(() => {
        setLoading(true);
        setError(null);
        api.get('/admin/applications', { params: { limit: 100 } })
            .then(res => setApplications(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(err => setError(err.response?.data?.message || 'Could not load applications.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleStatusChange = (id, status) => {
        toast.promise(api.put(`/admin/applications/${id}`, { status }), {
            loading: 'Updating status...',
            success: () => {
                fetchApplications();
                return 'Status updated successfully.';
            },
            // The API rejects impossible transitions with an explanation; refresh so the
            // select snaps back to the stored value.
            error: (err) => {
                fetchApplications();
                return err.response?.data?.message || 'Failed to update status.';
            },
        });
    };

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Applications</h1>

            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchApplications} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">
                        Retry
                    </button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[640px]">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">University</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <TableSkeleton rows={5} cols={4} colWidths={['35%', '30%', '20%', '15%']} />
                        ) : applications.length === 0 ? (
                            <tr><td colSpan="4" className="text-center p-4 text-text-secondary">No applications found.</td></tr>
                        ) : applications.map(app => (
                            <tr key={app.id} className="border-b border-secondary">
                                <td className="p-4">{app.full_name}<br /><span className="text-text-secondary">{app.email}</span></td>
                                <td className="p-4">{app.university_name}</td>
                                <td className="p-4">{app.phone_number || 'N/A'}</td>
                                <td className="p-4">
                                    <select
                                        value={app.status}
                                        aria-label={`Application status for ${app.full_name}`}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        {APPLICATION_STATUSES.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
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
