// "use client";
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { AnimatePresence, motion } from 'framer-motion';
// import { X, Loader2 } from 'lucide-react';
// import api from '../utils/api';
// import { toast } from 'sonner';

// export default function CompleteProfileModal({ isOpen, onClose }) {
//     const { user, updateUser } = useAuth();
//     const [formData, setFormData] = useState({
//         phoneNumber: '',
//         whatsAppNumber: '',
//         isWhatsAppSame: false,
//         stateHometown: '',
//         choiceOfStream: '',
//         choiceOfStreamOther: '',
//         entryLevel: '',
//         entryLevelOther: '',
//         howHeard: '',
//         howHeardOther: ''
//     });
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 phoneNumber: user.phone_number || '',
//                 whatsAppNumber: user.whatsapp_number || '',
//                 isWhatsAppSame: user.phone_number && user.phone_number === user.whatsapp_number,
//                 stateHometown: user.state_hometown || '',
//                 choiceOfStream: user.choice_of_stream || '',
//                 choiceOfStreamOther: user.choice_of_stream_other || '',
//                 entryLevel: user.entry_level || '',
//                 entryLevelOther: user.entry_level_other || '',
//                 howHeard: user.how_heard || '',
//                 howHeardOther: user.how_heard_other || ''
//             });
//         }
//     }, [user]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         if (name === 'isWhatsAppSame') {
//             setFormData(prev => ({
//                 ...prev,
//                 isWhatsAppSame: checked,
//                 whatsAppNumber: checked ? prev.phoneNumber : ''
//             }));
//         } else if (name === 'phoneNumber' && formData.isWhatsAppSame) {
//              setFormData(prev => ({ ...prev, phoneNumber: value, whatsAppNumber: value }));
//         }
//         else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { isWhatsAppSame, ...payload } = formData;
//             const { data } = await api.put('/user/profile', payload);
//             updateUser(data); // Update user in context
//             toast.success("Profile updated successfully!");
//             onClose();
//         } catch (error) {
//             toast.error("Failed to update profile. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const dropDownOptions = {
//         stream: ['Engineering & Technology', 'Management & Business', 'Medical & Healthcare', 'Science & Research', 'Other'],
//         entry: ['12th Pass', 'Graduate', 'Post Graduate', 'Other'],
//         heard: ['Social Media', 'Friends/Family', 'Advertisement', 'Search Engine', 'Other']
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
//                 >
//                     <motion.div
//                         initial={{ scale: 0.9, y: 20 }}
//                         animate={{ scale: 1, y: 0 }}
//                         exit={{ scale: 0.9, y: 20 }}
//                         className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl shadow-cyan-500/10"
//                     >
//                         <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X /></button>
//                         <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
//                         <p className="text-slate-400 mb-6">Provide a few more details to unlock all features and get personalized recommendations.</p>
//                         <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500" />
//                                 <input type="tel" name="whatsAppNumber" value={formData.whatsAppNumber} onChange={handleChange} placeholder="WhatsApp Number" disabled={formData.isWhatsAppSame} className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500 disabled:bg-slate-600" />
//                             </div>
//                              <div className="flex items-center gap-2">
//                                 <input type="checkbox" id="isWhatsAppSame" name="isWhatsAppSame" checked={formData.isWhatsAppSame} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
//                                 <label htmlFor="isWhatsAppSame" className="text-sm text-slate-300">WhatsApp number is same as phone number</label>
//                             </div>
//                             <input type="text" name="stateHometown" value={formData.stateHometown} onChange={handleChange} placeholder="State / Hometown" className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500" />
                            
//                             {/* Stream Dropdown */}
//                             <select name="choiceOfStream" value={formData.choiceOfStream} onChange={handleChange} className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500">
//                                 <option value="">Select Choice of Stream</option>
//                                 {dropDownOptions.stream.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                             {formData.choiceOfStream === 'Other' && <input type="text" name="choiceOfStreamOther" value={formData.choiceOfStreamOther} onChange={handleChange} placeholder="Please specify stream" className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500 mt-2" />}

//                             {/* Entry Level Dropdown */}
//                             <select name="entryLevel" value={formData.entryLevel} onChange={handleChange} className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500">
//                                 <option value="">Select Entry Level</option>
//                                 {dropDownOptions.entry.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                             {formData.entryLevel === 'Other' && <input type="text" name="entryLevelOther" value={formData.entryLevelOther} onChange={handleChange} placeholder="Please specify entry level" className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500 mt-2" />}

