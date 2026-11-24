"use client";
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';

const APPOINTMENT_STATUSES = ['Booked', 'Called', 'Converted', 'Completed', 'Cancelled', 'No Show'];

export default function ManageAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = useCallback(() => {
        setLoading(true);
        setError(null);
        api.get('/admin/appointments', { params: { limit: 100 } })
            .then(res => setAppointments(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(err => setError(err.response?.data?.message || 'Could not load appointments.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleStatusChange = (id, status) => {
        toast.promise(api.put(`/admin/appointments/${id}/status`, { status }), {
            loading: 'Updating status...',
            success: () => {
                fetchAppointments();
                return 'Status updated successfully.';
            },
            error: (err) => {
                fetchAppointments();
                return err.response?.data?.message || 'Failed to update status.';
            },
        });
    };

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Appointments</h1>

            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchAppointments} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">
                        Retry
                    </button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[700px]">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Date &amp; Time</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center p-4">Loading appointments...</td></tr>
                        ) : appointments.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-4 text-text-secondary">No appointments found.</td></tr>
                        ) : appointments.map(app => (
                            <tr key={app.id} className="border-b border-secondary">
                                <td className="p-4">{app.full_name}<br /><span className="text-text-secondary">{app.email}</span></td>
                                <td className="p-4">{new Date(app.appointment_date).toLocaleString()}</td>
                                <td className="p-4">{app.phone_number || 'N/A'}</td>
                                <td className="p-4">{app.choice_of_stream || 'N/A'}<br /><span className="text-text-secondary">{app.state_hometown}</span></td>
                                <td className="p-4">
                                    <select
                                        value={app.status}
                                        aria-label={`Appointment status for ${app.full_name}`}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        {APPOINTMENT_STATUSES.map(status => (
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
