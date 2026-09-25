"use client";

import { motion } from "framer-motion";
import "./quotes.css";

const quotes = [
    {
        text: "Цветы — это улыбка земли, и каждое утро она улыбается нам снова.",
        author: "Ральф Уолдо Эмерсон",
    },
    {
        text: "Пион — король цветов. Один его бутон стоит целого сада.",
        author: "Восточная мудрость",
    },
    {
        text: "Дарить цветы — значит говорить сердцем, без слов.",
        author: "Pion Gullar",
    },
];

export default function Quotes() {
    return (
        <section className="quotes" aria-label="Цитаты о цветах">
            <div className="container">
                <div className="quotes__head">
                    <span className="quotes__eyebrow">О ЦВЕТАХ</span>
                    <h2 className="quotes__title">
                        Слова, <span>которые дарят</span> тепло
                    </h2>
                </div>

                <div className="quotes__grid">
                    {quotes.map((q, i) => (
                        <motion.blockquote
                            key={i}
                            className="quotes__card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.55,
                                delay: i * 0.12,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <span
                                className="quotes__mark"
                                aria-hidden="true"
                            >
                                ❝
                            </span>
                            <p className="quotes__text">{q.text}</p>
                            <footer className="quotes__author">
                                — {q.author}
                            </footer>
                        </motion.blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}