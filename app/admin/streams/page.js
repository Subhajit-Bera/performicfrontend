// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api'
// import { toast } from 'sonner';
// import { Plus, Edit, Trash2, X, Check, Loader2 } from 'lucide-react';
// import Loader
//  from '@/app/components/Loader';
// export default function ManageStreamsPage() {
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isAdding, setIsAdding] = useState(false);
//     const [newStreamName, setNewStreamName] = useState('');
//     const [editingStream, setEditingStream] = useState(null); // { id, name }

//     const fetchStreams = () => {
//         setLoading(true);
//         api.get('/admin/streams')
//             .then(res => setStreams(res.data))
//             .catch(() => toast.error("Failed to fetch streams."))
//             .finally(() => setLoading(false));
//     };

//     useEffect(() => {
//         fetchStreams();
//     }, []);

//     const handleAdd = async () => {
//         if (!newStreamName.trim()) return;
//         const addPromise = api.post('/admin/streams', { name: newStreamName });
//         toast.promise(addPromise, {
//             loading: 'Adding stream...',
//             success: () => {
//                 fetchStreams();
//                 setIsAdding(false);
//                 setNewStreamName('');
//                 return "Stream added successfully.";
//             },
//             error: (err) => err.response?.data?.message || "Failed to add stream."
//         });
//     };

//     const handleUpdate = async () => {
//         if (!editingStream.name.trim()) return;
//         const updatePromise = api.put(`/admin/streams/${editingStream.id}`, { name: editingStream.name });
//         toast.promise(updatePromise, {
//             loading: 'Updating stream...',
//             success: () => {
//                 fetchStreams();
//                 setEditingStream(null);
//                 return "Stream updated successfully.";
//             },
//             error: (err) => err.response?.data?.message || "Failed to update stream."
//         });
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure? Deleting a stream may affect linked universities.")) {
//             const deletePromise = api.delete(`/admin/streams/${id}`);
//             toast.promise(deletePromise, {
//                 loading: 'Deleting stream...',
//                 success: () => {
//                     fetchStreams();
//                     return "Stream deleted successfully.";
//                 },
//                 error: "Failed to delete stream."
//             });
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Manage Streams</h1>
//                 {!isAdding && (
//                     <button onClick={() => setIsAdding(true)} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
//                         <Plus size={20} /> Add Stream
//                     </button>
//                 )}
//             </div>

