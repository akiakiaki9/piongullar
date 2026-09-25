import { sendMessage, sendLocation, answerCallback } from "@/lib/telegram";
import { CONFIG, TEXTS, MAIN_KEYBOARD, BACK_KEYBOARD } from "@/lib/bot-texts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Ответы ---------- */
const replyMain = (chatId, text = TEXTS.welcome) =>
    sendMessage(chatId, text, { keyboard: MAIN_KEYBOARD });

const replyContacts = (chatId) =>
    sendMessage(chatId, TEXTS.contacts, { keyboard: BACK_KEYBOARD });

const replyPrices = (chatId) =>
    sendMessage(chatId, TEXTS.prices, { keyboard: BACK_KEYBOARD });

const replyDelivery = (chatId) =>
    sendMessage(chatId, TEXTS.delivery, { keyboard: BACK_KEYBOARD });

const replyHours = (chatId) =>
    sendMessage(chatId, TEXTS.hours, { keyboard: BACK_KEYBOARD });

const replyCatalog = (chatId) =>
    sendMessage(chatId, TEXTS.catalog, {
        keyboard: {
            inline_keyboard: [
                [{ text: "🌸 Открыть каталог", url: `${CONFIG.SITE_URL}/#gallery` }],
                [{ text: "👩‍💼 Подобрать с менеджером", callback_data: "manager" }],
                [{ text: "⬅️ В меню", callback_data: "menu" }],
            ],
        },
    });

const replyMap = async (chatId) => {
    await sendLocation(chatId, CONFIG.LAT, CONFIG.LON).catch(() => {});
    return sendMessage(chatId, TEXTS.map, {
        keyboard: BACK_KEYBOARD,
        preview: true,
    });
};

const replyManager = (chatId) => {
    const keyboard = CONFIG.MANAGER_USERNAME
        ? {
              inline_keyboard: [
                  [{ text: "💬 Написать менеджеру", url: `https://t.me/${CONFIG.MANAGER_USERNAME}` }],
                  [{ text: "📞 Позвонить", url: `tel:${CONFIG.PHONE}` }],
                  [{ text: "⬅️ В меню", callback_data: "menu" }],
              ],
          }
        : {
              inline_keyboard: [
                  [{ text: "📞 Позвонить", url: `tel:${CONFIG.PHONE}` }],
                  [{ text: "⬅️ В меню", callback_data: "menu" }],
              ],
          };

    return sendMessage(chatId, TEXTS.manager, { keyboard });
};

/* ---------- Ключевые слова ---------- */
const KEYWORDS = [
    { test: /(контакт|телефон|позвон|номер|связ|contact|aloqa)/i, handler: replyContacts },
    { test: /(карт|адрес|где вы|как найти|как добраться|локац|map|manzil)/i, handler: replyMap },
    { test: /(каталог|букет|букеты|цвет|пион|роза|композиц|catalog|gullar)/i, handler: replyCatalog },
    { test: /(цена|цены|стоимость|сколько стоит|price|narx)/i, handler: replyPrices },
    { test: /(доставк|привез|курьер|delivery|yetkaz)/i, handler: replyDelivery },
    { test: /(час|график|когда работ|во сколько|открыт|time|ish vaqti)/i, handler: replyHours },
    { test: /(заказ|оформ|купить|order|buyurtma)/i, handler: (chatId) => sendMessage(chatId, TEXTS.order, { keyboard: BACK_KEYBOARD }) },
    { test: /(менеджер|оператор|человек|manager|operator)/i, handler: replyManager },
];

/* ---------- Обработка ---------- */
async function handleUpdate(update) {
    /* Кнопки */
    if (update.callback_query) {
        const cq = update.callback_query;
        const chatId = cq.message.chat.id;

        await answerCallback(cq.id).catch(() => {});

        switch (cq.data) {
            case "menu":     return replyMain(chatId);
            case "catalog":  return replyCatalog(chatId);
            case "prices":   return replyPrices(chatId);
            case "contacts": return replyContacts(chatId);
            case "map":      return replyMap(chatId);
            case "delivery": return replyDelivery(chatId);
            case "hours":    return replyHours(chatId);
            case "manager":  return replyManager(chatId);
            default:         return;
        }
    }

    /* Текст */
    const msg = update.message;
    if (!msg || !msg.text) return;

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (/^\/start/i.test(text)) return replyMain(chatId);
    if (/^\/help/i.test(text))  return replyMain(chatId, TEXTS.help);

    for (const { test, handler } of KEYWORDS) {
        if (test.test(text)) return handler(chatId);
    }

    return replyMain(chatId, TEXTS.fallback);
}

/* ---------- HTTP ---------- */
export async function POST(req) {
    let update;
    try {
        update = await req.json();
    } catch {
        return new Response("Bad Request", { status: 400 });
    }

    try {
        await handleUpdate(update);
    } catch (err) {
        console.error("Bot handler error:", err);
    }

    return new Response("OK", { status: 200 });
}

export async function GET() {
    return Response.json({ ok: true, message: "Pion Gullar bot webhook is running" });
}