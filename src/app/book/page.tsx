"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/lib/LanguageContext";

// Simple version of the FAQ item component
interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md overflow-hidden">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-cormorant text-white">{question}</h3>
        <span
          className={`text-[#D4AF37] text-xl font-bold transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </div>
      <div
        className={`font-dm-sans text-white/70 mt-2 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pt-2">{answer}</p>
      </div>
    </div>
  );
};

// Function to safely get translation with fallback
const safeTranslate = (
  t: (key: string) => string,
  key: string,
  fallback: string
): string => {
  try {
    const translation = t(key);
    return translation === key ? fallback : translation;
  } catch (error) {
    console.error(`Translation error for key: ${key}`, error);
    return fallback;
  }
};

export default function BookPage() {
  const { t, language } = useLanguage();
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  // Helper function to check if the language is Arabic
  const isArabic = () =>
    language === "AR" || language === "ar" || language === "arabic";

  // Adding console logs for debugging
  console.log("Current language:", language);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="book-sparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={70}
            className="w-full h-full"
            particleColor="#D4AF37"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/90" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
              {safeTranslate(t, "bookYour", "Book Your")}{" "}
              <span className="text-[#D4AF37]">
                {safeTranslate(t, "personalConcierge", "Personal Concierge")}
              </span>
            </h1>
            <p className="font-dm-sans text-lg md:text-xl text-white/80 mb-8">
              {safeTranslate(
                t,
                "bookingIntro",
                "Your time is precious. Start now. Book your personal concierge for 5 days for just $100."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <BookingSection />

      {/* How It Works Section */}
      <section className="py-16 bg-black/95">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-8 text-center">
              {safeTranslate(t, "howIt", "How It")}{" "}
              <span className="text-[#D4AF37]">
                {safeTranslate(t, "works", "Works")}
              </span>
            </h2>

            <div className="space-y-8 font-dm-sans">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    {safeTranslate(t, "reachOut", "Reach Out")}
                  </h3>
                  <p className="text-white/70">
                    {safeTranslate(
                      t,
                      "reachOutDesc",
                      "Send us a quick message with what you need — whether it's a dinner reservation, transport, or help planning your day."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    {safeTranslate(t, "weConfirm", "We Confirm")}
                  </h3>
                  <p className="text-white/70">
                    {safeTranslate(
                      t,
                      "weConfirmDesc",
                      "You'll hear from us shortly via your preferred messaging app. We'll confirm the request, ask any follow-up questions, and begin arranging everything."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    {safeTranslate(
                      t,
                      "secureSimplePayment",
                      "Secure & Simple Payment"
                    )}
                  </h3>
                  <p className="text-white/70">
                    {safeTranslate(
                      t,
                      "secureSimplePaymentDesc",
                      "Once the details are set, we'll send you a secure payment link. As soon as your payment is confirmed, your concierge is available 24/7 — ready to assist with that request or anything else you may need."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-8 text-center">
              {safeTranslate(t, "frequentlyAsked", "Frequently Asked")}{" "}
              <span className="text-[#D4AF37]">
                {safeTranslate(t, "questions", "Questions")}
              </span>
            </h2>

            <div className="space-y-4">
              {/* First 3 FAQs - Always visible */}
              <FAQItem
                question={safeTranslate(
                  t,
                  "feeCoverQuestion",
                  "What does the concierge fee cover?"
                )}
                answer={safeTranslate(
                  t,
                  "feeCoverAnswer",
                  "Your concierge fee covers unlimited access to a real, dedicated assistant available 24/7. We handle everything — from booking your dinner to securing a driver or sourcing a last-minute gift. Please note: actual service costs (e.g., restaurant bill, transport fare, event tickets) are billed separately and paid directly by you."
                )}
                defaultOpen={true}
              />

              <FAQItem
                question={safeTranslate(
                  t,
                  "extendServiceQuestion",
                  "Can I extend my concierge service?"
                )}
                answer={safeTranslate(
                  t,
                  "extendServiceAnswer",
                  "Yes. If you started with the 3-Day Plan, you can add extra days at $39/day. Just let your concierge know — no need to fill out anything else."
                )}
              />

              <FAQItem
                question={safeTranslate(
                  t,
                  "arabicClientsQuestion",
                  "Do you only work with Arabic-speaking clients?"
                )}
                answer={safeTranslate(
                  t,
                  "arabicClientsAnswer",
                  "Not at all. While many of our clients come from Arabic-speaking regions, our concierges are fluent in Arabic, English, Chinese, and Russian, and we welcome anyone looking for thoughtful, personal support."
                )}
              />

              {/* Show More button */}
              {!showAllFAQs && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllFAQs(true)}
                    className="text-[#D4AF37] hover:text-[#B8860B] underline transition-colors duration-300 font-dm-sans text-lg"
                  >
                    {safeTranslate(t, "showMore", "Show More")}
                  </button>
                </div>
              )}

              {/* Remaining FAQs - Only visible when showAllFAQs is true */}
              {showAllFAQs && (
                <>
                  <FAQItem
                    question={safeTranslate(
                      t,
                      "bookOnBehalfQuestion",
                      "Can you book things on my behalf, or do I have to pay directly?"
                    )}
                    answer={safeTranslate(
                      t,
                      "bookOnBehalfAnswer",
                      "We'll coordinate everything for you — reservations, tickets, gifts, transport. In most cases, you pay the vendor directly. If needed, we can arrange pre-payment or transfers on your behalf."
                    )}
                  />

                  <FAQItem
                    question={safeTranslate(
                      t,
                      "contactConciergeQuestion",
                      "How do I contact my concierge?"
                    )}
                    answer={safeTranslate(
                      t,
                      "contactConciergeAnswer",
                      "Your concierge is available 24/7 via your preferred messaging app — WhatsApp, Telegram, Botim, or iMessage. Just send a message and we'll take care of the rest."
                    )}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
