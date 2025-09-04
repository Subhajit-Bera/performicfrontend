"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, X, Check, Loader2 } from 'lucide-react';

export default function ManageStreamsPage() {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newStreamName, setNewStreamName] = useState('');
    const [editingStream, setEditingStream] = useState(null); // { id, name }

    const fetchStreams = () => {
        setLoading(true);
        api.get('/admin/streams')
            .then(res => setStreams(res.data))
            .catch(() => toast.error("Failed to fetch streams."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchStreams();
    }, []);

    const handleAdd = async () => {
        if (!newStreamName.trim()) return;
        const addPromise = api.post('/admin/streams', { name: newStreamName });
        toast.promise(addPromise, {
            loading: 'Adding stream...',
            success: () => {
                fetchStreams();
                setIsAdding(false);
                setNewStreamName('');
                return "Stream added successfully.";
            },
            error: (err) => err.response?.data?.message || "Failed to add stream."
        });
    };

    const handleUpdate = async () => {
        if (!editingStream.name.trim()) return;
        const updatePromise = api.put(`/admin/streams/${editingStream.id}`, { name: editingStream.name });
        toast.promise(updatePromise, {
            loading: 'Updating stream...',
            success: () => {
                fetchStreams();
                setEditingStream(null);
                return "Stream updated successfully.";
            },
            error: (err) => err.response?.data?.message || "Failed to update stream."
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure? Deleting a stream may affect linked universities.")) {
            const deletePromise = api.delete(`/admin/streams/${id}`);
            toast.promise(deletePromise, {
                loading: 'Deleting stream...',
                success: () => {
                    fetchStreams();
                    return "Stream deleted successfully.";
                },
                error: "Failed to delete stream."
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Streams</h1>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <Plus size={20} /> Add Stream
                    </button>
                )}
            </div>

            <div className="bg-primary border border-secondary rounded-xl p-6">
                <div className="space-y-3">
                    {loading && <div>Loading...</div>}
                    {streams.map(stream => (
                        <div key={stream.id} className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
                            {editingStream?.id === stream.id ? (
                                <input
                                    type="text"
                                    value={editingStream.name}
                                    onChange={(e) => setEditingStream(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-background border border-secondary rounded-md px-2 py-1 flex-grow"
                                />
                            ) : (
                                <span className="font-medium">{stream.name}</span>
                            )}
                            <div className="flex items-center gap-3">
                                {editingStream?.id === stream.id ? (
                                    <>
                                        <button onClick={handleUpdate} className="text-green-400"><Check size={18} /></button>
                                        <button onClick={() => setEditingStream(null)} className="text-red-400"><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setEditingStream({ id: stream.id, name: stream.name })} className="text-text-secondary hover:text-accent"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(stream.id)} className="text-text-secondary hover:text-red-500"><Trash2 size={16} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {isAdding && (
                        <div className="flex items-center gap-2 bg-secondary/50 p-3 rounded-md">
                            <input
                                type="text"
                                value={newStreamName}
                                onChange={(e) => setNewStreamName(e.target.value)}
                                placeholder="New stream name"
                                className="bg-background border border-secondary rounded-md px-2 py-1 flex-grow"
                            />
                            <button onClick={handleAdd} className="text-green-400"><Check size={18} /></button>
                            <button onClick={() => setIsAdding(false)} className="text-red-400"><X size={18} /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}