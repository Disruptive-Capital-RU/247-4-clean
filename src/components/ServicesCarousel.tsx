"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
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
  searchQuery?: string;
  activeCategory?: string;
};

// Create a isomorphic layout effect hook to prevent hydration errors
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ServicesCarousel({
  addToCart,
  searchQuery = "",
  activeCategory = "all",
}: ServicesCarouselProps) {
  const [services, setServices] = React.useState<Service[]>([]);
  const {
    /* user is not used */
  } = useAuth();
  const { t } = useLanguage();
  const [filteredServices, setFilteredServices] = React.useState<Service[]>([]);
  // Add a client-side only state
  const [isMounted, setIsMounted] = React.useState(false);

  // Use the isomorphic layout effect for client-side initialization
  useIsomorphicLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = React.useCallback(
    (service: ServiceType) => {
      if (addToCart) {
        addToCart(service);
      } else {
        toast.success(`Added ${service.title} to your concierge list`);
      }
    },
    [addToCart]
  );

  React.useEffect(() => {
    // Transform the services data to include the content field and use local images
    const servicesData: Service[] = [
      {
        id: "s7",
        title: t("premiumFlowerService"),
        description: t("flowerServiceDesc"),
        image: "/Images/flowers.png",
        category: t("lifestyleRomanticCategory"),
        duration: "Same-day delivery",
        src: "/Images/flowers.png",
        content: (
          <div className="space-y-4">
            <p>
              Our premium flower service provides you with beautiful, fresh
              arrangements for any occasion, delivered with elegance and care.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Luxury bouquets and arrangements</li>
              <li>Hand-selected seasonal blooms</li>
              <li>Special occasion arrangements</li>
              <li>Corporate and event floral design</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s7",
                  title: t("premiumFlowerService"),
                  description: t("flowerServiceDesc"),
                  image: "/Images/flowers.png",
                  category: t("lifestyleRomanticCategory"),
                  duration: "Same-day delivery",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s1",
        title: t("privateChaufferService"),
        description: t("chaufferServiceDesc"),
        image: "/taxi.jpg",
        category: t("coreCategory"),
        duration: "4h or 8h",
        src: "/taxi.jpg",
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
                  title: t("privateChaufferService"),
                  description: t("chaufferServiceDesc"),
                  image: "/taxi.jpg",
                  category: t("coreCategory"),
                  duration: "4h or 8h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s2",
        title: t("personalShoppingExperience"),
        description: t("shoppingExperienceDesc"),
        image: "/shopping.jpg",
        category: t("shoppingCategory2"),
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
                  title: t("personalShoppingExperience"),
                  description: t("shoppingExperienceDesc"),
                  image: "/shopping.jpg",
                  category: t("shoppingCategory2"),
                  duration: "3h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s3",
        title: t("restaurantReservations"),
        description: t("restaurantReservationsDesc"),
        image: "/restaurant.jpg",
        category: t("coreCategory"),
        src: "/images/restaurant_service_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Enjoy priority access to the finest dining establishments with our
              restaurant reservation service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Last-minute bookings at fully-booked venues</li>
              <li>Special chef&apos;s table experiences</li>
              <li>Dietary requirements handled with care</li>
              <li>Personalized dining recommendations</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s3",
                  title: t("restaurantReservations"),
                  description: t("restaurantReservationsDesc"),
                  image: "/restaurant.jpg",
                  category: t("coreCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s4",
        title: t("architecturalIcons"),
        description: t("architecturalIconsDesc"),
        image: "/church.jpg",
        category: t("cultureCategory"),
        duration: "2h",
        src: "/images/church_service_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our private tours of architectural landmarks offer respectful and
              informative experiences at significant historical locations.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Knowledgeable guides specializing in architectural history
              </li>
              <li>Skip-the-line access to popular sites</li>
              <li>Private viewing arrangements where possible</li>
              <li>Customized itineraries based on your interests</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s4",
                  title: t("architecturalIcons"),
                  description: t("architecturalIconsDesc"),
                  image: "/church.jpg",
                  category: t("cultureCategory"),
                  duration: "2h",
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s5",
        title: t("medicalServices"),
        description: t("medicalServicesDesc"),
        image: "/medical.jpg",
        category: t("medicalCategory"),
        duration: "As needed",
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
                  title: t("medicalServices"),
                  description: t("medicalServicesDesc"),
                  image: "/medical.jpg",
                  category: t("medicalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s6",
        title: t("securityServices"),
        description: t("securityServicesDesc"),
        image: "/security.jpg",
        category: t("businessSecurityCategory"),
        duration: "As needed",
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
                  title: t("securityServices"),
                  description: t("securityServicesDesc"),
                  image: "/security.jpg",
                  category: t("businessSecurityCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s8",
        title: t("taxiBooking"),
        description: t("taxiBookingDesc"),
        image: "/images/taxi_2.jpg",
        category: t("coreCategory"),
        src: "/images/taxi_2.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our taxi booking service ensures you have reliable transportation
              anywhere in the city, anytime you need it.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>24/7 availability</li>
              <li>Comfortable, clean vehicles</li>
              <li>Professional, licensed drivers</li>
              <li>Fixed rates for common routes</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s8",
                  title: t("taxiBooking"),
                  description: t("taxiBookingDesc"),
                  image: "/images/taxi_2.jpg",
                  category: t("coreCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s9",
        title: t("familyCultural") + " Experiences",
        description:
          "Specially curated family-friendly activities and cultural experiences.",
        image: "/family.jpg",
        category: t("familyCulturalCategory"),
        duration: "As requested",
        src: "/family.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Indulge in premium wellness and spa experiences with our exclusive
              booking service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access to luxury spa facilities</li>
              <li>Professional massage and beauty treatments</li>
              <li>Holistic wellness therapies</li>
              <li>Private sessions with wellness experts</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s9",
                  title: t("familyCultural") + " Experiences",
                  description:
                    "Specially curated family-friendly activities and cultural experiences.",
                  image: "/family.jpg",
                  category: t("familyCulturalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s10",
        title: t("eventPlanning"),
        description: t("eventPlanningDesc"),
        image: "/images/event.jpg",
        category: t("coreCategory"),
        src: "/images/event.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our event planning services help you create unforgettable
              experiences for any occasion.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Corporate events and conferences</li>
              <li>Private celebrations and parties</li>
              <li>Venue selection and booking</li>
              <li>Full coordination and management</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s10",
                  title: t("eventPlanning"),
                  description: t("eventPlanningDesc"),
                  image: "/images/event.jpg",
                  category: t("coreCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s11",
        title: t("romanticEvening"),
        description: t("romanticEveningDesc"),
        image: "/images/romantic.jpg",
        category: t("lifestyleRomanticCategory"),
        src: "/images/romantic.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Let us arrange an unforgettable romantic evening tailored to your
              preferences and desires.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Intimate dining arrangements</li>
              <li>Special surprises and gifts</li>
              <li>Customized experiences</li>
              <li>Transportation and logistics</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s11",
                  title: t("romanticEvening"),
                  description: t("romanticEveningDesc"),
                  image: "/images/romantic.jpg",
                  category: t("lifestyleRomanticCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s12",
        title: "Anniversary or Proposal Setup",
        description:
          "Create unforgettable moments for special relationship milestones.",
        image: "/images/anniversary.png",
        category: t("lifestyleRomanticCategory"),
        src: "/images/anniversary.png",
        content: (
          <div className="space-y-4">
            <p>
              Our dedicated team creates breathtaking setups for your special
              moments, from anniversaries to proposals.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Stunning venue decoration</li>
              <li>Custom themed environments</li>
              <li>Photography arrangements</li>
              <li>Personalized touches for your unique story</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s12",
                  title: "Anniversary or Proposal Setup",
                  description:
                    "Create unforgettable moments for special relationship milestones.",
                  image: "/images/anniversary.png",
                  category: t("lifestyleRomanticCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s13",
        title: "Take-In Dining to Hotel",
        description:
          "Enjoy fine restaurant dining in the comfort of your hotel room.",
        image: "/images/food_delivery.jpg",
        category: t("lifestyleRomanticCategory"),
        src: "/images/food_delivery.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Experience gourmet restaurant meals delivered and professionally
              served in your hotel room or suite.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Premium restaurant selections</li>
              <li>Professional delivery and setup</li>
              <li>Elegant tableware and presentation</li>
              <li>Flexible scheduling for your convenience</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s13",
                  title: "Take-In Dining to Hotel",
                  description:
                    "Enjoy fine restaurant dining in the comfort of your hotel room.",
                  image: "/images/food_delivery.jpg",
                  category: t("lifestyleRomanticCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s14",
        title: "Family Day Itinerary",
        description:
          "Curated full-day experiences for the whole family to enjoy together.",
        image: "/images/family.jpg",
        category: t("familyCulturalCategory"),
        src: "/images/family.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Let us plan the perfect family day with activities that everyone
              will enjoy, tailored to your family's interests and ages.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Age-appropriate activities</li>
              <li>Family-friendly dining reservations</li>
              <li>Private guided tours of attractions</li>
              <li>Transportation and logistics handled</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s14",
                  title: "Family Day Itinerary",
                  description:
                    "Curated full-day experiences for the whole family to enjoy together.",
                  image: "/images/family.jpg",
                  category: t("familyCulturalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s15",
        title: "Cultural Visits",
        description:
          "Guided tours to museums, galleries and cultural landmarks with expert commentary.",
        image: "/images/museum.jpg",
        category: t("familyCulturalCategory"),
        src: "/images/museum.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Immerse yourself in local culture with private guided tours of the
              city's finest museums, galleries and cultural institutions.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Expert art historians and cultural guides</li>
              <li>Priority access to exhibitions</li>
              <li>Customized routes based on your interests</li>
              <li>Private after-hours museum visits available</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s15",
                  title: "Cultural Visits",
                  description:
                    "Guided tours to museums, galleries and cultural landmarks with expert commentary.",
                  image: "/images/museum.jpg",
                  category: t("familyCulturalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s16",
        title: "Halal Dining Arrangements",
        description:
          "Curated Halal dining experiences at the finest certified restaurants.",
        image: "/images/halal_1.jpg",
        category: t("familyCulturalCategory"),
        src: "/images/halal_1.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Enjoy exceptional Halal-certified dining experiences at carefully
              selected restaurants with our specialized booking service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Verified Halal-certified restaurants</li>
              <li>Priority reservations at premium venues</li>
              <li>Detailed menu consultation</li>
              <li>Special dietary requirements accommodated</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s16",
                  title: "Halal Dining Arrangements",
                  description:
                    "Curated Halal dining experiences at the finest certified restaurants.",
                  image: "/images/halal_1.jpg",
                  category: t("familyCulturalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s17",
        title: "Entertainment Planning",
        description:
          "Premium tickets and arrangements for concerts, theater, ballet and other performances.",
        image: "/images/ballet.jpg",
        category: t("familyCulturalCategory"),
        src: "/images/ballet.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Access the best seats at the most sought-after entertainment
              events with our specialized booking service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Premium seating at performances</li>
              <li>Hard-to-get tickets for sold-out shows</li>
              <li>Meet-and-greet arrangements where possible</li>
              <li>Transportation and dinner reservations coordinated</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s17",
                  title: "Entertainment Planning",
                  description:
                    "Premium tickets and arrangements for concerts, theater, ballet and other performances.",
                  image: "/images/ballet.jpg",
                  category: t("familyCulturalCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s18",
        title: "Meeting Room Booking",
        description:
          "Premium meeting spaces for business engagements and professional gatherings.",
        image: "/images/meeting_room.jpg",
        category: t("businessSecurityCategory"),
        src: "/images/meeting_room.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Secure the perfect meeting space for your business needs with our
              comprehensive booking service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Premium locations across the city</li>
              <li>Full technical setup and support</li>
              <li>Catering arrangements available</li>
              <li>Flexible duration and capacity options</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s18",
                  title: "Meeting Room Booking",
                  description:
                    "Premium meeting spaces for business engagements and professional gatherings.",
                  image: "/images/meeting_room.jpg",
                  category: t("businessSecurityCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s19",
        title: "Full-Day Business Coordination",
        description:
          "Comprehensive support for your business activities throughout the day.",
        image: "/images/meeting.jpg",
        category: t("businessSecurityCategory"),
        src: "/images/meeting.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Let our team handle all aspects of your business day, from
              scheduling to logistics and follow-up.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Meeting scheduling and coordination</li>
              <li>Transportation between appointments</li>
              <li>Document preparation and printing</li>
              <li>Translation and interpretation services</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s19",
                  title: "Full-Day Business Coordination",
                  description:
                    "Comprehensive support for your business activities throughout the day.",
                  image: "/images/meeting.jpg",
                  category: t("businessSecurityCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s20",
        title: "Charter Private Jet",
        description:
          "Exclusive private jet services for seamless luxury travel.",
        image: "/images/private_jet.jpg",
        category: t("transportCategory"),
        src: "/images/private_jet.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Experience the ultimate in travel comfort and privacy with our
              premium private jet charter service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Wide selection of private aircraft</li>
              <li>Personalized itineraries and scheduling</li>
              <li>Discreet and efficient service</li>
              <li>Luxury catering and amenities onboard</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s20",
                  title: "Charter Private Jet",
                  description:
                    "Exclusive private jet services for seamless luxury travel.",
                  image: "/images/private_jet.jpg",
                  category: t("transportCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s21",
        title: "Airport Transfer",
        description:
          "Seamless transportation to and from airports with professional drivers.",
        image: "/images/airport.jpg",
        category: t("businessSecurityCategory"),
        src: "/images/airport.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Enjoy stress-free airport transfers with our premium
              transportation service.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Meet & greet service at arrivals</li>
              <li>Luggage assistance</li>
              <li>Flight monitoring for on-time pickup</li>
              <li>Luxury vehicles with professional drivers</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s21",
                  title: "Airport Transfer",
                  description:
                    "Seamless transportation to and from airports with professional drivers.",
                  image: "/images/airport.jpg",
                  category: t("businessSecurityCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s22",
        title: "Catering Coordination",
        description:
          "Premium catering services for events and private gatherings.",
        image: "/images/banquet.jpg",
        category: t("businessSecurityCategory"),
        src: "/images/banquet.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Our catering coordination service connects you with the finest
              culinary providers for your events.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Custom menu development</li>
              <li>Expert staff and service coordination</li>
              <li>Special dietary accommodations</li>
              <li>Complete setup and cleanup service</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s22",
                  title: "Catering Coordination",
                  description:
                    "Premium catering services for events and private gatherings.",
                  image: "/images/banquet.jpg",
                  category: t("businessSecurityCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
      {
        id: "s23",
        title: t("hotelSelection"),
        description: t("hotelSelectionDesc"),
        image: "/images/hotel.jpg",
        category: t("coreCategory"),
        src: "/images/hotel.jpg",
        content: (
          <div className="space-y-4">
            <p>
              Let our expert team assist you in selecting and booking the
              perfect hotel accommodation tailored to your preferences and
              requirements.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access to exclusive luxury hotels and boutique properties</li>
              <li>Personalized room selection based on your preferences</li>
              <li>Special amenities and VIP treatment arrangements</li>
              <li>Flexible booking options with preferred partner rates</li>
            </ul>
            <button
              onClick={() =>
                handleAddToCart({
                  id: "s23",
                  title: t("hotelSelection"),
                  description: t("hotelSelectionDesc"),
                  image: "/images/hotel.jpg",
                  category: t("coreCategory"),
                })
              }
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
            >
              {t("addToConciergeList")}
            </button>
          </div>
        ),
      },
    ];

    setServices(servicesData);
    setFilteredServices(servicesData);
  }, [handleAddToCart, t]);

  // Update the filter logic to use the isomorphic layout effect
  useIsomorphicLayoutEffect(() => {
    if (!isMounted) return;

    let filtered = services;

    // Filter by category
    if (activeCategory === "all") {
      // Show all services
      filtered = services;
    } else if (activeCategory === "core") {
      // For "Core Services", only show core services
      const coreServices = [
        t("privateChaufferService"),
        t("taxiBooking"),
        t("restaurantReservations"),
        t("wellnessBookings"),
        t("eventPlanning"),
        t("hotelSelection"),
      ];
      filtered = filtered.filter((service) =>
        coreServices.includes(service.title)
      );
    } else {
      // Map category IDs to the actual service categories
      const categoryMap: { [key: string]: string[] } = {
        Lifestyle: [t("lifestyleRomanticCategory")],
        Family: [t("familyCulturalCategory")],
        Business: [t("businessSecurityCategory")],
      };

      // Get the list of service categories for the selected category filter
      const serviceCategoriesForFilter = categoryMap[activeCategory] || [];

      if (serviceCategoriesForFilter.length > 0) {
        filtered = filtered.filter((service) =>
          serviceCategoriesForFilter.includes(service.category)
        );
      }
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  }, [searchQuery, services, activeCategory, isMounted, t]);

  // Return a loading state if not mounted yet
  if (!isMounted) {
    return null;
  }

  if (services.length === 0) {
    return (
      <div className="py-12 text-center text-white/50">
        {t("loadingServices")}
      </div>
    );
  }

  return (
    <section className="pt-0 pb-6 bg-black will-change-opacity will-change-transform">
      <div className="container mx-auto px-4 md:px-6">
        {filteredServices.length === 0 ? (
          <div className="py-12 text-center text-white/50">
            {t("noServicesFound", { query: searchQuery })}
          </div>
        ) : (
          <Carousel
            items={filteredServices.map((service, index) => (
              <Card
                key={`${service.id}-${activeCategory}`}
                index={index}
                card={{
                  src: service.src,
                  title: service.title,
                  category: service.category,
                  content: (
                    <div className="space-y-4">
                      <p>{service.content.props.children[0].props.children}</p>
                      {service.content.props.children[1]}
                      <button
                        onClick={() =>
                          handleAddToCart({
                            id: service.id,
                            title: service.title,
                            description: service.description,
                            image: service.image,
                            category: service.category,
                            duration: service.duration,
                          })
                        }
                        className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
                      >
                        {t("addToConciergeList")}
                      </button>
                    </div>
                  ),
                }}
                layout={true}
              />
            ))}
          />
        )}
      </div>
    </section>
  );
}
