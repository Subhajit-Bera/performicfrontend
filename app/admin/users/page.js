"use client";
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        api.get('/admin/users').then(res => setUsers(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = (userId, newRole) => {
        const promise = api.put(`/admin/users/${userId}/role`, { role: newRole })
            .then(() => fetchUsers());
        
        toast.promise(promise, {
            loading: 'Updating role...',
            success: 'User role updated successfully.',
            error: 'Failed to update role.',
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Hometown</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                             <tr><td colSpan="5" className="text-center p-4">Loading users...</td></tr>
                        ) : users.map(user => (
                            <tr key={user.id} className="border-b border-secondary">
                                <td className="p-4">{user.full_name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent"
                                    >
                                        <option value="user">User</option>
                                        <option value="agent">Agent</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4">{user.phone_number || 'N/A'}</td>
                                <td className="p-4">{user.state_hometown || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}