"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-hot-toast";

type ServiceType = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration?: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration?: string;
  src: string;
  content: React.ReactNode;
};

type ServicesCarouselProps = {
  addToCart?: (service: ServiceType) => void;
};

export default function ServicesCarousel({ addToCart }: ServicesCarouselProps) {
  const [services, setServices] = React.useState<Service[]>([]);
  const { user } = useAuth();

  const handleAddToCart = (service: ServiceType) => {
    if (addToCart) {
      addToCart(service);
    } else {
      toast.success(`Added ${service.title} to your concierge list`);
    }
  };

  React.useEffect(() => {
    // Transform the services data to include the content field and use local images
    const servicesData: Service[] = [
      {
        id: "s1",
        title: "Private Chauffeur Service",
        description: "Arrive anywhere with style, safety, and discretion.",
        image: "/chauffeur_service.jpg",
        category: "transport",
        duration: "4h or 8h",
        src: "/images/chauffeur_service.jpeg",
        content: (
          <div className="space-y-4">
            <p>
              Our premium chauffeur service provides you with a professional
              driver and luxury vehicle for your travel needs.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Available 24/7</li>
              <li>Professional, discrete, and experienced drivers</li>
              <li>Luxury vehicles (Mercedes, BMW, Audi)</li>
              <li>Airport transfers, business meetings, city tours</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s1",
                  title: "Private Chauffeur Service",
                  description:
                    "Arrive anywhere with style, safety, and discretion.",
                  image: "/chauffeur_service.jpg",
                  category: "transport",
                  duration: "4h or 8h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
      {
        id: "s2",
        title: "Personal Shopping Experience",
        description:
          "Expert personal shopper guiding you through exclusive shopping venues.",
        image: "/shopping.jpg",
        category: "shopping",
        duration: "3h",
        src: "/images/shopping_service_1.png",
        content: (
          <div className="space-y-4">
            <p>
              Our personal shopping service pairs you with a fashion expert who
              understands your style and preferences.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personalized styling advice</li>
              <li>Access to exclusive collections</li>
              <li>Multilingual shopping assistants</li>
              <li>VIP treatment at premium stores</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s2",
                  title: "Personal Shopping Experience",
                  description:
                    "Expert personal shopper guiding you through exclusive shopping venues.",
                  image: "/shopping.jpg",
                  category: "shopping",
                  duration: "3h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
      {
        id: "s3",
        title: "Premium Restaurant Reservations",
        description:
          "Reserved seating at the most prestigious restaurants with panoramic views.",
        image: "/restaurant.jpg",
        category: "dining",
        src: "/images/restaurant_service_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Enjoy priority access to the finest dining establishments with our
              restaurant reservation service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Last-minute bookings at fully-booked venues</li>
              <li>Special chef's table experiences</li>
              <li>Dietary requirements handled with care</li>
              <li>Personalized dining recommendations</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s3",
                  title: "Premium Restaurant Reservations",
                  description:
                    "Reserved seating at the most prestigious restaurants with panoramic views.",
                  image: "/restaurant.jpg",
                  category: "dining",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
      {
        id: "s4",
        title: "Private Church Experience",
        description:
          "Exclusive access to religious and cultural landmarks with expert guides.",
        image: "/church.jpg",
        category: "culture",
        duration: "2h",
        src: "/images/church_service_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our private church and religious site tours offer respectful and
              informative experiences at significant sacred locations.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Knowledgeable guides specializing in religious history</li>
              <li>Skip-the-line access to popular sites</li>
              <li>Private viewing arrangements where possible</li>
              <li>Customized itineraries based on your interests</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s4",
                  title: "Private Church Experience",
                  description:
                    "Exclusive access to religious and cultural landmarks with expert guides.",
                  image: "/church.jpg",
                  category: "culture",
                  duration: "2h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
      {
        id: "s5",
        title: "Medical Assistance Services",
        description:
          "Comprehensive health services with top medical professionals.",
        image: "/medical.jpg",
        category: "medical",
        src: "/images/medical_service_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our medical services provide access to premium healthcare with
              English-speaking professionals.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Executive health check-ups</li>
              <li>Emergency medical assistance</li>
              <li>Pharmacy services and medication delivery</li>
              <li>Telemedicine consultations</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s5",
                  title: "Medical Assistance Services",
                  description:
                    "Comprehensive health services with top medical professionals.",
                  image: "/medical.jpg",
                  category: "medical",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
      {
        id: "s6",
        title: "Security Services",
        description:
          "Professional security personnel for your safety and peace of mind.",
        image: "/security.jpg",
        category: "security",
        src: "/images/security_service_1.jpeg",
        content: (
          <div className="space-y-4">
            <p>
              Our professional security services ensure your safety with trained
              personnel and comprehensive protection.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal bodyguards (plain clothes or visible)</li>
              <li>Executive protection for business travelers</li>
              <li>Secure transportation arrangements</li>
              <li>Risk assessment and security planning</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s6",
                  title: "Security Services",
                  description:
                    "Professional security personnel for your safety and peace of mind.",
                  image: "/security.jpg",
                  category: "security",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              Add to My Concierge List
            </button>
          </div>
        ),
      },
    ];

    setServices(servicesData);
  }, []);

  return (
    <div className="w-full py-8 bg-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-cormorant font-semibold mb-6 text-white">
          Premium Services
        </h2>

        <Carousel
          items={services.map((service, index) => (
            <Card
              key={service.id}
              index={index}
              card={{
                src: service.src,
                title: service.title,
                category: service.category,
                content: service.content,
              }}
              layout={true}
            />
          ))}
        />
      </div>
    </div>
  );
}
