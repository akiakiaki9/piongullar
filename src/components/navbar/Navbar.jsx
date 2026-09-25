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
    const [pastHero, setPastHero] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { count, setIsOpen } = useCart();

    /* ---------- Скролл-детект ---------- */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            // 100vh — конец Hero
            setPastHero(y > window.innerHeight);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    /* ---------- Блокировка скролла ---------- */
    useEffect(() => {
        if (!mobileOpen) return;

        const scrollY = window.scrollY;
        const body = document.body;
        const html = document.documentElement;

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";

        return () => {
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            body.style.overflow = "";
            html.style.overflow = "";
            window.scrollTo(0, scrollY);
        };
    }, [mobileOpen]);

    /* ---------- Escape ---------- */
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileOpen]);

    /* ---------- Плавный скролл к якорю ---------- */
    const handleAnchor = useCallback(
        (e, href) => {
            e.preventDefault();

            const wasOpen = mobileOpen;
            setMobileOpen(false);

            const doScroll = () => {
                if (href === "#top") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
                const el = document.querySelector(href);
                if (!el) return;
                const headerOffset = 72;
                const top =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerOffset;
                window.scrollTo({ top, behavior: "smooth" });
            };

            if (wasOpen) {
                setTimeout(doScroll, 260);
            } else {
                doScroll();
            }
        },
        [mobileOpen]
    );

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${pastHero ? "navbar--past-hero" : ""
                    }`}
            >
                <div className="container navbar__inner">
                    <a
                        href="#top"
                        className="navbar__logo"
                        onClick={(e) => handleAnchor(e, "#top")}
                        aria-label="PionGullar — на главную"
                    >
                        <img
                            src="/images/logo.png"
                            alt=""
                            className="navbar__logo-mark"
                            aria-hidden="true"
                        />
                        <span className="navbar__logo-text">
                            <span className="navbar__logo-pion">Pion</span>
                            <span className="navbar__logo-gullar">
                                Gullar
                            </span>
                        </span>
                    </a>

                    <nav
                        className="navbar__links"
                        aria-label="Основная навигация"
                    >
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
                            rel="noreferrer noopener"
                            className="navbar__icon navbar__icon--tg"
                            aria-label="Telegram бот"
                        >
                            <FaTelegramPlane aria-hidden="true" />
                        </a>

                        <a
                            href="tel:+998914088685"
                            className="navbar__icon navbar__icon--phone"
                            aria-label="Позвонить"
                        >
                            <FiPhone aria-hidden="true" />
                        </a>

                        <button
                            type="button"
                            className="navbar__cart"
                            onClick={() => setIsOpen(true)}
                            aria-label={`Корзина${count ? `, товаров: ${count}` : ""
                                }`}
                        >
                            <FiShoppingBag aria-hidden="true" />
                            <AnimatePresence>
                                {count > 0 && (
                                    <motion.span
                                        key={count}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 25,
                                        }}
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
                            aria-label={
                                mobileOpen ? "Закрыть меню" : "Открыть меню"
                            }
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileOpen ? (
                                <FiX aria-hidden="true" />
                            ) : (
                                <FiMenu aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="navbar__mobile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Мобильное меню"
                    >
                        <nav className="navbar__mobile-inner">
                            <ul className="navbar__mobile-list">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            onClick={(e) =>
                                                handleAnchor(e, l.href)
                                            }
                                            className="navbar__mobile-link"
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="navbar__mobile-actions">
                                <a
                                    href="tel:+998914088685"
                                    className="btn-primary navbar__mobile-cta"
                                >
                                    <FiPhone aria-hidden="true" /> Позвонить
                                </a>
                                <a
                                    href="https://t.me/piongullar_bot"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="btn-outline navbar__mobile-cta"
                                >
                                    <FaTelegramPlane aria-hidden="true" />{" "}
                                    Telegram
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}