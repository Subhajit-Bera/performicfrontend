"use client";
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// Reusable input component
const FormInput = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder || label} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
    </div>
);

export default function UniversityForm({ onSave, initialData }) {
    const [formData, setFormData] = useState({
        name: '', location: '', stream_id: '', rating: '0.0',
        description: '', image_url: '',
        details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
        courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
        placements: { highest_package: '', average_package: '', top_recruiters: '' },
        facilities: ''
    });
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/admin/streams').then(res => setStreams(res.data));
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e, section = null, index = null, field = null) => {
        if (section) {
            if (index !== null) { // Array like courses_and_fees
                const newArray = [...formData[section]];
                newArray[index][field] = e.target.value;
                setFormData(prev => ({ ...prev, [section]: newArray }));
            } else { // Object like details or placements
                setFormData(prev => ({
                    ...prev,
                    [section]: { ...prev[section], [e.target.name]: e.target.value }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const addCourse = () => {
        setFormData(prev => ({
            ...prev,
            courses_and_fees: [...prev.courses_and_fees, { course: '', fees_per_year: '', duration: '' }]
        }));
    };

    const removeCourse = (index) => {
        setFormData(prev => ({
            ...prev,
            courses_and_fees: prev.courses_and_fees.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...formData,
            stream_id: parseInt(formData.stream_id, 10),
            rating: parseFloat(formData.rating),
            details: {
                ...formData.details,
                established_year: parseInt(formData.details.established_year, 10),
                campus_size_acres: parseInt(formData.details.campus_size_acres, 10)
            },
            placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()) },
            facilities: formData.facilities.split(',').map(s => s.trim())
        };
        
        try {
            await onSave(payload);
        } catch (error) {
            // Error is handled by the parent page with toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Basic Information --- */}
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
                    <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <div>
                        <label htmlFor="stream_id" className="block text-sm font-medium text-text-secondary mb-1">Stream</label>
                        <select id="stream_id" name="stream_id" value={formData.stream_id} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent">
                            <option value="">Select a Stream</option>
                            {streams.map(stream => <option key={stream.id} value={stream.id}>{stream.name}</option>)}
                        </select>
                    </div>
                    <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
                    <div className="md:col-span-2">
                        <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
                    </div>
                    <div className="md:col-span-2">
                         <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
                    </div>
                </div>
            </section>
            
             {/* --- Details Section --- */}
            <section>
                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
                    <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
                    <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
                    <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
                </div>
            </section>

             {/* --- Courses & Fees --- */}
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
                <div className="space-y-4">
                    {formData.courses_and_fees.map((course, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
                            <div className="md:col-span-3"><FormInput label={`Course ${index + 1} Name`} name="course" value={course.course} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')} /></div>
                            <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={course.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
                            <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
                            <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500"><XCircle /></button></div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold"><PlusCircle size={16} /> Add Course</button>
            </section>

            {/* --- Placements --- */}
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
                    <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
                    <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
                </div>
            </section>

            {/* --- Facilities --- */}
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
                <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
            </section>
            
            <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
            </button>
        </form>
    );
}