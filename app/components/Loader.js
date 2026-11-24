"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loader({ fullScreen = true, text = "Loading..." }) {
  if (!fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8">
        <motion.div
          className="w-10 h-10 border-3 border-t-transparent border-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
        {text && <p className="mt-3 text-sm text-text-secondary">{text}</p>}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        {/* Spinning circle */}
        <motion.div
          className="w-14 h-14 border-4 border-t-transparent border-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />

        {/* Text with fade animation */}
        {text && (
          <motion.p
            className="mt-4 text-sm font-medium text-text-secondary tracking-wide"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
}
