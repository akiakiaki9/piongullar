"use client";

import { motion } from "framer-motion";
import {
    FiArrowRight,
    FiPhone,
    FiTruck,
    FiClock,
    FiMapPin,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import "./hero.css";

const PHONE = "+998914088685";
const PHONE_DISPLAY = "+998 91 408 86 85";
const ADDRESS = "Хафиза Таниша, 44";

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
            {/* Фоновое фото */}
            <div className="hero__bg" aria-hidden="true">
                <img
                    src="/images/hero.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="hero__bg-overlay" />
            </div>

            <div className="container hero__inner">
                {/* Шапка: лого + соцсети */}
                <div className="hero__top">
                    <div className="hero__brand">
                        <span className="hero__brand-name">
                            Pion <span>Gullar</span>
                        </span>
                        <span className="hero__brand-tag">
                            ЦВЕТЫ · БУКЕТЫ · ЭМОЦИИ
                        </span>
                    </div>

                    <div className="hero__top-actions">
                        <a
                            href="https://t.me/Pion_gullaruz"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hero__top-icon"
                            aria-label="Telegram Pion Gullar"
                        >
                            <FaTelegramPlane aria-hidden="true" />
                        </a>
                        <a
                            href="https://www.instagram.com/pion.gullar.bukhara/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hero__top-icon"
                            aria-label="Instagram Pion Gullar"
                        >
                            <FiInstagram aria-hidden="true" />
                        </a>
                        <a
                            href={`tel:${PHONE}`}
                            className="hero__top-icon"
                            aria-label="Позвонить"
                        >
                            <FiPhone aria-hidden="true" />
                        </a>
                    </div>
                </div>

                {/* Контент */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="hero__content"
                >
                    <h1 className="hero__title">
                        Эксклюзивные{" "}
                        <span className="hero__title-accent">букеты</span>{" "}
                        для особых моментов
                    </h1>

                    <p className="hero__subtitle">
                        Свежие пионы, авторская упаковка и быстрая доставка
                        по Бухаре.
                    </p>

                    <div className="hero__actions">
                        <button
                            type="button"
                            className="hero__btn hero__btn--primary"
                            onClick={scrollToGallery}
                        >
                            Выбрать букет
                            <FiArrowRight aria-hidden="true" />
                        </button>

                        <a
                            href={`tel:${PHONE}`}
                            className="hero__btn hero__btn--ghost"
                        >
                            <FiPhone aria-hidden="true" />
                            Позвонить
                        </a>
                    </div>

                    <ul className="hero__features" role="list">
                        <li className="hero__feature">
                            <span className="hero__feature-icon">
                                <FiClock aria-hidden="true" />
                            </span>
                            <span className="hero__feature-text">
                                Работаем 8:00–23:00
                                <br />
                                по звонку — 24/7
                            </span>
                        </li>

                        <li className="hero__feature">
                            <span className="hero__feature-icon">
                                <FiPhone aria-hidden="true" />
                            </span>
                            <span className="hero__feature-text">
                                <a
                                    href={`tel:${PHONE}`}
                                    className="hero__feature-link"
                                >
                                    {PHONE_DISPLAY}
                                </a>
                                <br />
                                звоните в любое время
                            </span>
                        </li>

                        <li className="hero__feature">
                            <span className="hero__feature-icon">
                                <FiMapPin aria-hidden="true" />
                            </span>
                            <span className="hero__feature-text">
                                Адрес: {ADDRESS}
                                <br />
                                Бухара, Узбекистан
                            </span>
                        </li>

                        <li className="hero__feature">
                            <span className="hero__feature-icon">
                                <FiTruck aria-hidden="true" />
                            </span>
                            <span className="hero__feature-text">
                                Быстрая доставка
                                <br />
                                по городу
                            </span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}