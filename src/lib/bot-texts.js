const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piongullar.uz";
const PHONE = process.env.BOT_PHONE || "+998914088685";
const ADDRESS =
    process.env.BOT_ADDRESS || "Улица Хафиза Таниша Бухари, 44, Бухара";
const LAT = Number(process.env.BOT_LAT || 39.765815);
const LON = Number(process.env.BOT_LON || 64.442607);
const MANAGER_USERNAME = (process.env.TELEGRAM_MANAGER_USERNAME || "").replace(
    /^@/,
    ""
);

export const CONFIG = {
    SITE_URL,
    PHONE,
    ADDRESS,
    LAT,
    LON,
    MANAGER_USERNAME,
};

/* ---------- Клавиатуры ---------- */
export const MAIN_KEYBOARD = {
    inline_keyboard: [
        [
            { text: "🌸 Каталог", callback_data: "catalog" },
            { text: "💰 Цены", callback_data: "prices" },
        ],
        [
            { text: "📞 Контакты", callback_data: "contacts" },
            { text: "🗺 Карта", callback_data: "map" },
        ],
        [
            { text: "🚚 Доставка", callback_data: "delivery" },
            { text: "🕘 Часы работы", callback_data: "hours" },
        ],
        [{ text: "👩‍💼 Связаться с менеджером", callback_data: "manager" }],
    ],
};

export const BACK_KEYBOARD = {
    inline_keyboard: [[{ text: "⬅️ В меню", callback_data: "menu" }]],
};

/* ---------- Тексты ---------- */
export const TEXTS = {
    welcome: `Здравствуйте! 🌸

Это бот цветочного магазина *Pion Gullar* в Бухаре.

Что я умею:
• показать каталог букетов,
• скинуть адрес и карту,
• дать контакты и часы работы,
• связать с менеджером.

Выберите, что вам нужно 👇`,

    help: `Я подскажу по каталогу, ценам, доставке, адресу и контактам.
Просто выберите пункт меню 👇 или напишите: *каталог*, *контакты*, *карта*, *доставка*, *часы*.`,

    contacts: `📞 *Контакты Pion Gullar*

Телефон: ${PHONE}
Telegram-канал: https://t.me/Pion_gullaruz
Instagram: https://www.instagram.com/pion.gullar.bukhara/
Сайт: ${SITE_URL}

Работаем ежедневно *9:00–22:00*.
По звонку — *24/7*.`,

    hours: `🕘 *Часы работы*

Пн–Вс: *9:00–22:00*
По звонку — *24/7*: ${PHONE}`,

    address: `📍 *Наш адрес*

${ADDRESS}`,

    map: `🗺 *Мы на карте*

${ADDRESS}

Google Maps:
https://maps.google.com/?q=${LAT},${LON}

Яндекс.Карты:
https://yandex.com/maps/?pt=${LON},${LAT}&z=17&l=map`,

    delivery: `🚚 *Доставка*

Доставляем по всей Бухаре.
• В пределах города — от 1 до 2 часов.
• Самовывоз с магазина: ${ADDRESS}.
• Стоимость и точное время — уточнит менеджер.

Хотите, соединю с менеджером?`,

    prices: `💰 *Цены*

У нас большой выбор букетов — от компактных до премиальных.
Актуальные цены и фото — в каталоге на сайте:
${SITE_URL}/#gallery

Напишите менеджеру, если нужно подобрать под бюджет.`,

    catalog: `🌸 *Каталог букетов*

Свежие пионы, авторские букеты и композиции — всё с фото на сайте:
${SITE_URL}/#gallery

Если хотите — менеджер подберёт вариант под ваш повод и бюджет.`,

    order: `🛒 *Как заказать*

1. Выберите букет: ${SITE_URL}/#gallery
2. Нажмите «Оформить заказ» на сайте или напишите менеджеру.
3. Мы перезвоним, уточним состав, время и адрес доставки.`,

    manager: MANAGER_USERNAME
        ? `👩‍💼 Передаю вас менеджеру.

Напишите @${MANAGER_USERNAME} — ответим в течение пары минут в рабочее время (9:00–22:00).

Если срочно — позвоните: ${PHONE}`
        : `Менеджер сейчас недоступен в Telegram.

Позвоните, пожалуйста: ${PHONE} — мы на связи 24/7.`,

    fallback: `Я пока не понял запрос 🤔

Попробуйте написать: *каталог*, *контакты*, *карта*, *адрес*, *цены*, *доставка* или *часы работы*.

Или выберите пункт в меню 👇`,
};