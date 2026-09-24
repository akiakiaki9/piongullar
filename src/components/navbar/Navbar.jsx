"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingBag, FiPhone } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import "./navbar.css";

const links = [
    { href: "#gallery", label: "Букеты" },
    { href: "#about", label: "О нас" },
    { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { count, setIsOpen } = useCart();

    /* ---------- Скролл-детект ---------- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------- Блокировка скролла при открытом меню ---------- */
    useEffect(() => {
        if (mobileOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.width = "";
                document.body.style.overflow = "";
                document.documentElement.style.overflow = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [mobileOpen]);

    /* ---------- Закрытие по Escape ---------- */
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileOpen]);

    /* ---------- Плавный скролл к якорю ---------- */
    const handleAnchor = useCallback((e, href) => {
        e.preventDefault();
        setMobileOpen(false);

        // Небольшая задержка, чтобы меню успело закрыться и
        // body вернул нормальный поток
        setTimeout(() => {
            const el = document.querySelector(href);
            if (!el) return;
            const headerOffset = 72;
            const top =
                el.getBoundingClientRect().top +
                window.pageYOffset -
                headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
        }, 260);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
            >
                <div className="container navbar__inner">
                    <a
                        href="#top"
                        className="navbar__logo"
                        onClick={(e) => handleAnchor(e, "#top")}
                        aria-label="PionGullar — на главную"
                    >
                        <span className="navbar__logo-pion">Pion</span>
                        <span className="navbar__logo-gullar">Gullar</span>
                    </a>

                    <nav className="navbar__links" aria-label="Основная навигация">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="navbar__link"
                                onClick={(e) => handleAnchor(e, l.href)}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="navbar__actions">
                        <a
                            href="https://t.me/piongullar_bot"
                            target="_blank"
                            rel="noreferrer"
                            className="navbar__icon"
                            aria-label="Telegram бот"
                        >
                            <FaTelegramPlane />
                        </a>

                        <a
                            href="tel:+998914088685"
                            className="navbar__icon navbar__icon--phone"
                            aria-label="Позвонить"
                        >
                            <FiPhone />
                        </a>

                        <button
                            type="button"
                            className="navbar__cart"
                            onClick={() => setIsOpen(true)}
                            aria-label={`Корзина${count ? `, товаров: ${count}` : ""}`}
                        >
                            <FiShoppingBag />
                            <AnimatePresence>
                                {count > 0 && (
                                    <motion.span
                                        key={count}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                        className="navbar__cart-badge"
                                    >
                                        {count}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        <button
                            type="button"
                            className="navbar__burger"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ---------- Полноэкранное мобильное меню ---------- */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="navbar__mobile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.nav
                            className="navbar__mobile-inner"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ul className="navbar__mobile-list">
                                {links.map((l, i) => (
                                    <motion.li
                                        key={l.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 * i + 0.1 }}
                                    >
                                        <a
                                            href={l.href}
                                            onClick={(e) => handleAnchor(e, l.href)}
                                            className="navbar__mobile-link"
                                        >
                                            {l.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                className="navbar__mobile-actions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <a
                                    href="tel:+998914088685"
                                    className="btn-primary navbar__mobile-cta"
                                >
                                    <FiPhone /> Позвонить
                                </a>
                                <a
                                    href="https://t.me/piongullar_bot"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-secondary navbar__mobile-cta"
                                >
                                    <FaTelegramPlane /> Telegram
                                </a>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}