"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import CourseForm from '../components/CourseForm';

export default function ManageCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    const fetchCourses = () => {
        setLoading(true);
        setError(null);
        api.get('/admin/courses', { params: { limit: 100 } })
            .then(res => setCourses(Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])))
            .catch(err => setError(err.response?.data?.message || "Failed to fetch courses."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleOpenModal = (course = null) => {
        setCurrentCourse(course);
        setIsModalOpen(true);
        if (course) {
            api.get(`/admin/courses/${course.id}`)
                .then(({ data }) => setCurrentCourse(data))
                .catch(err => toast.error(err.response?.data?.message || "Could not load this course."));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    const handleSave = async (data) => {
        const promise = currentCourse
            ? api.put(`/admin/courses/${currentCourse.id}`, data)
            : api.post('/admin/courses', data);

        toast.promise(promise, {
            loading: currentCourse ? 'Updating course...' : 'Creating course...',
            success: () => {
                fetchCourses();
                return `Course ${currentCourse ? 'updated' : 'created'} successfully.`;
            },
            error: (err) => err.response?.data?.message || 'An error occurred.',
        });

        await promise;
    };
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            toast.promise(api.delete(`/admin/courses/${id}`), {
                loading: 'Deleting course...',
                success: () => {
                    fetchCourses();
                    return 'Course deleted successfully.';
                },
                error: 'Failed to delete course.',
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Career Options</h1>
                <button onClick={() => handleOpenModal()} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base">
                    <Plus size={18} /> Add Career Option
                </button>
            </div>
            
            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchCourses} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">Retry</button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[500px]">
                        <thead className="bg-secondary/50">
                             <tr>
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Slug</th>
                                <th className="p-4 font-semibold">Icon</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-8 text-text-secondary">Loading...</td></tr>
                            ) : courses.length === 0 ? (
                                <tr><td colSpan="4" className="text-center p-8 text-text-secondary">No career options found.</td></tr>
                            ) : (
                                courses.map(course => (
                                    <tr key={course.id} className="border-b border-secondary hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 font-medium text-text">{course.name}</td>
                                        <td className="p-4 text-text-secondary">{course.slug}</td>
                                        <td className="p-4 text-text-secondary">{course.icon_name}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenModal(course)} aria-label={`Edit ${course.name}`} className="text-text-secondary hover:text-accent p-1.5 rounded hover:bg-secondary/50 transition-colors"><Edit size={16} aria-hidden="true"/></button>
                                                <button onClick={() => handleDelete(course.id)} aria-label={`Delete ${course.name}`} className="text-text-secondary hover:text-red-500 p-1.5 rounded hover:bg-secondary/50 transition-colors"><Trash2 size={16} aria-hidden="true"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-primary rounded-2xl p-5 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-secondary">
                            <h2 className="text-xl sm:text-2xl font-bold mb-6">{currentCourse ? 'Edit' : 'Add'} Career Option</h2>
                            <CourseForm course={currentCourse} onSave={handleSave} onDone={handleCloseModal} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
