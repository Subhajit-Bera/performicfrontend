"use client";
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

const ROLES = [
    { value: 'user', label: 'User' },
    { value: 'agent', label: 'Agent' },
    { value: 'admin', label: 'Admin' },
];

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useAuth();

    const fetchUsers = useCallback(() => {
        setLoading(true);
        setError(null);
        api.get('/admin/users', { params: { limit: 100 } })
            .then(res => setUsers(res.data.data ?? res.data))
            .catch(err => setError(err.response?.data?.message || 'Could not load users.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleChange = (userId, newRole) => {
        toast.promise(api.put(`/admin/users/${userId}/role`, { role: newRole }), {
            loading: 'Updating role...',
            success: () => {
                fetchUsers();
                return 'User role updated. Their active sessions were signed out.';
            },
            error: (err) => {
                fetchUsers();
                return err.response?.data?.message || 'Failed to update role.';
            },
        });
    };

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Users</h1>

            {error && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                    <span role="alert">{error}</span>
                    <button type="button" onClick={fetchUsers} className="rounded-md bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 hover:bg-red-500/30">
                        Retry
                    </button>
                </div>
            )}

            <div className="bg-primary border border-secondary rounded-xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-sm min-w-[640px]">
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
                        ) : users.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-4 text-text-secondary">No users found.</td></tr>
                        ) : users.map(user => (
                            <tr key={user.id} className="border-b border-secondary">
                                <td className="p-4">{user.full_name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <select
                                        value={user.role}
                                        aria-label={`Role for ${user.full_name}`}
                                        disabled={user.id === currentUser?.id}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-secondary/50 border border-secondary rounded-md p-1 focus:outline-none focus:border-accent disabled:opacity-50"
                                    >
                                        {ROLES.map(role => (
                                            <option key={role.value} value={role.value}>{role.label}</option>
                                        ))}
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
