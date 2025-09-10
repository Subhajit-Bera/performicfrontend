"use client";
import React, { useState, useEffect } from 'react';
import api from '@/app/utils/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CourseForm({ course, onSave, onDone }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon_name: 'GraduationCap',
        related_university_ids: []
    });
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch all universities to populate the multi-select
        api.get('/admin/universities')
            .then(res => setUniversities(res.data))
            .catch(() => toast.error("Could not load universities list."));

        if (course) {
            setFormData({
                name: course.name || '',
                description: course.description || '',
                icon_name: course.icon_name || 'GraduationCap',
                related_university_ids: course.related_university_ids || []
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUniversitySelect = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
        setFormData(prev => ({ ...prev, related_university_ids: selectedIds }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onDone(); // Closes modal and refreshes list
        } catch (error) {
            // Parent component will show a toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Course Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            </div>
            <div>
                <label htmlFor="icon_name" className="block text-sm font-medium text-text-secondary mb-1">Icon Name (Lucide)</label>
                <input id="icon_name" name="icon_name" value={formData.icon_name} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            </div>
            {/* <div>
                <label htmlFor="related_university_ids" className="block text-sm font-medium text-text-secondary mb-1">Related Universities (Ctrl+Click to select multiple)</label>
                <select
                    id="related_university_ids"
                    name="related_university_ids"
                    multiple
                    value={formData.related_university_ids}
                    onChange={handleUniversitySelect}
                    className="w-full h-48 bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent"
                >
                    {universities.map(uni => (
                        <option key={uni.id} value={uni.id}>{uni.name}</option>
                    ))}
                </select>
            </div> */}
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onDone} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                    {loading ? <Loader2 className="animate-spin" /> : 'Save'}
                </button>
            </div>
        </form>
    );
}