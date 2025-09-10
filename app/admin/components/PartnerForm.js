"use client";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PartnerForm({ partner, onSave, onDone }) {
    const [formData, setFormData] = useState({
        name: '', location: '', featured_text: '', logo_url: '', 
        link_stream_slug: '', link_city_slug: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (partner) {
            setFormData(partner);
        }
    }, [partner]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onDone();
        } catch (error) {
            // Parent shows toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Partner Name" required className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Bangalore)" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            </div>
            <input name="featured_text" value={formData.featured_text} onChange={handleChange} placeholder="Featured Text (e.g., Top Engineering Colleges...)" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            <input name="logo_url" value={formData.logo_url} onChange={handleChange} placeholder="Logo Image URL" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="link_stream_slug" value={formData.link_stream_slug} onChange={handleChange} placeholder="Link Stream Slug (e.g., engineering)" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
                <input name="link_city_slug" value={formData.link_city_slug} onChange={handleChange} placeholder="Link City Slug (e.g., bangalore)" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
            </div>
             <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onDone} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                    {loading ? <Loader2 className="animate-spin" /> : 'Save'}
                </button>
            </div>
        </form>
    );
}