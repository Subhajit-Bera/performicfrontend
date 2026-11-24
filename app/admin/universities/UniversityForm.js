// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// // Reusable input component
// const FormInput = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder || label} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
//     </div>
// );

// export default function UniversityForm({ onSave, initialData }) {
//     const [formData, setFormData] = useState({
//         name: '', location: '', stream_id: '', rating: '0.0',
//         description: '', image_url: '',
//         details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
//         courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
//         placements: { highest_package: '', average_package: '', top_recruiters: '' },
//         facilities: ''
//     });
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         api.get('/admin/streams').then(res => setStreams(res.data));
//         if (initialData) {
//             setFormData(initialData);
//         }
//     }, [initialData]);

//     const handleChange = (e, section = null, index = null, field = null) => {
//         if (section) {
//             if (index !== null) { // Array like courses_and_fees
//                 const newArray = [...formData[section]];
//                 newArray[index][field] = e.target.value;
//                 setFormData(prev => ({ ...prev, [section]: newArray }));
//             } else { // Object like details or placements
//                 setFormData(prev => ({
//                     ...prev,
//                     [section]: { ...prev[section], [e.target.name]: e.target.value }
//                 }));
//             }
//         } else {
//             setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//         }
//     };

//     const addCourse = () => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: [...prev.courses_and_fees, { course: '', fees_per_year: '', duration: '' }]
//         }));
//     };

//     const removeCourse = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: prev.courses_and_fees.filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const payload = {
//             ...formData,
//             stream_id: parseInt(formData.stream_id, 10),
//             rating: parseFloat(formData.rating),
//             details: {
//                 ...formData.details,
//                 established_year: parseInt(formData.details.established_year, 10),
//                 campus_size_acres: parseInt(formData.details.campus_size_acres, 10)
//             },
//             placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()) },
//             facilities: formData.facilities.split(',').map(s => s.trim())
//         };

//         try {
//             await onSave(payload);
//         } catch (error) {
//             // Error is handled by the parent page with toast
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             {/* --- Basic Information --- */}
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
//                     <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
//                     <div>
//                         <label htmlFor="stream_id" className="block text-sm font-medium text-text-secondary mb-1">Stream</label>
//                         <select id="stream_id" name="stream_id" value={formData.stream_id} onChange={handleChange} className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent">
//                             <option value="">Select a Stream</option>
//                             {streams.map(stream => <option key={stream.id} value={stream.id}>{stream.name}</option>)}
//                         </select>
//                     </div>
//                     <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
//                     <div className="md:col-span-2">
//                         <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
//                     </div>
//                     <div className="md:col-span-2">
//                          <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
//                         <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" />
//                     </div>
//                 </div>
//             </section>

//              {/* --- Details Section --- */}
//             <section>
//                  <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
//                     <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
//                 </div>
//             </section>

//              {/* --- Courses & Fees --- */}
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
//                 <div className="space-y-4">
//                     {formData.courses_and_fees.map((course, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
//                             <div className="md:col-span-3"><FormInput label={`Course ${index + 1} Name`} name="course" value={course.course} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')} /></div>
//                             <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={course.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
//                             <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
//                             <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500"><XCircle /></button></div>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold"><PlusCircle size={16} /> Add Course</button>
//             </section>

//             {/* --- Placements --- */}
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
//                 </div>
//             </section>

//             {/* --- Facilities --- */}
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
//                 <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
//             </section>

//             <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                 {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
//             </button>
//         </form>
//     );
// }






// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// // Reusable input component
// const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', step = undefined }) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <input 
//             type={type} 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             step={step}
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );

// const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
//      <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <textarea 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             rows={rows} 
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );


// export default function UniversityForm({ onSave, initialData }) {
//     const [formData, setFormData] = useState({
//         name: '', location: '', stream_ids: [], rating: '0.0',
//         description: '', image_url: '',
//         admission_open: false, admission_year: new Date().getFullYear() + 1,
//         details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
//         courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
//         placements: { highest_package: '', average_package: '', top_recruiters: '' },
//         facilities: ''
//     });
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         api.get('/admin/streams').then(res => setStreams(res.data));
//         if (initialData) {
//             setFormData({
//                 ...initialData,
//                 stream_ids: initialData.stream_ids || [],
//                 placements: { ...initialData.placements, top_recruiters: (initialData.placements.top_recruiters || []).join(', ') },
//                 facilities: (initialData.facilities || []).join(', ')
//             });
//         }
//     }, [initialData]);

//     const handleChange = (e, section = null, index = null, field = null) => {
//         const { name, value, type, checked } = e.target;

//         if (name === "admission_open") {
//             setFormData(prev => ({ ...prev, admission_open: checked }));
//             return;
//         }

