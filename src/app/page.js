import Hero from "@/components/hero/Hero";
import Quotes from "@/components/quotes/Quotes";
import Gallery from "@/components/gallery/Gallery";
import {
  FiClock,
  FiTruck,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiNavigation,
} from "react-icons/fi";

const features = [
  {
    Icon: FiClock,
    title: "8:00–23:00",
    text: "Ежедневно. По звонку — 24/7",
  },
  {
    Icon: FiTruck,
    title: "Бухара",
    text: "Быстрая доставка по городу",
  },
  {
    Icon: FiHeart,
    title: "100%",
    text: "Свежие цветы каждый день",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Quotes />
      <Gallery />

      {/* ---------- О нас ---------- */}
      <section id="about" className="about">
        <div className="container">
          <div className="about__head">
            <span className="about__eyebrow">О НАС</span>
            <h2 className="about__title">
              Немного <em>о нас</em>
            </h2>
          </div>

          <div className="about__panel">
            {features.map(({ Icon, title, text }, i) => (
              <div className="about__item" key={i}>
                <span className="about__icon-wrap">
                  <Icon
                    className="about__icon"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="about__value">{title}</h3>
                <p className="about__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Карта, фото магазина и адрес ---------- */}
      <section id="map" className="map-section">
        <div className="container">
          <div className="map-section__head">
            <span className="map-section__eyebrow">
              КАК НАС НАЙТИ
            </span>
            <h2 className="map-section__title">
              Мы находимся <em>в центре Бухары</em>
            </h2>
          </div>

          <div className="map-section__panel">
            {/* ---------- Инфо ---------- */}
            <div className="map-section__info">
              <address className="map-section__address">
                <div className="map-section__row">
                  <FiMapPin
                    className="map-section__icon"
                    aria-hidden="true"
                  />
                  <span>
                    Улица Хафиза Таниша Бухари, 44
                    <br />
                    Бухара, Узбекистан
                  </span>
                </div>

                <div className="map-section__row">
                  <FiClock
                    className="map-section__icon"
                    aria-hidden="true"
                  />
                  <span>
                    Ежедневно 8:00–23:00 · по звонку 24/7
                  </span>
                </div>

                <div className="map-section__row">
                  <FiPhone
                    className="map-section__icon"
                    aria-hidden="true"
                  />
                  <a href="tel:+998914088685">
                    +998 91 408 86 85
                  </a>
                </div>
              </address>

              <div className="map-section__actions">
                <a
                  href="https://maps.google.com/?q=39.765815,64.442607"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary map-section__btn"
                >
                  <FiMapPin aria-hidden="true" /> Google
                  Maps
                </a>
                <a
                  href="https://yandex.com/maps/?pt=64.442607,39.765815&z=17&l=map"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-outline map-section__btn"
                >
                  <FiNavigation aria-hidden="true" />{" "}
                  Яндекс.Карты
                </a>
              </div>
            </div>

            {/* ---------- Фото магазина ---------- */}
            <div className="map-section__photo">
              <img
                src="/images/shop.png"
                alt="Магазин Pion Gullar в Бухаре"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>

            {/* ---------- Карта ---------- */}
            <div className="map-section__frame">
              <iframe
                title="Pion Gullar на карте — улица Хафиза Таниша Бухари, 44"
                src="https://www.google.com/maps?q=39.765815,64.442607&hl=ru&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}