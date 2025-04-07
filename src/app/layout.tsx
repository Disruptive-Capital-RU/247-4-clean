import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

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
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400;1,9..40,500;1,9..40,700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/images/app-icon.png" />
        <link rel="icon" type="image/png" href="/images/app-icon.png" />
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
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased bg-black text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