//         if (section) {
//             if (index !== null) { // Array like courses_and_fees
//                 const newArray = [...formData[section]];
//                 newArray[index][field] = value;
//                 setFormData(prev => ({ ...prev, [section]: newArray }));
//             } else { // Object like details or placements
//                 setFormData(prev => ({
//                     ...prev,
//                     [section]: { ...prev[section], [name]: value }
//                 }));
//             }
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleStreamChange = (streamId) => {
//         setFormData(prev => {
//             const newStreamIds = (prev.stream_ids || []).includes(streamId)
//                 ? prev.stream_ids.filter(id => id !== streamId)
//                 : [...(prev.stream_ids || []), streamId];
//             return { ...prev, stream_ids: newStreamIds };
//         });
//     };

//     const addCourse = () => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: [...prev.courses_and_fees, { course: '', fees_per_year: '', duration: '' }]
//         }));
//     };

//     const removeCourse = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: prev.courses_and_fees.filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const payload = {
//             ...formData,
//             rating: parseFloat(formData.rating),
//             details: {
//                 ...formData.details,
//                 established_year: parseInt(formData.details.established_year, 10) || null,
//                 campus_size_acres: parseInt(formData.details.campus_size_acres, 10) || null
//             },
//             placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()).filter(Boolean) },
//             facilities: formData.facilities.split(',').map(s => s.trim()).filter(Boolean)
//         };

//         try {
//             await onSave(payload);
//         } catch (error) {
//             // Error is handled by the parent page which shows a toast
//         } finally {
//             setLoading(false);
//         }
//     };

//     const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
//                     <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
//                     <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
//                     <div className="md:col-span-2">
//                         <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
//                     </div>
//                     <div className="md:col-span-2">
//                          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="4" />
//                     </div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Stream Selection (Multi-select)</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {streams.map(stream => (
//                         <div key={stream.id} className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id={`stream-${stream.id}`}
//                                 checked={(formData.stream_ids || []).includes(stream.id)}
//                                 onChange={() => handleStreamChange(stream.id)}
//                                 className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                             />
//                             <label htmlFor={`stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Admission Status</h2>
//                 <div className="flex items-center gap-4">
//                      <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="admission_open"
//                             name="admission_open"
//                             checked={formData.admission_open}
//                             onChange={handleChange}
//                             className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                         />
//                         <label htmlFor="admission_open" className="ml-2 text-sm text-text">Admission Open</label>
//                     </div>
//                     <select
//                         name="admission_year"
//                         value={formData.admission_year}
//                         onChange={handleChange}
//                         disabled={!formData.admission_open}
//                         className="bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent disabled:opacity-50"
//                     >
//                         {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//                     </select>
//                 </div>
//             </section>

//              <section>
//                  <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
//                     <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
//                 <div className="space-y-4">
//                     {formData.courses_and_fees && formData.courses_and_fees.map((course, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
//                             <div className="md:col-span-3"><FormInput label={`Course ${index + 1} Name`} name="course" value={course.course} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')} /></div>
//                             <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={course.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
//                             <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
//                             <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500"><XCircle /></button></div>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold"><PlusCircle size={16} /> Add Course</button>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
//                 <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
//             </section>

//             <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                 {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
//             </button>
//         </form>
//     );
// }




// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// // Reusable input component
// const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', step = undefined }) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <input 
//             type={type} 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             step={step}
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );

// // Reusable textarea component
// const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
//      <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <textarea 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             rows={rows} 
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );


// export default function UniversityForm({ onSave, initialData }) {
//     const [formData, setFormData] = useState({
//         name: '', location: '', stream_ids: [], rating: '0.0',
//         description: '', image_url: '',
//         admission_open: false, admission_year: new Date().getFullYear() + 1,
//         details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
//         courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
//         placements: { highest_package: '', average_package: '', top_recruiters: '' },
//         facilities: ''
//     });
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         api.get('/admin/streams').then(res => setStreams(res.data));
//         if (initialData) {
//             // Safely handle data conversion for the form
//             const placements = initialData.placements || {};
//             const topRecruiters = Array.isArray(placements.top_recruiters) ? placements.top_recruiters.join(', ') : '';
//             const facilities = Array.isArray(initialData.facilities) ? initialData.facilities.join(', ') : '';

//             setFormData({
//                 ...initialData,
//                 stream_ids: initialData.stream_ids || [],
//                 placements: { ...placements, top_recruiters: topRecruiters },
//                 facilities: facilities
//             });
//         }
//     }, [initialData]);

//     const handleChange = (e, section = null, index = null, field = null) => {
//         const { name, value, type, checked } = e.target;

//         if (name === "admission_open") {
//             setFormData(prev => ({ ...prev, admission_open: checked }));
//             return;
//         }

