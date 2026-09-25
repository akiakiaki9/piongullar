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
        const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL || "https://www.piongullar.uz";

        if (!token || !chatId) {
            console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
            return NextResponse.json(
                { ok: false, error: "Сервер не настроен" },
                { status: 500 }
            );
        }

        // Экранируем возможные markdown-символы в пользовательских данных,
        // чтобы админ не увидел сломанное форматирование
        const esc = (s = "") =>
            String(s).replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");

        const itemsList = items
            .map((i) => {
                const photoUrl = `${siteUrl}/images/data/${i.id}.png`;
                return (
                    `• Букет №${i.id} — ${i.qty} шт.\n` +
                    `  🔗 [Открыть фото](${photoUrl})`
                );
            })
            .join("\n");

        const text =
            `🌸 *Новая заявка — Pion Gullar*\n\n` +
            `👤 *Имя:* ${esc(name)}\n` +
            `📞 *Телефон:* ${esc(phone)}\n` +
            `📍 *Адрес:* ${esc(address || "не указан")}\n` +
            `💬 *Комментарий:* ${esc(comment || "—")}\n\n` +
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
                    disable_web_page_preview: true, // чтобы превью не разворачивалось в огромную картинку
                }),
            }
        );

        const data = await tgRes.json();
        if (!data.ok) {
            throw new Error(data.description || "Telegram API error");
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Order error:", err);
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}