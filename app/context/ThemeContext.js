"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
    setTheme: () => {},
    mounted: false,
});

export function ThemeProvider({ children }) {
    // Default to 'light' (white theme) as requested by user
    const [theme, setThemeState] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                setThemeState('dark');
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                setThemeState('light');
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            }
        } catch (_) {}
        setMounted(true);
    }, []);

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (_) {}
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

