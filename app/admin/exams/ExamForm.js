"use client";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Reusable input component
const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} placeholder={placeholder || label} required={required} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
    </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <textarea id={name} name={name} value={value || ''} onChange={onChange} placeholder={placeholder || label} rows={rows} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
    </div>
);


export default function ExamForm({ onSave, initialData }) {
    const [formData, setFormData] = useState({
        name: '', exam_date: '', exam_level: '',
        info: { exam_full_name: '', conducting_body: '', exam_frequency: '', courses_offered: '' },
        application_form: { application_mode: '', application_fee_general: '', application_fee_obc: '', official_website: '' },
        important_dates: { application_start: '', application_end: '', admit_card_release: '', result_declaration: '' },
        syllabus: { Physics: '', Chemistry: '', Biology: '', Mathematics: '' },
        exam_pattern: { mode_of_exam: '', duration: '', total_questions: '', marking_scheme: '' },
        admit_card_details: '', result_details: '', cutoff_details: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
             // Convert syllabus object values (arrays) to comma-separated strings for textarea
            const syllabusForForm = {};
            for (const key in initialData.syllabus) {
                if(Array.isArray(initialData.syllabus[key])) {
                    syllabusForForm[key] = initialData.syllabus[key].join(', ');
                }
            }
            setFormData({ ...initialData, syllabus: { ...initialData.syllabus, ...syllabusForForm } });
        }
    }, [initialData]);

    const handleChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Convert syllabus strings back to arrays
        const syllabusForApi = {};
        for (const key in formData.syllabus) {
            if (formData.syllabus[key] && typeof formData.syllabus[key] === 'string') {
                syllabusForApi[key] = formData.syllabus[key].split(',').map(s => s.trim()).filter(Boolean);
            }
        }

        const payload = {
            ...formData,
            syllabus: syllabusForApi,
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
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="Exam Name" name="name" value={formData.name} onChange={handleChange} required />
                    <FormInput label="Exam Date" name="exam_date" value={formData.exam_date} onChange={handleChange} />
                    <FormInput label="Exam Level" name="exam_level" value={formData.exam_level} onChange={handleChange} />
                </div>
            </section>

             <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Exam Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Full Name" name="exam_full_name" value={formData.info.exam_full_name} onChange={(e) => handleChange(e, 'info')} />
                    <FormInput label="Conducting Body" name="conducting_body" value={formData.info.conducting_body} onChange={(e) => handleChange(e, 'info')} />
                    <FormInput label="Frequency" name="exam_frequency" value={formData.info.exam_frequency} onChange={(e) => handleChange(e, 'info')} />
                    <FormInput label="Courses Offered" name="courses_offered" value={formData.info.courses_offered} onChange={(e) => handleChange(e, 'info')} />
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Syllabus (Comma-separated topics)</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormTextarea label="Physics Topics" name="Physics" value={formData.syllabus.Physics} onChange={(e) => handleChange(e, 'syllabus')} />
                    <FormTextarea label="Chemistry Topics" name="Chemistry" value={formData.syllabus.Chemistry} onChange={(e) => handleChange(e, 'syllabus')} />
                    <FormTextarea label="Biology Topics" name="Biology" value={formData.syllabus.Biology} onChange={(e) => handleChange(e, 'syllabus')} />
                    <FormTextarea label="Mathematics Topics" name="Mathematics" value={formData.syllabus.Mathematics} onChange={(e) => handleChange(e, 'syllabus')} />
                 </div>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Other Details</h2>
                 <div className="space-y-4">
                    <FormTextarea label="Admit Card Details" name="admit_card_details" value={formData.admit_card_details} onChange={handleChange} />
                    <FormTextarea label="Result Details" name="result_details" value={formData.result_details} onChange={handleChange} />
                    <FormTextarea label="Cut Off Details" name="cutoff_details" value={formData.cutoff_details} onChange={handleChange} />
                 </div>
            </section>

            <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update Exam' : 'Create Exam')}
            </button>
        </form>
    );
}