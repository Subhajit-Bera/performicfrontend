"use client";
import React from 'react';
import UniversityForm from '../UniversityForm'; // We'll create this reusable component
import api from '../../../utils/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AddUniversityPage() {
    const router = useRouter();

    const handleSave = async (data) => {
        try {
            await api.post('/admin/universities', data);
            toast.success("University created successfully!");
            router.push('/admin/universities');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create university.");
            throw error; // Propagate error to form
        }
    };

    return (
        <div>
            <Link href="/admin/universities" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
                <ChevronLeft size={18} /> Back to Universities
            </Link>
            <h1 className="text-3xl font-bold mb-8">Add New University</h1>
            <div className="bg-primary p-8 rounded-xl border border-secondary">
                <UniversityForm onSave={handleSave} />
            </div>
        </div>
    );
}