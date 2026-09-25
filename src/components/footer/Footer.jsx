"use client";

import { FiInstagram, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import "./footer.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer id="contacts" className="footer">
            <div className="container footer__inner">
                {/* ---------- Бренд ---------- */}
                <div className="footer__col footer__col--brand">
                    <a
                        href="#top"
                        className="footer__logo"
                        aria-label="Pion Gullar — на главную"
                    >
                        <span>Pion</span>
                        <span>Gullar</span>
                    </a>

                    <p className="footer__tag">
                        ЦВЕТЫ · БУКЕТЫ · ЭМОЦИИ
                    </p>

                    <p className="footer__desc">
                        Эксклюзивные букеты с доставкой по Бухаре.
                        Свежие цветы каждый день.
                    </p>

                    <nav
                        className="footer__socials"
                        aria-label="Социальные сети"
                    >
                        <a
                            href="https://www.instagram.com/pion.gullar.bukhara/"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Instagram Pion Gullar"
                            className="footer__social-link footer__social-link--instagram"
                        >
                            <FiInstagram aria-hidden="true" />
                        </a>
                        <a
                            href="https://t.me/Pion_gullaruz"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Telegram-канал Pion Gullar"
                            className="footer__social-link footer__social-link--telegram"
                        >
                            <FaTelegramPlane aria-hidden="true" />
                        </a>
                        <a
                            href="https://t.me/piongullar_bot"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Telegram-бот для заказов"
                            className="footer__social-link footer__social-link--bot"
                        >
                            <HiOutlineChatBubbleLeftRight
                                aria-hidden="true"
                            />
                        </a>
                    </nav>
                </div>

                {/* ---------- Контакты ---------- */}
                <div className="footer__col">
                    <h3 className="footer__heading">Контакты</h3>

                    <address className="footer__contacts">
                        <a href="tel:+998914088685">
                            <span className="footer__contact-icon">
                                <FiPhone aria-hidden="true" />
                            </span>
                            <span className="footer__contact-text">
                                +998 91 408 86 85
                            </span>
                        </a>

                        <a
                            href="https://maps.google.com/?q=39.765815,64.442607"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <span className="footer__contact-icon">
                                <FiMapPin aria-hidden="true" />
                            </span>
                            <span className="footer__contact-text">
                                Улица Хафиза Таниша Бухари, 44
                            </span>
                        </a>

                        <span className="footer__text">
                            <span className="footer__contact-icon">
                                <FiClock aria-hidden="true" />
                            </span>
                            <span className="footer__contact-text">
                                8:00–23:00 · по звонку 24/7
                            </span>
                        </span>
                    </address>
                </div>
            </div>

            {/* ---------- Нижняя строка ---------- */}
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span className="footer__copy">
                        © {YEAR} Pion Gullar · piongullar.uz
                    </span>

                    <span className="footer__dev">
                        Разработано в{" "}
                        <a
                            href="https://www.akbarsoft.uz"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Akbar Soft — открыть сайт akbarsoft.uz"
                        >
                            Akbar Soft
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}