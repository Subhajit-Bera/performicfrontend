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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    const fetchCourses = () => {
        setLoading(true);
        api.get('/admin/courses')
            .then(res => setCourses(res.data))
            .catch(() => toast.error("Failed to fetch courses."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleOpenModal = (course = null) => {
        setCurrentCourse(course);
        setIsModalOpen(true);
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
            success: (res) => {
                fetchCourses();
                return `Course ${currentCourse ? 'updated' : 'created'} successfully.`;
            },
            error: (err) => err.response?.data?.message || 'An error occurred.',
        });

        // This will throw an error to keep the form's loading state until the promise resolves
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Career Options</h1>
                <button onClick={() => handleOpenModal()} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <Plus size={20} /> Add Career Option
                </button>
            </div>
            
            <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50">
                             <tr>
                                <th className="p-4 font-semibold text-sm">Name</th>
                                <th className="p-4 font-semibold text-sm">Slug</th>
                                <th className="p-4 font-semibold text-sm">Icon</th>
                                <th className="p-4 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
                            ) : (
                                courses.map(course => (
                                    <tr key={course.id} className="border-b border-secondary">
                                        <td className="p-4 text-text">{course.name}</td>
                                        <td className="p-4 text-text-secondary">{course.slug}</td>
                                        <td className="p-4 text-text-secondary">{course.icon_name}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenModal(course)} className="text-text-secondary hover:text-accent p-1"><Edit size={16}/></button>
                                                <button onClick={() => handleDelete(course.id)} className="text-text-secondary hover:text-red-500 p-1"><Trash2 size={16}/></button>
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
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-primary rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl border border-secondary">
                            <h2 className="text-2xl font-bold mb-6">{currentCourse ? 'Edit' : 'Add'} Career Option</h2>
                            <CourseForm course={currentCourse} onSave={handleSave} onDone={handleCloseModal} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}