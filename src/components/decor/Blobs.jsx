"use client";
import { motion } from "framer-motion";
import "./blobs.css";

export default function Blobs() {
    return (
        <div className="blobs" aria-hidden>
            <motion.div
                className="blobs__item blobs__item--gold"
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="blobs__item blobs__item--wine"
                animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="blobs__item blobs__item--soft"
                animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}