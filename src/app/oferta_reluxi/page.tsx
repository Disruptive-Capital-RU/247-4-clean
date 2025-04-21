"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function OfertaPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the PDF
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-cormorant text-white mb-4">
            {t("offer")}
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
        </motion.div>

        <div className="bg-white/5 border border-[#D4AF37]/20 rounded-lg p-4 md:p-6 shadow-xl">
          {loading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
          ) : (
            <div className="h-[80vh] w-full">
              <iframe
                src="/legal/oferta_reluxi.pdf"
                className="w-full h-full"
                title="Reluxi Offer Document"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
