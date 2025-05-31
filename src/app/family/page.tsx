"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaBaby, FaHeart, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";

const familyServices = [
  {
    icon: <FaBaby className="w-6 h-6" />,
    title: "Choosing baby essentials",
    description:
      "Strollers, car seats, and everything you need for your little one",
  },
  {
    icon: <FaHeart className="w-6 h-6" />,
    title: "Trusted, 24/7 parenting support",
    description:
      "Round-the-clock guidance and lifestyle support when you need it most",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Safe, family-friendly recommendations",
    description: "Vetted suggestions for activities, places, and experiences",
  },
  {
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
    title: "Local guidance",
    description: "Discreet, knowledgeable advice from our expert Moscow team",
  },
];

export default function FamilyPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute left-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent w-full"></div>
        <div className="absolute right-0 top-2/3 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/20 to-transparent w-full"></div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cormorant font-bold text-white mb-6">
              Reluxi <span className="text-[#D4AF37]">Family</span>
            </h1>

            <p className="text-xl md:text-2xl font-cormorant text-white/90 mb-12 leading-relaxed">
              For young couples building the good life together — because the
              greatest luxury is family.
            </p>

            {/* Family Image with Golden Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <div className="relative inline-block p-2 border-2 border-[#D4AF37] rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="/images/reluxi_family.png"
                    alt="Reluxi Family"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xl md:text-2xl font-cormorant text-white/80 leading-relaxed mb-8">
                At Reluxi, we believe real luxury isn't just about where you go
                — but who you're with, and how you're cared for.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 border border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm rounded-lg relative overflow-hidden"
            >
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-50"></div>

              <div className="relative z-10">
                <p className="font-dm-sans text-white/90 leading-relaxed mb-6">
                  That's why we created{" "}
                  <span className="text-[#D4AF37] font-semibold">
                    Reluxi Family
                  </span>{" "}
                  — a 100% free personal concierge support, for young couples
                  and families in Moscow.
                </p>

                <p className="font-dm-sans text-white/90 leading-relaxed mb-6">
                  Whether you're choosing your first stroller, planning a safe &
                  happy family day out, or simply need trusted local advice, our
                  highly trained team is here 24/7. We handle every question
                  with the same care and attention you expect from Reluxi.
                </p>

                {/* Gold highlight box */}
                <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/60 rounded-lg p-4 my-6">
                  <p className="text-[#D4AF37] font-dm-sans text-sm font-medium">
                    When reaching out, please mention that you're contacting us
                    for Reluxi Family services — so we can direct you to the
                    right support team immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Help With Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-4">
              What We <span className="text-[#D4AF37]">Help With</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {familyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 p-6 rounded-lg transition-all duration-300 group-hover:bg-black/60">
                  <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="font-dm-sans text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
            >
              {/* Family Walking Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-center lg:justify-start lg:col-span-2"
              >
                <div className="relative inline-block p-2 border-2 border-[#D4AF37] rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/family_walking.png"
                      alt="Family Walking Together"
                      width={350}
                      height={280}
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="p-8 md:p-10 border border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm rounded-lg relative overflow-hidden lg:col-span-3">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-30"></div>

                <div className="relative z-10 space-y-6">
                  <p className="font-dm-sans text-white/90 leading-relaxed">
                    Our core concierge business,{" "}
                    <span className="text-[#D4AF37] font-semibold">
                      Reluxi Lifestyle
                    </span>{" "}
                    continues to thrive, delivering premium service across
                    Moscow, from day planning and drivers to exclusive dining
                    and experiences.
                  </p>

                  <p className="font-dm-sans text-white/90 leading-relaxed">
                    <span className="text-[#D4AF37] font-semibold">
                      Reluxi Family
                    </span>{" "}
                    is a separate initiative — our way of giving back.
                  </p>

                  <p className="font-dm-sans text-white/90 leading-relaxed">
                    We understand that early family life can be demanding,
                    especially in a city like Moscow. That's why we created this
                    dedicated, free support line — to remove stress, offer
                    clarity, and ensure you always have someone to rely on.
                  </p>

                  <div className="pt-4">
                    <p className="font-dm-sans text-white/80 leading-relaxed">
                      We're proudly based in Moscow — but Reluxi Family will
                      soon be available in other cities too.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 border border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-lg relative overflow-hidden">
              {/* Decorative lines */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-[#D4AF37]"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-[#D4AF37]"></div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-6">
                  Ready to Experience{" "}
                  <span className="text-[#D4AF37]">Reluxi Family</span>?
                </h2>

                <p className="font-dm-sans text-white/80 mb-8 leading-relaxed">
                  Join our growing community of young families who trust Reluxi
                  for support, guidance, and peace of mind.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/book"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 font-dm-sans"
                  >
                    <span>Get in touch now</span>
                  </Link>
                </motion.div>

                <p className="font-dm-sans text-xs text-white/60 mt-4">
                  Sign up to access our 24/7 messaging support
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
