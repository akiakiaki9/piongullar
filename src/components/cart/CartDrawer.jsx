"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiX,
    FiMinus,
    FiPlus,
    FiTrash2,
    FiPhone,
    FiShoppingBag,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import "./cart-drawer.css";

export default function CartDrawer() {
    const {
        items,
        isOpen,
        setIsOpen,
        removeItem,
        updateQty,
        clear,
        setCheckoutOpen,
    } = useCart();

    const closeBtnRef = useRef(null);
    const drawerRef = useRef(null);

    /* ---------- Блокировка скролла + возврат позиции ---------- */
    useEffect(() => {
        if (!isOpen) return;

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
    }, [isOpen]);

    /* ---------- Escape + блокировка скролла «под» модалкой ---------- */
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKey);

        // автофокус на кнопку закрытия — важно для доступности
        closeBtnRef.current?.focus();

        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, setIsOpen]);

    /* ---------- Простой focus trap ---------- */
    useEffect(() => {
        if (!isOpen) return;

        const onTab = (e) => {
            if (e.key !== "Tab" || !drawerRef.current) return;
            const focusables = drawerRef.current.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener("keydown", onTab);
        return () => window.removeEventListener("keydown", onTab);
    }, [isOpen]);

    const handleCheckout = () => {
        setIsOpen(false);
        setCheckoutOpen(true);
    };

    const handleContinueShopping = () => {
        setIsOpen(false);
        // даём drawer закрыться, потом скроллим к галерее
        setTimeout(() => {
            document.querySelector("#gallery")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 260);
    };

    const totalQty = items.reduce((sum, it) => sum + it.qty, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="cart-backdrop"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    <motion.aside
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Корзина"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 32,
                            stiffness: 320,
                        }}
                        className="cart"
                    >
                        <header className="cart__header">
                            <div className="cart__header-title">
                                <h2>Корзина</h2>
                                {totalQty > 0 && (
                                    <span className="cart__header-count">
                                        {totalQty}{" "}
                                        {totalQty === 1
                                            ? "букет"
                                            : totalQty < 5
                                                ? "букета"
                                                : "букетов"}
                                    </span>
                                )}
                            </div>

                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="cart__close"
                                aria-label="Закрыть корзину"
                            >
                                <FiX aria-hidden="true" />
                            </button>
                        </header>

                        {items.length === 0 ? (
                            <div className="cart__empty">
                                <span aria-hidden="true">🌸</span>
                                <p>Здесь пока пусто</p>
                                <button
                                    type="button"
                                    className="btn-primary cart__empty-btn"
                                    onClick={handleContinueShopping}
                                >
                                    Перейти к букетам
                                </button>
                            </div>
                        ) : (
                            <>
                                <ul className="cart__items" role="list">
                                    <AnimatePresence initial={false}>
                                        {items.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -40 }}
                                                transition={{
                                                    duration: 0.25,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                                className="cart__item"
                                            >
                                                <img
                                                    src={`/images/data/${item.id}.png`}
                                                    alt={`Букет №${item.id}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    draggable="false"
                                                />

                                                <div className="cart__item-info">
                                                    <h4>Букет №{item.id}</h4>
                                                    <span className="cart__item-note">
                                                        Цена по запросу
                                                    </span>

                                                    <div
                                                        className="cart__qty"
                                                        role="group"
                                                        aria-label={`Количество букета №${item.id}`}
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.id,
                                                                    item.qty - 1
                                                                )
                                                            }
                                                            aria-label="Уменьшить количество"
                                                        >
                                                            <FiMinus aria-hidden="true" />
                                                        </button>
                                                        <span aria-live="polite">
                                                            {item.qty}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.id,
                                                                    item.qty + 1
                                                                )
                                                            }
                                                            aria-label="Увеличить количество"
                                                        >
                                                            <FiPlus aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="cart__remove"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    aria-label={`Удалить букет №${item.id} из корзины`}
                                                >
                                                    <FiTrash2 aria-hidden="true" />
                                                </button>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>

                                <footer className="cart__footer">
                                    <button
                                        type="button"
                                        className="btn-primary cart__checkout"
                                        onClick={handleCheckout}
                                    >
                                        <FiShoppingBag aria-hidden="true" />
                                        Оформить заказ
                                    </button>

                                    <div className="cart__alt">
                                        <a
                                            href="tel:+998914088685"
                                            className="cart__alt-btn"
                                        >
                                            <FiPhone aria-hidden="true" />
                                            Позвонить
                                        </a>
                                        <a
                                            href="https://t.me/piongullar_bot"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="cart__alt-btn"
                                        >
                                            <FaTelegramPlane aria-hidden="true" />
                                            Telegram
                                        </a>
                                        <button
                                            type="button"
                                            onClick={clear}
                                            className="cart__clear"
                                            aria-label="Очистить корзину"
                                        >
                                            Очистить
                                        </button>
                                    </div>
                                </footer>
                            </>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}