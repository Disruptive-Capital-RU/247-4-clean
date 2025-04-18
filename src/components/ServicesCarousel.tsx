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
  searchQuery?: string;
};

export default function ServicesCarousel({
  addToCart,
  searchQuery = "",
}: ServicesCarouselProps) {
  const [services, setServices] = React.useState<Service[]>([]);
  const {
    /* user is not used */
  } = useAuth();
  const [filteredServices, setFilteredServices] = React.useState<Service[]>([]);

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
        title: "Premium Flower Service",
        description: "Exquisite floral arrangements for any occasion.",
        image: "/Images/flowers.png",
        category: "Gifting & Style",
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
                  title: "Premium Flower Service",
                  description:
                    "Exquisite floral arrangements for any occasion.",
                  image: "/Images/flowers.png",
                  category: "Gifting & Style",
                  duration: "Same-day delivery",
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
        id: "s1",
        title: "Private Chauffeur Service",
        description: "Arrive anywhere with style, safety, and discretion.",
        image: "/taxi.jpg",
        category: "Transport",
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
                  title: "Private Chauffeur Service",
                  description:
                    "Arrive anywhere with style, safety, and discretion.",
                  image: "/taxi.jpg",
                  category: "Transport",
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
        category: "Shopping",
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
                  category: "Shopping",
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
        title: "Restaurant & Bar Reservations",
        description:
          "Reserved seating at the most prestigious restaurants with panoramic views.",
        image: "/restaurant.jpg",
        category: "Dining & Culinary",
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
                  title: "Restaurant & Bar Reservations",
                  description:
                    "Reserved seating at the most prestigious restaurants with panoramic views.",
                  image: "/restaurant.jpg",
                  category: "Dining & Culinary",
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
        title: "Timeless Architectural Icons",
        description:
          "Exclusive access to religious and cultural landmarks with expert guides.",
        image: "/church.jpg",
        category: "Culture",
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
                  title: "Timeless Architectural Icons",
                  description:
                    "Exclusive access to religious and cultural landmarks with expert guides.",
                  image: "/church.jpg",
                  category: "Culture",
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
        category: "Medical",
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
                  category: "Medical",
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
        category: "Security",
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
                  category: "Security",
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
        id: "s8",
        title: "Taxi Booking",
        description:
          "Convenient and reliable taxi services at your fingertips.",
        image: "/images/taxi_2.jpg",
        category: "Transport",
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
                  title: "Taxi Booking",
                  description:
                    "Convenient and reliable taxi services at your fingertips.",
                  image: "/images/taxi_2.jpg",
                  category: "Transport",
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
        id: "s9",
        title: "Wellness & Spa Bookings",
        description:
          "Rejuvenating spa treatments and wellness experiences for ultimate relaxation.",
        image: "/images/wellness.jpg",
        category: "Lifestyle",
        src: "/images/wellness.jpg",
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
                  title: "Wellness & Spa Bookings",
                  description:
                    "Rejuvenating spa treatments and wellness experiences for ultimate relaxation.",
                  image: "/images/wellness.jpg",
                  category: "Lifestyle",
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
        id: "s10",
        title: "Event Planning",
        description:
          "Comprehensive event planning services for memorable occasions.",
        image: "/images/event.jpg",
        category: "Lifestyle",
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
                  title: "Event Planning",
                  description:
                    "Comprehensive event planning services for memorable occasions.",
                  image: "/images/event.jpg",
                  category: "Lifestyle",
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
        id: "s11",
        title: "Romantic Evening Planning",
        description:
          "Create perfect romantic experiences with our specialized planning service.",
        image: "/images/romantic.jpg",
        category: "Lifestyle",
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
                  title: "Romantic Evening Planning",
                  description:
                    "Create perfect romantic experiences with our specialized planning service.",
                  image: "/images/romantic.jpg",
                  category: "Lifestyle",
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
        id: "s12",
        title: "Anniversary or Proposal Setup",
        description:
          "Create unforgettable moments for special relationship milestones.",
        image: "/images/anniversary.png",
        category: "Lifestyle",
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
                  category: "Lifestyle",
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
        id: "s13",
        title: "Take-In Dining to Hotel",
        description:
          "Enjoy fine restaurant dining in the comfort of your hotel room.",
        image: "/images/food_delivery.jpg",
        category: "Dining & Culinary",
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
                  category: "Dining & Culinary",
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
        id: "s14",
        title: "Family Day Itinerary",
        description:
          "Curated full-day experiences for the whole family to enjoy together.",
        image: "/images/family.jpg",
        category: "Lifestyle",
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
                  category: "Lifestyle",
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
        id: "s15",
        title: "Cultural Visits",
        description:
          "Guided tours to museums, galleries and cultural landmarks with expert commentary.",
        image: "/images/museum.jpg",
        category: "Culture",
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
                  category: "Culture",
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
        id: "s16",
        title: "Halal Dining Arrangements",
        description:
          "Curated Halal dining experiences at the finest certified restaurants.",
        image: "/images/halal.jpg",
        category: "Dining & Culinary",
        src: "/images/halal.jpg",
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
                  image: "/images/halal.jpg",
                  category: "Dining & Culinary",
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
        id: "s17",
        title: "Entertainment Planning",
        description:
          "Premium tickets and arrangements for concerts, theater, ballet and other performances.",
        image: "/images/ballet.jpg",
        category: "Nightlife & Events",
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
                  category: "Nightlife & Events",
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
    setFilteredServices(servicesData);
  }, [handleAddToCart]);

  // Filter services based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredServices(services);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
    );

    setFilteredServices(filtered);
  }, [searchQuery, services]);

  if (services.length === 0) {
    return (
      <div className="py-12 text-center text-white/50">Loading services...</div>
    );
  }

  return (
    <section className="pt-0 pb-6 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {filteredServices.length === 0 ? (
          <div className="py-12 text-center text-white/50">
            No services found matching &quot;{searchQuery}&quot;. Try a
            different search term.
          </div>
        ) : (
          <Carousel
            items={filteredServices.map((service, index) => (
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
                // className prop applied via styling in Card component
              />
            ))}
          />
        )}
      </div>
    </section>
  );
}
