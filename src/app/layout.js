import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/navbar/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import Footer from "@/components/footer/Footer";
import "./globals.css";

const SITE_URL = "https://www.piongullar.uz";
const SITE_NAME = "Pion Gullar";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Заказать цветы в Бухаре | Pion Gullar",
  description:
    "Заказать цветы с доставкой по Бухаре. Свежие пионы, авторские букеты, красивая упаковка и быстрая доставка. Оформите заказ онлайн или по телефону.",

  keywords: [
    "цветы Бухара",
    "заказать цветы Бухара",
    "доставка цветов Бухара",
    "букеты Бухара",
    "пионы Бухара",
    "доставка цветов",
    "Pion Gullar",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Заказать цветы в Бухаре | Pion Gullar",
    description:
      "Свежие пионы и авторские букеты с доставкой по Бухаре. Закажите цветы онлайн.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pion Gullar — доставка цветов в Бухаре",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Заказать цветы в Бухаре | Pion Gullar",
    description:
      "Свежие пионы и авторские букеты с доставкой по Бухаре.",
    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },

  category: "flowers",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <CheckoutModal />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}