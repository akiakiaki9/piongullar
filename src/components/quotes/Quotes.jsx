"use client";

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
                        Слова, <em>которые дарят</em> тепло
                    </h2>
                    <p className="quotes__lead">
                        Мы верим, что букет — это не просто цветы.
                        Это язык, на котором говорят, когда слов не хватает.
                    </p>
                </div>

                <div className="quotes__grid">
                    {quotes.map((q, i) => (
                        <figure className="quotes__card" key={i}>
                            <span className="quotes__mark" aria-hidden="true">
                                &ldquo;
                            </span>

                            <blockquote className="quotes__text">
                                {q.text}
                            </blockquote>

                            <figcaption className="quotes__author">
                                {q.author}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}