import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Viewport } from "next";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reluxi — Your Private Assistant in Moscow",
  description:
    "Reluxi — The Modern Way to Experience Moscow. Private Transport • Dining Arrangements • Day Planning & Personal Scheduling • Health & Wellness • VIP Shopping • Cultural Experiences • Evening Access & Events • Security • Gifting & Gestures",
  keywords:
    "concierge in Moscow, бواب في موسكو, консьерж в москве, 莫斯科礼宾部, Moscow concierge, private assistant Moscow, VIP services Moscow, luxury concierge, personal assistant",
  appleWebApp: {
    capable: true,
    title: "Reluxi",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Reluxi",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://reluxi.com",
    languages: {
      "ar-SA": "https://reluxi.com/ar",
      "ru-RU": "https://reluxi.com/ru",
      "zh-CN": "https://reluxi.com/zh",
    },
  },
  openGraph: {
    title: "Reluxi — Premium Concierge Service in Moscow",
    description:
      "Premium concierge services in Moscow | консьерж в москве | بواب في موسكو | 莫斯科礼宾部",
    url: "https://reluxi.com",
    siteName: "Reluxi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://reluxi.com/images/app-icon.png",
        width: 1200,
        height: 1200,
        alt: "Reluxi Concierge Services in Moscow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reluxi — Premium Concierge Service in Moscow",
    description:
      "Concierge in Moscow | консьерж в москве | بواب في موسكو | 莫斯科礼宾部",
    images: ["https://reluxi.com/images/app-icon.png"],
  },
  verification: {
    google: "SyGqLxg2JWzx7PPO-Xoi7WyhTnI4vGUlJ8cSaScysLE",
    yandex: "c97ca12c2c0c2725",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Concierge Services, Travel, Luxury Services",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/images/app-icon.png" />
        <link rel="icon" type="image/png" href="/images/app-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Language alternatives */}
        <link rel="alternate" hrefLang="en" href="https://reluxi.com" />
        <link rel="alternate" hrefLang="ar" href="https://reluxi.com/ar" />
        <link rel="alternate" hrefLang="ru" href="https://reluxi.com/ru" />
        <link rel="alternate" hrefLang="zh" href="https://reluxi.com/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://reluxi.com" />
        {/* Fonts are properly managed through next/font/google imports */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Reluxi" />
        <meta name="geo.region" content="RU-MOW" />
        <meta name="geo.placename" content="Moscow" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta property="og:locality" content="Moscow" />
        <meta property="og:country-name" content="Russia" />
        <meta name="author" content="Reluxi" />
        <meta name="google" content="notranslate" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Reluxi",
              description: "Premium concierge services in Moscow",
              image: "https://reluxi.com/images/app-icon.png",
              url: "https://reluxi.com",
              telephone: "+79160665133",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Moscow",
                addressCountry: "Russia",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 55.755826,
                longitude: 37.6173,
              },
              sameAs: [
                "https://www.facebook.com/reluxi",
                "https://www.instagram.com/reluxi",
                "https://twitter.com/reluxi",
              ],
            }),
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          h1, h2, h3, h4, h5, h6, .font-cormorant {
            font-family: 'Cormorant Garamond', serif !important;
          }
          p, a, button, input, textarea, select, label, .font-dm-sans {
            font-family: 'DM Sans', sans-serif !important;
          }
        `,
          }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
