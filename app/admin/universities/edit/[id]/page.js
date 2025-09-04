"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import UniversityForm from '../../UniversityForm';
import api from '../../../../utils/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function EditUniversityPage() {
    const router = useRouter();
    const { id } = useParams();
    const [universityData, setUniversityData] = useState(null);

    useEffect(() => {
        if (id) {
            // NOTE: The admin routes should use ID for fetching edit data, as slugs can change.
            // You will need to add a `GET /api/admin/universities/:id` route in your backend.
            api.get(`/universities/${id}`) // Assuming a public route exists, otherwise create an admin one
                .then(res => {
                    const data = res.data;
                    // Convert arrays back to comma-separated strings for the form
                    data.placements.top_recruiters = data.placements.top_recruiters.join(', ');
                    data.facilities = data.facilities.join(', ');
                    setUniversityData(data);
                })
                .catch(() => toast.error("Failed to fetch university data."));
        }
    }, [id]);

    const handleSave = async (data) => {
        try {
            await api.put(`/admin/universities/${id}`, data);
            toast.success("University updated successfully!");
            router.push('/admin/universities');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update university.");
            throw error; // Propagate error to form
        }
    };

    return (
        <div>
            <Link href="/admin/universities" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-4">
                <ChevronLeft size={18} /> Back to Universities
            </Link>
            <h1 className="text-3xl font-bold mb-8">Edit University</h1>
            <div className="bg-primary p-8 rounded-xl border border-secondary">
                {universityData ? (
                    <UniversityForm onSave={handleSave} initialData={universityData} />
                ) : (
                    <div>Loading form...</div>
                )}
            </div>
        </div>
    );
}