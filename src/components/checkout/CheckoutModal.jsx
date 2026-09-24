"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPhone, FiCheck, FiAlertCircle } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import "./checkout-modal.css";

const EMPTY_FORM = { name: "", phone: "", address: "", comment: "" };

export default function CheckoutModal() {
    const { items, checkoutOpen, setCheckoutOpen, clear } = useCart();
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");

    const dialogRef = useRef(null);
    const firstFieldRef = useRef(null);
    const closeBtnRef = useRef(null);

    /* ---------- Закрытие ---------- */
    const close = useCallback(() => {
        if (status === "loading") return;
        setCheckoutOpen(false);
        if (status === "success") {
            setStatus("idle");
            setForm(EMPTY_FORM);
        }
    }, [status, setCheckoutOpen]);

    /* ---------- Блокировка скролла + возврат позиции ---------- */
    useEffect(() => {
        if (!checkoutOpen) return;

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
    }, [checkoutOpen]);

    /* ---------- Escape + автфокус ---------- */
    useEffect(() => {
        if (!checkoutOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);

        // Автофокус: если форма — на первое поле, если success — на кнопку
        const t = setTimeout(() => {
            if (status === "success") {
                closeBtnRef.current?.focus();
            } else {
                firstFieldRef.current?.focus();
            }
        }, 60);

        return () => {
            window.removeEventListener("keydown", onKey);
            clearTimeout(t);
        };
    }, [checkoutOpen, status, close]);

    /* ---------- Focus trap ---------- */
    useEffect(() => {
        if (!checkoutOpen) return;

        const onTab = (e) => {
            if (e.key !== "Tab" || !dialogRef.current) return;
            const focusables = dialogRef.current.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    }, [checkoutOpen]);

    /* ---------- Универсальный onChange ---------- */
    const setField = (name) => (e) =>
        setForm((f) => ({ ...f, [name]: e.target.value }));

    /* ---------- Submit ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!items.length || status === "loading") return;

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, items }),
            });

            // Не всякий ответ сервера — JSON (бывает HTML-ошибка на 502 и т.п.)
            let data = {};
            try {
                data = await res.json();
            } catch {
                /* ignore */
            }

            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Не удалось отправить заявку");
            }

            setStatus("success");
            clear();
        } catch (err) {
            setErrorMsg(err.message || "Что-то пошло не так. Попробуйте ещё раз");
            setStatus("error");
        }
    };

    const isLoading = status === "loading";
    const hasItems = items.length > 0;

    return (
        <AnimatePresence>
            {checkoutOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="checkout-backdrop"
                    onClick={close}
                    aria-hidden="true"
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Оформление заказа"
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 320,
                        }}
                        className="checkout"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            ref={closeBtnRef}
                            type="button"
                            className="checkout__close"
                            onClick={close}
                            aria-label="Закрыть окно оформления"
                            disabled={isLoading}
                        >
                            <FiX aria-hidden="true" />
                        </button>

                        {status === "success" ? (
                            <div className="checkout__success" role="status">
                                <div
                                    className="checkout__success-icon"
                                    aria-hidden="true"
                                >
                                    <FiCheck />
                                </div>
                                <h3>Заявка отправлена!</h3>
                                <p>
                                    Мы свяжемся с вами в ближайшее время для
                                    подтверждения заказа.
                                </p>
                                <button
                                    type="button"
                                    className="btn-primary checkout__success-btn"
                                    onClick={close}
                                >
                                    Отлично
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="checkout__eyebrow">
                                    ОФОРМЛЕНИЕ ЗАКАЗА
                                </span>
                                <h3 className="checkout__title">
                                    Оставьте заявку
                                </h3>
                                <p className="checkout__subtitle">
                                    Мы перезвоним, уточним состав, размер и
                                    подтвердим заказ.
                                </p>

                                {hasItems ? (
                                    <ul
                                        className="checkout__list"
                                        role="list"
                                        aria-label="Букеты в заявке"
                                    >
                                        {items.map((i) => (
                                            <li
                                                key={i.id}
                                                className="checkout__list-item"
                                            >
                                                <img
                                                    src={`/images/data/${i.id}.png`}
                                                    alt={`Букет №${i.id}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    draggable="false"
                                                />
                                                <span>Букет №{i.id}</span>
                                                <strong>× {i.qty}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="checkout__empty-note">
                                        В корзине пусто — добавьте букеты, чтобы
                                        оформить заявку.
                                    </p>
                                )}

                                <form
                                    className="checkout__form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                >
                                    <label className="checkout__field">
                                        <span className="checkout__label">
                                            Ваше имя{" "}
                                            <span
                                                aria-hidden="true"
                                                className="checkout__req"
                                            >
                                                *
                                            </span>
                                        </span>
                                        <input
                                            ref={firstFieldRef}
                                            required
                                            name="name"
                                            autoComplete="name"
                                            placeholder="Как к вам обращаться"
                                            value={form.name}
                                            onChange={setField("name")}
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <label className="checkout__field">
                                        <span className="checkout__label">
                                            Телефон{" "}
                                            <span
                                                aria-hidden="true"
                                                className="checkout__req"
                                            >
                                                *
                                            </span>
                                        </span>
                                        <input
                                            required
                                            name="phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            placeholder="+998 __ ___ __ __"
                                            value={form.phone}
                                            onChange={setField("phone")}
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <label className="checkout__field">
                                        <span className="checkout__label">
                                            Адрес доставки
                                        </span>
                                        <input
                                            name="address"
                                            autoComplete="street-address"
                                            placeholder="Улица, дом, ориентир"
                                            value={form.address}
                                            onChange={setField("address")}
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <label className="checkout__field">
                                        <span className="checkout__label">
                                            Комментарий
                                        </span>
                                        <textarea
                                            name="comment"
                                            placeholder="Открытка, время доставки и т.д."
                                            rows={3}
                                            value={form.comment}
                                            onChange={setField("comment")}
                                            disabled={isLoading}
                                        />
                                    </label>

                                    {errorMsg && (
                                        <p
                                            className="checkout__error"
                                            role="alert"
                                        >
                                            <FiAlertCircle aria-hidden="true" />
                                            {errorMsg}
                                        </p>
                                    )}

                                    <div className="checkout__buttons">
                                        <button
                                            type="submit"
                                            className="btn-primary checkout__submit"
                                            disabled={isLoading || !hasItems}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span
                                                        className="checkout__spinner"
                                                        aria-hidden="true"
                                                    />
                                                    Отправка…
                                                </>
                                            ) : (
                                                <>
                                                    <FaTelegramPlane aria-hidden="true" />
                                                    Отправить заявку
                                                </>
                                            )}
                                        </button>

                                        <a
                                            href="tel:+998914088685"
                                            className="btn-outline checkout__call"
                                        >
                                            <FiPhone aria-hidden="true" />{" "}
                                            Позвонить
                                        </a>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}