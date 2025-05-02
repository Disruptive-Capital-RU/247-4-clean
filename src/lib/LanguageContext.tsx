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
      "Reluxi is your personal assistant in Moscow. No more wasted time, wrong places, or last-minute planning. With our 24/7 support and expert coordination, every moment is exactly what you want it to be.",
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
    alwaysWithYou: "Moscows Leading Concierge Service",
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
    idealFor: "Ideal for",
    oneDayDesignedFor: "A Special Day — Personal or Professional.",
    whatIncluded: "What's included",
    oneDayWhatYouGet:
      "•⁠  ⁠Concierge support for one full day, available 24/7\n•⁠  ⁠Booking and planning for dining, transport, activities, and more",
    frequentRequests: "Frequent Requests",
    oneDayExample1: "Romantic evening with a private driver and dinner",
    oneDayExample2: "Family outing with cultural stops and meals",
    oneDayExample3: "Business day with meetings, transport, and meals",
    oneDayPlan: "One-Day Plan",
    requestOneDayPlan: "Request One-Day Plan",

    mostPopular: "Most Popular",
    threeDayPlan: "3-Day Concierge Plan",
    threeDayPrice: "10,550₽ (~$129)",
    threeDayDesignedFor: "Visits To Moscow",
    threeDayWhatYouGet:
      "•⁠  ⁠Concierge support for three full days, available 24/7\n•⁠  ⁠Booking and planning across dining, wellness, events, and transport\n•⁠  ⁠Add extra days for 3,200₽ (~$39/day)",
    yourValue: "Your Value",
    threeDayInclude1: "Explore Moscow with everything arranged",
    threeDayInclude2: "Curated experiences with no planning stress",
    threeDayInclude3: "Visitors who want easy access to the city's best",
    multiDayPlan: "Multi-Day Plan",
    startThreeDayPlan: "Start 3-Day Plan",

    monthlyMembership: "Monthly Membership",
    monthlyPrice: "33,000₽ (~$399/month)",
    monthlyDesignedFor: "Moscow Residents & Frequent Travelers",
    monthlyWhatYouGet:
      "•⁠  ⁠Concierge support for an entire month, available 24/7\n•⁠  ⁠A dedicated assistant familiar with your preferences\n•⁠  ⁠Personalized arrangements for dining, transport, and activities",
    commonUses: "Common Uses",
    monthlyInclude1: "Residents looking for a personal assistant",
    monthlyInclude2:
      "Ideal for those who value their time and want everything handled",
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
      "ريلوكسي هو مساعدك الشخصي في موسكو. لا مزيد من إضاعة الوقت أو الأماكن الخاطئة أو التخطيط في اللحظة الأخيرة. مع دعمنا على مدار الساعة وتنسيقنا الخبير، كل لحظة تكون بالضبط كما تريدها أن تكون.",
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
    idealFor: "مثالية لـ",
    oneDayDesignedFor: "يوم خاص — شخصي أو مهني.",
    whatIncluded: "ما هو مشمول",
    oneDayWhatYouGet:
      "•⁠ ⁠دعم الكونسيرج ليوم كامل، متاح على مدار الساعة\n•⁠ ⁠الحجز والتخطيط للطعام، والنقل، والأنشطة، والمزيد",
    frequentRequests: "الطلبات المتكررة",
    oneDayExample1: "أمسية رومانسية مع سائق خاص وعشاء",
    oneDayExample2: "نزهة عائلية مع توقفات ثقافية ووجبات",
    oneDayExample3: "يوم عمل مع اجتماعات ونقل ووجبات",
    oneDayPlan: "خطة ليوم واحد",
    requestOneDayPlan: "طلب خطة يوم واحد",

    mostPopular: "الأكثر شعبية",
    threeDayPlan: "خطة كونسيرج لمدة 3 أيام",
    threeDayPrice: "10,550₽ (~$129)",
    threeDayDesignedFor: "زيارات إلى موسكو",
    threeDayWhatYouGet:
      "•⁠ ⁠دعم الكونسيرج لثلاثة أيام كاملة، متاح على مدار الساعة\n•⁠ ⁠الحجز والتخطيط عبر الطعام والعافية والفعاليات والنقل\n•⁠ ⁠إضافة أيام إضافية مقابل 3,200₽ (~$39/يوم)",
    yourValue: "قيمتك",
    threeDayInclude1: "استكشف موسكو مع كل شيء مرتب",
    threeDayInclude2: "تجارب مختارة بدون إجهاد التخطيط",
    threeDayInclude3: "الزوار الذين يريدون وصولاً سهلاً إلى أفضل ما في المدينة",
    multiDayPlan: "خطة متعددة الأيام",
    startThreeDayPlan: "ابدأ خطة 3 أيام",

    monthlyMembership: "العضوية الشهرية",
    monthlyPrice: "33,000₽ (~$399/شهر)",
    monthlyDesignedFor: "سكان موسكو والمسافرين المتكررين",
    monthlyWhatYouGet:
      "•⁠ ⁠دعم الكونسيرج لشهر كامل، متاح على مدار الساعة\n•⁠ ⁠مساعد مخصص على دراية بتفضيلاتك\n•⁠ ⁠ترتيبات مخصصة للطعام والنقل والأنشطة",
    commonUses: "الاستخدامات الشائعة",
    monthlyInclude1: "المقيمون الباحثون عن مساعد شخصي",
    monthlyInclude2:
      "مثالي لأولئك الذين يقدرون وقتهم ويريدون التعامل مع كل شيء",
    membership: "العضوية",
    becomeAMember: "كن عضواً",

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
      "عادة ما نستجيب للرسائل في غضون دقائق، على مدار الساعة طوال أيام الأسبوع.",
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

  RU: {
    // Navigation
    home: "Главная",
    pricing: "Цены",
    services: "Услуги",
    whyUs: "Почему мы",
    login: "Вход",
    bookNow: "Забронировать",
    welcomeBack: "С возвращением",
    accessSuite: "Доступ к панели",
    dashboard: "Панель управления",
    logout: "Выход",
    offer: "Предложение",

    // Services page
    howWeServeYou: "Как мы вас обслуживаем",
    howWe: "Как мы",
    serve: "обслуживаем",
    you: "вас",
    freedom: "Свобода, доведенная до совершенства",
    planDescription:
      "Reluxi — ваш личный помощник в Москве. Больше никакой потери времени, неправильных мест или планирования в последнюю минуту. С нашей поддержкой 24/7 и экспертной координацией каждый момент будет именно таким, каким вы хотите его видеть.",

    oneDayExperience: "Однодневный опыт",
    oneDayPrice: "4,850₽ (~$59)",
    idealFor: "Идеально для",
    oneDayDesignedFor: "Особого дня — личного или профессионального.",
    whatIncluded: "Что включено",
    oneDayWhatYouGet:
      "•⁠ ⁠Консьерж-поддержка на полный день, доступна 24/7\n•⁠ ⁠Бронирование и планирование питания, транспорта, мероприятий и многое другое",
    frequentRequests: "Частые запросы",
    oneDayExample1: "Романтический вечер с личным водителем и ужином",
    oneDayExample2: "Семейная прогулка с культурными остановками и питанием",
    oneDayExample3: "Деловой день с встречами, транспортом и питанием",
    oneDayPlan: "Однодневный план",
    requestOneDayPlan: "Запросить однодневный план",

    mostPopular: "Самый популярный",
    threeDayPlan: "3-дневный план консьержа",
    threeDayPrice: "10,550₽ (~$129)",
    threeDayDesignedFor: "Визиты в Москву",
    threeDayWhatYouGet:
      "•⁠ ⁠Консьерж-поддержка на три полных дня, доступна 24/7\n•⁠ ⁠Бронирование и планирование питания, оздоровления, мероприятий и транспорта\n•⁠ ⁠Добавление дополнительных дней за 3,200₽ (~$39/день)",
    yourValue: "Ваша выгода",
    threeDayInclude1: "Исследуйте Москву с организацией всего",
    threeDayInclude2: "Подобранные впечатления без стресса планирования",
    threeDayInclude3:
      "Для посетителей, которые хотят легкий доступ к лучшему в городе",
    multiDayPlan: "Многодневный план",
    startThreeDayPlan: "Начать 3-дневный план",

    monthlyMembership: "Ежемесячное членство",
    monthlyPrice: "33,000₽ (~$399/месяц)",
    monthlyDesignedFor: "Жителей Москвы и частых путешественников",
    monthlyWhatYouGet:
      "•⁠ ⁠Консьерж-поддержка на целый месяц, доступна 24/7\n•⁠ ⁠Выделенный помощник, знакомый с вашими предпочтениями\n•⁠ ⁠Персонализированные договоренности для питания, транспорта и мероприятий",
    commonUses: "Типичное использование",
    monthlyInclude1: "Для жителей, ищущих личного помощника",
    monthlyInclude2:
      "Идеально для тех, кто ценит свое время и хочет, чтобы все было организовано",
    membership: "Членство",
    becomeAMember: "Стать участником",

    // Additional translations would go here
    // ...

    // Footer
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

  CN: {
    // Navigation
    home: "首页",
    pricing: "价格",
    services: "服务",
    whyUs: "为什么选择我们",
    login: "登录",
    bookNow: "立即预订",
    welcomeBack: "欢迎回来",
    accessSuite: "访问套件",
    dashboard: "控制面板",
    logout: "登出",
    offer: "优惠",

    // Services page
    howWeServeYou: "我们如何为您服务",
    howWe: "我们如何",
    serve: "为您",
    you: "服务",
    freedom: "完美自由",
    planDescription:
      "Reluxi是您在莫斯科的私人助理。不再浪费时间，不再去错地方，不再临时规划。有了我们全天候的支持和专业协调，每一刻都将完全符合您的期望。",

    oneDayExperience: "一日体验",
    oneDayPrice: "4,850₽ (~$59)",
    idealFor: "适合",
    oneDayDesignedFor: "特别的一天 — 个人或专业。",
    whatIncluded: "包含内容",
    oneDayWhatYouGet:
      "•⁠ ⁠全天候管家服务，全天24小时可用\n•⁠ ⁠餐饮、交通、活动等的预订和规划",
    frequentRequests: "常见请求",
    oneDayExample1: "带有私人司机和晚餐的浪漫之夜",
    oneDayExample2: "带有文化景点和用餐的家庭出游",
    oneDayExample3: "带有会议、交通和用餐的商务日",
    oneDayPlan: "一日计划",
    requestOneDayPlan: "申请一日计划",

    mostPopular: "最受欢迎",
    threeDayPlan: "3天管家计划",
    threeDayPrice: "10,550₽ (~$129)",
    threeDayDesignedFor: "莫斯科访问",
    threeDayWhatYouGet:
      "•⁠ ⁠三天全天候管家服务，全天24小时可用\n•⁠ ⁠跨餐饮、健康、活动和交通的预订和规划\n•⁠ ⁠额外天数每天加收3,200₽ (~$39/天)",
    yourValue: "您的价值",
    threeDayInclude1: "探索莫斯科，一切都已安排",
    threeDayInclude2: "精心策划的体验，无需规划压力",
    threeDayInclude3: "希望轻松访问城市最佳体验的游客",
    multiDayPlan: "多日计划",
    startThreeDayPlan: "开始3天计划",

    monthlyMembership: "月度会员",
    monthlyPrice: "33,000₽ (~$399/月)",
    monthlyDesignedFor: "莫斯科居民和经常旅行者",
    monthlyWhatYouGet:
      "•⁠ ⁠全月管家服务，全天24小时可用\n•⁠ ⁠熟悉您偏好的专属助理\n•⁠ ⁠餐饮、交通和活动的个性化安排",
    commonUses: "常见用途",
    monthlyInclude1: "寻找私人助理的居民",
    monthlyInclude2: "非常适合珍视时间并希望一切都得到处理的人",
    membership: "会员资格",
    becomeAMember: "成为会员",

    // Additional translations would go here
    // ...
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
