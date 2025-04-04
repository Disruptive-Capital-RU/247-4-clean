"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import { SparklesCore } from "@/components/ui/sparkles";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section with Sparkles instead of Lamp */}
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
              Book Your{" "}
              <span className="text-[#D4AF37]">Personal Concierge</span>
            </h1>
            <p className="font-dm-sans text-lg md:text-xl text-white/80 mb-8">
              Your time is precious. Start now. Book your personal concierge for
              5 days for just $100.
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
              How It <span className="text-[#D4AF37]">Works</span>
            </h2>

            <div className="space-y-8 font-dm-sans">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    Book Now
                  </h3>
                  <p className="text-white/70">
                    Complete the booking form with your information, travel
                    dates, and preferences. This is a pre-reservation only, no
                    payment is collected at this stage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    Confirmation
                  </h3>
                  <p className="text-white/70">
                    Within 12 hours, our team will contact you directly via your
                    preferred communication method to confirm your reservation,
                    discuss any specific requirements, and answer any questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    Payment
                  </h3>
                  <p className="text-white/70">
                    Once your reservation is confirmed, you'll receive a secure
                    payment link. We accept all major credit cards and
                    international payment methods.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    Pre-Arrival Planning
                  </h3>
                  <p className="text-white/70">
                    Your personal concierge will contact you before your arrival
                    to develop a tailored plan for your visit, ensuring
                    everything is prepared for your Moscow experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 text-black font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-cormorant text-white mb-2">
                    Welcome to Moscow
                  </h3>
                  <p className="text-white/70">
                    Your concierge will meet you upon arrival and be available
                    24/7 throughout your stay to ensure every aspect of your
                    Moscow experience exceeds expectations.
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
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-2">
                  What does the $100 fee cover?
                </h3>
                <p className="font-dm-sans text-white/70">
                  The $100 fee covers your personal concierge service for 5
                  days. This includes 24/7 availability, personalized planning,
                  and on-the-ground assistance. Additional services like
                  restaurant bills, shopping, tickets, etc. are billed
                  separately.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-2">
                  Can I extend my concierge service beyond 5 days?
                </h3>
                <p className="font-dm-sans text-white/70">
                  Yes, you can extend your service at a rate of $20 per
                  additional day. This can be arranged during your stay through
                  your personal concierge.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-2">
                  Are all your concierges Arabic speakers?
                </h3>
                <p className="font-dm-sans text-white/70">
                  Yes, all our concierges are fluent in Arabic, English, and
                  Russian, ensuring seamless communication throughout your stay.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-2">
                  What is your cancellation policy?
                </h3>
                <p className="font-dm-sans text-white/70">
                  Cancellations made 72 hours or more before your scheduled
                  arrival receive a full refund. Cancellations within 72 hours
                  are subject to a 50% fee.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-2">
                  How discreet is your service?
                </h3>
                <p className="font-dm-sans text-white/70">
                  Absolute discretion is our priority. Your privacy is sacred,
                  and we maintain complete confidentiality about your
                  activities, preferences, and personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
