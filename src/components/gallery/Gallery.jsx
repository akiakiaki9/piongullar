"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { FiPlus, FiEye } from "react-icons/fi";
import ProductModal from "@/components/product-modal/ProductModal";
import { useCart } from "@/context/CartContext";
import "./gallery.css";

// сколько фото у вас в /public/images/data/
const TOTAL_PHOTOS = 34;

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(null);
    const { addItem } = useCart();

    const items = useMemo(
        () =>
            Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
                id: String(i + 1),
                src: `/images/data/${i + 1}.png`,
                alt: `Букет №${i + 1} — PionGullar`,
            })),
        []
    );

    /* ---------- Блокировка скролла при открытой модалке ---------- */
    useEffect(() => {
        if (activeIndex === null) return;
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
    }, [activeIndex]);

    /* ---------- Навигация ---------- */
    const handlePrev = useCallback(
        () =>
            setActiveIndex((idx) =>
                idx === null ? null : (idx - 1 + items.length) % items.length
            ),
        [items.length]
    );

    const handleNext = useCallback(
        () =>
            setActiveIndex((idx) =>
                idx === null ? null : (idx + 1) % items.length
            ),
        [items.length]
    );

    /* ---------- Клавиатура ---------- */
    useEffect(() => {
        if (activeIndex === null) return;
        const onKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [activeIndex, handlePrev, handleNext]);

    /* ---------- Быстрое добавление ---------- */
    const quickAdd = useCallback(
        (e, id) => {
            e.stopPropagation();
            addItem(id);
        },
        [addItem]
    );

    return (
        <section id="gallery" className="gallery">
            <div className="container">
                <div className="gallery__head">
                    <span className="gallery__eyebrow">НАША КОЛЛЕКЦИЯ</span>
                    <h2 className="gallery__title">
                        Выберите <span>свой букет</span>
                    </h2>
                    <p className="gallery__desc">
                        Нажмите на фото, чтобы узнать подробнее и добавить в
                        корзину.
                    </p>
                </div>

                <div className="gallery__grid">
                    {items.map((item, i) => (
                        <article
                            key={item.id}
                            className="gallery__card"
                            onClick={() => setActiveIndex(i)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setActiveIndex(i);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Открыть букет №${item.id}`}
                        >
                            <div className="gallery__img-wrap">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    loading={i < 6 ? "eager" : "lazy"}
                                    decoding="async"
                                    fetchPriority={i < 6 ? "high" : "auto"}
                                    draggable="false"
                                />
                            </div>

                            <div className="gallery__overlay">
                                <span className="gallery__view">
                                    <FiEye aria-hidden="true" /> Посмотреть
                                </span>

                                <button
                                    type="button"
                                    className="gallery__quick-add"
                                    onClick={(e) => quickAdd(e, item.id)}
                                    aria-label={`Добавить букет №${item.id} в корзину`}
                                >
                                    <FiPlus aria-hidden="true" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <ProductModal
                activeIndex={activeIndex}
                items={items}
                onClose={() => setActiveIndex(null)}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </section>
    );
}