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
    "Каждый букет от Pion Gullar — это авторская композиция, собранная вручную из свежайших пионов. Мы сочетаем нежные оттенки, элегантную упаковку и внимание к деталям, чтобы подарить вам и вашим близким незабываемые эмоции. Быстрая доставка по Бухаре в течение дня.";

export default function ProductModal({ activeIndex, items, onClose, onPrev, onNext }) {
    const { addItem, setIsOpen } = useCart();
    const isOpen = activeIndex !== null;

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
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
                    className="pmodal-backdrop"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                        className="pmodal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="pmodal__close" onClick={onClose} aria-label="Закрыть">
                            <FiX />
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
                                    alt={`Букет ${item.id}`}
                                />
                            </AnimatePresence>

                            <button
                                className="pmodal__nav pmodal__nav--prev"
                                onClick={onPrev}
                                aria-label="Предыдущий"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                className="pmodal__nav pmodal__nav--next"
                                onClick={onNext}
                                aria-label="Следующий"
                            >
                                <FiChevronRight />
                            </button>
                        </div>

                        <div className="pmodal__info">
                            <span className="pmodal__eyebrow">PION GULLAR · БУХАРА</span>
                            <h3 className="pmodal__title">Эксклюзивный букет</h3>
                            <p className="pmodal__desc">{DESCRIPTION}</p>

                            <ul className="pmodal__features">
                                <li>
                                    <FiCheck /> Свежие пионы из отборных партий
                                </li>
                                <li>
                                    <FiCheck /> Авторская упаковка премиум-класса
                                </li>
                                <li>
                                    <FiCheck /> Доставка по Бухаре в день заказа
                                </li>
                            </ul>

                            <div className="pmodal__actions">
                                <button className="btn-primary" onClick={handleAdd}>
                                    <FiShoppingBag /> Добавить в корзину
                                </button>
                                <a href="tel:+998914088685" className="btn-outline">
                                    <FiPhone /> Заказать по звонку
                                </a>
                            </div>

                            <p className="pmodal__hint">
                                Цену уточняйте по телефону — она зависит от размера и состава букета.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}