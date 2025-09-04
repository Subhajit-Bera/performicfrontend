"use client";
import React from 'react';
import ExamForm from '../ExamForm';
import api from '../../../utils/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AddExamPage() {
    const router = useRouter();

    const handleSave = async (data) => {
        try {
            await api.post('/admin/exams', data);
            toast.success("Exam created successfully!");
            router.push('/admin/exams');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create exam.");
            throw error;
        }
    };

    return (
        <div>
            <Link href="/admin/exams" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
                <ChevronLeft size={18} /> Back to Exams
            </Link>
            <h1 className="text-3xl font-bold mb-8">Add New Exam</h1>
            <div className="bg-primary p-8 rounded-xl border border-secondary">
                <ExamForm onSave={handleSave} />
            </div>
        </div>
    );
}