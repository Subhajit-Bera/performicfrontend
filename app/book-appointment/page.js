"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { Calendar, PenSquare, Loader2, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'sonner';
import Loader from '@/app/components/Loader';

export default function BookAppointmentPage() {
    const { isAuthenticated, loading, profileCompletion } = useAuth();
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [myAppointments, setMyAppointments] = useState([]);
    const [fetchingAppts, setFetchingAppts] = useState(false);
    const [activeTab, setActiveTab] = useState('book'); // 'book' | 'my-sessions'

    const fetchUserAppointments = useCallback(async () => {
        if (!isAuthenticated) return;
        setFetchingAppts(true);
        try {
            const { data } = await api.get('/users/appointments');
            setMyAppointments(data);
        } catch (err) {
            console.error('Failed to fetch user appointments:', err);
        } finally {
            setFetchingAppts(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserAppointments();
        }
    }, [isAuthenticated, fetchUserAppointments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!date) {
            toast.error('Please select an appointment date and time.');
            return;
        }

        const selectedDate = new Date(date);
        if (selectedDate <= new Date()) {
            toast.error('Please select a future date and time for counseling.');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/users/book-appointment', { date, notes });
            toast.success('Counseling appointment scheduled successfully!');
            setDate('');
            setNotes('');
            fetchUserAppointments();
            setActiveTab('my-sessions');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to book appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = async (appointmentId) => {
        if (!confirm('Are you sure you want to cancel this scheduled session?')) return;
        try {
            await api.put(`/users/appointments/${appointmentId}/cancel`);
            toast.success('Appointment cancelled successfully.');
            fetchUserAppointments();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to cancel appointment.');
        }
    };

    const setQuickSlot = (daysAhead, hour, minute = 0) => {
        const target = new Date();
        target.setDate(target.getDate() + daysAhead);
        target.setHours(hour, minute, 0, 0);
        // Format to YYYY-MM-DDTHH:mm for datetime-local
        const pad = (n) => String(n).padStart(2, '0');
        const formatted = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(target.getHours())}:${pad(target.getMinutes())}`;
        setDate(formatted);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Booked':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"><Clock size={12} /> Scheduled</span>;
            case 'Called':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30"><CheckCircle2 size={12} /> Counselor Contacted</span>;
            case 'Converted':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30"><CheckCircle2 size={12} /> Admission In Progress</span>;
            case 'Cancelled':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30"><XCircle size={12} /> Cancelled</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-text-secondary">{status}</span>;
        }
    };

    if (loading) return <Loader />;

    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen bg-background pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-text">Counseling & Guidance Scheduler</h1>
                        <p className="text-text-secondary max-w-xl mx-auto">
                            Schedule a dedicated one-on-one session with our verified academic and career advisors.
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    {isAuthenticated && (
                        <div className="flex border-b border-secondary mb-8 justify-center gap-4">
                            <button
                                onClick={() => setActiveTab('book')}
                                className={`pb-3 px-6 font-semibold transition-colors flex items-center gap-2 ${
                                    activeTab === 'book'
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-text-secondary hover:text-text'
                                }`}
                            >
                                <Calendar size={18} /> Book a Session
                            </button>
                            <button
                                onClick={() => setActiveTab('my-sessions')}
                                className={`pb-3 px-6 font-semibold transition-colors flex items-center gap-2 ${
                                    activeTab === 'my-sessions'
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-text-secondary hover:text-text'
                                }`}
                            >
                                <Clock size={18} /> My Sessions ({myAppointments.length})
                            </button>
                        </div>
                    )}

                    {!isAuthenticated ? (
                        <div className="max-w-md mx-auto bg-primary rounded-xl p-8 border border-secondary text-center shadow-lg">
                            <AlertCircle size={48} className="mx-auto text-accent mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Sign in to Schedule</h2>
                            <p className="text-text-secondary mb-6 text-sm">
                                Create an account or log in to book a session and manage your advising appointments.
                            </p>
                            <Link href="/login" className="inline-block w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Sign In / Register
                            </Link>
                        </div>
                    ) : profileCompletion < 100 ? (
                        <div className="max-w-lg mx-auto bg-primary rounded-xl p-8 border border-secondary text-center shadow-lg">
                            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                {profileCompletion}%
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Complete Your Profile First</h2>
                            <p className="text-text-secondary mb-6 text-sm">
                                Please finish setting up your preferred stream and entry level so our counselors can review your background before the call.
                            </p>
                            <Link href="/profile?action=complete&redirect=/book-appointment" className="inline-block bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors">
                                Complete Profile
                            </Link>
                        </div>
                    ) : activeTab === 'book' ? (
                        <div className="max-w-xl mx-auto bg-primary rounded-xl p-8 border border-secondary shadow-xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text">
                                <Calendar className="text-accent" size={22} /> Select Time & Details
                            </h2>

                            {/* Quick Slot Shortcuts */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                                    Suggested Slots (Next 48 Hours)
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setQuickSlot(1, 10, 0)}
                                        className="text-xs p-2.5 rounded-lg border border-secondary/70 bg-secondary/20 hover:bg-accent/20 hover:border-accent text-text transition-all"
                                    >
                                        Tomorrow 10:00 AM
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setQuickSlot(1, 14, 0)}
                                        className="text-xs p-2.5 rounded-lg border border-secondary/70 bg-secondary/20 hover:bg-accent/20 hover:border-accent text-text transition-all"
                                    >
                                        Tomorrow 2:00 PM
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setQuickSlot(2, 11, 0)}
                                        className="text-xs p-2.5 rounded-lg border border-secondary/70 bg-secondary/20 hover:bg-accent/20 hover:border-accent text-text transition-all"
                                    >
                                        In 2 Days 11:00 AM
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-text mb-2">
                                        Custom Date & Time *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                        <input
                                            type="datetime-local"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent text-text"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-text mb-2">
                                        Counseling Topic / Questions (Optional)
                                    </label>
                                    <div className="relative">
                                        <PenSquare className="absolute left-3 top-4 text-text-secondary" size={20} />
                                        <textarea
                                            id="notes"
                                            rows="4"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="What would you like to discuss? (e.g. B.Tech vs BCA, entrance cutoffs, scholarship opportunities...)"
                                            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent text-text"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent text-white font-bold py-3.5 rounded-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-2 disabled:bg-accent/50 shadow-lg cursor-pointer"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Calendar size={20} />}
                                    <span>Confirm & Schedule Session</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* My Sessions Dashboard Tab */
                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Your Scheduled Sessions</h2>
                                <button
                                    onClick={fetchUserAppointments}
                                    disabled={fetchingAppts}
                                    className="text-xs flex items-center gap-1.5 text-accent hover:underline cursor-pointer"
                                >
                                    <RefreshCw size={14} className={fetchingAppts ? 'animate-spin' : ''} /> Refresh
                                </button>
                            </div>

                            {fetchingAppts && myAppointments.length === 0 ? (
                                <div className="text-center py-12 text-text-secondary">Loading appointments...</div>
                            ) : myAppointments.length === 0 ? (
                                <div className="text-center py-12 bg-primary rounded-xl border border-secondary p-8">
                                    <Calendar size={48} className="mx-auto text-secondary mb-3" />
                                    <p className="text-lg font-medium text-text mb-2">No scheduled sessions found</p>
                                    <p className="text-sm text-text-secondary mb-6">You have not booked any counseling appointments yet.</p>
                                    <button
                                        onClick={() => setActiveTab('book')}
                                        className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Schedule Your First Session
                                    </button>
                                </div>
                            ) : (
                                myAppointments.map((appt) => (
                                    <div
                                        key={appt.id}
                                        className="bg-primary border border-secondary rounded-xl p-6 transition-all hover:border-accent/40 shadow-md"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-secondary/50">
                                            <div>
                                                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                                                    Session Time
                                                </div>
                                                <div className="text-lg font-bold text-text flex items-center gap-2">
                                                    <Calendar size={18} className="text-accent" />
                                                    {new Date(appt.appointment_date).toLocaleString(undefined, {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                            <div>{getStatusBadge(appt.status)}</div>
                                        </div>

                                        {appt.notes && (
                                            <div className="text-sm text-text-secondary mb-4 bg-secondary/20 p-3 rounded-lg">
                                                <span className="font-semibold text-text">Notes:</span> {appt.notes}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between text-xs text-text-secondary">
                                            <span>Booked on {new Date(appt.created_at).toLocaleDateString()}</span>
                                            {appt.status === 'Booked' && (
                                                <button
                                                    onClick={() => handleCancel(appt.id)}
                                                    className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                                                >
                                                    Cancel Session
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
