"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiTruck, FiClock, FiPhone } from "react-icons/fi";
import Blobs from "@/components/decor/Blobs";
import "./hero.css";

export default function Hero() {
    const scrollToGallery = () => {
        const el = document.querySelector("#gallery");
        if (!el) return;
        const headerOffset = 72;
        const top =
            el.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <section id="top" className="hero">
            <Blobs />

            <div className="container hero__inner">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="hero__content"
                >
                    <span className="hero__badge">
                        <span className="hero__badge-dot" aria-hidden="true" />
                        Бухара · доставка сегодня
                    </span>

                    <h1 className="hero__title">
                        Эксклюзивные <br />
                        <span>букеты</span> для <br />
                        особых моментов
                    </h1>

                    <p className="hero__subtitle">
                        Свежие пионы, авторская упаковка и быстрая доставка по Бухаре.
                        Работаем 9:00–22:00, по звонку — 24/7.
                    </p>

                    <div className="hero__actions">
                        <button
                            type="button"
                            className="btn-primary hero__btn"
                            onClick={scrollToGallery}
                        >
                            Выбрать букет <FiArrowDown aria-hidden="true" />
                        </button>

                        <a
                            href="tel:+998914088685"
                            className="btn-outline hero__btn"
                        >
                            <FiPhone aria-hidden="true" /> Позвонить
                        </a>
                    </div>

                    <ul className="hero__features" role="list">
                        <li className="hero__feature">
                            <FiTruck aria-hidden="true" />
                            <span>Быстрая доставка по городу</span>
                        </li>
                        <li className="hero__feature">
                            <FiClock aria-hidden="true" />
                            <span>Заказ 24/7 по звонку</span>
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hero__visual"
                >
                    <div className="hero__img-wrap">
                        <img
                            src="/images/data/1.png"
                            alt="Пионы Pion Gullar"
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    <motion.div
                        className="hero__badge-floating"
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🌸 Свежие каждый день
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}