import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, phone, address, comment, items } = await req.json();

        if (!name || !phone || !items?.length) {
            return NextResponse.json(
                { ok: false, error: "Неверные данные" },
                { status: 400 }
            );
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
            return NextResponse.json(
                { ok: false, error: "Сервер не настроен" },
                { status: 500 }
            );
        }

        const itemsList = items
            .map((i) => `• Букет №${i.id} — ${i.qty} шт.`)
            .join("\n");

        const text =
            `🌸 *Новая заявка — Pion Gullar*\n\n` +
            `👤 *Имя:* ${name}\n` +
            `📞 *Телефон:* ${phone}\n` +
            `📍 *Адрес:* ${address || "не указан"}\n` +
            `💬 *Комментарий:* ${comment || "—"}\n\n` +
            `*Состав заказа:*\n${itemsList}\n\n` +
            `_Цена по запросу — уточнить при звонке._`;

        const tgRes = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "Markdown",
                }),
            }
        );

        const data = await tgRes.json();
        if (!data.ok) throw new Error(data.description || "Telegram API error");

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Order error:", err);
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}