//         if (section) {
//             if (index !== null) { // Array like courses_and_fees
//                 const newArray = [...(formData[section] || [])];
//                 newArray[index][field] = value;
//                 setFormData(prev => ({ ...prev, [section]: newArray }));
//             } else { // Object like details or placements
//                 setFormData(prev => ({
//                     ...prev,
//                     [section]: { ...prev[section], [name]: value }
//                 }));
//             }
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleStreamChange = (streamId) => {
//         setFormData(prev => {
//             const newStreamIds = (prev.stream_ids || []).includes(streamId)
//                 ? prev.stream_ids.filter(id => id !== streamId)
//                 : [...(prev.stream_ids || []), streamId];
//             return { ...prev, stream_ids: newStreamIds };
//         });
//     };

//     const addCourse = () => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: [...(prev.courses_and_fees || []), { course: '', fees_per_year: '', duration: '' }]
//         }));
//     };

//     const removeCourse = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: (prev.courses_and_fees || []).filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const payload = {
//             ...formData,
//             rating: parseFloat(formData.rating),
//             details: {
//                 ...formData.details,
//                 established_year: parseInt(formData.details.established_year, 10) || null,
//                 campus_size_acres: parseInt(formData.details.campus_size_acres, 10) || null
//             },
//             placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()).filter(Boolean) },
//             facilities: formData.facilities.split(',').map(s => s.trim()).filter(Boolean)
//         };

//         try {
//             await onSave(payload);
//         } catch (error) {
//             // Error is handled by the parent page which shows a toast
//         } finally {
//             setLoading(false);
//         }
//     };

//     const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
//                     <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
//                     <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
//                     <div className="md:col-span-2">
//                         <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
//                     </div>
//                     <div className="md:col-span-2">
//                          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="4" />
//                     </div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Stream Selection (Multi-select)</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {streams.map(stream => (
//                         <div key={stream.id} className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id={`stream-${stream.id}`}
//                                 checked={(formData.stream_ids || []).includes(stream.id)}
//                                 onChange={() => handleStreamChange(stream.id)}
//                                 className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                             />
//                             <label htmlFor={`stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Admission Status</h2>
//                 <div className="flex items-center gap-4">
//                      <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="admission_open"
//                             name="admission_open"
//                             checked={formData.admission_open}
//                             onChange={handleChange}
//                             className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                         />
//                         <label htmlFor="admission_open" className="ml-2 text-sm text-text">Admission Open</label>
//                     </div>
//                     <select
//                         name="admission_year"
//                         value={formData.admission_year}
//                         onChange={handleChange}
//                         disabled={!formData.admission_open}
//                         className="bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent disabled:opacity-50"
//                     >
//                         {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//                     </select>
//                 </div>
//             </section>

//              <section>
//                  <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
//                     <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
//                 <div className="space-y-4">
//                     {formData.courses_and_fees && formData.courses_and_fees.map((course, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
//                             <div className="md:col-span-3"><FormInput label={`Course ${index + 1} Name`} name="course" value={course.course} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')} /></div>
//                             <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={course.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
//                             <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
//                             <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500 hover:text-red-400"><XCircle /></button></div>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold hover:text-accent-hover"><PlusCircle size={16} /> Add Course</button>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
//                 <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
//             </section>

//             <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                 {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
//             </button>
//         </form>
//     );
// }










// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// // Reusable input component for clean forms
// const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', step = undefined }) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <input 
//             type={type} 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             step={step}
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );

// // Reusable textarea component
// const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
//      <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <textarea 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             rows={rows} 
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );


// export default function UniversityForm({ onSave, initialData }) {
//     const [formData, setFormData] = useState({
//         name: '', location: '', stream_ids: [], rating: '0.0',
//         description: '', image_url: '',
//         admission_open: false, admission_year: new Date().getFullYear() + 1,
//         is_top_university: false, top_stream_ids: [],
//         details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
//         courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
//         placements: { highest_package: '', average_package: '', top_recruiters: '' },
//         facilities: ''
//     });
//     const [streams, setStreams] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         api.get('/admin/streams').then(res => setStreams(res.data));
//         if (initialData) {
//             const placements = initialData.placements || {};
//             const topRecruiters = Array.isArray(placements.top_recruiters) ? placements.top_recruiters.join(', ') : '';
//             const facilities = Array.isArray(initialData.facilities) ? initialData.facilities.join(', ') : '';

//             setFormData({
//                 ...initialData,
//                 stream_ids: initialData.stream_ids || [],
//                 top_stream_ids: initialData.top_stream_ids || [],
//                 placements: { ...placements, top_recruiters: topRecruiters },
//                 facilities: facilities
//             });
//         }
//     }, [initialData]);

//     const handleChange = (e, section = null, index = null, field = null) => {
//         const { name, value, type, checked } = e.target;

