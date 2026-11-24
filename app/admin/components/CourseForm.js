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
        stream_ids: []
    });
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/admin/streams')
            .then(res => setStreams(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(() => toast.error("Could not load the streams list."));
    }, []);

    useEffect(() => {
        if (!course) return;
        setFormData({
            name: course.name || '',
            description: course.description || '',
            icon_name: course.icon_name || 'GraduationCap',
            stream_ids: course.stream_ids || []
        });
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleStream = (id) => {
        setFormData(prev => ({
            ...prev,
            stream_ids: prev.stream_ids.includes(id)
                ? prev.stream_ids.filter(streamId => streamId !== id)
                : [...prev.stream_ids, id]
        }));
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
            <fieldset>
                <legend className="block text-sm font-medium text-text-secondary mb-2">Streams</legend>
                <div className="grid grid-cols-2 gap-2">
                    {streams.map(stream => (
                        <div key={stream.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`course-stream-${stream.id}`}
                                checked={formData.stream_ids.includes(stream.id)}
                                onChange={() => toggleStream(stream.id)}
                                className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
                            />
                            <label htmlFor={`course-stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onDone} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                    {loading ? <Loader2 className="animate-spin" /> : 'Save'}
                </button>
            </div>
        </form>
    );
}
