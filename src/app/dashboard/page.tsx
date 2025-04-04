"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import {
  createConciergeRequest,
  ConciergeRequest,
  getConciergeRequests,
  getRemainingDays,
} from "@/lib/supabase";
import { toast, Toaster } from "react-hot-toast";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration?: string;
};

type CartItem = Service & {
  quantity: number;
};

export default function Dashboard() {
  const { user, profile } = useAuth();

  const [userName, setUserName] = useState("Valued Client");
  const [daysRemaining, setDaysRemaining] = useState(3);
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "12°C",
    condition: "Partly Cloudy",
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [previousRequests, setPreviousRequests] = useState<ConciergeRequest[]>(
    []
  );
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set username from profile
    if (profile) {
      setUserName(profile.name);
      setDaysRemaining(getRemainingDays(profile.concierge_end_date));
    } else if (user?.email) {
      // Fallback if profile not loaded yet
      const name = user.email.split("@")[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }

    // Fetch previous concierge requests
    const loadPreviousRequests = async () => {
      if (user?.id) {
        try {
          const { data, error } = await getConciergeRequests(user.id);
          if (error) throw error;
          if (data) {
            setPreviousRequests(data);
          }
        } catch (error) {
          console.error("Error fetching previous requests:", error);
          toast.error("Failed to load your previous requests");
        }
      }
    };

    loadPreviousRequests();

    // Fetch services - in a real app this would come from an API
    setServices([
      {
        id: "s1",
        title: "Black Mercedes with Chauffeur",
        description:
          "Arrive anywhere in Moscow with style, safety, and discretion.",
        image: "/images/luxury-car.jpg",
        category: "transport",
        duration: "4h or 8h",
      },
      {
        id: "s2",
        title: "Personal Shopper in GUM",
        description:
          "Expert personal shopper guiding you through Moscow's prestigious GUM mall.",
        image: "/images/personal-shopper.jpg",
        category: "shopping",
        duration: "3h",
      },
      {
        id: "s3",
        title: "Private Table at White Rabbit",
        description:
          "Reserved seating at one of Moscow's most prestigious restaurants with panoramic views.",
        image: "/images/restaurant.jpg",
        category: "dining",
      },
      {
        id: "s4",
        title: "Private Museum Tour",
        description:
          "Exclusive access to Moscow's finest cultural institutions with an expert guide.",
        image: "/images/museum.jpg",
        category: "culture",
        duration: "2h",
      },
      {
        id: "s5",
        title: "SIM Card Delivery",
        description:
          "High-speed data SIM card delivered directly to your hotel.",
        image: "/images/sim-card.jpg",
        category: "travel",
      },
      {
        id: "s6",
        title: "Executive Health Check",
        description:
          "Comprehensive health assessment at Moscow's premier private clinic.",
        image: "/images/health.jpg",
        category: "medical",
        duration: "2h",
      },
      {
        id: "s7",
        title: "VIP Club Table Booking",
        description:
          "Priority access and premium seating at Moscow's exclusive nightlife venues.",
        image: "/images/nightclub.jpg",
        category: "nightlife",
      },
      {
        id: "s8",
        title: "Private Arabic Chef",
        description:
          "Enjoy authentic Middle Eastern cuisine prepared by a private chef in your accommodation.",
        image: "/images/chef.jpg",
        category: "dining",
        duration: "4h",
      },
    ]);
  }, [user, profile]);

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === service.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });

    toast.success(`Added ${service.title} to your concierge list`);
  };

  const removeFromCart = (serviceId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === serviceId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === serviceId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== serviceId);
      }
    });
  };

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  const submitOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to submit requests");
      return;
    }

    setIsLoading(true);

    try {
      // Format the cart items for the database
      const serviceRequests = cart.map((item) => ({
        service_id: item.id,
        service_name: item.title,
        category: item.category,
        quantity: item.quantity,
      }));

      // Save to Supabase
      const { data, error } = await createConciergeRequest(
        user.id,
        serviceRequests
      );

      if (error) throw error;

      // Show success message
      setOrderSubmitted(true);
      toast.success("Your concierge request has been submitted!");

      // Fetch updated requests
      const { data: updatedRequests } = await getConciergeRequests(user.id);
      if (updatedRequests) {
        setPreviousRequests(updatedRequests);
      }

      // Clear the cart after submission
      setTimeout(() => {
        setCart([]);
        setShowCart(false);
        setOrderSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Services" },
    { id: "shopping", name: "Shopping" },
    { id: "dining", name: "Dining & Culinary" },
    { id: "culture", name: "Culture & History" },
    { id: "transport", name: "Transport" },
    { id: "medical", name: "Medical & Wellness" },
    { id: "nightlife", name: "Nightlife & Events" },
    { id: "travel", name: "Travel Support" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(212,175,55,0.3)",
          },
          success: {
            iconTheme: {
              primary: "#D4AF37",
              secondary: "black",
            },
          },
        }}
      />
      <Navigation />

      {/* Dashboard Header */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-black to-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-cormorant font-semibold text-white mb-2">
                Welcome back, <span className="text-[#D4AF37]">{userName}</span>
                .
              </h1>
              <p className="text-white/80 text-lg">
                Your personal concierge is at your service.
              </p>
              <p className="text-white/60 mt-2">
                You have{" "}
                <span className="text-[#D4AF37] font-medium">
                  {daysRemaining} days
                </span>{" "}
                remaining of your concierge booking.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 w-full max-w-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white/60">Moscow Weather</p>
                    <p className="text-xl font-medium">{weatherInfo.temp}</p>
                    <p className="text-sm text-white/80">
                      {weatherInfo.condition}
                    </p>
                  </div>
                  <div>
                    <button
                      className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg transition-colors"
                      onClick={() =>
                        window.open("https://wa.me/+1234567890", "_blank")
                      }
                    >
                      Message Concierge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Requests Section (if any) */}
      {previousRequests.length > 0 && (
        <section className="py-6 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-cormorant font-semibold mb-6">
              Your Previous Requests
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      Service
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      Category
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      Status
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {previousRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-white/5">
                      <td className="py-3 px-4">{request.service_name}</td>
                      <td className="py-3 px-4 capitalize">
                        {request.category}
                      </td>
                      <td className="py-3 px-4">{request.quantity}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "pending"
                              ? "bg-yellow-900/30 text-yellow-300"
                              : request.status === "confirmed"
                              ? "bg-blue-900/30 text-blue-300"
                              : request.status === "completed"
                              ? "bg-green-900/30 text-green-300"
                              : "bg-red-900/30 text-red-300"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(request.submitted_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Service Categories */}
      <section className="py-6 bg-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-cormorant font-semibold mb-6">
            Browse & Book Services
          </h2>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? "bg-[#D4AF37] text-black font-medium"
                      : "bg-[#222] text-white hover:bg-[#333]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-6 bg-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#0a0a0a] border border-white/5 rounded-lg overflow-hidden hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="h-48 bg-[#222] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-black/50 flex items-center justify-center text-[#D4AF37]">
                    {service.category === "shopping" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    )}
                    {service.category === "dining" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )}
                    {service.category === "culture" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                    )}
                    {service.category === "transport" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    )}
                    {service.category === "medical" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                    {service.category === "nightlife" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                    {service.category === "travel" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    {service.duration && (
                      <span className="text-xs bg-black/50 text-white/70 px-2 py-1 rounded">
                        {service.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    {service.description}
                  </p>
                  <button
                    onClick={() => addToCart(service)}
                    className="w-full py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded transition-colors"
                  >
                    Add to My Concierge List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-[#D4AF37] text-black p-4 rounded-full shadow-lg z-10 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-[#D4AF37]/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-cormorant font-semibold text-white">
                My Concierge Requests
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-white/60 hover:text-white"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-white/20 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-white/60">Your concierge list is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-4 px-6 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded transition-colors"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-white/10 pb-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-white/60">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                          {item.duration && ` • ${item.duration}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/60 hover:text-white"
                          aria-label="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <span className="text-white/80 text-sm">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-white/70 mb-6">
                    Your request will be sent to our concierge team, who will
                    reach out to confirm timing and preferences.
                  </p>
                  <button
                    onClick={submitOrder}
                    disabled={orderSubmitted}
                    className={`w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 ${
                      orderSubmitted ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {orderSubmitted
                      ? "Request Submitted!"
                      : "Send to Concierge Team"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