//         const simpleSetters = {
//             "admission_open": () => setFormData(prev => ({ ...prev, admission_open: checked })),
//             "is_top_university": () => setFormData(prev => ({ ...prev, is_top_university: checked, top_stream_ids: checked ? prev.top_stream_ids : [] }))
//         };

//         if (simpleSetters[name]) {
//             simpleSetters[name]();
//             return;
//         }

//         if (section) {
//             if (index !== null) {
//                 const newArray = [...(formData[section] || [])];
//                 newArray[index][field] = value;
//                 setFormData(prev => ({ ...prev, [section]: newArray }));
//             } else {
//                 setFormData(prev => ({
//                     ...prev,
//                     [section]: { ...prev[section], [name]: value }
//                 }));
//             }
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleMultiSelectChange = (e, fieldName) => {
//         const selectedIds = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
//         setFormData(prev => ({ ...prev, [fieldName]: selectedIds }));
//     };

//     const handleCheckboxChange = (id, fieldName) => {
//         setFormData(prev => {
//             const currentIds = prev[fieldName] || [];
//             const newIds = currentIds.includes(id)
//                 ? currentIds.filter(i => i !== id)
//                 : [...currentIds, id];
//             return { ...prev, [fieldName]: newIds };
//         });
//     };

//     const addCourse = () => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: [...(prev.courses_and_fees || []), { course: '', fees_per_year: '', duration: '' }]
//         }));
//     };

//     const removeCourse = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: (prev.courses_and_fees || []).filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const payload = {
//             ...formData,
//             rating: parseFloat(formData.rating),
//             details: {
//                 ...formData.details,
//                 established_year: parseInt(formData.details.established_year, 10) || null,
//                 campus_size_acres: parseInt(formData.details.campus_size_acres, 10) || null
//             },
//             placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()).filter(Boolean) },
//             facilities: formData.facilities.split(',').map(s => s.trim()).filter(Boolean)
//         };
        
//         try {
//             await onSave(payload);
//         } catch (error) {
//             // Error is handled by the parent page which shows a toast
//         } finally {
//             setLoading(false);
//         }
//     };

//     const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
//                     <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
//                     <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
//                     <div className="md:col-span-2">
//                         <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
//                     </div>
//                     <div className="md:col-span-2">
//                          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="4" />
//                     </div>
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Stream Selection (Multi-select)</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {streams.map(stream => (
//                         <div key={stream.id} className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id={`stream-${stream.id}`}
//                                 checked={(formData.stream_ids || []).includes(stream.id)}
//                                 onChange={() => handleCheckboxChange(stream.id, 'stream_ids')}
//                                 className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                             />
//                             <label htmlFor={`stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
//                         </div>
//                     ))}
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Admission Status</h2>
//                 <div className="flex items-center gap-4">
//                      <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="admission_open"
//                             name="admission_open"
//                             checked={formData.admission_open}
//                             onChange={handleChange}
//                             className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                         />
//                         <label htmlFor="admission_open" className="ml-2 text-sm text-text">Admission Open</label>
//                     </div>
//                     <select
//                         name="admission_year"
//                         value={formData.admission_year}
//                         onChange={handleChange}
//                         disabled={!formData.admission_open}
//                         className="bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent disabled:opacity-50"
//                     >
//                         {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//                     </select>
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Top University Status</h2>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                     <div className="flex items-center flex-shrink-0">
//                         <input
//                             type="checkbox"
//                             id="is_top_university"
//                             name="is_top_university"
//                             checked={formData.is_top_university}
//                             onChange={handleChange}
//                             className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                         />
//                         <label htmlFor="is_top_university" className="ml-2 text-sm text-text">Mark as Top University</label>
//                     </div>
//                     {formData.is_top_university && (
//                          <div className="flex-grow">
//                             <label htmlFor="top_stream_ids" className="block text-sm font-medium text-text-secondary mb-1">Top in Streams (Ctrl+Click to select multiple)</label>
//                             <select 
//                                 id="top_stream_ids" 
//                                 name="top_stream_ids" 
//                                 multiple 
//                                 value={formData.top_stream_ids || []} 
//                                 onChange={(e) => handleMultiSelectChange(e, 'top_stream_ids')}
//                                 className="w-full h-24 bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent"
//                             >
//                                 {streams.map(stream => (
//                                     <option key={stream.id} value={stream.id}>{stream.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}
//                 </div>
//             </section>

//              <section>
//                  <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
//                     <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
//                 <div className="space-y-4">
//                     {formData.courses_and_fees && formData.courses_and_fees.map((course, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
//                             <div className="md:col-span-3"><FormInput label={`Course ${index + 1} Name`} name="course" value={course.course} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')} /></div>
//                             <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={course.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
//                             <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
//                             <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500 hover:text-red-400"><XCircle /></button></div>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold hover:text-accent-hover"><PlusCircle size={16} /> Add Course</button>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
//                 <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
//             </section>
            
//             <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                 {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
//             </button>
//         </form>
//     );
// }






// "use client";
// import React, { useState, useEffect } from 'react';
// import api from '../../utils/api';
// import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// // Reusable input component for clean forms
// const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', step = undefined }) => (
//     <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <input 
//             type={type} 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             step={step}
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );

// // Reusable textarea component
// const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
//      <div>
//         <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
//         <textarea 
//             id={name} 
//             name={name} 
//             value={value || ''} 
//             onChange={onChange} 
//             placeholder={placeholder || label} 
//             rows={rows} 
//             className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
//         />
//     </div>
// );


// export default function UniversityForm({ onSave, initialData }) {
//     const [formData, setFormData] = useState({
//         name: '', location: '', stream_ids: [], rating: '0.0',
//         description: '', image_url: '',
//         admission_open: false, admission_year: new Date().getFullYear() + 1,
//         is_top_university: false, top_stream_ids: [],
//         details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
//         courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
//         placements: { highest_package: '', average_package: '', top_recruiters: '' },
//         facilities: ''
//     });
//     const [allStreams, setAllStreams] = useState([]);
//     const [availableCourses, setAvailableCourses] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Fetch all available streams once on component mount
//     useEffect(() => {
//         api.get('/admin/streams').then(res => setAllStreams(res.data));
//     }, []);
    
//     // When the selected university streams change, fetch the courses available for those streams
//     useEffect(() => {
//         if (formData.stream_ids && formData.stream_ids.length > 0) {
//             api.get(`/admin/courses-by-streams?stream_ids=${formData.stream_ids.join(',')}`)
//                .then(res => setAvailableCourses(res.data));
//         } else {
//             setAvailableCourses([]);
//         }
//     }, [formData.stream_ids]);

//     // Populate the form when editing an existing university
//     useEffect(() => {
//         if (initialData) {
//             const placements = initialData.placements || {};
//             const topRecruiters = Array.isArray(placements.top_recruiters) ? placements.top_recruiters.join(', ') : '';
//             const facilities = Array.isArray(initialData.facilities) ? initialData.facilities.join(', ') : '';
//             setFormData({
//                 ...initialData,
//                 stream_ids: initialData.stream_ids || [],
//                 top_stream_ids: initialData.top_stream_ids || [],
//                 placements: { ...placements, top_recruiters: topRecruiters },
//                 facilities: facilities
//             });
//         }
//     }, [initialData]);

//     const handleChange = (e, section = null, index = null, field = null) => {
//         const { name, value, type, checked } = e.target;
//         const simpleSetters = {
//             "admission_open": () => setFormData(prev => ({ ...prev, admission_open: checked })),
//             "is_top_university": () => setFormData(prev => ({...prev, is_top_university: checked, top_stream_ids: checked ? prev.top_stream_ids : []}))
//         };
//         if (simpleSetters[name]) { simpleSetters[name](); return; }
//         if (section) {
//             if (index !== null) {
//                 const newArray = [...(formData[section] || [])];
//                 newArray[index][field] = value;
//                 setFormData(prev => ({ ...prev, [section]: newArray }));
//             } else {
//                 setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
//             }
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };
    
//     const handleCheckboxChange = (id, fieldName) => {
//         setFormData(prev => {
//             const currentIds = prev[fieldName] || [];
//             const newIds = currentIds.includes(id) ? currentIds.filter(i => i !== id) : [...currentIds, id];
//             return { ...prev, [fieldName]: newIds };
//         });
//     };

//     const addCourse = () => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: [...(prev.courses_and_fees || []), { course: '', fees_per_year: '', duration: '' }]
//         }));
//     };

//     const removeCourse = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             courses_and_fees: (prev.courses_and_fees || []).filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const payload = {
//             ...formData,
//             rating: parseFloat(formData.rating),
//             details: { ...formData.details, established_year: parseInt(formData.details.established_year, 10) || null, campus_size_acres: parseInt(formData.details.campus_size_acres, 10) || null },
//             placements: { ...formData.placements, top_recruiters: formData.placements.top_recruiters.split(',').map(s => s.trim()).filter(Boolean) },
//             facilities: formData.facilities.split(',').map(s => s.trim()).filter(Boolean)
//         };
//         try { await onSave(payload); } catch (error) {} finally { setLoading(false); }
//     };

//     const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
//                     <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
//                     <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
//                     <div className="md:col-span-2">
//                         <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
//                     </div>
//                     <div className="md:col-span-2">
//                          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="4" />
//                     </div>
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Streams (Multi-select)</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {allStreams.map(stream => (
//                         <div key={stream.id} className="flex items-center">
//                             <input type="checkbox" id={`stream-${stream.id}`} checked={(formData.stream_ids || []).includes(stream.id)} onChange={() => handleCheckboxChange(stream.id, 'stream_ids')} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
//                             <label htmlFor={`stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
//                         </div>
//                     ))}
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Admission Status</h2>
//                 <div className="flex items-center gap-4">
//                      <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="admission_open"
//                             name="admission_open"
//                             checked={formData.admission_open}
//                             onChange={handleChange}
//                             className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
//                         />
//                         <label htmlFor="admission_open" className="ml-2 text-sm text-text">Admission Open</label>
//                     </div>
//                     <select
//                         name="admission_year"
//                         value={formData.admission_year}
//                         onChange={handleChange}
//                         disabled={!formData.admission_open}
//                         className="bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent disabled:opacity-50"
//                     >
//                         {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//                     </select>
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Top University Status</h2>
//                 <div className="flex flex-col sm:flex-row sm:items-start gap-4">
//                     <div className="flex items-center flex-shrink-0 pt-2">
//                         <input type="checkbox" id="is_top_university" name="is_top_university" checked={formData.is_top_university} onChange={handleChange} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
//                         <label htmlFor="is_top_university" className="ml-2 text-sm text-text">Mark as Top University</label>
//                     </div>
//                     {formData.is_top_university && (
//                          <div className="flex-grow bg-secondary/30 p-4 rounded-lg">
//                             <label className="block text-sm font-medium text-text-secondary mb-2">Top in Streams</label>
//                             <div className="grid grid-cols-2 gap-2">
//                                 {allStreams.map(stream => (
//                                     <div key={stream.id} className="flex items-center">
//                                          <input type="checkbox" id={`top-stream-${stream.id}`} checked={(formData.top_stream_ids || []).includes(stream.id)} onChange={() => handleCheckboxChange(stream.id, 'top_stream_ids')} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
//                                         <label htmlFor={`top-stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>

//              <section>
//                  <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
//                     <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
//                     <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
//                 <div className="space-y-4">
//                     {formData.courses_and_fees && formData.courses_and_fees.map((courseItem, index) => (
//                         <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
//                             <div className="md:col-span-3">
//                                 <label className="block text-sm font-medium text-text-secondary mb-1">Course {index + 1} Name</label>
//                                 <select 
//                                     value={courseItem.course}
//                                     onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')}
//                                     className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent"
//                                 >
//                                     <option value="">Select a Course</option>
//                                     {availableCourses.length > 0 ? availableCourses.map(c => (
//                                         <option key={c.id} value={c.name}>{c.name}</option>
//                                     )) : <option disabled>Select university streams first</option>}
//                                 </select>
//                             </div>
//                             <div className="md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={courseItem.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
//                             <div className="md:col-span-1"><FormInput label="Duration" name="duration" value={courseItem.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
//                             <div className="pt-6"><button type="button" onClick={() => removeCourse(index)} className="text-red-500 hover:text-red-400"><XCircle /></button></div>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold hover:text-accent-hover"><PlusCircle size={16} /> Add Course</button>
//             </section>
            
//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
//                     <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Facilities</h2>
//                 <FormInput label="Facilities (comma-separated)" name="facilities" value={formData.facilities} onChange={handleChange} />
//             </section>
            
//             <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-accent/50">
//                 {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update University' : 'Create University')}
//             </button>
//         </form>
//     );
// }

















"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api'
import { toast } from 'sonner';
import { Loader2, PlusCircle, XCircle } from 'lucide-react';

// Reusable input component for clean forms
const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', step = undefined }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <input 
            type={type} 
            id={name} 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            placeholder={placeholder || label} 
            step={step}
            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
        />
    </div>
);

// Reusable textarea component
const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        <textarea 
            id={name} 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            placeholder={placeholder || label} 
            rows={rows} 
            className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent" 
        />
    </div>
);


export default function UniversityForm({ onSave, initialData }) {
    const [formData, setFormData] = useState({
        name: '', location: '', stream_ids: [], rating: '0.0',
        description: '', image_url: '',
        admission_open: false, admission_year: new Date().getFullYear() + 1,
        is_top_university: false, top_stream_ids: [],
        details: { established_year: '', university_type: '', accredited_by: '', campus_size_acres: '' },
        courses_and_fees: [{ course: '', fees_per_year: '', duration: '' }],
        placements: { highest_package: '', average_package: '', top_recruiters: '' },
        facilities: ''
    });
    const [allStreams, setAllStreams] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all available streams once on component mount
    useEffect(() => {
        api.get('/admin/streams').then(res => setAllStreams(res.data));
    }, []);
    
    // When the selected university streams change, fetch the courses for those streams
    useEffect(() => {
        if (formData.stream_ids && formData.stream_ids.length > 0) {
            api.get(`/admin/courses-by-streams?stream_ids=${formData.stream_ids.join(',')}`)
               .then(res => setAvailableCourses(res.data));
        } else {
            setAvailableCourses([]); // Clear if no streams are selected
        }
    }, [formData.stream_ids]);

    // Populate the form when editing an existing university
    useEffect(() => {
        if (initialData) {
            const placements = initialData.placements || {};
            const topRecruiters = Array.isArray(placements.top_recruiters) ? placements.top_recruiters.join(', ') : '';
            const facilities = Array.isArray(initialData.facilities) ? initialData.facilities.join(', ') : '';
            // Nullable columns come back as null. FormInput coerces, but the raw
            // checkbox/select bindings treat null as uncontrolled and warn on the
            // first edit, and formData.details is dereferenced directly when rendering.
            setFormData({
                ...initialData,
                admission_year: initialData.admission_year ?? '',
                admission_open: Boolean(initialData.admission_open),
                is_top_university: Boolean(initialData.is_top_university),
                stream_ids: initialData.stream_ids || [],
                top_stream_ids: initialData.top_stream_ids || [],
                details: initialData.details || {},
                courses_and_fees: Array.isArray(initialData.courses_and_fees)
                    ? initialData.courses_and_fees.map((item) => ({ ...item, course: item?.course ?? '' }))
                    : [],
                placements: { ...placements, top_recruiters: topRecruiters },
                facilities: facilities
            });
        }
    }, [initialData]);

    const handleChange = (e, section = null, index = null, field = null) => {
        const { name, value, checked } = e.target;
        const simpleSetters = {
            "admission_open": () => setFormData(prev => ({ ...prev, admission_open: checked })),
            "is_top_university": () => setFormData(prev => ({...prev, is_top_university: checked, top_stream_ids: checked ? prev.top_stream_ids : []}))
        };
        if (simpleSetters[name]) { simpleSetters[name](); return; }
        if (section) {
            if (index !== null) {
                const newArray = [...(formData[section] || [])];
                newArray[index][field] = value;
                setFormData(prev => ({ ...prev, [section]: newArray }));
            } else {
                setFormData(prev => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleCheckboxChange = (id, fieldName) => {
        setFormData(prev => {
            const currentIds = prev[fieldName] || [];
            const newIds = currentIds.includes(id) ? currentIds.filter(i => i !== id) : [...currentIds, id];
            // The backend rejects a top stream that is not also a university stream,
            // so dropping a stream must drop it from the top selection too.
            if (fieldName === 'stream_ids') {
                return { ...prev, stream_ids: newIds, top_stream_ids: (prev.top_stream_ids || []).filter(sid => newIds.includes(sid)) };
            }
            return { ...prev, [fieldName]: newIds };
        });
    };

    const addCourse = () => {
        setFormData(prev => ({
            ...prev,
            courses_and_fees: [...(prev.courses_and_fees || []), { course: '', fees_per_year: '', duration: '' }]
        }));
    };

    const removeCourse = (index) => {
        setFormData(prev => ({
            ...prev,
            courses_and_fees: (prev.courses_and_fees || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const details = formData.details ?? {};
        const placements = formData.placements ?? {};
        const streamIds = formData.stream_ids ?? [];
        const topStreamIds = formData.is_top_university ? (formData.top_stream_ids ?? []) : [];

        const notAlsoSelected = topStreamIds.filter(id => !streamIds.includes(id));
        if (notAlsoSelected.length > 0) {
            const names = allStreams.filter(s => notAlsoSelected.includes(s.id)).map(s => s.name).join(', ');
            toast.error(`"Top in Streams" must also be selected under University Streams: ${names}`);
            return;
        }

        const toList = (value) => (Array.isArray(value) ? value : String(value ?? '').split(',').map(s => s.trim()).filter(Boolean));
        const rating = parseFloat(formData.rating);

        setLoading(true);
        const payload = {
            ...formData,
            stream_ids: streamIds,
            top_stream_ids: topStreamIds,
            rating: Number.isFinite(rating) ? rating : null,
            details: {
                ...details,
                established_year: parseInt(details.established_year, 10) || null,
                campus_size_acres: parseInt(details.campus_size_acres, 10) || null
            },
            placements: { ...placements, top_recruiters: toList(placements.top_recruiters) },
            facilities: toList(formData.facilities)
        };
        try { await onSave(payload); } catch (error) {} finally { setLoading(false); }
    };

    const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="University Name" name="name" value={formData.name} onChange={handleChange} />
                    <FormInput label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <FormInput label="Rating (0.0 to 5.0)" name="rating" value={formData.rating} onChange={handleChange} type="number" step="0.1" />
                    <div className="md:col-span-2">
                        <FormInput label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
                    </div>
                    <div className="md:col-span-2">
                         <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="4" />
                    </div>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Streams (Multi-select)</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {allStreams.map(stream => (
                        <div key={stream.id} className="flex items-center">
                            <input type="checkbox" id={`stream-${stream.id}`} checked={(formData.stream_ids || []).includes(stream.id)} onChange={() => handleCheckboxChange(stream.id, 'stream_ids')} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
                            <label htmlFor={`stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
                        </div>
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Admission Status</h2>
                <div className="flex items-center gap-4">
                     <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="admission_open"
                            name="admission_open"
                            checked={formData.admission_open}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent"
                        />
                        <label htmlFor="admission_open" className="ml-2 text-sm text-text">Admission Open</label>
                    </div>
                    <select
                        name="admission_year"
                        value={formData.admission_year}
                        onChange={handleChange}
                        disabled={!formData.admission_open}
                        className="bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent disabled:opacity-50"
                    >
                        {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Top University Status</h2>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center flex-shrink-0 pt-2">
                        <input type="checkbox" id="is_top_university" name="is_top_university" checked={formData.is_top_university} onChange={handleChange} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
                        <label htmlFor="is_top_university" className="ml-2 text-sm text-text">Mark as Top University</label>
                    </div>
                    {formData.is_top_university && (
                         <div className="flex-grow bg-secondary/30 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-text-secondary mb-2">Top in Streams (Multi-select)</label>
                            <div className="grid grid-cols-2 gap-2">
                                {allStreams.map(stream => (
                                    <div key={stream.id} className="flex items-center">
                                         <input type="checkbox" id={`top-stream-${stream.id}`} checked={(formData.top_stream_ids || []).includes(stream.id)} onChange={() => handleCheckboxChange(stream.id, 'top_stream_ids')} className="h-4 w-4 rounded border-secondary text-accent focus:ring-accent" />
                                        <label htmlFor={`top-stream-${stream.id}`} className="ml-2 text-sm text-text">{stream.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

             <section>
                 <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">University Details</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Established Year" name="established_year" value={formData.details.established_year} onChange={(e) => handleChange(e, 'details')} type="number" />
                    <FormInput label="University Type" name="university_type" value={formData.details.university_type} onChange={(e) => handleChange(e, 'details')} />
                    <FormInput label="Accredited By" name="accredited_by" value={formData.details.accredited_by} onChange={(e) => handleChange(e, 'details')} />
                    <FormInput label="Campus Size (Acres)" name="campus_size_acres" value={formData.details.campus_size_acres} onChange={(e) => handleChange(e, 'details')} type="number" />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Courses & Fees</h2>
                <div className="space-y-4">
                    {formData.courses_and_fees && formData.courses_and_fees.map((courseItem, index) => (
                        <div key={index} className="bg-secondary/20 p-3 sm:p-4 rounded-lg border border-secondary/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 items-end">
                            <div className="sm:col-span-2 md:col-span-3">
                                <label className="block text-sm font-medium text-text-secondary mb-1">Course {index + 1} Name</label>
                                <select 
                                    value={courseItem.course}
                                    onChange={(e) => handleChange(e, 'courses_and_fees', index, 'course')}
                                    className="w-full bg-secondary/50 border-2 border-secondary rounded-lg p-2.5 focus:outline-none focus:border-accent"
                                >
                                    <option value="">Select a Course</option>
                                    {availableCourses.length > 0 ? availableCourses.map(c => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    )) : <option disabled>Select university streams first</option>}
                                </select>
                            </div>
                            <div className="sm:col-span-1 md:col-span-2"><FormInput label="Fees Per Year" name="fees_per_year" value={courseItem.fees_per_year} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'fees_per_year')} /></div>
                            <div className="sm:col-span-1 md:col-span-1"><FormInput label="Duration" name="duration" value={courseItem.duration} onChange={(e) => handleChange(e, 'courses_and_fees', index, 'duration')} /></div>
                            <div className="flex justify-end md:justify-center pb-1">
                                <button type="button" onClick={() => removeCourse(index)} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm p-1.5 rounded hover:bg-secondary/50 transition-colors">
                                    <XCircle size={20} /> <span className="md:hidden">Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addCourse} className="mt-4 text-accent flex items-center gap-2 text-sm font-semibold hover:text-accent-hover"><PlusCircle size={16} /> Add Course</button>
            </section>
            
            <section>
                <h2 className="text-xl font-bold border-b border-secondary pb-2 mb-4">Placements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Highest Package" name="highest_package" value={formData.placements.highest_package} onChange={(e) => handleChange(e, 'placements')} />
                    <FormInput label="Average Package" name="average_package" value={formData.placements.average_package} onChange={(e) => handleChange(e, 'placements')} />
                    <div className="md:col-span-2"><FormInput label="Top Recruiters (comma-separated)" name="top_recruiters" value={formData.placements.top_recruiters} onChange={(e) => handleChange(e, 'placements')} /></div>
                </div>
            </section>

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