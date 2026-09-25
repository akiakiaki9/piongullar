"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
    FiX,
    FiChevronLeft,
    FiChevronRight,
    FiPhone,
    FiShoppingBag,
    FiCheck,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import "./product-modal.css";

const DESCRIPTION =
    "Авторская композиция, собранная вручную из свежайших пионов. Нежные оттенки, элегантная упаковка и внимание к деталям — чтобы подарить незабываемые эмоции. Быстрая доставка по Бухаре в течение дня.";

const FEATURES = [
    "Свежие пионы из отборных партий",
    "Авторская упаковка премиум-класса",
    "Доставка по Бухаре в день заказа",
];

export default function ProductModal({
    activeIndex,
    items,
    onClose,
    onPrev,
    onNext,
}) {
    const { addItem } = useCart();
    const isOpen = activeIndex !== null;

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };

        window.addEventListener("keydown", onKey);

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
            window.removeEventListener("keydown", onKey);
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            body.style.overflow = "";
            html.style.overflow = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen, onClose, onPrev, onNext]);

    const item = isOpen ? items[activeIndex] : null;

    const handleAdd = () => {
        if (!item) return;
        addItem(item.id);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="pmodal-backdrop"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                        }}
                        className="pmodal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Букет №${item.id}`}
                    >
                        <button
                            type="button"
                            className="pmodal__close"
                            onClick={onClose}
                            aria-label="Закрыть"
                        >
                            <FiX aria-hidden="true" />
                        </button>

                        <div className="pmodal__media">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.35 }}
                                    src={item.src}
                                    alt={`Букет №${item.id}`}
                                    draggable="false"
                                />
                            </AnimatePresence>

                            <button
                                type="button"
                                className="pmodal__nav pmodal__nav--prev"
                                onClick={onPrev}
                                aria-label="Предыдущий букет"
                            >
                                <FiChevronLeft aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="pmodal__nav pmodal__nav--next"
                                onClick={onNext}
                                aria-label="Следующий букет"
                            >
                                <FiChevronRight aria-hidden="true" />
                            </button>
                        </div>

                        <div className="pmodal__info">
                            <span className="pmodal__eyebrow">
                                PION GULLAR · БУХАРА
                            </span>

                            <h3 className="pmodal__title">
                                Эксклюзивный <em>букет</em>
                            </h3>

                            <p className="pmodal__desc">{DESCRIPTION}</p>

                            <ul className="pmodal__features">
                                {FEATURES.map((f, i) => (
                                    <li key={i}>
                                        <span className="pmodal__feature-icon">
                                            <FiCheck aria-hidden="true" />
                                        </span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pmodal__actions">
                                <button
                                    type="button"
                                    className="btn-primary pmodal__btn"
                                    onClick={handleAdd}
                                >
                                    <FiShoppingBag aria-hidden="true" />
                                    Добавить в корзину
                                </button>

                                <a
                                    href="tel:+998914088685"
                                    className="btn-outline pmodal__btn"
                                >
                                    <FiPhone aria-hidden="true" />
                                    Заказать по звонку
                                </a>
                            </div>

                            <p className="pmodal__hint">
                                Цену уточняйте по телефону — она зависит от
                                размера и состава букета.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}