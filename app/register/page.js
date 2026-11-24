// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import { User, Mail, Lock, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import CompleteProfileModal from '../components/CompleteProfileModal';

// const GoogleButton = () => (
//     <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
//         <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" className="w-6 h-6" />
//         <span className="text-white font-medium">Sign Up with Google</span>
//     </a>
// );

// export default function RegisterPage() {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { login, isAuthenticated } = useAuth();
//     const router = useRouter();
//     const [showProfileModal, setShowProfileModal] = useState(false);
    
//     useEffect(() => {
//         if(isAuthenticated) {
//             setShowProfileModal(true);
//         }
//     }, [isAuthenticated]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         if (password.length < 6) {
//             toast.error("Password must be at least 6 characters long.");
//             setLoading(false);
//             return;
//         }
//         try {
//             const { data } = await api.post('/auth/register', { fullName, email, password });
//             login(data);
//             // After successful login via registration, the useEffect will trigger the modal
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     if (showProfileModal) {
//         return <CompleteProfileModal isOpen={true} onClose={() => { setShowProfileModal(false); router.push('/'); }} />;
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
//             <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-cyan-500/10">
//                 <h2 className="text-3xl font-bold text-white text-center mb-2">Create Your Account</h2>
//                 <p className="text-slate-400 text-center mb-6">Start your journey with EduElevate.</p>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                      <div className="relative">
//                         <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                         <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors" />
//                     </div>
//                     <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors" />
//                     </div>
//                     <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500 transition-colors" />
//                     </div>
//                     <button type="submit" disabled={loading} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center disabled:bg-cyan-800 disabled:cursor-not-allowed">
//                         {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
//                     </button>
//                 </form>
//                 <div className="flex items-center my-6">
//                     <hr className="w-full border-slate-600" /><span className="px-4 text-slate-400 text-sm">OR</span><hr className="w-full border-slate-600" />
//                 </div>
//                 <GoogleButton />
//                 <p className="text-center text-slate-400 mt-6 text-sm">
//                     Already have an account? <Link href="/login" className="text-cyan-400 hover:underline font-medium">Sign In</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }




"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CompleteProfileModal from '../components/CompleteProfileModal';

const GoogleButton = () => (
    <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`} className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-secondary hover:bg-secondary/70 rounded-lg transition-colors">
        <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
        <span className="text-text font-medium">Sign Up with Google</span>
    </a>
);

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    useEffect(() => {
        if(isAuthenticated) {
            setShowProfileModal(true);
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }
        try {
            const { data } = await api.post('/auth/register', { fullName, email, password });
            login(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };
    
    if (showProfileModal) {
        return <CompleteProfileModal isOpen={true} onClose={() => { setShowProfileModal(false); router.push('/'); }} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="bg-primary rounded-2xl p-8 max-w-md w-full shadow-2xl border border-secondary">
                <h2 className="text-3xl font-bold text-text text-center mb-2">Create Your Account</h2>
                <p className="text-text-secondary text-center mb-6">Start your journey with PerFormic.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent" />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent" />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 pl-10 focus:outline-none focus:border-accent" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-all flex items-center justify-center disabled:bg-accent/50">
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                    </button>
                </form>
                <div className="flex items-center my-6"><hr className="w-full border-secondary" /><span className="px-4 text-text-secondary text-sm">OR</span><hr className="w-full border-secondary" /></div>
                <GoogleButton />
                <p className="text-center text-text-secondary mt-6 text-sm">
                    Already have an account? <Link href="/login" className="text-accent hover:underline font-medium">Sign In</Link>
                </p>
            </div>
        </div>
    );
}