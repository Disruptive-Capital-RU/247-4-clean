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
  title: "Reluxi — Elite Concierge Service",
  description: "Premium concierge services for Arab tourists visiting Moscow",
  appleWebApp: {
    capable: true,
    title: "24/7 Golden Service",
    statusBarStyle: "black-translucent",
  },
  applicationName: "24/7 Golden Service",
  manifest: "/manifest.json",
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
        <link rel="apple-touch-icon" href="/images/logo_2.png" />
        <link rel="icon" type="image/png" href="/images/logo_2.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fonts are properly managed through next/font/google imports */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="24/7 Golden Service" />
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