//                             {/* How Heard Dropdown */}
//                              <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500">
//                                 <option value="">Where did you hear about us?</option>
//                                 {dropDownOptions.heard.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                             {formData.howHeard === 'Other' && <input type="text" name="howHeardOther" value={formData.howHeardOther} onChange={handleChange} placeholder="Please specify" className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg p-3 focus:outline-none focus:border-cyan-500 mt-2" />}

//                             <div className="text-right pt-4">
//                                 <button type="submit" disabled={loading} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center disabled:bg-cyan-800">
//                                     {loading ? <Loader2 className="animate-spin" /> : 'Save & Continue'}
//                                 </button>
//                             </div>
//                         </form>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }




"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'sonner';

export default function CompleteProfileModal({ isOpen, onClose }) {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        phoneNumber: '',
        whatsAppNumber: '',
        isWhatsAppSame: false,
        stateHometown: '',
        choiceOfStream: '',
        choiceOfStreamOther: '',
        entryLevel: '',
        entryLevelOther: '',
        howHeard: '',
        howHeardOther: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                phoneNumber: user.phone_number || '',
                whatsAppNumber: user.whatsapp_number || '',
                isWhatsAppSame: Boolean(user.phone_number) && user.phone_number === user.whatsapp_number,
                stateHometown: user.state_hometown || '',
                choiceOfStream: user.choice_of_stream || '',
                choiceOfStreamOther: user.choice_of_stream_other || '',
                entryLevel: user.entry_level || '',
                entryLevelOther: user.entry_level_other || '',
                howHeard: user.how_heard || '',
                howHeardOther: user.how_heard_other || ''
            });
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'isWhatsAppSame') {
            setFormData(prev => ({
                ...prev,
                isWhatsAppSame: checked,
                whatsAppNumber: checked ? prev.phoneNumber : ''
            }));
        } else if (name === 'phoneNumber' && formData.isWhatsAppSame) {
             setFormData(prev => ({ ...prev, phoneNumber: value, whatsAppNumber: value }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { isWhatsAppSame, ...payload } = formData;
            const { data } = await api.put('/users/profile', payload);
            updateUser(data);
            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const dropDownOptions = {
        stream: ['Engineering & Technology', 'Management & Business', 'Medical & Healthcare', 'Science & Research', 'Other'],
        entry: ['12th Pass', 'Graduate', 'Post Graduate', 'Other'],
        heard: ['Social Media', 'Friends/Family', 'Advertisement', 'Search Engine', 'Other']
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-primary rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl border border-secondary"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text"><X /></button>
                        <h2 className="text-2xl font-bold text-text mb-2">Complete Your Profile</h2>
                        <p className="text-text-secondary mb-6">Provide a few more details to unlock all features.</p>
                        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                                <input type="tel" name="whatsAppNumber" value={formData.whatsAppNumber} onChange={handleChange} placeholder="WhatsApp Number" disabled={formData.isWhatsAppSame} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent disabled:bg-secondary/20" />
                            </div>
                             <div className="flex items-center gap-2">
                                <input type="checkbox" id="isWhatsAppSame" name="isWhatsAppSame" checked={formData.isWhatsAppSame} onChange={handleChange} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
                                <label htmlFor="isWhatsAppSame" className="text-sm text-text">WhatsApp number is same as phone number</label>
                            </div>
                            <input type="text" name="stateHometown" value={formData.stateHometown} onChange={handleChange} placeholder="State / Hometown" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent" />
                            
                            <select name="choiceOfStream" value={formData.choiceOfStream} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent">
                                <option value="">Select Choice of Stream</option>
                                {dropDownOptions.stream.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            {formData.choiceOfStream === 'Other' && <input type="text" name="choiceOfStreamOther" value={formData.choiceOfStreamOther} onChange={handleChange} placeholder="Please specify stream" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent mt-2" />}

                            <select name="entryLevel" value={formData.entryLevel} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent">
                                <option value="">Select Entry Level</option>
                                {dropDownOptions.entry.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            {formData.entryLevel === 'Other' && <input type="text" name="entryLevelOther" value={formData.entryLevelOther} onChange={handleChange} placeholder="Please specify entry level" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent mt-2" />}

                             <select name="howHeard" value={formData.howHeard} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent">
                                <option value="">Where did you hear about us?</option>
                                {dropDownOptions.heard.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            {formData.howHeard === 'Other' && <input type="text" name="howHeardOther" value={formData.howHeardOther} onChange={handleChange} placeholder="Please specify" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-3 focus:outline-none focus:border-accent mt-2" />}

                            <div className="text-right pt-4">
                                <button type="submit" disabled={loading} className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center disabled:bg-accent/50">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Save & Continue'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}