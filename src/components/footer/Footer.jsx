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
                {/* ---------- О бренде ---------- */}
                <div className="footer__col footer__col--brand">
                    <div className="footer__logo">
                        <span>Pion</span>
                        <span>Gullar</span>
                    </div>

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
                        >
                            <FiInstagram aria-hidden="true" />
                        </a>
                        <a
                            href="https://t.me/Pion_gullaruz"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Telegram-канал Pion Gullar"
                        >
                            <FaTelegramPlane aria-hidden="true" />
                        </a>
                        <a
                            href="https://t.me/piongullar_bot"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Telegram-бот для заказов"
                        >
                            <HiOutlineChatBubbleLeftRight aria-hidden="true" />
                        </a>
                    </nav>
                </div>

                {/* ---------- Контакты ---------- */}
                <div className="footer__col">
                    <h3 className="footer__heading">Контакты</h3>

                    <address className="footer__contacts">
                        <a href="tel:+998914088685">
                            <FiPhone aria-hidden="true" />
                            <span>+998 91 408 86 85</span>
                        </a>

                        <a
                            href="https://maps.google.com/?q=39.765815,64.442607"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <FiMapPin aria-hidden="true" />
                            <span>
                                Улица Хафиза Таниша Бухари, 44
                            </span>
                        </a>

                        <span className="footer__text">
                            <FiClock aria-hidden="true" />
                            <span>9:00–22:00 · по звонку 24/7</span>
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