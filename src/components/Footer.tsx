"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-cormorant mb-4">Reluxi Concierge</h3>
            <p className="font-dm-sans text-white/70 italic mb-4">
              {t("footerTagline")}
            </p>
            <div className="flex space-x-4 mt-4">
              <SocialLink href="#" icon={<FaWhatsapp />} label="WhatsApp" />
              <SocialLink href="#" icon={<FaTelegram />} label="Telegram" />
              <SocialLink
                href="mailto:service@reluxi.com"
                icon={<FaEnvelope />}
                label="Email"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-cormorant mb-4">
              {t("footerNavigation")}
            </h3>
            <ul className="space-y-2 text-white/70 font-dm-sans">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/why-us"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("whyUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("bookNow")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-cormorant mb-4">{t("footerLegal")}</h3>
            <ul className="space-y-2 text-white/70 font-dm-sans">
              <li>
                <Link
                  href="/legal/oferta_reluxi1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("offer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-cormorant mb-4">
              {t("footerContact")}
            </h3>
            <div className="space-y-3 text-white/70 font-dm-sans">
              <p className="flex items-center gap-2">
                <FaPhone className="text-[#D4AF37]" />
                <a
                  href="tel:+79160665133"
                  className="hover:text-white transition-colors"
                >
                  +7 (916) 066 51 33
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-[#D4AF37]" />
                <a
                  href="mailto:my@reluxi.ru"
                  className="hover:text-white transition-colors"
                >
                  my@reluxi.ru
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">{t("copyright")}</p>
          <p className="text-white/50 text-sm mt-2 md:mt-0">
            Powered by confidentiality, built on trust, inspired by excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors"
    >
      {icon}
    </a>
  );
}
