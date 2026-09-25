const API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function tg(method, payload) {
    const res = await fetch(`${API}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const t = await res.text().catch(() => "");
        console.error(`Telegram ${method} failed: ${res.status} ${t}`);
        return null;
    }
    return res.json();
}

export const sendMessage = (chatId, text, { parseMode = "Markdown", keyboard, preview = false } = {}) =>
    tg("sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: !preview,
        reply_markup: keyboard,
    });

export const sendLocation = (chatId, lat, lon) =>
    tg("sendLocation", { chat_id: chatId, latitude: lat, longitude: lon });

export const answerCallback = (id, text = "") =>
    tg("answerCallbackQuery", { callback_query_id: id, text });