"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';

export default function ManageAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = () => {
        api.get('/admin/appointments').then(res => setAppointments(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusChange = (id, status) => {
        toast.promise(api.put(`/admin/appointments/${id}/status`, { status }), {
            loading: 'Updating status...',
            success: () => {
                fetchAppointments();
                return 'Status updated successfully.';
            },
            error: 'Failed to update status.'
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Appointments</h1>
             <div className="bg-primary border border-secondary rounded-xl overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                         {loading ? (
                             <tr><td colSpan="5" className="text-center p-4">Loading appointments...</td></tr>
                        ) : appointments.map(app => (
                            <tr key={app.id} className="border-b border-secondary">
                                <td className="p-4">{app.full_name}<br/><span className="text-text-secondary">{app.email}</span></td>
                                <td className="p-4">{new Date(app.appointment_date).toLocaleString()}</td>
                                <td className="p-4">{app.phone_number || 'N/A'}</td>
                                <td className="p-4">{app.choice_of_stream || 'N/A'}<br/><span className="text-text-secondary">{app.state_hometown}</span></td>
                                <td className="p-4">
                                     <select 
                                        value={app.status} 
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        <option value="Booked">Booked</option>
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