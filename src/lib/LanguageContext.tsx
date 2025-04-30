"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define supported languages
export type Language = "EN" | "AR" | "CN" | "RU";

// Define translation interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

// Initial translations
const translations: Translations = {
  EN: {
    // Navigation
    home: "Home",
    pricing: "Pricing",
    services: "Services",
    whyUs: "Why Us",
    login: "Log In",
    bookNow: "Book Now",
    welcomeBack: "Welcome Back",
    accessSuite: "Access Suite",
    dashboard: "Dashboard",
    logout: "Log Out",
    offer: "Offer",

    // Pricing page
    freedom: "Freedom, Perfected",
    pricingDescription:
      "Discover our range of premium concierge services tailored to your needs and preferences.",
    whatYouReceive: "What You Receive in Every Plan:",
    planDescription:
      "Reluxi offers three ways to experience seamless, personal support — whether you're staying in Moscow for a few days, need help with a single special day, or want ongoing access to someone who understands you. All options come with 24/7 availability, human communication, and thoughtful coordination behind every moment.",
    planOverview: "Service, On Your Terms",
    readyToExperience: "Ready to Experience True Luxury?",
    bookYourPersonal:
      "Book your personal concierge now and transform your Moscow experience into something extraordinary.",
    bookYourConcierge: "Book Your Concierge",
    selectPlan: "Select Plan",
    contactUs: "Contact Us",
    oneDayPremiumPlans: "One-Day Premium Plans",
    everyDetailMasterfully: "Every Detail, Masterfully Orchestrated",

    // Why Us page
    whyUsTitle1: "We Don't Just Provide Service.",
    whyUsTitle2: "We Provide",
    certainty: "Certainty",
    whyUsDescription:
      "You don't need a schedule. You need a signal. Your concierge is more than a guide — they are your trusted presence in a foreign land.",
    whyUsQuote: "Even when you're far, you're close to my heart.",
    whyUsQuoteSource: "Inspired by Amr Diab's 'Tamly Ma'ak'",
    whyChooseReluxi: "Why Choose",
    whyChooseReluxiDesc:
      "Reluxi is more than a concierge — it's your trusted presence in a foreign city. With too many options, not enough time, and no one to filter the noise, we're here to guide, simplify, and support. Our mission is to remove the stress and friction of unfamiliar places, so every moment feels purposeful, cared for, and entirely your own.",
    ourServicePhilosophy: "Our Service",
    philosophy: "Philosophy",

    // Why Us advantages
    alwaysOnSupport: "Always-On Support",
    alwaysOnSupportDesc:
      "We handle your plans with speed, care, and quiet consistency — 24/7. Most of our clients never travel without us again.",
    effortlessCommunication: "Effortless Communication",
    effortlessCommunicationDesc:
      "Most clients send one message — we take it from there. No apps, no calls, no back-and-forth. Just smooth, immediate support when you need it.",
    tailoredAccess: "Tailored Access",
    tailoredAccessDesc:
      "We don't just book what's available. We arrange what brings the trip you've been wishing for to life — thoughtfully and precisely.",
    trustedByThoseWhoDeserveMore: "Trusted by Those Who Deserve More",
    trustedByDesc1:
      "From international travelers and public figures to entrepreneurs, diplomats, and creatives — Reluxi is the quiet constant behind their time in Moscow.",
    trustedByDesc2:
      "They come for the reputation, stay for the peace of mind, and return because no one understands them quite like we do.",
    trustedByDesc3:
      "This isn't just a service you try — it's one you come to rely on.",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "The Modern Way to Experience Moscow",
    heroDescription: "We save you hours of searching and planning.",
    heroDescription2: "Available 24 hours a day, 7 days a week.",
    reserveYourConcierge: "Reserve Your Concierge",
    pricingInfo: "",
    discoverMore: "Discover More",

    // Main service intro
    serviceSubtitle: "A Service That Books, Plans, and Elevates",
    serviceIntro:
      "From trusted drivers and curated dining to personal flower deliveries, Reluxi is your private assistant in Moscow — handling every detail so you can move through the city with ease and none of the stress. All it takes is one message.",

    // Service offerings
    privateTransport: "Private Transport",
    privateTransportDesc:
      "From luxury cars to trusted taxis, we arrange transportation that suits your pace, comfort, and discretion — day or night.",
    diningArrangements: "Dining Arrangements",
    diningArrangementsDesc:
      "From reservations at the best restaurants to take-in delivered to your hotel— all arranged to match your taste and timing.",
    dayPlanning: "Day Planning & Personal Scheduling",
    dayPlanningDesc:
      "Your day, thoughtfully arranged — from first steps to final plans, with care that makes the city feel like yours.",
    healthWellness: "Health & Wellness",
    healthWellnessDesc:
      "We connect you to leading spas, clinics, and specialists — with access arranged around your comfort, privacy, and schedule.",
    vipShopping: "VIP Shopping",
    vipShoppingDesc:
      "Curated access to Moscow's top boutiques — with personal support for styling, privacy, and seamless shopping experiences.",
    culturalExperiences: "Cultural Experiences",
    culturalExperiencesDesc:
      "Private tours of Moscow's landmarks and hidden gems — guided by insiders who speak your language.",
    eveningAccess: "Evening Access & Events",
    eveningAccessDesc:
      "From exclusive lounges to refined social gatherings you won't find online.",
    security: "Security",
    securityDesc:
      "Personal protection, arranged when needed — for moments where privacy and peace of mind matter most.",
    gifting: "Gifting & Gestures",
    giftingDesc:
      "Flowers, small gifts, or meaningful touches — delivered perfectly.",

    // Services page
    ourEliteServices: "Our Elite Services",
    luxuryServicesForElite: "Luxury concierge services for the elite",
    howWeServeYou: "How We Serve You",
    howWe: "How We",
    serve: "Serve",
    you: "You",
    oneDayExperience: "One-Day Experience",
    oneDayPrice: "4,850₽ (~$59)",
    designedFor: "Ideal for",
    oneDayDesignedFor:
      "Special occasions, business needs, or quality time with family — when one day deserves to be perfectly handled.",
    whatYouGet: "What's included",
    oneDayWhatYouGet:
      "A curated one-day experience tailored around your goals — personal or professional. We handle the bookings, timing, and flow so your day feels effortless.",
    examplesInclude: "Frequent Requests",
    oneDayExample1:
      "A romantic evening with private transport, dinner reservations, and a floral surprise",
    oneDayExample2:
      "A family day with thoughtfully planned activities, cultural visits, and group-friendly dining — all arranged to keep the day flowing with ease",
    oneDayExample3:
      "A business day with meeting space bookings, restaurant coordination, and transport between locations",
    oneDayExampleFooter:
      "Tell us the kind of day you need — and we'll make it seamless.",
    oneDayPlan: "One-Day Plan",
    requestOneDayPlan: "Request One-Day Plan",

    mostPopular: "Most Popular",
    threeDayPlan: "3-Day Concierge Plan",
    threeDayPrice: "11,500₽ (~$139)",
    threeDayDesignedFor:
      "Short getaways, city breaks, or visitors who want complete support without long-term commitment.",
    threeDayWhatYouGet:
      "Three full days of unlimited, personalized concierge assistance — available at any hour. Ideal for those who want to experience the best of Moscow without stress or planning.",
    includes: "Includes",
    threeDayInclude1: "Concierge support for three full days, available 24/7",
    threeDayInclude2:
      "Booking & coordination across dining, transport, wellness, events, and more",
    threeDayInclude3:
      "Option to add additional days for $39/day — same service, same ease",
    threeDayIncludeFooter:
      "Start your journey with Reluxi — and experience how effortless travel can feel.",
    multiDayPlan: "Multi-Day Plan",
    startThreeDayPlan: "Start 3-Day Plan",

    monthlyMembership: "Monthly Membership",
    monthlyPrice: "33,000₽ (~$399/month)",
    monthlyDesignedFor:
      "Frequent travelers, busy professionals, and city residents who want continuous access to Reluxi's full support.",
    monthlyWhatYouGet:
      "Unlimited monthly concierge access with a dedicated point of contact who learns your preferences and adapts to your rhythm.",
    monthlyInclude1: "A dedicated assistant familiar with your preferences",
    monthlyInclude2:
      "Personalized planning across daily life, travel, dining, and more",
    monthlyInclude3:
      "Consistent care and service across multiple trips or ongoing needs",
    monthlyIncludeFooter:
      "Enjoy continuous, elevated support — no matter how often you need us.",
    membership: "Membership",
    becomeAMember: "Become a Member",

    quickRequests: "Quick Requests",
    oneTaskHandledFast: "One Task, Handled Fast",
    quickRequestsDescription:
      "Text us your request — we'll confirm it for a (~$6.99) commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "How It Works",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — execution only, no planning or customization",
    commissionFee: "Commission Fee",
    quickRequestsFee: "570₽ (~$6,99) per fulfilled request",
    idealFor: "Ideal For",
    quickRequestsIdealFor:
      "Straightforward, one-off bookings (e.g., restaurant reservation, transportation, event tickets, courier)",
    deliveryTime: "Delivery Time",
    quickRequestsDeliveryTime:
      "Handled within minutes — fast, smooth, and confirmed in real time",
    requestABooking: "Request a Booking",

    readyToEnjoyTrip:
      "Ready to Actually Enjoy Your Trip — Without Wasting Time or Energy?",
    reluxiSavesYouHours:
      "Reluxi saves you hours of searching and planning. You focus on the experience — we'll handle everything else.",

    // Dashboard page
    // welcomeBack key is already defined above
    valuedClient: "Valued Client",
    personalConciergeService: "Your personal concierge is at your service.",
    youHave: "You have",
    days: "days",
    remainingConciergeBooking: "remaining of your concierge booking.",
    moscowWeather: "Moscow Weather",
    manageProfile: "Manage Profile",
    yourPreviousRequests: "Your Previous Requests",
    serviceLabel: "Service",
    categoryLabel: "Category",
    quantityLabel: "Quantity",
    statusLabel: "Status",
    dateLabel: "Date",
    browseAndBookServices: "Browse & Book Services",
    searchServices: "Search services...",
    myConciergeRequests: "My Concierge Requests",
    emptyConciergeList: "Your concierge list is empty",
    browseServices: "Browse Services",
    requestConfirmation:
      "Your request will be sent to our concierge team, who will reach out to confirm timing and preferences.",
    requestSubmitted: "Request Submitted!",
    sendToConciergeTeam: "Send to Concierge Team",
    allServices: "All Services",
    shoppingCategory: "Shopping",
    diningCulinaryCategory: "Dining & Culinary",
    cultureHistoryCategory: "Culture & History",
    transportCategory: "Transport",
    medicalWellnessCategory: "Medical & Wellness",
    nightlifeEventsCategory: "Nightlife & Events",
    travelSupportCategory: "Travel Support",
    allCategories: "All",
    coreServices: "Core Services",
    lifestyleRomantic: "Lifestyle & Romantic",
    familyCultural: "Family & Cultural",
    businessSecurity: "Business & Security",
    quantity: "Qty:",

    // Booking page
    bookYour: "Book Your",
    personalConcierge: "Personal Concierge",
    bookingIntro:
      "Your time is precious. Start now. Share a few details with us, and we'll be in touch right away to lift the stress off your stay.",
    howIt: "How It",
    works: "Works",
    bookNow: "Book Now",
    bookNowDesc:
      "Complete the booking form with your information, travel dates, and preferences. This is a pre-reservation only, no payment is collected at this stage.",
    confirmation: "Confirmation",
    confirmationDesc:
      "Within 12 hours, our team will contact you directly via your preferred communication method to confirm your reservation, discuss any specific requirements, and answer any questions.",
    payment: "Payment",
    paymentDesc:
      "Once your reservation is confirmed, you'll receive a secure payment link. We accept all major credit cards and international payment methods.",
    preArrivalPlanning: "Pre-Arrival Planning",
    preArrivalPlanningDesc:
      "Your personal concierge will contact you before your arrival to develop a tailored plan for your visit, ensuring everything is prepared for your Moscow experience.",
    welcomeToMoscow: "Welcome to Moscow",
    welcomeToMoscowDesc:
      "Your concierge will meet you upon arrival and be available 24/7 throughout your stay to ensure every aspect of your Moscow experience exceeds expectations.",
    frequentlyAsked: "Frequently Asked",
    questions: "Questions",
    feeCoverQuestion: "What does the concierge fee cover?",
    feeCoverAnswer:
      "Your concierge fee covers unlimited access to a real, dedicated assistant available 24/7. We handle everything — from booking your dinner to securing a driver or sourcing a last-minute gift. Please note: actual service costs (e.g., restaurant bill, transport fare, event tickets) are billed separately and paid directly by you.",
    extendServiceQuestion: "Can I extend my concierge service beyond 5 days?",
    extendServiceAnswer:
      "Yes. If you started with the 3-Day Plan, you can add extra days at 3,200₽ (~$39/day). Just let your concierge know — no need to fill out anything else.",
    arabicClientsQuestion: "Do you only work with Arabic-speaking clients?",
    arabicClientsAnswer:
      "Not at all. While many of our clients come from Arabic-speaking regions, our concierges are fluent in Arabic, English, Chinese, and Russian, and we welcome anyone looking for thoughtful, personal support.",
    bookOnBehalfQuestion:
      "Can you book things on my behalf, or do I have to pay directly?",
    bookOnBehalfAnswer:
      "We'll coordinate everything for you — reservations, tickets, gifts, transport. In most cases, you pay the vendor directly. If needed, we can arrange pre-payment or transfers on your behalf.",
    contactConciergeQuestion: "How do I contact my concierge?",
    contactConciergeAnswer:
      "Your concierge is available 24/7 via your preferred messaging app — WhatsApp, Telegram, Botim, or iMessage. Just send a message and we'll take care of the rest.",
    showMore: "Show More",
    transportQuestion: "Can you arrange luxury or everyday transport?",
    transportAnswer:
      "Yes. We can arrange anything from luxury car service and chauffeured vehicles to reliable, everyday taxis — all based on your needs, schedule, and preferences.",
    bookTypesQuestion: "What types of things can you book for me?",
    bookTypesAnswer:
      "From restaurants, drivers, and spas to gifting, cultural events, shopping support, and private tours — we handle it all. If it matters to you, it matters to us.",
    needHelpQuestion:
      "I don't know exactly what I need — can you help me decide?",
    needHelpAnswer:
      "Yes. Many clients come to us with a goal or feeling, not a full plan. Just tell us what you're thinking — romantic, relaxing, exciting, productive — and we'll curate ideas that fit your mood and time.",
    notTravelingQuestion: "I'm not traveling — can I still use your service?",
    notTravelingAnswer:
      "Absolutely. Whether you live in Moscow or are just passing through, Reluxi offers on-demand personal assistance for day-to-day needs, local errands, or last-minute planning.",
    responseTimeQuestion: "How fast can you respond to a request?",
    responseTimeAnswer:
      "We're available 24/7, and most requests are confirmed within minutes. Whether it's a last-minute dinner, urgent transport, or a spontaneous idea — we're ready.",
    multipleRequestsQuestion: "Can I make multiple requests at once?",
    multipleRequestsAnswer:
      "Of course. You can send us as many requests as you'd like — all at once or throughout your stay. We'll organize, prioritize, and follow up as needed.",
    privacyQuestion: "How private is this service?",
    privacyAnswer:
      "Discretion is built into everything we do. Whether you're planning a surprise, coordinating a business meeting, or simply value privacy — we never share, store, or disclose your personal information, preferences, or schedule.",
    refundQuestion: "What is your refund policy?",
    refundAnswer:
      "Due to the nature of our personalized and time-sensitive service, all payments are final and non-refundable. We appreciate your understanding and are always here to adjust or reschedule when possible.",

    // Golden button section
    goldLogo: "Reluxi Logo",
    goldenButton: "Add Reluxi To Your Homescreen",
    goldenButtonDesc:
      "This is more than a button — it's your direct line to luxury, discretion, and the finest offerings of the city. One touch connects you to your personal concierge, available day and night.",
    yourGoldenButton: "Your Golden Button",
    goldenButtonInstructions: "Press and hold to add it to your home screen.",
    chooseDevice: "Choose your device to continue:",
    iphone: "iPhone",
    android: "Android",

    // Dashboard access
    accessDashboard: "Access Your Personal Concierge Dashboard",
    dashboardDesc:
      "Manage services, explore experiences, and connect directly with your concierge",
    dashboardButton: "Dashboard",

    // Legacy booking form (these can be deleted later)
    bookingHeader: "Your Time Is Precious. Start Now.",
    bookingDesc:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    phoneWhatsapp: "Phone / WhatsApp *",
    emailHint: "You'll use this email to log into your concierge dashboard",
    arrivalDate: "Arrival Date *",
    departureDate: "Departure Date *",
    interests: "Interests",
    shopping: "Shopping",
    diningCulinary: "Dining & Culinary",
    protection: "Protection",
    medical: "Medical",
    culture: "Culture",
    events: "Events",
    specialInstructions: "Special Instructions",
    reserveButton: "Reserve My Concierge",
    reserveDisclaimer:
      "This is a pre-reservation only. You will be contacted within 12 hours to confirm availability and preferences. No payment is collected on the website.",

    // Footer
    footerTagline: '"Always with you. Even when the world is not."',
    footerNavigation: "Navigation",
    footerLegal: "Legal",
    footerPrivacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    faq: "FAQ",
    footerContact: "Contact",
    phoneNumber: "+7 (XXX) XXX-XXXX",
    emailAddress: "service@reluxi.com",
    copyright: " 2025 Reluxi Concierge. All rights reserved.",
    personalTravelAssistant: "The Modern Way to Experience Moscow",
    footerPoweredBy:
      "Powered by confidentiality, built on trust, inspired by excellence.",

    reserve: "Reserve",
    your: "Your",
    signUp: "Sign Up",

    // Installation steps
    iosInstallationSteps: "iOS Installation Steps",
    openInSafari: "Open this page in Safari",
    tapShareIcon: "Tap the Share icon at the bottom of the screen",
    scrollAddHomeScreen: 'Scroll down and tap "Add to Home Screen"',
    tapAdd: 'Tap "Add" in the top-right corner',
    androidInstallationSteps: "Android Installation Steps",
    openInChrome: "Open this page in Chrome",
    tapThreeDots: "Tap the three dots menu in the top-right",
    tapAddHomeScreen: 'Tap "Add to Home screen"',
    confirmAdd: 'Confirm by tapping "Add"',

    // Dashboard page
    moscowWeather: "Moscow Weather",
    manageProfile: "Manage Profile",
    yourPreviousRequests: "Your Previous Requests",
    serviceLabel: "Service",
    categoryLabel: "Category",
    quantityLabel: "Quantity",
    statusLabel: "Status",
    dateLabel: "Date",
    searchServices: "Search services...",
    dearClient: "Dear",
    trustedConcierge:
      "Your trusted concierge, one click away — ready whenever you are.",
    yourConciergeList: "Your concierge list is empty",
    browseServices: "Browse Services",
    myConciergeRequests: "My Concierge Requests",
    requestWillBeSent:
      "Your request will be sent to our concierge team, who will reach out to confirm timing and preferences.",
    sendToConciergeTeam: "Send to Concierge Team",
    requestSubmitted: "Request Submitted!",
    addedToList: "Added {{service}} to your concierge list",
    loginRequired: "You must be logged in to submit requests",
    requestSubmitSuccess: "Your concierge request has been submitted!",
    requestSubmitFailed: "Failed to submit your request. Please try again.",
    failedLoadRequests: "Failed to load your previous requests",
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",

    // Weather conditions
    sunny: "sunny",
    clear: "clear",
    cloudy: "cloud",
    overcast: "overcast",
    rain: "rain",
    drizzle: "drizzle",
    shower: "shower",
    snow: "snow",
    blizzard: "blizzard",
    ice: "ice",
    thunder: "thunder",
    lightning: "lightning",
    fog: "fog",
    mist: "mist",
    wind: "wind",

    // Service cards
    addToConciergeList: "Add to My Concierge List",
    noServicesFound:
      'No services found matching "{query}". Try a different search term.',
    loadingServices: "Loading services...",

    // Service titles
    premiumFlowerService: "Premium Flower Service",
    flowerServiceDesc: "Exquisite floral arrangements for any occasion.",
    privateChaufferService: "Private Chauffeur Service",
    chaufferServiceDesc: "Arrive anywhere with style, safety, and discretion.",
    personalShoppingExperience: "Personal Shopping Experience",
    shoppingExperienceDesc:
      "Expert personal shopper guiding you through exclusive shopping venues.",
    restaurantReservations: "Restaurant & Bar Reservations",
    restaurantReservationsDesc:
      "Reserved seating at the most prestigious restaurants with panoramic views.",
    architecturalIcons: "Timeless Architectural Icons",
    architecturalIconsDesc:
      "Exclusive access to religious and cultural landmarks with expert guides.",
    medicalServices: "Medical Assistance Services",
    medicalServicesDesc:
      "Comprehensive health services with top medical professionals.",
    securityServices: "Security Services",
    securityServicesDesc:
      "Professional security personnel for your safety and peace of mind.",
    taxiBooking: "Taxi Booking",
    taxiBookingDesc:
      "Convenient and reliable taxi services at your fingertips.",
    wellnessBookings: "Wellness & Spa Bookings",
    wellnessBookingsDesc:
      "Rejuvenating spa treatments and wellness experiences for ultimate relaxation.",
    eventPlanning: "Event Planning",
    eventPlanningDesc:
      "Comprehensive event planning services for memorable occasions.",
    romanticEvening: "Romantic Evening Planning",
    romanticEveningDesc:
      "Create perfect romantic experiences with our specialized planning service.",
    hotelSelection: "Hotel Selection",
    hotelSelectionDesc:
      "Premium hotel selection and booking services for an unforgettable stay.",

    // Service Category Headings
    shoppingCategory: "Shopping",
    diningCulinaryCategory: "Dining & Culinary",
    cultureHistoryCategory: "Culture & History",
    transportCategory: "Transport",
    medicalWellnessCategory: "Medical & Wellness",
    nightlifeEventsCategory: "Nightlife & Events",
    travelSupportCategory: "Travel Support",
    allCategories: "All",
    coreServices: "Core Services",
    lifestyleRomantic: "Lifestyle & Romantic",
    familyCultural: "Family & Cultural",
    businessSecurity: "Business & Security",

    // Categories for service cards - these need to be translated
    coreCategory: "Core Services",
    shoppingCategory2: "Shopping",
    cultureCategory: "Culture",
    medicalCategory: "Medical",
    transportCategory2: "Transport",
    businessSecurityCategory: "Business & Security",
    lifestyleRomanticCategory: "Lifestyle & Romantic",
    familyCulturalCategory: "Family & Cultural",

    // Message concierge
    messageConcierge: "Message Concierge",
    contactYourExecutiveAssistant: "Contact Your Executive Assistant",
    selectPreferredMethod:
      "Select your preferred method to reach your personal executive assistant",

    // Profile management page
    profileManagement: "Profile Management",
    updatePersonalInfo: "Update your personal information",
    backToDashboard: "Back to Dashboard",
    emailCannotBeChanged: "Email cannot be changed",
    updateProfile: "Update Profile",
    updating: "Updating...",
    cancel: "Cancel",
    profileUpdateSuccess: "Profile updated successfully",
    profileUpdateFailed: "Failed to update profile",
    unknownError: "Unknown error",
    redirectingToLogin: "Redirecting to login...",

    // Communication methods and apps
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    botim: "Botim",
    wechat: "WeChat",
  },

  AR: {
    // Navigation
    home: "الرئيسية",
    pricing: "الأسعار",
    services: "الخدمات",
    offer: "العرض",
    whyUs: "لماذا نحن",
    login: "تسجيل الدخول",
    bookNow: "احجز الآن",
    welcomeBack: "مرحبًا بعودتك",
    accessSuite: "الوصول إلى الجناح",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",
    signUp: "التسجيل",

    // Book page hero section
    bookYour: "احجز",
    personalConcierge: "المرافق الشخصي الخاص بك",
    bookingIntro:
      "وقتك ثمين. ابدأ الآن. شاركنا ببعض التفاصيل، وسنتواصل معك فورًا لتخفيف الضغط عن إقامتك.",

    // How it works section
    howIt: "كيف",
    works: "يعمل",
    howItWorks: "كيف يعمل",
    reachOut: "تواصل معنا",
    reachOutDesc:
      "أرسل لنا رسالة سريعة بما تحتاجه — سواء كان حجز عشاء، أو وسيلة نقل، أو مساعدة في تخطيط يومك.",
    weConfirm: "نحن نؤكد",
    weConfirmDesc:
      "ستسمع منا قريبًا عبر تطبيق المراسلة المفضل لديك. سنقوم بتأكيد الطلب، وطرح أي أسئلة متابعة، والبدء في ترتيب كل شيء.",
    secureSimplePayment: "دفع آمن وبسيط",
    secureSimplePaymentDesc:
      "بمجرد تحديد التفاصيل، سنرسل لك رابط دفع آمن. بمجرد تأكيد الدفع الخاص بك، يكون الكونسيرج الخاص بك متاحًا على مدار الساعة طوال أيام الأسبوع — جاهزًا للمساعدة في ذلك الطلب أو أي شيء آخر قد تحتاجه.",

    // Pricing page
    freedom: "الحرية المثالية",
    pricingDescription:
      "اكتشف مجموعتنا من خدمات الكونسيرج المتميزة المصممة خصيصًا لتلبية احتياجاتك وتفضيلاتك.",
    whatYouReceive: "ما تحصل عليه في كل خطة:",
    planDescription:
      "من لحظة بدء رحلتك، نتولى كل التفاصيل — بدقة وأناقة وتقدير مطلق. كل خطة تفتح مجموعة كاملة من الخدمات المتميزة المصممة لتحرير وقتك، حتى تتمكن من التركيز تمامًا على ما يهم: العيش بشكل كامل.",
    planOverview: "نظرة عامة على الخطة",
    readyToExperience: "هل أنت مستعد لتجربة الرفاهية الحقيقية؟",
    bookYourPersonal:
      "احجز الكونسيرج الشخصي الخاص بك الآن وحول تجربتك في موسكو إلى شيء استثنائي.",
    bookYourConcierge: "احجز الكونسيرج الخاص بك",
    selectPlan: "اختر الخطة",
    contactUs: "اتصل بنا",
    oneDayPremiumPlans: "خطط بريميوم ليوم واحد",
    everyDetailMasterfully: "كل التفاصيل ببراعة",

    // Why Us page
    whyUsTitle1: "نحن لا نقدم الخدمة فقط.",
    whyUsTitle2: "نحن نقدم",
    certainty: "اليقين",
    whyUsDescription:
      "أنت لا تحتاج إلى جدول. أنت تحتاج إلى إشارة. المسؤول الخاص بك هو أكثر من مجرد مرشد — إنه حضورك الموثوق في أرض أجنبية.",
    whyUsQuote: "حتى عندما تكون بعيدًا، فأنت قريب من قلبي.",
    whyUsQuoteSource: "مستوحى من أغنية عمرو دياب 'تملي معاك'",
    whyChooseReluxi: "لماذا تختار",
    whyChooseReluxiDesc:
      "Reluxi هي أكثر من مجرد خدمة استقبال - إنها وجودك الموثوق في مدينة أجنبية. مع الكثير من الخيارات، وعدم وجود وقت كافٍ، ولا أحد يصفي الضوضاء، نحن هنا للإرشاد والتبسيط والدعم. مهمتنا هي إزالة التوتر والاحتكاك في الأماكن غير المألوفة، بحيث تشعر كل لحظة بالهدف والرعاية والخصوصية التامة.",
    ourServicePhilosophy: "خدمتنا",
    philosophy: "فلسفة",

    // Why Us advantages
    alwaysOnSupport: "دعم متواصل",
    alwaysOnSupportDesc:
      "نتعامل مع خططك بسرعة واهتمام واتساق هادئ - على مدار الساعة. معظم عملائنا لا يسافرون أبدًا بدوننا مرة أخرى.",
    effortlessCommunication: "تواصل سلس",
    effortlessCommunicationDesc:
      "معظم العملاء يرسلون رسالة واحدة - ونحن نتولى الأمر من هناك. لا تطبيقات، لا مكالمات، لا ذهاب وإياب. مجرد دعم سلس وفوري عندما تحتاجه.",
    tailoredAccess: "وصول مخصص",
    tailoredAccessDesc:
      "نحن لا نحجز ما هو متاح فقط. نحن نرتب ما يجعل الرحلة التي كنت تتمناها تأتي إلى الحياة - بتفكير ودقة.",
    trustedByThoseWhoDeserveMore: "موثوق به من قبل أولئك الذين يستحقون المزيد",
    trustedByDesc1:
      "من المسافرين الدوليين والشخصيات العامة إلى رجال الأعمال والدبلوماسيين والمبدعين - Reluxi هي الثابت الهادئ وراء وقتهم في موسكو.",
    trustedByDesc2:
      "يأتون للسمعة، ويبقون لراحة البال، ويعودون لأن لا أحد يفهمهم تمامًا مثلنا.",
    trustedByDesc3: "هذه ليست مجرد خدمة تجربها - بل هي خدمة تعتمد عليها.",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "مساعد السفر الشخصي الخاص بك",
    heroDescription: "نوفر لك ساعات من البحث والتخطيط.",
    heroDescription2: "متاحة على مدار الساعة طوال أيام الأسبوع.",
    reserveYourConcierge: "احجز الكونسيرج الخاص بك",
    pricingInfo: "",
    discoverMore: "اكتشف المزيد",

    // Main service intro
    serviceMainTitle: "بكلماتنا الخاصة",
    serviceSubtitle: "خدمة ذات حضور وقوة ودقة",
    serviceIntro:
      "ريلوكسي هي بوابتك الخاصة لكل ما تقدمه موسكو — بدون ضوضاء أو تأخير أو تنازلات. نحن متخصصون في توقع رغباتك قبل أن تعبر عنها.",

    // Service offerings
    privateTransport: "النقل الخاص",
    privateTransportDesc:
      "من السيارات الفاخرة إلى سيارات الأجرة الموثوقة، نرتب وسائل النقل التي تناسب سرعتك وراحتك وخصوصيتك — ليلاً أو نهاراً.",
    diningArrangements: "ترتيبات تناول الطعام",
    diningArrangementsDesc:
      "من الحجوزات في أفضل المطاعم إلى توصيل الطعام إلى فندقك — كل ذلك مرتب ليتناسب مع ذوقك وتوقيتك.",
    dayPlanning: "تخطيط اليوم والجدولة الشخصية",
    dayPlanningDesc:
      "يومك، مرتب بعناية — من الخطوات الأولى إلى الخطط النهائية، مع رعاية تجعل المدينة تشعر وكأنها خاصة بك.",
    culturalExperiences: "التجارب الثقافية",
    culturalExperiencesDesc:
      "جولات خاصة لمعالم موسكو وجواهرها المخفية — يرشدك فيها مطلعون يتحدثون لغتك.",
    eveningAccess: "الوصول المسائي والفعاليات",
    eveningAccessDesc:
      "من الصالات الحصرية إلى التجمعات الاجتماعية الراقية التي لن تجدها عبر الإنترنت.",
    security: "الأمن",
    securityDesc:
      "حماية شخصية، يتم ترتيبها عند الحاجة — للحظات التي تهم فيها الخصوصية وراحة البال.",
    gifting: "الهدايا واللفتات",
    giftingDesc:
      "الزهور، والهدايا الصغيرة، أو اللمسات ذات المعنى — يتم تسليمها بشكل مثالي.",
    vipShopping: "تسوق VIP",
    vipShoppingDesc:
      "وصول خاص إلى أرقى المتاجر في موسكو. مصممي أزياء ناطقين باللغة العربية. مواعيد حصرية.",
    highEndDining: "تناول الطعام الفاخر",
    highEndDiningDesc:
      "طاولات مضمونة في أكثر مطاعم موسكو طلباً. طهاة مستعدون لتلبية تفضيلاتك.",
    chauffeuredVehicles: "سيارات مع سائق",
    chauffeuredVehiclesDesc:
      "مرسيدس سوداء، الفئة S، مايباخ. سائقون مدربون احترافياً. سرية تامة. بالساعة أو اليومي.",
    privateCulturalTours: "جولات ثقافية خاصة",
    privateCulturalToursDesc:
      "افتح الوصول إلى القصور والمتاحف والمواقع التراثية الإسلامية مع مرشدين ومترجمين نخبة.",
    personalProtection: "حماية شخصية",
    personalProtectionDesc:
      "حماية تنفيذية مدربة عند الطلب. لأولئك الذين لا يمكن التفاوض على خصوصيتهم وسلامتهم.",
    healthWellness: "الصحة والعافية",
    healthWellnessDesc:
      "عيادات حصرية، وصول VIP إلى الرعاية الطبية، وأخصائيي التجميل، واستعادة السبا — بدون قوائم انتظار.",
    nightlifeEvents: "الحياة الليلية والفعاليات",
    nightlifeEventsDesc:
      "الدخول إلى الدوائر المغلقة، وتجمعات المجتمع الراقي، والفعاليات التي لا يمكن لأي سائح الوصول إليها.",

    // Services page
    ourEliteServices: "خدماتنا المتميزة",
    luxuryServicesForElite: "خدمات كونسيرج فاخرة للنخبة",
    howWeServeYou: "كيف نخدمك",
    howWe: "كيف",
    serve: "نخدم",
    you: "ك",
    oneDayExperience: "تجربة ليوم واحد",
    oneDayPrice: "4,850₽ (~$59)",
    designedFor: "مصممة لـ",
    oneDayDesignedFor:
      "المناسبات الخاصة، والاحتياجات التجارية، أو قضاء وقت جيد مع العائلة — عندما يستحق يوم واحد أن يتم التعامل معه بشكل مثالي.",
    whatYouGet: "ما الذي ستحصل عليه",
    oneDayWhatYouGet:
      "تجربة ليوم واحد مخصصة حول أهدافك — شخصية أو مهنية. نتعامل مع الحجوزات والتوقيت والتدفق حتى يشعر يومك بالسهولة.",
    examplesInclude: "الأمثلة تشمل",
    oneDayExample1:
      "أمسية رومانسية مع وسائل نقل خاصة وحجوزات عشاء ومفاجأة زهور",
    oneDayExample2:
      "يوم عائلي مع أنشطة مخطط لها بعناية وزيارات ثقافية وتناول طعام مناسب للمجموعات - كل ذلك مرتب للحفاظ على تدفق اليوم بسهولة",
    oneDayExample3:
      "يوم عمل مع حجوزات مساحات اجتماعات وتنسيق مطاعم ونقل بين المواقع",
    oneDayExampleFooter: "أخبرنا بنوع اليوم الذي تحتاجه — وسنجعله سلسًا.",
    oneDayPlan: "خطة ليوم واحد",
    requestOneDayPlan: "طلب خطة ليوم واحد",

    mostPopular: "الأكثر شعبية",
    threeDayPlan: "خطة كونسيرج لمدة 3 أيام",
    threeDayPrice: "11,500₽ (~$139)",
    threeDayDesignedFor:
      "رحلات قصيرة، استراحات في المدينة، أو زوار يريدون دعمًا كاملًا بدون التزام طويل الأمد.",
    threeDayWhatYouGet:
      "ثلاثة أيام كاملة من مساعدة الكونسيرج غير المحدودة والمخصصة — متاحة في أي ساعة. مثالي لأولئك الذين يرغبون في تجربة أفضل ما في موسكو بدون إجهاد أو تخطيط.",
    includes: "تشمل",
    threeDayInclude1:
      "وصول إلى الكونسيرج على مدار الساعة طوال أيام الأسبوع عبر تطبيق المراسلة المفضل لديك",
    threeDayInclude2:
      "الحجز والتنسيق عبر تناول الطعام والنقل والعافية والفعاليات والمزيد",
    threeDayInclude3:
      "خيار إضافة أيام إضافية مقابل 39 دولارًا في اليوم — نفس الخدمة، نفس السهولة",
    threeDayIncludeFooter: "ابدأ رحلتك مع ريلوكسي — واختبر مدى سهولة السفر.",
    multiDayPlan: "خطة متعددة الأيام",
    startThreeDayPlan: "بدء خطة 3 أيام",

    monthlyMembership: "العضوية الشهرية",
    monthlyPrice: "33,000₽ (~$399)/شهر",
    monthlyDesignedFor:
      "المسافرون المتكررون والمهنيون المشغولون وسكان المدينة الذين يريدون وصولًا مستمرًا إلى الدعم الكامل من ريلوكسي.",
    monthlyWhatYouGet:
      "وصول غير محدود شهريًا إلى خدمة الكونسيرج مع نقطة اتصال مخصصة تتعلم تفضيلاتك وتتكيف مع إيقاعك.",
    monthlyInclude1: "متوفر على مدار الساعة طوال أيام الأسبوع بدون قيود",
    monthlyInclude2:
      "تخطيط مخصص عبر الحياة اليومية والسفر وتناول الطعام والمزيد",
    monthlyInclude3: "رعاية وخدمة متسقة عبر رحلات متعددة أو احتياجات مستمرة",
    monthlyIncludeFooter:
      "استمتع بدعم مستمر ومرتفع — بغض النظر عن عدد المرات التي تحتاجنا فيها.",
    membership: "العضوية",
    becomeAMember: "أصبح عضوًا",

    quickRequests: "طلبات سريعة",
    oneTaskHandledFast: "مهمة واحدة، تُنجز بسرعة",
    quickRequestsDescription:
      "Text us your request — we'll confirm it for a (~$6.99) commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "كيف يعمل",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — execution only, no planning or customization",
    commissionFee: "رسوم العمولة",
    quickRequestsFee: "570₽ (~$6,99) لكل طلب منفذ",
    idealFor: "مثالي لـ",
    quickRequestsIdealFor:
      "Straightforward, one-off bookings (e.g., restaurant reservation, transportation, event tickets, courier)",
    deliveryTime: "وقت التسليم",
    quickRequestsDeliveryTime:
      "Handled within minutes — fast, smooth, and confirmed in real time",
    requestABooking: "طلب حجز",

    readyToEnjoyTrip:
      "هل أنت مستعد للاستمتاع برحلتك فعلاً - دون إضاعة الوقت أو الطاقة؟",
    reluxiSavesYouHours:
      "يوفر لك ريلوكسي ساعات من البحث والتخطيط. أنت تركز على التجربة — ونحن سنتعامل مع كل شيء آخر.",

    // Dashboard page
    welcomeUser: "مرحباً بعودتك",
    valuedClient: "عميل مقدر",
    personalConciergeService: "مساعدك الشخصي في خدمتك.",
    youHave: "لديك",
    days: "أيام",
    remainingConciergeBooking: "متبقية من حجز المساعد الشخصي الخاص بك.",
    moscowWeather: "طقس موسكو",
    manageProfile: "إدارة الملف الشخصي",
    yourPreviousRequests: "طلباتك السابقة",
    serviceLabel: "الخدمة",
    categoryLabel: "الفئة",
    quantityLabel: "الكمية",
    statusLabel: "الحالة",
    dateLabel: "التاريخ",
    browseAndBookServices: "تصفح وحجز الخدمات",
    searchServices: "البحث عن الخدمات...",
    myConciergeRequests: "طلبات المساعد الشخصي الخاصة بي",
    emptyConciergeList: "قائمة المساعد الشخصي فارغة",
    browseServices: "تصفح الخدمات",
    requestConfirmation:
      "سيتم إرسال طلبك إلى فريق المساعد الشخصي، الذي سيتواصل معك لتأكيد التوقيت والتفضيلات.",
    requestSubmitted: "تم تقديم الطلب!",
    sendToConciergeTeam: "إرسال إلى فريق المساعد الشخصي",
    allServices: "جميع الخدمات",
    shoppingCategory: "التسوق",
    diningCulinaryCategory: "المطاعم والطهي",
    cultureHistoryCategory: "الثقافة والتاريخ",
    transportCategory: "النقل",
    medicalWellnessCategory: "الطب والعافية",
    nightlifeEventsCategory: "الحياة الليلية والفعاليات",
    travelSupportCategory: "دعم السفر",
    allCategories: "الكل",
    coreServices: "الخدمات الأساسية",
    lifestyleRomantic: "نمط الحياة والرومانسية",
    familyCultural: "العائلة والثقافة",
    businessSecurity: "الأعمال والأمن",
    quantity: "الكمية:",

    // Golden button section
    goldLogo: "شعار Reluxi",
    goldenButton: "أضف ريلوكسي إلى شاشتك الرئيسية",
    goldenButtonDesc:
      "هذا أكثر من مجرد زر — إنه خطك المباشر للفخامة والتميز وأرقى ما تقدمه المدينة. لمسة واحدة تربطك بالكونسيرج الشخصي الخاص بك، المتاح ليلاً ونهاراً.",
    yourGoldenButton: "زرك الذهبي",
    goldenButtonInstructions: "اضغط مع الاستمرار لإضافته إلى شاشتك الرئيسية.",
    chooseDevice: "اختر جهازك للمتابعة:",
    iphone: "آيفون",
    android: "أندرويد",

    // Dashboard access
    accessDashboard: "الوصول إلى لوحة تحكم الكونسيرج الشخصية",
    dashboardDesc:
      "إدارة الخدمات واستكشاف التجارب والتواصل المباشر مع الكونسيرج الخاص بك",
    dashboardButton: "لوحة التحكم",

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    emailLabel: "البريد الإلكتروني *",
    emailHint:
      "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "الصينية",
    iAcceptThe: "أقبل",
    termsAndConditions: "الشروط والأحكام",
    and: "و",
    privacyPolicy: "سياسة الخصوصية",
    completeCaptcha: "يرجى إكمال التحقق من كابتشا",
    captchaRequired: "التحقق من كابتشا مطلوب قبل التقديم",
    validEmailRequired: "يرجى إدخال عنوان بريد إلكتروني صالح",
    passwordMinLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    acceptTermsRequired: "يجب عليك قبول الشروط والأحكام للمتابعة",
    processing: "جاري المعالجة...",
    emailVerificationRequired: "التحقق من البريد الإلكتروني مطلوب",
    reserveMyConcierge: "احجز المساعد الشخصي الخاص بي",
    iHaveReadAgree: "لقد قرأت ووافقت على شروط",

    checkEmailVerification: "يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك",
    verifyEmailPrompt:
      "يرجى التحقق من عنوان بريدك الإلكتروني قبل المتابعة. تحقق من بريدك الوارد للحصول على رابط التأكيد والعودة إلى هذه الصفحة بعد التأكيد.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    yourEmail: "بريدك الإلكتروني",
    yourName: "اسمك",
    phone: "الهاتف",
    phoneExample: "+971 55 123 4567",
    enterPassword: "أدخل كلمة المرور الخاصة بك",
    preferredCommunication: "طريقة التواصل المفضلة",
    selectCommunicationMethod: "اختر طريقة التواصل",
    bookingHeadline: "وقتك ثمين. ابدأ الآن.",
    bookingSubheading:
      "شارك معنا بعض التفاصيل، وسنتواصل معك مباشرة لتخفيف الضغط عن إقامتك — حتى تتمكن من التركيز على ما يهم، بينما نهتم نحن بالباقي.",
    frequentlyAsked: "الأسئلة",
    questions: "الشائعة",
    feeCoverQuestion: "ماذا تغطي رسوم الكونسيرج؟",
    feeCoverAnswer:
      "تغطي رسوم الكونسيرج الخاص بك وصولاً غير محدود إلى مساعد حقيقي ومخصص متاح على مدار الساعة طوال أيام الأسبوع. نحن نتعامل مع كل شيء - من حجز العشاء إلى تأمين سائق أو الحصول على هدية في اللحظة الأخيرة. يرجى ملاحظة: تكاليف الخدمات الفعلية (مثل فاتورة المطعم، أجرة النقل، تذاكر الفعاليات) يتم احتسابها بشكل منفصل وتدفع مباشرة من قبلك.",
    extendServiceQuestion: "هل يمكنني تمديد خدمة الكونسيرج لأكثر من 5 أيام؟",
    extendServiceAnswer:
      "نعم. إذا بدأت بخطة الـ 3 أيام، يمكنك إضافة أيام إضافية بسعر 39 دولارًا/يوم. فقط أخبر الكونسيرج الخاص بك - لا حاجة لملء أي شيء آخر.",
    arabicClientsQuestion: "هل تعملون فقط مع العملاء الناطقين بالعربية؟",
    arabicClientsAnswer:
      "لا على الإطلاق. بينما يأتي العديد من عملائنا من مناطق ناطقة بالعربية، فإن الكونسيرج لدينا يتحدثون العربية والإنجليزية والصينية والروسية بطلاقة، ونرحب بأي شخص يبحث عن دعم شخصي وعناية.",
    bookOnBehalfQuestion: "هل يمكنكم الحجز نيابة عني، أم يجب أن أدفع مباشرة؟",
    bookOnBehalfAnswer:
      "سننسق كل شيء لك - الحجوزات، التذاكر، الهدايا، النقل. في معظم الحالات، تدفع للبائع مباشرة. إذا لزم الأمر، يمكننا ترتيب الدفع المسبق أو التحويلات نيابة عنك.",
    contactConciergeQuestion: "كيف أتواصل مع الكونسيرج الخاص بي؟",
    contactConciergeAnswer:
      "الكونسيرج الخاص بك متاح على مدار الساعة طوال أيام الأسبوع عبر تطبيق المراسلة المفضل لديك - واتساب، تيليجرام، بوتيم، أو آي مسج. فقط أرسل رسالة وسنهتم بالباقي.",
    showMore: "عرض المزيد",
    transportQuestion: "هل يمكنكم ترتيب وسائل نقل فاخرة أو يومية؟",
    transportAnswer:
      "نعم. يمكننا ترتيب أي شيء من خدمة السيارات الفاخرة والمركبات مع سائق إلى سيارات الأجرة اليومية الموثوقة - كل ذلك بناءً على احتياجاتك وجدولك وتفضيلاتك.",
    bookTypesQuestion: "ما أنواع الأشياء التي يمكنكم حجزها لي؟",
    bookTypesAnswer:
      "من المطاعم والسائقين والمنتجعات الصحية إلى الهدايا والفعاليات الثقافية ودعم التسوق والجولات الخاصة - نحن نتعامل مع كل شيء. إذا كان الأمر مهمًا بالنسبة لك، فهو مهم بالنسبة لنا.",
    needHelpQuestion:
      "أنا لا أعرف بالضبط ما أحتاجه - هل يمكنكم مساعدتي في اتخاذ القرار؟",
    needHelpAnswer:
      "نعم. يأتي العديد من العملاء إلينا بهدف أو شعور، وليس بخطة كاملة. فقط أخبرنا بما تفكر فيه - رومانسي، مريح، مثير، منتج - وسنقوم بتنسيق أفكار تناسب مزاجك ووقتك.",
    notTravelingQuestion: "أنا لا أسافر - هل لا يزال بإمكاني استخدام خدماتكم؟",
    notTravelingAnswer:
      "بالتأكيد. سواء كنت تعيش في موسكو أو مجرد عابر، تقدم Reluxi مساعدة شخصية عند الطلب للاحتياجات اليومية، أو المهام المحلية، أو التخطيط في اللحظة الأخيرة.",
    responseTimeQuestion: "ما مدى سرعة استجابتكم للطلب؟",
    responseTimeAnswer:
      "نحن متاحون على مدار الساعة طوال أيام الأسبوع، ويتم تأكيد معظم الطلبات في غضون دقائق. سواء كان عشاءً في اللحظة الأخيرة، أو نقلًا عاجلًا، أو فكرة عفوية - نحن جاهزون.",
    multipleRequestsQuestion: "هل يمكنني تقديم طلبات متعددة في وقت واحد؟",
    multipleRequestsAnswer:
      "بالطبع. يمكنك إرسال العديد من الطلبات كما تريد - دفعة واحدة أو طوال فترة إقامتك. سننظم ونحدد الأولويات ونتابع حسب الحاجة.",
    privacyQuestion: "ما مدى خصوصية هذه الخدمة؟",
    privacyAnswer:
      "السرية مبنية في كل ما نقوم به. سواء كنت تخطط لمفاجأة، أو تنسق اجتماع عمل، أو ببساطة تقدر الخصوصية - نحن لا نشارك أو نخزن أو نكشف معلوماتك الشخصية أو تفضيلاتك أو جدولك أبدًا.",
    refundQuestion: "ما هي سياسة الاسترداد الخاصة بكم؟",
    refundAnswer:
      "نظرًا لطبيعة خدمتنا الشخصية والحساسة للوقت، فإن جميع المدفوعات نهائية وغير قابلة للاسترداد. نقدر تفهمكم ونحن دائمًا هنا للتعديل أو إعادة الجدولة عندما يكون ذلك ممكنًا.",
  },

  CN: {
    // Navigation
    home: "首页",
    pricing: "价格",
    services: "服务",
    offer: "优惠",
    whyUs: "为何选择我们",
    login: "登录",
    bookNow: "立即预订",
    welcomeBack: "欢迎回来",
    accessSuite: "访问套件",
    dashboard: "控制面板",
    logout: "退出登录",
    signUp: "注册",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "体验莫斯科的现代方式",
    heroDescription: "我们为您节省搜索和规划的时间。",
    heroDescription2: "全天候服务，每周7天。",
    reserveYourConcierge: "预约您的礼宾服务",
    discoverMore: "探索更多",

    // Why Us page
    whyUsTitle1: "我们不仅仅提供服务。",
    whyUsTitle2: "我们提供",
    certainty: "确定性",
    whyUsDescription:
      "您不需要日程表。您需要的是信号。您的礼宾不仅仅是向导——他们是您在异国他乡的可信赖存在。",
    whyUsQuote: "即使当您远在他方，您仍然贴近我心。",
    whyUsQuoteSource: "灵感来自Amr Diab的'Tamly Ma'ak'",
    whyChooseReluxi: "为何选择",
    whyChooseReluxiDesc:
      "Reluxi不仅仅是礼宾服务——它是您在陌生城市中的可信赖存在。面对太多选择、时间不足以及没有人帮您过滤噪音，我们在这里指导、简化和支持。我们的使命是消除陌生地方的压力和摩擦，使每一刻都感到有目的、被关怀，完全属于您自己。",
    ourServicePhilosophy: "我们的服务",
    philosophy: "理念",

    // Why Us advantages
    alwaysOnSupport: "全天候支持",
    alwaysOnSupportDesc:
      "我们以速度、关怀和安静的一致性处理您的计划——全天候。我们的大多数客户再也不会在没有我们的情况下旅行。",
    effortlessCommunication: "轻松沟通",
    effortlessCommunicationDesc:
      "大多数客户只需发送一条消息——我们接手处理。没有应用程序、没有电话、没有来回沟通。只有在您需要时提供流畅、即时的支持。",
    tailoredAccess: "定制访问",
    tailoredAccessDesc:
      "我们不仅仅预订可用的服务。我们安排能够实现您一直期望的旅行体验——周到而精确。",
    trustedByThoseWhoDeserveMore: "受那些值得更多的人信赖",
    trustedByDesc1:
      "从国际旅行者和公众人物到企业家、外交官和创意人士——Reluxi是他们在莫斯科期间背后安静的常量。",
    trustedByDesc2:
      "他们因声誉而来，为心灵的平静而留，又因为没有人能像我们一样理解他们而回归。",
    trustedByDesc3: "这不仅仅是您尝试的服务——而是您开始依赖的服务。",

    // Main service intro
    serviceMainTitle: "用我们的话说",
    serviceSubtitle: "预订、规划和提升的服务",
    serviceIntro:
      "从可靠的司机和精选的餐饮到个人花卉递送，Reluxi是您在莫斯科的私人助手——处理每一个细节，让您可以轻松地穿梭于城市中，没有任何压力。只需一条消息即可。",

    // Services page
    ourEliteServices: "我们的精英服务",
    luxuryServicesForElite: "为精英提供的豪华礼宾服务",
    howWeServeYou: "我们如何为您服务",
    howWe: "我们如何",
    serve: "服务",
    you: "您",

    // Service Categories
    allCategories: "全部",
    coreServices: "核心服务",
    lifestyleRomantic: "生活方式与浪漫",
    familyCultural: "家庭与文化",
    businessSecurity: "商务与安全",
    shoppingCategory: "购物",
    diningCulinaryCategory: "餐饮与美食",
    cultureHistoryCategory: "文化与历史",
    transportCategory: "交通",
    medicalWellnessCategory: "医疗与健康",
    nightlifeEventsCategory: "夜生活与活动",
    travelSupportCategory: "旅行支持",

    // Plans
    freedom: "完美的自由",
    planDescription:
      "Reluxi提供三种无缝个人支持的方式——无论您在莫斯科停留几天，需要一天特别帮助，还是希望持续获得理解您的人的协助。所有选项都包括全天候可用性、人性化沟通以及每一刻背后的周到协调。",

    oneDayExperience: "一日体验",
    oneDayPrice: "4,850₽ (~$59)",
    designedFor: "适用于",
    oneDayDesignedFor:
      "特殊场合、商务需求或与家人的优质时光——当一天值得完美安排时。",
    whatYouGet: "您将获得",
    oneDayWhatYouGet:
      "根据您的目标定制的一日体验——个人或专业。我们处理预订、时间安排和流程，让您的一天感觉毫不费力。",
    examplesInclude: "例子包括",
    oneDayExample1: "浪漫之夜，包括私人交通、晚餐预订和鲜花惊喜",
    oneDayExample2:
      "家庭日，包括精心策划的活动、文化参观和适合团体的用餐——全部安排得让一天轻松流畅",
    oneDayExample3: "商务日，包括会议场所预订、餐厅协调和地点间的交通",
    oneDayExampleFooter: "告诉我们您需要什么样的一天——我们将使其无缝衔接。",
    oneDayPlan: "一日计划",
    requestOneDayPlan: "申请一日计划",

    mostPopular: "最受欢迎",
    threeDayPlan: "3天礼宾计划",
    threeDayPrice: "11,500₽ (~$139)",
    threeDayDesignedFor:
      "短途旅行、城市休息或希望获得全面支持而无需长期承诺的访客。",
    threeDayWhatYouGet:
      "三天不限量的个性化礼宾协助——随时可用。适合那些希望体验莫斯科最佳而无压力或规划的人。",
    includes: "包括",
    threeDayInclude1: "通过您首选的消息应用全天候访问礼宾",
    threeDayInclude2: "跨餐饮、交通、健康、活动等的预订和协调",
    threeDayInclude3: "可以以$39/天添加额外天数——相同服务，相同便捷",
    threeDayIncludeFooter: "开始您与Reluxi的旅程——体验旅行可以多么轻松。",
    multiDayPlan: "多日计划",
    startThreeDayPlan: "开始3天计划",

    monthlyMembership: "月度会员",
    monthlyPrice: "33,000₽ (~$399)/月",
    monthlyDesignedFor:
      "频繁旅行者、忙碌的专业人士和希望持续访问Reluxi全面支持的城市居民。",
    monthlyWhatYouGet:
      "无限制的月度礼宾访问，配有专属联系人，了解您的偏好并适应您的节奏。",
    monthlyInclude1: "全天候无限制可用",
    monthlyInclude2: "跨日常生活、旅行、餐饮等的个性化规划",
    monthlyInclude3: "跨多次旅行或持续需求的一致护理和服务",
    monthlyIncludeFooter: "享受持续、提升的支持——无论您需要我们多频繁。",
    membership: "会员",
    becomeAMember: "成为会员",

    // Service offerings
    privateTransport: "私人交通",
    privateTransportDesc:
      "从豪华汽车到可靠的出租车，我们提供符合您的节奏、舒适度和隐私需求的交通服务——无论白天还是黑夜。",
    diningArrangements: "餐饮安排",
    diningArrangementsDesc:
      "从最佳餐厅的预订到送餐到您的酒店——所有安排都符合您的口味和时间安排。",
    dayPlanning: "日程规划和个人时间表",
    dayPlanningDesc:
      "您的一天，精心安排——从第一步到最后的计划，细心的关怀让这座城市感觉像您自己的。",
    healthWellness: "健康与养生",
    healthWellnessDesc:
      "我们为您连接顶级水疗中心、诊所和专家——根据您的舒适度、隐私和日程安排进行访问安排。",
    vipShopping: "贵宾购物",
    vipShoppingDesc:
      "精选莫斯科顶级精品店——为您提供个人化的造型支持、隐私保护和无缝购物体验。",
    culturalExperiences: "文化体验",
    culturalExperiencesDesc:
      "莫斯科地标和隐藏宝藏的私人导览——由会说您的语言的内部人士指导。",
    eveningAccess: "夜间活动和社交",
    eveningAccessDesc: "从独家休息室到网上找不到的精致社交聚会。",
    security: "安保服务",
    securityDesc: "根据需要安排的个人保护——适用于隐私和心灵平静最重要的时刻。",
    gifting: "礼品和心意",
    giftingDesc: "鲜花、小礼品或有意义的心意——完美送达。",

    quickRequests: "快速请求",
    oneTaskHandledFast: "一个任务，快速处理",
    quickRequestsDescription:
      "Text us your request — we'll confirm it for a (~$6.99) commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "如何运作",
    quickRequestsHowItWorks: "按请求付费的礼宾服务——不需要计划",
    commissionFee: "佣金费用",
    quickRequestsFee: "570₽ (~$6,99) 每完成一次请求",
    idealFor: "适合",
    quickRequestsIdealFor: "一次性预订（例如，餐厅、交通、活动门票、快递）",
    deliveryTime: "交付时间",
    quickRequestsDeliveryTime: "所有安排在几分钟内完成——流畅、快速且实时确认",
    requestABooking: "请求预订",

    readyToEnjoyTrip: "准备好真正享受旅程——无需浪费时间和精力？",
    reluxiSavesYouHours:
      "Reluxi为您节省了搜索和规划的时间。您专注于体验——我们会处理其他一切。",

    // Dashboard page
    welcomeUser: "欢迎回来",
    valuedClient: "重要客户",
    personalConciergeService: "您的私人礼宾服务就在您身边。",
    youHave: "您有",
    days: "天",
    remainingConciergeBooking: "您的礼宾预订剩余",
    moscowWeather: "莫斯科天气",
    manageProfile: "管理个人资料",
    yourPreviousRequests: "您之前的请求",
    serviceLabel: "服务",
    categoryLabel: "类别",
    quantityLabel: "数量",
    statusLabel: "状态",
    dateLabel: "日期",
    browseAndBookServices: "浏览和预订服务",
    // Golden button section
    goldenButton: "将Reluxi添加到您的主屏幕",
    goldenButtonDesc:
      "这不仅仅是一个按钮——这是您直接连接到奢华、谨慎和城市最佳服务的通道。一触即可连接到您的私人礼宾，日夜可用。",
    yourGoldenButton: "您的金色按钮",

    // Dashboard access
    accessDashboard: "访问您的个人礼宾控制面板",
    dashboardDesc: "管理服务、探索体验并直接与您的礼宾联系",
    dashboardButton: "控制面板",

    // ... existing code ...
  },

  RU: {
    // Navigation
    home: "Главная",
    pricing: "Цены",
    services: "Услуги",
    offer: "Предложение",
    whyUs: "Почему мы",
    login: "Войти",
    bookNow: "Забронировать",
    welcomeBack: "Добро пожаловать",
    accessSuite: "Доступ к набору услуг",
    dashboard: "Панель управления",
    logout: "Выйти",
    signUp: "Регистрация",

    // Main service intro
    serviceMainTitle: "Нашими словами",
    serviceSubtitle: "Сервис с присутствием, силой и точностью",
    serviceIntro:
      "Reluxi — это ваш личный портал ко всему, что предлагает Москва — без шума, задержек или компромиссов. Мы специализируемся на предугадывании ваших желаний еще до того, как вы их выразите.",

    // Service offerings
    privateTransport: "Частный транспорт",
    privateTransportDesc:
      "От роскошных автомобилей до надежных такси, мы организуем транспорт, соответствующий вашему темпу, комфорту и приватности — днем или ночью.",
    diningArrangements: "Организация питания",
    diningArrangementsDesc:
      "От бронирования в лучших ресторанах до доставки еды в ваш отель — все организовано в соответствии с вашим вкусом и расписанием.",
    dayPlanning: "Планирование дня и персональное расписание",
    dayPlanningDesc:
      "Ваш день, тщательно организованный — от первых шагов до последних планов, с заботой, которая делает город как будто вашим собственным.",
    culturalExperiences: "Культурные впечатления",
    culturalExperiencesDesc:
      "Частные экскурсии по достопримечательностям Москвы и ее скрытым сокровищам — под руководством знающих людей, говорящих на вашем языке.",
    eveningAccess: "Вечерний доступ и мероприятия",
    eveningAccessDesc:
      "От эксклюзивных залов до высококлассных социальных собраний, которые вы не найдете в интернете.",
    security: "Безопасность",
    securityDesc:
      "Персональная защита, организованная по запросу — для моментов, когда конфиденциальность и спокойствие имеют наибольшее значение.",
    gifting: "Подарки и знаки внимания",
    giftingDesc:
      "Цветы, небольшие подарки или значимые жесты — доставлены безупречно.",
    vipShopping: "VIP шоппинг",
    vipShoppingDesc:
      "Эксклюзивный доступ к самым изысканным магазинам Москвы. Русскоговорящие консультанты по моде. Эксклюзивные встречи.",
    highEndDining: "Высокая кухня",
    highEndDiningDesc:
      "Гарантированные столики в самых востребованных ресторанах Москвы. Шеф-повара, готовые удовлетворить ваши предпочтения.",
    chauffeuredVehicles: "Автомобили с водителем",
    chauffeuredVehiclesDesc:
      "Черные Mercedes S-класса, Maybach. Профессионально обученные водители. Полная конфиденциальность. Почасовая или дневная оплата.",
    privateCulturalTours: "Частные культурные туры",
    privateCulturalToursDesc:
      "Доступ к дворцам, музеям и культурным объектам с элитными гидами и переводчиками.",
    personalProtection: "Личная защита",
    personalProtectionDesc:
      "Обученная исполнительная защита по запросу. Для тех, чья конфиденциальность и безопасность не подлежат компромиссу.",
    healthWellness: "Здоровье и благополучие",
    healthWellnessDesc:
      "Эксклюзивные клиники, VIP-доступ к медицинскому обслуживанию, специалистам по красоте и спа-восстановлению — без очередей.",
    nightlifeEvents: "Ночная жизнь и мероприятия",
    nightlifeEventsDesc:
      "Доступ к закрытым кругам, высшим общественным собраниям и событиям, недоступным для обычных туристов.",

    // Golden button section
    goldenButton: "Добавьте Reluxi на главный экран",
    goldenButtonDesc:
      "Это больше, чем просто кнопка — это ваша прямая линия к роскоши, превосходству и лучшему, что может предложить город. Одно касание связывает вас с вашим персональным консьержем, доступным днем и ночью.",
    yourGoldenButton: "Ваша золотая кнопка",

    // Dashboard access
    accessDashboard: "Доступ к вашей персональной панели консьержа",
    dashboardDesc:
      "Управляйте услугами, исследуйте впечатления и напрямую общайтесь с вашим консьержем",
    dashboardButton: "Панель управления",

    // Book page hero section
    bookYour: "Забронируйте",
    personalConcierge: "вашего личного консьержа",
    bookingIntro:
      "Ваше время драгоценно. Начните сейчас. Поделитесь с нами некоторыми деталями, и мы немедленно свяжемся с вами, чтобы снять стресс с вашего пребывания.",

    // How it works section individual parts
    howIt: "Как",
    works: "это работает",

    // How it works section detailed translations
    reachOut: "Свяжитесь с нами",
    reachOutDesc:
      "Отправьте нам быстрое сообщение с тем, что вам нужно — будь то бронирование ужина, транспорт или помощь в планировании вашего дня.",
    weConfirm: "Мы подтверждаем",
    weConfirmDesc:
      "Вы получите от нас ответ в ближайшее время через предпочитаемое вами приложение для сообщений. Мы подтвердим запрос, зададим дополнительные вопросы и начнем организацию всего необходимого.",
    secureSimplePayment: "Безопасная и простая оплата",
    secureSimplePaymentDesc:
      "Как только все детали согласованы, мы отправим вам безопасную ссылку для оплаты. После подтверждения оплаты ваш консьерж будет доступен 24/7 — готовый помочь с этим запросом или любым другим, который может вам понадобиться.",
    howItWorks: "Как это работает",
    // Booking form
    bookingHeader: "Ваше время драгоценно. Начните сейчас.",
    bookingDesc:
      "Поделитесь с нами некоторыми деталями, и мы немедленно свяжемся с вами, чтобы снять стресс с вашего пребывания. Выберите дату прибытия, предпочтения и контактные данные.",
    fullName: "Полное имя *",
    emailLabel: "Электронная почта *",
    emailHint:
      "Вы будете использовать эту электронную почту для входа в панель управления вашим личным консьержем",
    phoneWhatsapp: "Телефон / WhatsApp *",
    languagePreference: "Предпочтения языка",
    selectLanguage: "Выберите язык",
    arabic: "Арабский",
    english: "Английский",
    russian: "Русский",
    chinese: "Китайский",
    iAcceptThe: "Я принимаю",
    termsAndConditions: "Условия и положения",
    and: "и",
    privacyPolicy: "Политика конфиденциальности",
    completeCaptcha: "Пожалуйста, заполните капчу",
    captchaRequired: "Капча обязательна перед отправкой",
    validEmailRequired:
      "Пожалуйста, введите действительный адрес электронной почты",
    passwordMinLength: "Пароль должен содержать не менее 6 символов",
    acceptTermsRequired:
      "Вы должны согласиться с условиями и положениями, чтобы продолжить",
    processing: "Обработка...",
    emailVerificationRequired: "Требуется подтверждение электронной почты",
    reserveMyConcierge: "Забронировать моего личного консьержа",
    iHaveReadAgree: "Я прочитал и согласен",

    checkEmailVerification:
      "Пожалуйста, проверьте свою электронную почту, чтобы подтвердить ваш аккаунт",
    verifyEmailPrompt:
      "Пожалуйста, подтвердите ваш адрес электронной почты перед продолжением. Проверьте свою почту на наличие ссылки подтверждения, подтвердив её, вернитесь на эту страницу после подтверждения.",
    email: "Электронная почта",
    password: "Пароль",
    yourEmail: "Ваша электронная почта",
    yourName: "Ваше имя",
    phone: "Телефон",
    phoneExample: "+971 55 123 4567",
    enterPassword: "Введите пароль для вашего личного консьержа",
    preferredCommunication: "Предпочтительный способ связи",
    selectCommunicationMethod: "Выберите способ связи",
    bookingHeadline: "Ваше время драгоценно. Начните сейчас.",
    bookingSubheading:
      "Поделитесь с нами некоторыми деталями, и мы немедленно свяжемся с вами, чтобы снять стресс с вашего пребывания — так вы сможете сосредоточиться на важных вещах, в то время как мы будем обрабатывать остальные вопросы.",
    frequentlyAsked: "Часто задаваемые вопросы",
    questions: "Часто задаваемые вопросы",
    feeCoverQuestion: "Что покрывает консьержская плата?",
    feeCoverAnswer:
      "Консьержская плата покрывает неограниченный доступ к реальному, индивидуальному помощнику, доступному круглосуточно. Мы обрабатываем все — от бронирования ужина до найма водителя или покупки последнего момента подарка. Обратите внимание: фактические затраты на услуги (например, счет ресторана, проезд, билеты на мероприятия) рассчитываются отдельно и оплачиваются вами напрямую.",
    extendServiceQuestion:
      "Могу ли я продлить услугу консьержа на более длительный срок?",
    extendServiceAnswer:
      "Да. Если вы начали с 3-дневного плана, вы можете добавить дополнительные дни по цене 39 долларов США в день. Просто сообщите вашему консьержу — вам не нужно ничего заполнять.",
    arabicClientsQuestion:
      "Вы работаете только с клиентами, говорящими по-арабски?",
    arabicClientsAnswer:
      "Не совсем так. Хотя многие из наших клиентов приходят из арабских регионов, наши консьержи говорят по-арабски, английскому, китайскому и русскому, и мы приветствуем любого, кто ищет персональную поддержку.",
    bookOnBehalfQuestion:
      "Вы можете забронировать мои дела вместо меня, или мне нужно заплатить сразу?",
    bookOnBehalfAnswer:
      "Мы организуем все для вас — бронирование, билеты, подарки, переезд. В большинстве случаев вы платите поставщику напрямую. Если это необходимо, мы можем организовать предварительный платеж или переводы от вашего имени.",
    contactConciergeQuestion: "Как я могу связаться с вашим консьержем?",
    contactConciergeAnswer:
      "Ваш консьерж доступен круглосуточно через ваше любимое приложение для общения — WhatsApp, Telegram, Botim или iMessage. Просто отправьте сообщение, и мы обработаем остальные вопросы.",
    showMore: "Показать больше",
    transportQuestion:
      "Вы можете организовать роскошный или ежедневный транспорт?",
    transportAnswer:
      "Да. Мы можем организовать любой транспорт от роскошных автомобилей и лимузинов до надежных ежедневных такси — все это основывается на ваших потребностях, расписании и предпочтениях. Мы также можем организовать трансфер от аэропорта до вашего отеля.",
    bookTypesQuestion: "Какие виды услуг вы можете забронировать для меня?",
    bookTypesAnswer:
      "От ресторанов и водителей до спа-центров и культурных мероприятий — мы обрабатываем все. Если что-то важно для вас, это важно и для нас.",
    needHelpQuestion: "Я не уверен, что мне нужно — вы можете мне помочь?",
    needHelpAnswer:
      "Да. Мы получаем много клиентов с целью или чувством, а не с полным планом. Просто расскажите нам, что вы думаете — романтическое, расслабляющее, возбуждающее, продуктивное — и мы составим для вас идею, подходящую под ваше настроение и время.",
    notTravelingQuestion:
      "Я не путешествую — я все еще могу использовать ваши услуги?",
    notTravelingAnswer:
      "Конечно. Если вы живете в Москве или просто проезжаете мимо, Reluxi предлагает персональную помощь по запросу, чтобы удовлетворить ваши ежедневные потребности, местные дела или временные планы.",
    responseTimeQuestion: "Сколько времени у вас уходит на ответ на запрос?",
    responseTimeAnswer:
      "Мы работаем круглосуточно, и большинство запросов обрабатывается в течение нескольких минут. Независимо от того, была ли это последняя минута ужина, экстренная поездка или спонтанная идея — мы готовы.",
    multipleRequestsQuestion:
      "Могу ли я отправить несколько запросов одновременно?",
    multipleRequestsAnswer:
      "Конечно. Вы можете отправить нам любое количество запросов — все сразу или в течение всего вашего пребывания. Мы организуем, определяем приоритеты и отслеживаем по мере необходимости.",
    privacyQuestion: "Насколько эта услуга приватная?",
    privacyAnswer:
      "Конфиденциальность — это основа всего, что мы делаем. Независимо от того, собираетесь ли вы сделать сюрприз, организовать деловую встречу или просто ценить конфиденциальность — мы никогда не делимся, не храним и не раскрываем вашу личную информацию, предпочтения или расписание.",
    refundQuestion: "Какова ваша политика возврата средств?",
    refundAnswer:
      "Из-за индивидуального и зависящего от времени характера нашего сервиса все платежи являются окончательными и невозвратными. Мы ценим ваше понимание и всегда готовы внести коррективы или перенести встречу, когда это возможно.",
    reserveYourConcierge: "Забронировать Вашего консьержа",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "Современный способ познакомиться с Москвой",
    heroDescription: "Мы экономим ваше время на поиск и планирование.",
    heroDescription2: "Доступны 24 часа в сутки, 7 дней в неделю.",
    discoverMore: "Узнать больше",

    // In the RU section, add the missing translations for WhyUs page
    whyChooseReluxi: "Почему",
    whyChooseReluxiDesc:
      "Reluxi — это больше, чем консьерж. Это ваше надёжное присутствие в чужом городе. С большим количеством вариантов, недостатком времени и отсутствием помощи в фильтрации информации, мы здесь, чтобы направлять, упрощать и поддерживать. Наша миссия — устранить стресс и трение в незнакомых местах, чтобы каждый момент ощущался целенаправленным, заботливым и полностью вашим.",
    ourServicePhilosophy: "Наш сервис",
    philosophy: "Философия",
    alwaysOnSupport: "Постоянная поддержка",
    alwaysOnSupportDesc:
      "Мы управляем вашими планами с быстротой, заботой и спокойной последовательностью — 24/7. Большинство наших клиентов больше никогда не путешествуют без нас.",
    effortlessCommunication: "Легкое общение",
    effortlessCommunicationDesc:
      "Большинство клиентов отправляют одно сообщение — мы берем всё на себя. Никаких приложений, звонков, никаких постоянных согласований. Только плавная, мгновенная поддержка, когда она вам нужна.",
    tailoredAccess: "Индивидуальный доступ",
    tailoredAccessDesc:
      "Мы не просто бронируем то, что доступно. Мы организуем то, что воплощает в жизнь поездку, о которой вы мечтали — осмысленно и точно.",
    trustedByThoseWhoDeserveMore: "Доверие тех, кто заслуживает большего",
    trustedByDesc1:
      "От международных путешественников и публичных личностей до предпринимателей, дипломатов и творческих людей — Reluxi является тихой константой за их время в Москве.",
    trustedByDesc2:
      "Они приходят ради репутации, остаются ради душевного спокойствия и возвращаются, потому что никто не понимает их так, как мы.",
    trustedByDesc3:
      "Это не просто сервис, который вы пробуете — это тот, на который вы полагаетесь.",
    serve: "обслуживаем",
    you: "вас",
    howWeServeYou: "Как мы вас обслуживаем",
    howWe: "Как мы",
    freedom: "Свобода, доведенная до совершенства",
    planDescription:
      "Reluxi предлагает три способа получения безупречной, персональной поддержки — независимо от того, останавливаетесь ли вы в Москве на несколько дней, нуждаетесь в помощи на один особенный день или хотите постоянного доступа к человеку, который вас понимает. Все варианты включают круглосуточную доступность, человеческое общение и продуманную координацию каждого момента.",
    oneDayExperience: "Однодневный опыт",
    oneDayPrice: "4,850₽ (~$59)",
    designedFor: "Разработано для",
    oneDayDesignedFor:
      "Особые случаи, деловые потребности или качественное время с семьей — когда один день заслуживает идеальной организации.",
    whatYouGet: "Что вы получаете",
    oneDayWhatYouGet:
      "Индивидуальный однодневный опыт, адаптированный под ваши цели — личные или профессиональные. Мы занимаемся бронированием, распределением времени и организацией, чтобы ваш день был беззаботным.",
    examplesInclude: "Примеры включают",
    oneDayExample1:
      "Романтический вечер с частным транспортом, бронированием ужина и цветочным сюрпризом",
    oneDayExample2:
      "Семейный день с тщательно спланированными мероприятиями, культурными визитами и дружественным для группы питанием — все организовано, чтобы день проходил легко",
    oneDayExample3:
      "Деловой день с бронированием помещений для встреч, организацией ресторанов и транспортировкой между локациями",
    oneDayExampleFooter:
      "Расскажите нам, какой день вам нужен — и мы сделаем его безупречным.",
    oneDayPlan: "Однодневный план",
    requestOneDayPlan: "Запросить однодневный план",
    mostPopular: "Самый популярный",
    threeDayPlan: "3-дневный план консьержа",
    threeDayPrice: "11,500₽ (~$139)",
    threeDayDesignedFor:
      "Короткие поездки, городские перерывы или посетители, которые хотят полную поддержку без долгосрочных обязательств.",
    threeDayWhatYouGet:
      "Три полных дня неограниченной, персонализированной помощи консьержа — доступной в любое время. Идеально для тех, кто хочет испытать лучшее из Москвы без стресса или планирования.",
    includes: "Включает",
    threeDayInclude1:
      "Круглосуточный доступ к консьержу через предпочтительное приложение для сообщений",
    threeDayInclude2:
      "Бронирование и координация по всем направлениям: питание, транспорт, оздоровление, мероприятия и многое другое",
    threeDayInclude3:
      "Возможность добавить дополнительные дни за $39/день — та же услуга, та же простота",
    threeDayIncludeFooter:
      "Начните свое путешествие с Reluxi — и почувствуйте, насколько легким может быть путешествие.",
    multiDayPlan: "Многодневный план",
    startThreeDayPlan: "Начать 3-дневный план",
    monthlyMembership: "Ежемесячное членство",
    monthlyPrice: "33,000₽ (~$399)/месяц",
    monthlyDesignedFor:
      "Частые путешественники, занятые профессионалы и жители города, которые хотят постоянного доступа к полной поддержке Reluxi.",
    monthlyWhatYouGet:
      "Неограниченный ежемесячный доступ к консьержу с выделенным контактным лицом, которое изучает ваши предпочтения и адаптируется к вашему ритму.",
    monthlyInclude1: "Круглосуточная доступность без ограничений",
    monthlyInclude2:
      "Персонализированное планирование по всем аспектам повседневной жизни, путешествий, питания и многое другое",
    monthlyInclude3:
      "Последовательный уход и обслуживание во время нескольких поездок или постоянных нужд",
    monthlyIncludeFooter:
      "Наслаждайтесь постоянной, повышенной поддержкой — независимо от того, как часто вы нуждаетесь в нас.",
    membership: "Членство",
    becomeAMember: "Стать членом",
    quickRequests: "Быстрые запросы",
    oneTaskHandledFast: "Одна задача, быстрое решение",
    quickRequestsDescription:
      "Text us your request — we'll confirm it for a (~$6.99) commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — execution only, no planning or customization",
    commissionFee: "Комиссионный сбор",
    quickRequestsFee: "570₽ (~$6,99) за каждый выполненный запрос",
    idealFor: "Идеально для",
    quickRequestsIdealFor:
      "Straightforward, one-off bookings (e.g., restaurant reservation, transportation, event tickets, courier)",
    deliveryTime: "Время доставки",
    quickRequestsDeliveryTime:
      "Handled within minutes — fast, smooth, and confirmed in real time",
    requestABooking: "Запросить бронирование",
    readyToEnjoyTrip:
      "Готовы действительно насладиться поездкой — без траты времени и энергии?",
    reluxiSavesYouHours:
      "Reluxi экономит вам часы поиска и планирования. Вы сосредотачиваетесь на впечатлениях — мы позаботимся обо всем остальном.",
    personalTravelAssistant: "Современный способ познакомиться с Москвой",
    footerTagline: '"Всегда с вами. Даже когда мир не с вами."',
    footerNavigation: "Навигация",
    footerLegal: "Юридическая информация",
    footerPrivacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия обслуживания",
    faq: "Часто задаваемые вопросы",
    footerContact: "Контакты",
    phoneNumber: "+7 (916) 066-5133",
    emailAddress: "my@reluxi.com",
    copyright: " 2025 Reluxi Консьерж. Все права защищены.",
    footerPoweredBy:
      "На основе конфиденциальности, построен на доверии, вдохновлён превосходством.",
  },
};

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  t: () => "",
});

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("EN");

  // Get translation function
  const t = (key: string, vars?: Record<string, string>): string => {
    // Get language specific translation or default to English
    const translation =
      translations[language]?.[key] || translations["EN"]?.[key] || key;

    // If no variables, return translation
    if (!vars) {
      return translation;
    }

    // Replace variables in translation
    let result = translation;
    Object.entries(vars).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    });

    return result;
  };

  // Detect language preference
  useEffect(() => {
    // Check if we have a saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["EN", "AR", "CN", "RU"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      return;
    }

    // If not, try to detect from browser
    const browserLang = navigator.language.split("-")[0].toUpperCase();
    if (browserLang === "AR") setLanguage("AR");
    else if (browserLang === "ZH") setLanguage("CN");
    else if (browserLang === "RU") setLanguage("RU");
    else setLanguage("EN"); // Default to English
  }, []);

  // Save language preference when changed
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Don't set document direction to RTL as it affects the footer
    // document.documentElement.dir = language === "AR" ? "rtl" : "ltr";

    // Set language attribute
    if (language === "CN") {
      document.documentElement.lang = "zh";
    } else if (language === "EN") {
      document.documentElement.lang = "en";
    } else if (language === "AR") {
      document.documentElement.lang = "ar";
    } else if (language === "RU") {
      document.documentElement.lang = "ru";
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
