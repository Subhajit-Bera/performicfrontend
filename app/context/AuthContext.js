// "use client";
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import { usePathname, useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [profileCompletion, setProfileCompletion] = useState(0);

//     const pathname = usePathname();
//     const router = useRouter();

//     const calculateProfileCompletion = (user) => {
//         if (!user) return 0;
//         const fields = [
//             'phone_number', 'whatsapp_number', 'state_hometown',
//             'choice_of_stream', 'entry_level', 'how_heard'
//         ];
//         const filledFields = fields.filter(field => user[field] && user[field].trim() !== '').length;
//         const percentage = Math.round((filledFields / fields.length) * 100);
//         return percentage;
//     };
    
//     useEffect(() => {
//         const initializeAuth = async () => {
//             try {
//                 const { data } = await api.get('/user/me');
//                 setUser(data);
//                 setProfileCompletion(calculateProfileCompletion(data));
//             } catch (error) {
//                 console.log("Not logged in");
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         initializeAuth();
//     }, []);

//     const login = (userData) => {
//         setUser(userData.user);
//         setProfileCompletion(calculateProfileCompletion(userData.user));
//         localStorage.setItem('accessToken', userData.accessToken);
//         toast.success("Login successful!");
//         router.push('/');
//     };

//     const logout = async () => {
//         try {
//             await api.post('/auth/logout');
//             setUser(null);
//             localStorage.removeItem('accessToken');
//             toast.info("You have been logged out.");
//             router.push('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//             toast.error("Logout failed. Please try again.");
//         }
//     };
    
//     const updateUser = (updatedUserData) => {
//         setUser(updatedUserData);
//         setProfileCompletion(calculateProfileCompletion(updatedUserData));
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, profileCompletion, updateUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);


"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompletion, setProfileCompletion] = useState(0);

    const router = useRouter();

    const calculateProfileCompletion = (user) => {
        if (!user) return 0;
        const fields = [
            'phone_number', 'whatsapp_number', 'state_hometown',
            'choice_of_stream', 'entry_level', 'how_heard'
        ];
        const filledFields = fields.filter(field => user[field] && user[field].toString().trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };
    
    const revalidateUser = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const { data } = await api.get('/users/me');
                setUser(data);
                setProfileCompletion(calculateProfileCompletion(data));
            } catch (error) {
                console.log("Session expired or invalid, logging out.");
                localStorage.removeItem('accessToken');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        revalidateUser();
    }, []);

    const login = (userData) => {
        setUser(userData.user);
        setProfileCompletion(calculateProfileCompletion(userData.user));
        localStorage.setItem('accessToken', userData.accessToken);
        toast.success("Login successful!");
        router.push(userData.user.role === 'admin' ? '/admin' : '/');
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API call failed, proceeding with client-side logout:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('accessToken');
            toast.info("You have been logged out.");
            router.push('/login');
        }
    };
    
    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        setProfileCompletion(calculateProfileCompletion(updatedUserData));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, profileCompletion, updateUser, revalidateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);