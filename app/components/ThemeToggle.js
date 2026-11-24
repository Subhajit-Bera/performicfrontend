"use client";
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', iconSize = 18 }) {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return (
            <button
                type="button"
                className={`p-2 rounded-xl border border-secondary/60 bg-secondary/30 text-text-secondary transition-colors ${className}`}
                aria-label="Toggle theme"
            >
                <span className="block" style={{ width: iconSize, height: iconSize }} />
            </button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border border-secondary/70 bg-secondary/30 hover:bg-secondary/60 text-text-secondary hover:text-text transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? (
                <Sun size={iconSize} className="text-gold transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
                <Moon size={iconSize} className="text-accent transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
        </button>
    );
}