//             <div className="bg-primary border border-secondary rounded-xl p-6">
//                 <div className="space-y-3">
//                     {loading && <Loader/>}
//                     {streams.map(stream => (
//                         <div key={stream.id} className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
//                             {editingStream?.id === stream.id ? (
//                                 <input
//                                     type="text"
//                                     value={editingStream.name}
//                                     onChange={(e) => setEditingStream(prev => ({ ...prev, name: e.target.value }))}
//                                     className="bg-background border border-secondary rounded-md px-2 py-1 flex-grow"
//                                 />
//                             ) : (
//                                 <span className="font-medium">{stream.name}</span>
//                             )}
//                             <div className="flex items-center gap-3">
//                                 {editingStream?.id === stream.id ? (
//                                     <>
//                                         <button onClick={handleUpdate} className="text-green-400"><Check size={18} /></button>
//                                         <button onClick={() => setEditingStream(null)} className="text-red-400"><X size={18} /></button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <button onClick={() => setEditingStream({ id: stream.id, name: stream.name })} className="text-text-secondary hover:text-accent"><Edit size={16} /></button>
//                                         <button onClick={() => handleDelete(stream.id)} className="text-text-secondary hover:text-red-500"><Trash2 size={16} /></button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                     {isAdding && (
//                         <div className="flex items-center gap-2 bg-secondary/50 p-3 rounded-md">
//                             <input
//                                 type="text"
//                                 value={newStreamName}
//                                 onChange={(e) => setNewStreamName(e.target.value)}
//                                 placeholder="New stream name"
//                                 className="bg-background border border-secondary rounded-md px-2 py-1 flex-grow"
//                             />
//                             <button onClick={handleAdd} className="text-green-400"><Check size={18} /></button>
//                             <button onClick={() => setIsAdding(false)} className="text-red-400"><X size={18} /></button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { toast } from 'sonner';
// import { Plus, Edit, Trash2, X, Check, Loader2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Modal for Adding/Editing a Stream Name
// const StreamFormModal = ({ stream, onSave, onClose }) => {
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (stream && stream.name) {
//             setName(stream.name);
//         }
//     }, [stream]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const promise = stream?.id
//             ? api.put(`/admin/streams/${stream.id}`, { name })
//             : api.post('/admin/streams', { name });
        
//         try {
//             await toast.promise(promise, {
//                 loading: stream?.id ? 'Updating stream...' : 'Adding stream...',
//                 success: `Stream ${stream?.id ? 'updated' : 'added'} successfully.`,
//                 error: (err) => err.response?.data?.message || 'An error occurred.'
//             });
//             onSave(); // This will close the modal and refresh the list
//         } catch (error) {
//             // Toast promise handles error display
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-primary rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-secondary">
//                 <h2 className="text-2xl font-bold mb-6">{stream?.id ? 'Edit' : 'Add New'} Stream</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Stream name (e.g., Engineering)"
//                         required
//                         className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent"
//                     />
//                     <div className="flex justify-end gap-4 pt-4">
//                         <button type="button" onClick={onClose} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
//                         <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                             {loading ? <Loader2 className="animate-spin" /> : 'Save'}
//                         </button>
//                     </div>
//                 </form>
//             </motion.div>
//         </motion.div>
//     );
// };


// // Modal for Managing Courses within a Stream
// const ManageCoursesModal = ({ stream, onClose, onDone }) => {
//     const [allCourses, setAllCourses] = useState([]);
//     const [selectedCourseIds, setSelectedCourseIds] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         api.get('/admin/courses')
//            .then(res => setAllCourses(res.data))
//            .catch(() => toast.error("Could not load the list of available courses."))
//            .finally(() => setLoading(false));
        
//         if (stream && stream.course_ids) {
//             setSelectedCourseIds(stream.course_ids);
//         }
//     }, [stream]);

//     const handleCheckboxChange = (courseId) => {
//         setSelectedCourseIds(prev =>
//             prev.includes(courseId)
//                 ? prev.filter(id => id !== courseId)
//                 : [...prev, courseId]
//         );
//     };

//     const handleSave = () => {
//         const promise = api.put(`/admin/streams/${stream.id}/courses`, { course_ids: selectedCourseIds });
//         toast.promise(promise, {
//             loading: 'Updating associated courses...',
//             success: () => {
//                 onDone();
//                 return 'Courses for this stream have been updated successfully.';
//             },
//             error: 'Failed to update courses.'
//         });
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-primary rounded-2xl p-8 max-w-lg w-full relative shadow-2xl border border-secondary">
//                 <h2 className="text-2xl font-bold mb-6">Manage Courses for <span className="text-accent">{stream.name}</span></h2>
//                 {loading ? <div>Loading courses...</div> : (
//                     <div className="space-y-2 max-h-64 overflow-y-auto border border-secondary rounded-lg p-4">
//                         {allCourses.map(course => (
//                             <div key={course.id} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id={`course-${course.id}`}
//                                     checked={selectedCourseIds.includes(course.id)}
//                                     onChange={() => handleCheckboxChange(course.id)}
//                                     className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                                 />
//                                 <label htmlFor={`course-${course.id}`} className="ml-3 text-sm text-text">{course.name}</label>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//                 <div className="flex justify-end gap-4 pt-6">
//                     <button type="button" onClick={onClose} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
//                     <button onClick={handleSave} className="bg-accent text-white font-bold py-2 px-6 rounded-lg">Save Changes</button>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };


// export default function ManageStreamsPage() {
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//     const [currentStream, setCurrentStream] = useState(null);
//     const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

//     const fetchStreams = () => {
//         setLoading(true);
//         api.get('/admin/streams')
//             .then(res => setStreams(res.data))
//             .catch(() => toast.error("Failed to fetch streams."))
//             .finally(() => setLoading(false));
//     };

//     useEffect(() => { fetchStreams(); }, []);
    
//     const handleOpenFormModal = (stream = null) => {
//         setCurrentStream(stream);
//         setIsFormModalOpen(true);
//     };

//     const handleOpenCoursesModal = (stream) => {
//         setCurrentStream(stream);
//         setIsCoursesModalOpen(true);
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure? Deleting a stream will also remove its course associations.")) {
//             toast.promise(api.delete(`/admin/streams/${id}`), {
//                 loading: 'Deleting stream...',
//                 success: () => {
//                     fetchStreams();
//                     return "Stream deleted successfully.";
//                 },
//                 error: "Failed to delete stream."
//             });
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Manage Streams & Courses</h1>
//                 <button onClick={() => handleOpenFormModal()} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
//                     <Plus size={20} /> Add New Stream
//                 </button>
//             </div>
            
//             <div className="bg-primary border border-secondary rounded-xl p-6">
//                 <div className="space-y-3">
//                     {loading ? ( <div>Loading streams...</div> ) :
//                      streams.map(stream => (
//                         <div key={stream.id} className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
//                             <span className="font-medium">{stream.name}</span>
//                             <div className="flex items-center gap-4">
//                                 <button onClick={() => handleOpenCoursesModal(stream)} className="text-accent hover:underline text-xs font-bold">MANAGE COURSES</button>
//                                 <div className="flex items-center gap-3">
//                                     <button onClick={() => handleOpenFormModal(stream)} className="text-text-secondary hover:text-accent"><Edit size={16} /></button>
//                                     <button onClick={() => handleDelete(stream.id)} className="text-text-secondary hover:text-red-500"><Trash2 size={16} /></button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {isFormModalOpen && (
//                     <StreamFormModal 
//                         stream={currentStream}
//                         onClose={() => setIsFormModalOpen(false)}
//                         onSave={() => {
//                             setIsFormModalOpen(false);
//                             fetchStreams();
//                         }}
//                     />
//                 )}
//             </AnimatePresence>

//              <AnimatePresence>
//                 {isCoursesModalOpen && (
//                     <ManageCoursesModal 
//                         stream={currentStream} 
//                         onClose={() => setIsCoursesModalOpen(false)}
//                         onDone={() => {
//                             setIsCoursesModalOpen(false);
//                             fetchStreams();
//                         }}
//                     />
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }













