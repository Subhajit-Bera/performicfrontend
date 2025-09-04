// "use client";
// import React, { useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { Calendar, PenSquare, Loader2 } from 'lucide-react';
// import api from '../utils/api';
// import { toast } from 'sonner';

// export default function BookAppointmentPage() {
//     const { isAuthenticated, loading, profileCompletion } = useAuth();
//     const [date, setDate] = useState('');
//     const [notes, setNotes] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const appointmentPromise = api.post('/users/book-appointment', { date, notes });
        
//         toast.promise(appointmentPromise, {
//             loading: 'Scheduling your appointment...',
//             success: () => {
//                 setDate('');
//                 setNotes('');
//                 return 'Appointment booked successfully! We will contact you shortly.';
//             },
//             error: 'Failed to book appointment. Please try again.',
//         });

//         setIsSubmitting(false);
//     };

//     if (loading) {
//         return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     }

//     return (
//         <>
//             <Header />
//             <main className="pt-24 min-h-screen bg-slate-900 flex items-center justify-center">
//                 <div className="container mx-auto px-6 py-12">
//                     <div className="max-w-xl mx-auto bg-slate-800/50 rounded-xl shadow-lg p-8">
//                         <h1 className="text-3xl font-bold text-center mb-2">Book a Counseling Session</h1>
//                         <p className="text-slate-400 text-center mb-8">Schedule a one-on-one session with our expert career counselors.</p>

//                         {!isAuthenticated ? (
//                             <div className="text-center bg-slate-800 p-8 rounded-lg">
//                                 <p className="mb-4">You must be logged in to book an appointment.</p>
//                                 <Link href="/login" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
//                                     Login
//                                 </Link>
//                             </div>
//                         ) : profileCompletion < 100 ? (
//                             <div className="text-center bg-slate-800 p-8 rounded-lg">
//                                 <p className="mb-4">Please complete your profile before booking an appointment. It helps us prepare for your session.</p>
//                                 <Link href="/profile?action=complete&redirect=/book-appointment" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
//                                     Complete Profile
//                                 </Link>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 <div>
//                                     <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-2">Select Date & Time</label>
//                                     <div className="relative">
//                                         <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                                         <input
//                                             type="datetime-local"
//                                             id="date"
//                                             value={date}
//                                             onChange={(e) => setDate(e.target.value)}
//                                             required
//                                             className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">Additional Notes (Optional)</label>
//                                     <div className="relative">
//                                         <PenSquare className="absolute left-3 top-4 text-slate-400" size={20} />
//                                         <textarea
//                                             id="notes"
//                                             rows="4"
//                                             value={notes}
//                                             onChange={(e) => setNotes(e.target.value)}
//                                             placeholder="Tell us what you'd like to discuss (e.g., specific streams, exam preparation, etc.)"
//                                             className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors"
//                                         ></textarea>
//                                     </div>
//                                 </div>
//                                 <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center disabled:bg-cyan-800">
//                                     {isSubmitting ? <Loader2 className="animate-spin" /> : 'Schedule Appointment'}
//                                 </button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }






"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { Calendar, PenSquare, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'sonner';

export default function BookAppointmentPage() {
    const { isAuthenticated, loading, profileCompletion } = useAuth();
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const appointmentPromise = api.post('/users/book-appointment', { date, notes });
        
        toast.promise(appointmentPromise, {
            loading: 'Scheduling your appointment...',
            success: () => {
                setDate('');
                setNotes('');
                return 'Appointment booked successfully! We will contact you shortly.';
            },
            error: 'Failed to book appointment. Please try again.',
        });

        setIsSubmitting(false);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-xl mx-auto bg-primary rounded-xl shadow-lg p-8 border border-secondary">
                        <h1 className="text-3xl font-bold text-center mb-2">Book a Counseling Session</h1>
                        <p className="text-text-secondary text-center mb-8">Schedule a one-on-one session with our expert career counselors.</p>

                        {!isAuthenticated ? (
                            <div className="text-center bg-secondary/50 p-8 rounded-lg">
                                <p className="mb-4">You must be logged in to book an appointment.</p>
                                <Link href="/login" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                    Login
                                </Link>
                            </div>
                        ) : profileCompletion < 100 ? (
                            <div className="text-center bg-secondary/50 p-8 rounded-lg">
                                <p className="mb-4">Please complete your profile before booking an appointment. It helps us prepare for your session.</p>
                                <Link href="/profile?action=complete&redirect=/book-appointment" className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                    Complete Profile
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-text mb-2">Select Date & Time</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                        <input
                                            type="datetime-local"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-text mb-2">Additional Notes (Optional)</label>
                                    <div className="relative">
                                        <PenSquare className="absolute left-3 top-4 text-text-secondary" size={20} />
                                        <textarea
                                            id="notes"
                                            rows="4"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Tell us what you'd like to discuss..."
                                            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent"
                                        ></textarea>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-all flex items-center justify-center disabled:bg-accent/50">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Schedule Appointment'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}