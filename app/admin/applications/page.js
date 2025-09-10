"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';

export default function ManageApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = () => {
        api.get('/admin/applications').then(res => setApplications(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = (id, status) => {
        toast.promise(api.put(`/admin/applications/${id}`, { status }), {
            loading: 'Updating status...',
            success: () => {
                fetchApplications();
                return 'Status updated successfully.';
            },
            error: 'Failed to update status.'
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Applications</h1>
            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto">
                <table className="w-full text-left text-sm">
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
                             <tr><td colSpan="4" className="text-center p-4">Loading applications...</td></tr>
                        ) : applications.map(app => (
                            <tr key={app.id} className="border-b border-secondary">
                                <td className="p-4">{app.full_name}<br/><span className="text-text-secondary">{app.email}</span></td>
                                <td className="p-4">{app.university_name}</td>
                                <td className="p-4">{app.phone_number || 'N/A'}</td>
                                <td className="p-4">
                                     <select 
                                        value={app.status} 
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Called">Called</option>
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