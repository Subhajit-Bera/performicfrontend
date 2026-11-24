"use client";
import React, { useState } from 'react';
import api from '@/app/utils/api';
import { toast } from 'sonner';
import { Search, UserCheck } from 'lucide-react';

export default function ReferStudentPage() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearchResults([]);
        try {
            const { data } = await api.get('/agent/search-user', { params: { name, contact } });
            setSearchResults(data);
            if (data.length === 0) {
                toast.info("No users found matching your criteria.");
            }
        } catch (error) {
            toast.error("Failed to search for user.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleRefer = async (userId) => {
        const promise = api.post('/agent/refer-user', { userId });
        toast.promise(promise, {
            loading: 'Referring student...',
            success: (res) => {
                // Update the UI to show the user as referred
                setSearchResults(prev => prev.map(user => 
                    user.id === userId ? { ...user, referred_by: res.data.referred_by } : user
                ));
                return `${res.data.full_name} has been marked as your referral.`;
            },
            error: (err) => err.response?.data?.message || 'Failed to refer student.',
        });
    };

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Refer a Student</h1>
            <div className="bg-primary p-4 sm:p-6 rounded-xl border border-secondary shadow-sm">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student's Full Name" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                    <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Student's Email or Phone" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                    <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                        <Search size={18} /> Search
                    </button>
                </form>
                
                <div className="space-y-3">
                    {searchResults.map(user => (
                        <div key={user.id} className="bg-secondary/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-text">{user.full_name}</p>
                                <p className="text-sm text-text-secondary">{user.email} | {user.phone_number || 'No Phone'}</p>
                            </div>
                            {user.referred_by ? (
                                <span className="text-sm font-semibold text-yellow-400">Already Referred</span>
                            ) : (
                                <button onClick={() => handleRefer(user.id)} className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                                    <UserCheck size={16} /> Mark as My Referral
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}