"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, X, Check, Loader2, BookCopy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Modal for Adding/Editing a Stream Name
const StreamFormModal = ({ stream, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (stream && stream.name) {
            setName(stream.name);
        }
    }, [stream]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const promise = stream?.id
            ? api.put(`/admin/streams/${stream.id}`, { name })
            : api.post('/admin/streams', { name });
        
        try {
            await toast.promise(promise, {
                loading: stream?.id ? 'Updating stream...' : 'Adding stream...',
                success: `Stream ${stream?.id ? 'updated' : 'added'} successfully.`,
                error: (err) => err.response?.data?.message || 'An error occurred.'
            });
            onSave(); // This will close the modal and refresh the list
        } catch (error) {
            // Toast promise handles the error display
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-primary rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-secondary">
                <h2 className="text-2xl font-bold mb-6">{stream?.id ? 'Edit' : 'Add New'} Stream</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Stream name (e.g., Engineering)"
                        required
                        className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent"
                    />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
                            {loading ? <Loader2 className="animate-spin" /> : 'Save'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};


// Modal for Managing Courses within a Stream
const ManageCoursesModal = ({ stream, onClose, onDone }) => {
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/courses')
           .then(res => setAllCourses(res.data))
           .catch(() => toast.error("Could not load the list of available courses."))
           .finally(() => setLoading(false));
        
        if (stream && stream.course_ids) {
            setSelectedCourseIds(stream.course_ids);
        }
    }, [stream]);

    const handleCheckboxChange = (courseId) => {
        setSelectedCourseIds(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleSave = () => {
        const promise = api.put(`/admin/streams/${stream.id}/courses`, { course_ids: selectedCourseIds });
        toast.promise(promise, {
            loading: 'Updating associated courses...',
            success: () => {
                onDone();
                return 'Courses for this stream have been updated successfully.';
            },
            error: 'Failed to update courses.'
        });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-primary rounded-2xl p-8 max-w-lg w-full relative shadow-2xl border border-secondary">
                <h2 className="text-2xl font-bold mb-6">Manage Courses for <span className="text-accent">{stream.name}</span></h2>
                {loading ? <div>Loading courses...</div> : (
                    <div className="space-y-2 max-h-64 overflow-y-auto border border-secondary rounded-lg p-4">
                        {allCourses.map(course => (
                            <div key={course.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`course-${course.id}`}
                                    checked={selectedCourseIds.includes(course.id)}
                                    onChange={() => handleCheckboxChange(course.id)}
                                    className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
                                />
                                <label htmlFor={`course-${course.id}`} className="ml-3 text-sm text-text">{course.name}</label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-end gap-4 pt-6">
                    <button type="button" onClick={onClose} className="bg-secondary text-text font-bold py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-accent text-white font-bold py-2 px-6 rounded-lg">Save Changes</button>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function ManageStreamsPage() {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

    const fetchStreams = () => {
        setLoading(true);
        api.get('/admin/streams')
            .then(res => setStreams(res.data))
            .catch(() => toast.error("Failed to fetch streams."))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchStreams(); }, []);
    
    const handleOpenFormModal = (stream = null) => {
        setCurrentStream(stream);
        setIsFormModalOpen(true);
    };

    const handleOpenCoursesModal = (stream) => {
        setCurrentStream(stream);
        setIsCoursesModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure? Deleting a stream will also remove its course associations.")) {
            toast.promise(api.delete(`/admin/streams/${id}`), {
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
                <h1 className="text-3xl font-bold">Manage Streams & Courses</h1>
                <button onClick={() => handleOpenFormModal()} className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    <Plus size={20} /> Add New Stream
                </button>
            </div>
            
            <div className="bg-primary border border-secondary rounded-xl p-6">
                <div className="space-y-3">
                    {loading ? ( <div>Loading streams...</div> ) :
                     streams.map(stream => (
                        <div key={stream.id} className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
                            <span className="font-medium">{stream.name}</span>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleOpenCoursesModal(stream)} className="text-accent hover:underline text-xs font-bold flex items-center gap-1"><BookCopy size={14} /> MANAGE COURSES</button>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleOpenFormModal(stream)} className="text-text-secondary hover:text-accent"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(stream.id)} className="text-text-secondary hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isFormModalOpen && (
                    <StreamFormModal 
                        stream={currentStream}
                        onClose={() => setIsFormModalOpen(false)}
                        onSave={() => {
                            setIsFormModalOpen(false);
                            fetchStreams();
                        }}
                    />
                )}
            </AnimatePresence>

             <AnimatePresence>
                {isCoursesModalOpen && (
                    <ManageCoursesModal 
                        stream={currentStream} 
                        onClose={() => setIsCoursesModalOpen(false)}
                        onDone={() => {
                            setIsCoursesModalOpen(false);
                            fetchStreams();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}