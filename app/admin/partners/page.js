"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import PartnerForm from '../components/PartnerForm';

export default function ManagePartnersPage() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPartner, setCurrentPartner] = useState(null);

    const fetchPartners = () => {
        setLoading(true);
        api.get('/admin/partners')
            .then(res => setPartners(res.data))
            .catch(() => toast.error("Failed to fetch partners."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleOpenModal = (partner = null) => {
        setCurrentPartner(partner);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPartner(null);
    };

    const handleSave = async (data) => {
        const promise = currentPartner
            ? api.put(`/admin/partners/${currentPartner.id}`, data)
            : api.post('/admin/partners', data);

        toast.promise(promise, {
            loading: currentPartner ? 'Updating partner...' : 'Creating partner...',
            success: () => {
                fetchPartners();
                return `Partner ${currentPartner ? 'updated' : 'created'} successfully.`;
            },
            error: (err) => err.response?.data?.message || 'An error occurred.',
        });
        await promise;
    };
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this partner?")) {
            toast.promise(api.delete(`/admin/partners/${id}`), {
                loading: 'Deleting partner...',
                success: () => {
                    fetchPartners();
                    return 'Partner deleted successfully.';
                },
                error: 'Failed to delete partner.',
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Career Partners</h1>
                <button onClick={() => handleOpenModal()} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <Plus size={20} /> Add Partner
                </button>
            </div>
            
             <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50">
                             <tr>
                                <th className="p-4 font-semibold text-sm">Name</th>
                                <th className="p-4 font-semibold text-sm">Location</th>
                                <th className="p-4 font-semibold text-sm">Featured Text</th>
                                <th className="p-4 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
                            ) : (
                                partners.map(partner => (
                                    <tr key={partner.id} className="border-b border-secondary">
                                        <td className="p-4 text-text">{partner.name}</td>
                                        <td className="p-4 text-text-secondary">{partner.location}</td>
                                        <td className="p-4 text-text-secondary">{partner.featured_text}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenModal(partner)} className="text-text-secondary hover:text-accent p-1"><Edit size={16}/></button>
                                                <button onClick={() => handleDelete(partner.id)} className="text-text-secondary hover:text-red-500 p-1"><Trash2 size={16}/></button>
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
                            <h2 className="text-2xl font-bold mb-6">{currentPartner ? 'Edit' : 'Add'} Career Partner</h2>
                            <PartnerForm partner={currentPartner} onSave={handleSave} onDone={handleCloseModal} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}