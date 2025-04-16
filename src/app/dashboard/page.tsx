"use client";

import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import {
  createConciergeRequest,
  ConciergeRequest,
  getConciergeRequests,
  getRemainingDays,
} from "@/lib/supabase";
import { toast, Toaster } from "react-hot-toast";
import ServicesCarousel from "@/components/ServicesCarousel";
import MessageConciergePopover from "@/components/MessageConciergePopover";
import MessageConciergeButton from "@/components/MessageConciergeButton";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiNightClear,
  WiNightAltCloudy,
  WiWindy,
} from "react-icons/wi";

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
  const { user, profile, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  const [userName, setUserName] = useState(t("valuedClient") || "Valued Client");
  const [daysRemaining, setDaysRemaining] = useState(3);
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "12°C",
    condition: "Partly Cloudy",
    isDay: true,
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [previousRequests, setPreviousRequests] = useState<ConciergeRequest[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Skip data loading on window focus if already loaded
  const isDataInitialized = useRef(false);

  useEffect(() => {
    // Track whether data has been initialized
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isDataInitialized.current) {
        console.log("Tab became visible, data already loaded");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Skip loading if we're auth loading or data is already initialized
    if (authLoading) return;
    if (isDataInitialized.current && dataLoaded) return;

    // Fetch weather data for Moscow
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=dfa26fd003b1414e99e131529250804&q=Moscow&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }

        const data = await response.json();

        // Format the temperature and condition from WeatherAPI.com response
        const temp = `${Math.round(data.current.temp_c)}°C`;
        const condition = data.current.condition.text;
        const isDay = data.current.is_day === 1;

        setWeatherInfo({
          temp,
          condition,
          isDay,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Keep the default values in case of error
      }
    };

    // Fetch weather data when component mounts
    fetchWeatherData();

    // Set username from profile
    if (profile) {
      // Extract first name from the full name
      const firstName = profile.name.split(' ')[0];
      setUserName(firstName);
      setDaysRemaining(getRemainingDays(profile.concierge_end_date));
    } else if (user?.email) {
      // Fallback if profile not loaded yet
      // Use email prefix as temporary name but only take the first word
      const name = user.email.split("@")[0];
      // Format the name (capitalize first letter)
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      // In case the email prefix contains multiple words, only use the first one
      const firstName = formattedName.split(/[_.-]/)[0];
      setUserName(firstName);
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

    setDataLoaded(true);
    isDataInitialized.current = true;
  }, [user, profile, authLoading, dataLoaded]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const submitOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to submit requests");
      return;
    }

    try {
      // Format the cart items for the database
      const serviceRequests = cart.map((item) => ({
        service_id: item.id,
        service_name: item.title,
        category: item.category,
        quantity: item.quantity,
      }));

      // Save to Supabase
      const { error } = await createConciergeRequest(
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
    }
  };

  const categories = [
    { id: "all", name: t("allServices") || "All Services" },
    { id: "Shopping", name: t("shoppingCategory") || "Shopping" },
    { id: "Dining", name: t("diningCulinaryCategory") || "Dining & Culinary" },
    { id: "Culture", name: t("cultureHistoryCategory") || "Culture & History" },
    { id: "Transport", name: t("transportCategory") || "Transport" },
    { id: "Medical", name: t("medicalWellnessCategory") || "Medical & Wellness" },
    { id: "Nightlife", name: t("nightlifeEventsCategory") || "Nightlife & Events" },
    { id: "Travel", name: t("travelSupportCategory") || "Travel Support" },
  ];

  // Function to determine which weather icon to display based on condition
  const getWeatherIcon = (condition: string) => {
    // Convert condition to lowercase for easier comparison
    const conditionLower = condition.toLowerCase();

    // Check if it's day or night
    const isDay = weatherInfo.isDay;

    // Map condition to appropriate icon
    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return isDay ? (
        <WiDaySunny className="w-8 h-8 text-yellow-300" />
      ) : (
        <WiNightClear className="w-8 h-8 text-blue-200" />
      );
    } else if (
      conditionLower.includes("cloud") ||
      conditionLower.includes("overcast")
    ) {
      return isDay ? (
        <WiCloudy className="w-8 h-8 text-gray-300" />
      ) : (
        <WiNightAltCloudy className="w-8 h-8 text-gray-400" />
      );
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle") ||
      conditionLower.includes("shower")
    ) {
      return <WiRain className="w-8 h-8 text-blue-300" />;
    } else if (
      conditionLower.includes("snow") ||
      conditionLower.includes("blizzard") ||
      conditionLower.includes("ice")
    ) {
      return <WiSnow className="w-8 h-8 text-white" />;
    } else if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("lightning")
    ) {
      return <WiThunderstorm className="w-8 h-8 text-yellow-400" />;
    } else if (
      conditionLower.includes("fog") ||
      conditionLower.includes("mist")
    ) {
      return <WiFog className="w-8 h-8 text-gray-400" />;
    } else if (conditionLower.includes("wind")) {
      return <WiWindy className="w-8 h-8 text-blue-200" />;
    }

    // Default icon if condition doesn't match any of the above
    return <WiDaySunny className="w-8 h-8 text-yellow-300" />;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {isClient && (
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
      )}
      <Navigation />

      {/* Dashboard Header */}
      <section className="pt-24 pb-6 bg-gradient-to-b from-black to-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-cormorant font-semibold text-white mb-2">
                {t("welcomeBack") || "Welcome back"}, <span className="text-[#D4AF37]">{userName}</span>
                .
              </h1>
              <p className="text-white/80 text-lg">
                {t("personalConciergeService") || "Your personal concierge is at your service."}
              </p>
              <p className="text-white/60 mt-2">
                {t("youHave") || "You have"}{" "}
                <span className="text-[#D4AF37] font-medium">
                  {daysRemaining} {t("days") || "days"}
                </span>{" "}
                {t("remainingConciergeBooking") || "remaining of your concierge booking."}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 w-full max-w-sm">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-sm text-white/60">{t("moscowWeather") || "Moscow Weather"}</p>
                    <div className="flex items-center mt-1">
                      {getWeatherIcon(weatherInfo.condition)}
                      <p className="text-xl font-medium ml-2">
                        {weatherInfo.temp}
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mt-1">
                      {weatherInfo.condition}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <MessageConciergePopover />
                    <Link
                      href="/dashboard/profile"
                      className="px-4 py-2 bg-[#111] hover:bg-[#222] text-white/80 hover:text-white rounded-lg transition-colors border border-white/10 text-center"
                    >
                      {t("manageProfile") || "Manage Profile"}
                    </Link>
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
              {t("yourPreviousRequests") || "Your Previous Requests"}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      {t("serviceLabel") || "Service"}
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      {t("categoryLabel") || "Category"}
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      {t("quantityLabel") || "Quantity"}
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      {t("statusLabel") || "Status"}
                    </th>
                    <th className="py-3 px-4 text-white/70 font-medium">
                      {t("dateLabel") || "Date"}
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

      {/* Services Header */}
      <section className="py-3 bg-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-cormorant font-semibold">
              {t("allServices") || "All Services"}
            </h2>
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchServices") || "Search services..."}
                className="w-full px-4 py-2 bg-[#222] border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Golden Divider with Animation */}
      <div className="relative py-1 bg-[#111] overflow-hidden">
        {/* Gradient background effect */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70"></div>
        </div>
        {/* Animated line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="h-px bg-[#D4AF37] shadow-[0_0_8px_#D4AF37,0_0_20px_rgba(212,175,55,0.3)]" 
            style={{
              animation: 'expandLine 1.5s ease-out forwards',
              width: '0%',
              boxShadow: '0 0 8px #D4AF37, 0 0 20px rgba(212,175,55,0.3)'
            }}
          ></div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes expandLine {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>

      {/* Services Carousel */}
      <ServicesCarousel addToCart={addToCart} searchQuery={searchQuery} />

      {/* Floating Message Concierge Button */}
      <MessageConciergeButton />

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-[#D4AF37]/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-cormorant font-semibold text-white">
                {t("myConciergeRequests") || "My Concierge Requests"}
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
                <p className="text-white/60">{t("emptyConciergeList") || "Your concierge list is empty"}</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-4 px-6 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded transition-colors"
                >
                  {t("browseServices") || "Browse Services"}
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
                    {t("requestConfirmation") || "Your request will be sent to our concierge team, who will reach out to confirm timing and preferences."}
                  </p>
                  <button
                    onClick={submitOrder}
                    disabled={orderSubmitted}
                    className={`w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 ${
                      orderSubmitted ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {orderSubmitted
                      ? (t("requestSubmitted") || "Request Submitted!")
                      : (t("sendToConciergeTeam") || "Send to Concierge Team")}
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
