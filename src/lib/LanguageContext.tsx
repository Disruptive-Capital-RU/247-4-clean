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
    oneDayPrice: "6 500₽ ($75)",
    designedFor: "Designed For",
    oneDayDesignedFor:
      "Special occasions, business needs, or quality time with family — when one day deserves to be perfectly handled.",
    whatYouGet: "What You Get",
    oneDayWhatYouGet:
      "A curated one-day experience tailored around your goals — personal or professional. We handle the bookings, timing, and flow so your day feels effortless.",
    examplesInclude: "Examples Include",
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
    threeDayPrice: "11 500₽ ($139)",
    threeDayDesignedFor:
      "Short getaways, city breaks, or visitors who want complete support without long-term commitment.",
    threeDayWhatYouGet:
      "Three full days of unlimited, personalized concierge assistance — available at any hour. Ideal for those who want to experience the best of Moscow without stress or planning.",
    includes: "Includes",
    threeDayInclude1: "24/7 concierge access via your preferred messaging app",
    threeDayInclude2:
      "Booking & coordination across dining, transport, wellness, events, and more",
    threeDayInclude3:
      "Option to add additional days for $39/day — same service, same ease",
    threeDayIncludeFooter:
      "Start your journey with Reluxi — and experience how effortless travel can feel.",
    multiDayPlan: "Multi-Day Plan",
    startThreeDayPlan: "Start 3-Day Plan",

    monthlyMembership: "Monthly Membership",
    monthlyPrice: "28 500₽ ($339)/month",
    monthlyDesignedFor:
      "Frequent travelers, busy professionals, and city residents who want continuous access to Reluxi's full support.",
    monthlyWhatYouGet:
      "Unlimited monthly concierge access with a dedicated point of contact who learns your preferences and adapts to your rhythm.",
    monthlyInclude1: "24/7 availability with no limitations",
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
      "Text us your request — we'll confirm it for a flat $5 commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "How It Works",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — no plan required",
    commissionFee: "Commission Fee",
    quickRequestsFee: "500₽ ($5) per fulfilled request",
    idealFor: "Ideal For",
    quickRequestsIdealFor:
      "One-off bookings (e.g., restaurant, transportation, event tickets, courier)",
    deliveryTime: "Delivery Time",
    quickRequestsDeliveryTime:
      "Everything arranged within minutes — smooth, fast, and confirmed in real time",
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
    feeCoverQuestion: "What does the $100 fee cover?",
    feeCoverAnswer:
      "The $100 fee covers your personal concierge service for 5 days. This includes 24/7 availability, personalized planning, and on-the-ground assistance. Additional services like restaurant bills, shopping, tickets, etc. are billed separately.",
    extendServiceQuestion: "Can I extend my concierge service beyond 5 days?",
    extendServiceAnswer:
      "Yes, you can extend your service at a rate of $20 per additional day. This can be arranged during your stay through your personal concierge.",
    arabicSpeakersQuestion: "Are all your concierges Arabic speakers?",
    arabicSpeakersAnswer:
      "Yes, all our concierges are fluent in Arabic, English, and Russian, ensuring seamless communication throughout your stay.",
    cancellationPolicyQuestion: "What is your cancellation policy?",
    cancellationPolicyAnswer:
      "Cancellations made 72 hours or more before your scheduled arrival receive a full refund. Cancellations within 72 hours are subject to a 50% fee.",
    discretionQuestion: "How discreet is your service?",
    discretionAnswer:
      "Absolute discretion is our priority. Your privacy is sacred, and we maintain complete confidentiality about your activities, preferences, and personal information.",

    // Booking form
    yourTimeIs: "Your Time Is",
    precious: "Precious",
    startNow: "Start Now.",
    bookingFormDesc:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    fullName: "Full Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "Your email",
    emailLoginInfo:
      "You'll use this email to log into your concierge dashboard",
    password: "Password",
    enterPassword: "Enter your password",
    phone: "Phone",
    phoneExample: "+971 55 123 4567",
    preferredCommunication: "Preferred Communication Method",
    selectCommunicationMethod: "Select communication method",
    languagePreference: "Language Preference",
    selectLanguage: "Select language",
    english: "English",
    russian: "Russian",
    arabic: "Arabic",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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
    accessSuite: "الوصول إلى المجموعة",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",

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
    oneDayPrice: "6 500₽ ($75)",
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
    threeDayPrice: "11 500₽ ($139)",
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
    monthlyPrice: "28 500₽ ($339)/شهر",
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
      "أرسل لنا طلبك عبر الرسائل النصية — سنؤكده مقابل عمولة ثابتة قدرها 5 دولارات. مثالي للاحتياجات العفوية أو المستخدمين لأول مرة الذين يرغبون في تجربة ريلوكسي — رسالة واحدة في كل مرة.",
    howItWorks: "كيف يعمل",
    quickRequestsHowItWorks:
      "خدمة كونسيرج بنظام الدفع لكل طلب — لا تحتاج إلى خطة",
    commissionFee: "رسوم العمولة",
    quickRequestsFee: "500₽ ($5) لكل طلب منفذ",
    idealFor: "مثالي لـ",
    quickRequestsIdealFor:
      "حجوزات فردية (مثل المطعم والنقل وتذاكر الفعاليات والبريد السريع)",
    deliveryTime: "وقت التسليم",
    quickRequestsDeliveryTime:
      "كل شيء يتم تنظيمه في غضون دقائق — سلس وسريع ومؤكد في الوقت الفعلي",
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
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
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
    oneDayPrice: "6 500₽ ($75)",
    designedFor: "Designed For",
    oneDayDesignedFor:
      "Special occasions, business needs, or quality time with family — when one day deserves to be perfectly handled.",
    whatYouGet: "What You Get",
    oneDayWhatYouGet:
      "A curated one-day experience tailored around your goals — personal or professional. We handle the bookings, timing, and flow so your day feels effortless.",
    examplesInclude: "Examples Include",
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
    threeDayPrice: "11 500₽ ($139)",
    threeDayDesignedFor:
      "Short getaways, city breaks, or visitors who want complete support without long-term commitment.",
    threeDayWhatYouGet:
      "Three full days of unlimited, personalized concierge assistance — available at any hour. Ideal for those who want to experience the best of Moscow without stress or planning.",
    includes: "Includes",
    threeDayInclude1: "24/7 concierge access via your preferred messaging app",
    threeDayInclude2:
      "Booking & coordination across dining, transport, wellness, events, and more",
    threeDayInclude3:
      "Option to add additional days for $39/day — same service, same ease",
    threeDayIncludeFooter:
      "Start your journey with Reluxi — and experience how effortless travel can feel.",
    multiDayPlan: "Multi-Day Plan",
    startThreeDayPlan: "Start 3-Day Plan",

    monthlyMembership: "Monthly Membership",
    monthlyPrice: "28 500₽ ($339)/month",
    monthlyDesignedFor:
      "Frequent travelers, busy professionals, and city residents who want continuous access to Reluxi's full support.",
    monthlyWhatYouGet:
      "Unlimited monthly concierge access with a dedicated point of contact who learns your preferences and adapts to your rhythm.",
    monthlyInclude1: "24/7 availability with no limitations",
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
      "Text us your request — we'll confirm it for a flat $5 commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "How It Works",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — no plan required",
    commissionFee: "Commission Fee",
    quickRequestsFee: "500₽ ($5) per fulfilled request",
    idealFor: "Ideal For",
    quickRequestsIdealFor:
      "One-off bookings (e.g., restaurant, transportation, event tickets, courier)",
    deliveryTime: "Delivery Time",
    quickRequestsDeliveryTime:
      "Everything arranged within minutes — smooth, fast, and confirmed in real time",
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
    feeCoverQuestion: "What does the $100 fee cover?",
    feeCoverAnswer:
      "The $100 fee covers your personal concierge service for 5 days. This includes 24/7 availability, personalized planning, and on-the-ground assistance. Additional services like restaurant bills, shopping, tickets, etc. are billed separately.",
    extendServiceQuestion: "Can I extend my concierge service beyond 5 days?",
    extendServiceAnswer:
      "Yes, you can extend your service at a rate of $20 per additional day. This can be arranged during your stay through your personal concierge.",
    arabicSpeakersQuestion: "Are all your concierges Arabic speakers?",
    arabicSpeakersAnswer:
      "Yes, all our concierges are fluent in Arabic, English, and Russian, ensuring seamless communication throughout your stay.",
    cancellationPolicyQuestion: "What is your cancellation policy?",
    cancellationPolicyAnswer:
      "Cancellations made 72 hours or more before your scheduled arrival receive a full refund. Cancellations within 72 hours are subject to a 50% fee.",
    discretionQuestion: "How discreet is your service?",
    discretionAnswer:
      "Absolute discretion is our priority. Your privacy is sacred, and we maintain complete confidentiality about your activities, preferences, and personal information.",

    // Booking form
    yourTimeIs: "Your Time Is",
    precious: "Precious",
    startNow: "Start Now.",
    bookingFormDesc:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    fullName: "Full Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "Your email",
    emailLoginInfo:
      "You'll use this email to log into your concierge dashboard",
    password: "Password",
    enterPassword: "Enter your password",
    phone: "Phone",
    phoneExample: "+971 55 123 4567",
    preferredCommunication: "Preferred Communication Method",
    selectCommunicationMethod: "Select communication method",
    languagePreference: "Language Preference",
    selectLanguage: "Select language",
    english: "English",
    russian: "Russian",
    arabic: "Arabic",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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
    accessSuite: "الوصول إلى المجموعة",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",

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
    oneDayPrice: "6 500₽ ($75)",
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
    threeDayPrice: "11 500₽ ($139)",
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
    monthlyPrice: "28 500₽ ($339)/شهر",
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
      "أرسل لنا طلبك عبر الرسائل النصية — سنؤكده مقابل عمولة ثابتة قدرها 5 دولارات. مثالي للاحتياجات العفوية أو المستخدمين لأول مرة الذين يرغبون في تجربة ريلوكسي — رسالة واحدة في كل مرة.",
    howItWorks: "كيف يعمل",
    quickRequestsHowItWorks:
      "خدمة كونسيرج بنظام الدفع لكل طلب — لا تحتاج إلى خطة",
    commissionFee: "رسوم العمولة",
    quickRequestsFee: "500₽ ($5) لكل طلب منفذ",
    idealFor: "مثالي لـ",
    quickRequestsIdealFor:
      "حجوزات فردية (مثل المطعم والنقل وتذاكر الفعاليات والبريد السريع)",
    deliveryTime: "وقت التسليم",
    quickRequestsDeliveryTime:
      "كل شيء يتم تنظيمه في غضون دقائق — سلس وسريع ومؤكد في الوقت الفعلي",
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
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc:
      "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    emailHint: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم الكونسيرج الخاصة بك",
    phoneWhatsapp: "الهاتف / واتساب *",
    languagePreference: "تفضيلات اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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

    // Booking form
    bookingHeader: "وقتك ثمين. ابدأ الآن.",
    bookingDesc: "احجز الكونسيرج الشخصي الخاص بك لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتصل بك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
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
    oneDayPrice: "6 500₽ ($75)",
    designedFor: "Designed For",
    oneDayDesignedFor:
      "Special occasions, business needs, or quality time with family — when one day deserves to be perfectly handled.",
    whatYouGet: "What You Get",
    oneDayWhatYouGet:
      "A curated one-day experience tailored around your goals — personal or professional. We handle the bookings, timing, and flow so your day feels effortless.",
    examplesInclude: "Examples Include",
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
    threeDayPrice: "11 500₽ ($139)",
    threeDayDesignedFor:
      "Short getaways, city breaks, or visitors who want complete support without long-term commitment.",
    threeDayWhatYouGet:
      "Three full days of unlimited, personalized concierge assistance — available at any hour. Ideal for those who want to experience the best of Moscow without stress or planning.",
    includes: "Includes",
    threeDayInclude1: "24/7 concierge access via your preferred messaging app",
    threeDayInclude2:
      "Booking & coordination across dining, transport, wellness, events, and more",
    threeDayInclude3:
      "Option to add additional days for $39/day — same service, same ease",
    threeDayIncludeFooter:
      "Start your journey with Reluxi — and experience how effortless travel can feel.",
    multiDayPlan: "Multi-Day Plan",
    startThreeDayPlan: "Start 3-Day Plan",

    monthlyMembership: "Monthly Membership",
    monthlyPrice: "28 500₽ ($339)/month",
    monthlyDesignedFor:
      "Frequent travelers, busy professionals, and city residents who want continuous access to Reluxi's full support.",
    monthlyWhatYouGet:
      "Unlimited monthly concierge access with a dedicated point of contact who learns your preferences and adapts to your rhythm.",
    monthlyInclude1: "24/7 availability with no limitations",
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
      "Text us your request — we'll confirm it for a flat $5 commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.",
    howItWorks: "How It Works",
    quickRequestsHowItWorks:
      "Pay-per-request concierge service — no plan required",
    commissionFee: "Commission Fee",
    quickRequestsFee: "500₽ ($5) per fulfilled request",
    idealFor: "Ideal For",
    quickRequestsIdealFor:
      "One-off bookings (e.g., restaurant, transportation, event tickets, courier)",
    deliveryTime: "Delivery Time",
    quickRequestsDeliveryTime:
      "Everything arranged within minutes — smooth, fast, and confirmed in real time",
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
    feeCoverQuestion: "What does the $100 fee cover?",
    feeCoverAnswer:
      "The $100 fee covers your personal concierge service for 5 days. This includes 24/7 availability, personalized planning, and on-the-ground assistance. Additional services like restaurant bills, shopping, tickets, etc. are billed separately.",
    extendServiceQuestion: "Can I extend my concierge service beyond 5 days?",
    extendServiceAnswer:
      "Yes, you can extend your service at a rate of $20 per additional day. This can be arranged during your stay through your personal concierge.",
    arabicSpeakersQuestion: "Are all your concierges Arabic speakers?",
    arabicSpeakersAnswer:
      "Yes, all our concierges are fluent in Arabic, English, and Russian, ensuring seamless communication throughout your stay.",
    cancellationPolicyQuestion: "What is your cancellation policy?",
    cancellationPolicyAnswer:
      "Cancellations made 72 hours or more before your scheduled arrival receive a full refund. Cancellations within 72 hours are subject to a 50% fee.",
    discretionQuestion: "How discreet is your service?",
    discretionAnswer:
      "Absolute discretion is our priority. Your privacy is sacred, and we maintain complete confidentiality about your activities, preferences, and personal information.",

    // Booking form
    yourTimeIs: "Your Time Is",
    precious: "Precious",
    startNow: "Start Now.",
    bookingFormDesc:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    fullName: "Full Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "Your email",
    emailLoginInfo:
      "You'll use this email to log into your concierge dashboard",
    password: "Password",
    enterPassword: "Enter your password",
    phone: "Phone",
    phoneExample: "+971 55 123 4567",
    preferredCommunication: "Preferred Communication Method",
    selectCommunicationMethod: "Select communication method",
    languagePreference: "Language Preference",
    selectLanguage: "Select language",
    english: "English",
    russian: "Russian",
    arabic: "Arabic",
    chinese: "Chinese",
    iAcceptThe: "I accept the",
    termsAndConditions: "terms and conditions",
    and: "and",
    privacyPolicy: "privacy policy",
    completeCaptcha: "Please complete the captcha verification",
    captchaRequired: "Captcha verification is required before submitting",
    validEmailRequired: "Please enter a valid email address",
    passwordMinLength: "Password must be at least 6 characters",
    acceptTermsRequired: "You must accept the terms and conditions to continue",
    processing: "Processing...",
    emailVerificationRequired: "Email Verification Required",
    reserveMyConcierge: "Reserve My Concierge",
    iHaveReadAgree: "I have read and agree to the terms of the",

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt:
      "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading:
      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage:
      "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox:
      "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification:
      "After verifying your email, return to this page to complete your booking process.",

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
    accessSuite: "الوصول إلى المجموعة",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",

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
    oneDayPrice: "6 500₽ ($75)",
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
    threeDayPrice: "11 500₽ ($139)",
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
    monthlyPrice: "28 500₽ ($339)/شهر",
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
      "أرسل لنا طلبك عبر الرسائل النصية — سنؤكده مقابل عمولة ثابتة قدرها 5 دولارات. مثالي للاحتياجات العفوية أو المستخدمين لأول مرة الذين يرغبون في تجربة ريلوكسي — رسالة واحدة في كل مرة.",
    howItWorks: "كيف يعمل",
    quickRequestsHowItWorks:
      "خدمة كونسيرج بنظام الدفع لكل طلب — لا تحتاج إلى خطة",
    commissionFee: "رسوم العمولة",
    quickRequestsFee: "500₽ ($5) لكل طلب منفذ",
    idealFor: "مثالي لـ",
    quickRequestsIdealFor:
      "حجوزات فردية (مثل المطعم والنقل وتذاكر الفعاليات والبريد السريع)",
    deliveryTime: "وقت التسليم",
    quickRequestsDeliveryTime:
      "كل شيء يتم تنظيمه في غضون دقائق — سلس وسريع ومؤكد في الوقت الفعلي",
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
    arabic: "العربية",
    english: "الإنجليزية",
    russian: "الروسية",
    arrivalDate: "تاريخ الوصول *",
    departureDate: "تاريخ المغادرة *",
    interests: "الاهتمامات",
    shopping: "التسوق",
    diningCulinary: "تناول الطعام والطهي",
    protection: "الحماية",
    medical: "الطبية",
    culture: "الثقافة",
    events: "الفعاليات",
    specialInstructions: "تعليمات خاصة",
    reserveButton: "احجز الكونسيرج الخاص بي",
    reserveDisclaimer:
      "هذا حجز مسبق فقط. سيتم الاتصال بك خلال 12 ساعة لتأكيد التوفر والتفضيلات. لا يتم تحصيل أي مدفوعات على الموقع.",

    // Footer
    footerTagline: '"دائماً معك. حتى عندما لا يكون العالم كذلك."',
    footerNavigation: "التنقل",
    footerLegal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    faq: "الأسئلة الشائعة",
    footerContact: "اتصل بنا",
    phoneNumber: "+7 (XXX) XXX-XXXX",
    emailAddress: "service@reluxi.com",
    copyright: " 2025 ريلوكسي كونسيرج. جميع الحقوق محفوظة.",
    personalTravelAssistant: "مساعدك الشخصي للسفر",
    footerPoweredBy: "مدعوم بالسرية، مبني على الثقة، مستوحى من التميز.",

    reserve: "احجز",
    your: "الخاص بك",
    concierge: "الكونسيرج",
    signUp: "التسجيل",

    // Installation steps
    iosInstallationSteps: "خطوات التثبيت على iOS",
    openInSafari: "افتح هذه الصفحة في متصفح Safari",
    tapShareIcon: "انقر على أيقونة المشاركة في أسفل الشاشة",
    scrollAddHomeScreen: 'مرر لأسفل وانقر على "إضافة إلى الشاشة الرئيسية"',
    tapAdd: 'انقر على "إضافة" في الزاوية العلوية اليمنى',
    androidInstallationSteps: "خطوات التثبيت على Android",
    openInChrome: "افتح هذه الصفحة في متصفح Chrome",
    tapThreeDots: "انقر على قائمة النقاط الثلاث في الزاوية العلوية اليمنى",
    tapAddHomeScreen: 'انقر على "إضافة إلى الشاشة الرئيسية"',
    confirmAdd: 'قم بالتأكيد بالنقر على "إضافة"',

    // Dashboard page
    moscowWeather: "طقس موسكو",
    manageProfile: "إدارة الملف الشخصي",
    yourPreviousRequests: "طلباتك السابقة",
    serviceLabel: "الخدمة",
    categoryLabel: "الفئة",
    quantityLabel: "الكمية",
    statusLabel: "الحالة",
    dateLabel: "التاريخ",
    searchServices: "البحث عن الخدمات...",
    dearClient: "عزيزي",
    trustedConcierge:
      "الكونسيرج الموثوق به الخاص بك، على بعد نقرة واحدة - جاهز في أي وقت.",
    yourConciergeList: "قائمة الكونسيرج الخاصة بك فارغة",
    browseServices: "تصفح الخدمات",
    myConciergeRequests: "طلبات الكونسيرج الخاصة بي",
    requestWillBeSent:
      "سيتم إرسال طلبك إلى فريق الكونسيرج لدينا، الذين سيتواصلون معك لتأكيد التوقيت والتفضيلات.",
    sendToConciergeTeam: "إرسال إلى فريق الكونسيرج",
    requestSubmitted: "تم تقديم الطلب!",
    addedToList: "تمت إضافة {{service}} إلى قائمة الكونسيرج الخاصة بك",
    loginRequired: "يجب تسجيل الدخول لتقديم الطلبات",
    requestSubmitSuccess: "تم تقديم طلب الكونسيرج الخاص بك!",
    requestSubmitFailed: "فشل في تقديم طلبك. يرجى المحاولة مرة أخرى.",
    failedLoadRequests: "فشل في تحميل طلباتك السابقة",
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    completed: "مكتمل",
    cancelled: "ملغى",

    // Weather conditions
    sunny: "مشمس",
    clear: "صافي",
    cloudy: "غائم",
    overcast: "ملبد بالغيوم",
    rain: "مطر",
    drizzle: "رذاذ",
    shower: "زخات مطر",
    snow: "ثلج",
    blizzard: "عاصفة ثلجية",
    ice: "جليد",
    thunder: "رعد",
    lightning: "برق",
    fog: "ضباب",
    mist: "ضباب خفيف",
    wind: "رياح",

    // Service cards
    addToConciergeList: "أضف إلى قائمة الكونسيرج الخاصة بي",
    noServicesFound:
      'لم يتم العثور على خدمات تطابق "{query}". جرب مصطلح بحث مختلف.',
    loadingServices: "جاري تحميل الخدمات...",

    // Service titles
    premiumFlowerService: "خدمة الزهور الفاخرة",
    flowerServiceDesc: "ترتيبات زهور راقية لأي مناسبة.",
    privateChaufferService: "خدمة السائق الخاص",
    chaufferServiceDesc: "الوصول إلى أي مكان بأناقة وأمان وخصوصية.",
    personalShoppingExperience: "تجربة التسوق الشخصية",
    shoppingExperienceDesc: "مستشار تسوق خبير يرشدك خلال أماكن التسوق الحصرية.",
    restaurantReservations: "حجوزات المطاعم والبارات",
    restaurantReservationsDesc:
      "أماكن محجوزة في أرقى المطاعم مع إطلالات بانورامية.",
    architecturalIcons: "الرموز المعمارية الخالدة",
    architecturalIconsDesc:
      "وصول حصري إلى المعالم الدينية والثقافية مع مرشدين خبراء.",
    medicalServices: "خدمات المساعدة الطبية",
    medicalServicesDesc: "خدمات صحية شاملة مع أفضل المهنيين الطبيين.",
    securityServices: "خدمات الأمن",
    securityServicesDesc: "أفراد أمن محترفون لسلامتك وراحة بالك.",
    taxiBooking: "حجز سيارات الأجرة",
    taxiBookingDesc: "خدمات سيارات أجرة موثوقة ومريحة في متناول يدك.",
    wellnessBookings: "حجوزات السبا والعافية",
    wellnessBookingsDesc: "علاجات سبا منعشة وتجارب عافية للاسترخاء التام.",
    eventPlanning: "تخطيط الفعاليات",
    eventPlanningDesc: "خدمات شاملة لتخطيط الفعاليات للمناسبات التي لا تُنسى.",
    romanticEvening: "تخطيط أمسية رومانسية",
    romanticEveningDesc:
      "أنشئ تجارب رومانسية مثالية مع خدمة التخطيط المتخصصة لدينا.",
    hotelSelection: "اختيار الفنادق",
    hotelSelectionDesc: "خدمات اختيار وحجز الفنادق الفاخرة لإقامة لا تُنسى.",

    // Service Category Headings
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

    // Categories for service cards
    coreCategory: "الخدمات الأساسية",
    shoppingCategory2: "التسوق",
    cultureCategory: "الثقافة",
    medicalCategory: "الطب",
    transportCategory2: "النقل",
    businessSecurityCategory: "الأعمال والأمن",
    lifestyleRomanticCategory: "نمط الحياة والرومانسية",
    familyCulturalCategory: "العائلة والثقافة",

    // Message concierge
    messageConcierge: "تواصل مع المساعد",
    contactYourExecutiveAssistant: "تواصل مع مساعدك التنفيذي",
    selectPreferredMethod:
      "اختر طريقتك المفضلة للوصول إلى مساعدك التنفيذي الشخصي",

    // Profile management page
    profileManagement: "إدارة الملف الشخصي",
    updatePersonalInfo: "تحديث معلوماتك الشخصية",
    backToDashboard: "العودة إلى لوحة التحكم",
    emailCannotBeChanged: "لا يمكن تغيير البريد الإلكتروني",
    updateProfile: "تحديث الملف الشخصي",
    updating: "جارِ التحديث...",
    cancel: "إلغاء",
    profileUpdateSuccess: "تم تحديث الملف الشخصي بنجاح",
    profileUpdateFailed: "فشل تحديث الملف الشخصي",
    unknownError: "خطأ غير معروف",
    redirectingToLogin: "جارِ إعادة التوجيه إلى صفحة تسجيل الدخول...",

    // Communication methods and apps
    whatsapp: "واتساب",
    telegram: "تليجرام",
    botim: "بوتيم",
    wechat: "وي شات",
    email: "البريد الإلكتروني",
  },

  CN: {
    // Navigation
    home: "首页",
    pricing: "价格",
    services: "服务",
    offer: "优惠",
    whyUs: "为什么选择我们",
    login: "登录",
    bookNow: "立即预订",
    welcomeBack: "欢迎回来",
    accessSuite: "访问套件",
    dashboard: "仪表板",
    logout: "登出",

    // Pricing page
    freedom: "完美的自由",
    pricingDescription: "探索我们根据您的需求和偏好量身定制的高级礼宾服务。",
    whatYouReceive: "每个计划中您将获得的内容：",
    planDescription:
      "从您旅程开始的那一刻起，我们接管每一个细节 — 以精确、优雅和坚定的谨慎态度。每个计划都能解锁一套完整的高级服务，旨在解放您的时间，让您能够完全专注于重要的事情：充分生活。",
    planOverview: "计划概览",
    readyToExperience: "准备体验真正的奢华？",
    bookYourPersonal: "立即预订您的个人礼宾，将您的莫斯科体验转变为非凡之旅。",
    bookYourConcierge: "预订您的礼宾服务",
    selectPlan: "选择方案",
    contactUs: "联系我们",
    oneDayPremiumPlans: "一日尊享方案",
    everyDetailMasterfully: "每一个细节，精心编排",

    // Services page
    ourEliteServices: "我们的精英服务",
    luxuryServicesForElite: "为精英提供的豪华礼宾服务",
    howWeServeYou: "我们如何为您服务",
    howWe: "我们如何",
    serve: "服务",
    you: "您",
    oneDayExperience: "一日体验",
    oneDayPrice: "6 500₽ ($75)",
    designedFor: "专为以下人士设计",
    oneDayDesignedFor:
      "特殊场合、商务需求或与家人共度美好时光 — 当一天值得完美安排时。",
    whatYouGet: "您将获得",
    oneDayWhatYouGet:
      "围绕您的目标定制的一日体验 — 个人或专业。我们处理预订、时间安排和流程，让您的一天感觉轻松自如。",
    examplesInclude: "示例包括",
    oneDayExample1: "浪漫之夜，包括私人交通、晚餐预订和花卉惊喜",
    oneDayExample2:
      "家庭日，精心规划的活动、文化访问和适合团体的用餐 — 一切都安排得当，让您的一天流畅无阻",
    oneDayExample3: "商务日，会议场所预订、餐厅协调和地点之间的交通",
    oneDayExampleFooter: "告诉我们您需要什么样的一天 — 我们将让它无缝衔接。",
    oneDayPlan: "一日计划",
    requestOneDayPlan: "申请一日计划",

    mostPopular: "最受欢迎",
    threeDayPlan: "3日礼宾计划",
    threeDayPrice: "11 500₽ ($139)",
    threeDayDesignedFor:
      "短期旅行、城市休闲或希望获得全面支持而无需长期承诺的游客。",
    threeDayWhatYouGet:
      "三天全方位、个性化的礼宾服务 — 随时可用。适合那些想要体验莫斯科最好的一面而不需要承受压力或规划的人。",
    includes: "包括",
    threeDayInclude1: "通过您首选的消息应用程序全天候使用礼宾服务",
    threeDayInclude2: "在餐饮、交通、健康、活动等方面的预订和协调",
    threeDayInclude3:
      "可选择以每天$39的价格添加额外天数 — 相同的服务，相同的便捷",
    threeDayIncludeFooter: "与Reluxi开始您的旅程 — 体验旅行可以多么轻松。",
    multiDayPlan: "多日计划",
    startThreeDayPlan: "开始3日计划",

    monthlyMembership: "月度会员",
    monthlyPrice: "28 500₽ ($339)/月",
    monthlyDesignedFor:
      "经常旅行的人、忙碌的专业人士和希望持续获得Reluxi全面支持的城市居民。",
    monthlyWhatYouGet:
      "无限制的月度礼宾服务，专属联系人了解您的偏好并适应您的节奏。",
    monthlyInclude1: "全天候可用，无限制",
    monthlyInclude2: "跨日常生活、旅行、餐饮等的个性化规划",
    monthlyInclude3: "多次旅行或持续需求的一致关怀和服务",
    monthlyIncludeFooter: "享受持续、高品质的支持 — 无论您需要我们多少次。",
    membership: "会员",
    becomeAMember: "成为会员",

    quickRequests: "快速请求",
    oneTaskHandledFast: "一项任务，快速处理",
    quickRequestsDescription:
      "给我们发送您的请求 — 我们将以5美元的固定佣金确认。非常适合自发需求或想要尝试Reluxi的首次用户 — 一次一条消息。",
    howItWorks: "如何运作",
    quickRequestsHowItWorks: "按请求付费的礼宾服务 — 无需计划",
    commissionFee: "佣金费用",
    quickRequestsFee: "每项完成的请求500₽($5)",
    idealFor: "适合",
    quickRequestsIdealFor: "一次性预订（如餐厅、交通、活动门票、快递）",
    deliveryTime: "交付时间",
    quickRequestsDeliveryTime: "一切在几分钟内安排 — 顺畅、快速，并实时确认",
    requestABooking: "申请预订",

    readyToEnjoyTrip: "准备好真正享受您的旅行 — 不浪费时间或精力？",
    reluxiSavesYouHours:
      "Reluxi为您节省搜索和规划的时间。您专注于体验 — 我们将处理其他一切。",

    // Dashboard page
    welcomeBack: "欢迎回来",
    valuedClient: "尊贵的客户",
    personalConciergeService: "您的专属礼宾随时为您服务。",
    youHave: "您还有",
    days: "天",
    remainingConciergeBooking: "的礼宾预订时间。",
    moscowWeather: "莫斯科天气",
    manageProfile: "管理个人资料",
    yourPreviousRequests: "您的历史请求",
    serviceLabel: "服务",
    categoryLabel: "类别",
    quantityLabel: "数量",
    statusLabel: "状态",
    dateLabel: "日期",
    browseAndBookServices: "浏览和预订服务",
    searchServices: "搜索服务...",
    myConciergeRequests: "我的礼宾请求",
    emptyConciergeList: "您的礼宾列表是空的",
    browseServices: "浏览服务",
    requestConfirmation:
      "您的请求将发送给我们的礼宾团队，他们将与您联系以确认时间和偏好。",
    requestSubmitted: "请求已提交！",
    sendToConciergeTeam: "发送给礼宾团队",
    allServices: "所有服务",
    shoppingCategory: "购物",
    diningCulinaryCategory: "餐饮与美食",
    cultureHistoryCategory: "文化与历史",
    transportCategory: "交通",
    medicalWellnessCategory: "医疗与健康",
    nightlifeEventsCategory: "夜生活与活动",
    travelSupportCategory: "旅行支持",
    allCategories: "全部",
    coreServices: "核心服务",
    lifestyleRomantic: "生活方式与浪漫",
    familyCultural: "家庭与文化",
    businessSecurity: "商务与安全",
    quantity: "数量:",

    // Golden button section
    goldLogo: "Reluxi标志",
    goldenButton: "您的金色按钮",
    goldenButtonDesc:
      "这不仅仅是一个按钮 — 它是您直通奢华、谨慎和城市最精致服务的直接线路。一触即可连接到您的私人礼宾，全天候可用。",
    goldenButtonInstructions: "按住添加到您的主屏幕。",
    chooseDevice: "选择您的设备继续：",
    iphone: "iPhone",
    android: "安卓",

    // Dashboard access
    accessDashboard: "访问您的个人礼宾仪表板",
    dashboardDesc: "管理服务、探索体验并直接与您的礼宾联系",
    dashboardButton: "仪表板",

    // Booking form
    bookingHeader: "您的时间宝贵。立即开始。",
    bookingDesc:
      "预订您私人管家五天仅需100美元。预订后，我们将直接与您联系，确认您的到达详情、偏好和优先事项。",
    fullName: "全名",
    yourName: "您的名字",
    email: "电子邮件",
    yourEmail: "您的电子邮件",
    emailLoginInfo: "您将使用此电子邮件登录您的管家控制面板",
    password: "密码",
    enterPassword: "输入密码",
    phone: "电话",
    phoneExample: "+86 138 1234 5678",
    preferredCommunication: "首选联系方式",
    selectCommunicationMethod: "选择通信方式",
    languagePreference: "语言偏好",
    selectLanguage: "选择语言",
    english: "英语",
    russian: "俄语",
    arabic: "阿拉伯语",
    chinese: "中文",
    iAcceptThe: "我接受",
    termsAndConditions: "条款和条件",
    and: "和",
    privacyPolicy: "隐私政策",
    completeCaptcha: "请完成人机验证",
    captchaRequired: "提交前需要进行人机验证",
    validEmailRequired: "请输入有效的电子邮件地址",
    passwordMinLength: "密码必须至少6个字符",
    acceptTermsRequired: "您必须接受条款和条件才能继续",
    processing: "处理中...",
    emailVerificationRequired: "需要验证电子邮件",
    reserveMyConcierge: "预订我的管家",
    iHaveReadAgree: "我已阅读并同意",

    checkEmailVerification: "请检查您的电子邮件以验证您的账户",
    verifyEmailPrompt:
      "请在继续之前验证您的电子邮件地址。检查您的收件箱以获取确认链接，并在确认后返回此页面。",
    loadingState1: "为您匹配私人管家",
    loadingState2: "检查高端体验的可用性",
    loadingState3: "确保您的独家访问权",
    loadingState4: "确认豪华合作伙伴服务",
    loadingState5: "完成您的预订",
    loadingState6: "欢迎加入内部圈子",
    successTitle: "预订成功提交",
    successMessage:
      "您的预订已收到。我们的管家团队将在12小时内与您联系，以确认详细信息并为您的到来做好准备。",
    redirectMessage: "您将很快被重定向到您的仪表板",
    bookingHeadline: "您的时间很宝贵。立即开始。",
    bookingSubheading:
      "仅需100美元即可预订您的私人礼宾服务5天。预订后，我们将直接与您联系，确认您的到达详情、偏好和优先事项。",
    verificationEmailSent: "验证邮件已发送",
    checkInbox: "请检查您的收件箱并点击验证链接",
    afterVerification: "验证后，您将被重定向到您的仪表板",

    // Golden button section
    goldLogo: "Reluxi标志",
    goldenButton: "将Reluxi添加到您的主屏幕",
    goldenButtonDesc:
      "这不仅仅是一个按钮 — 它是您直通奢华、谨慎和城市最精致服务的直接线路。一触即可连接到您的私人礼宾，全天候可用。",
    yourGoldenButton: "您的金色按钮",
    goldenButtonInstructions: "按住添加到您的主屏幕。",
    chooseDevice: "选择您的设备继续：",
    iphone: "iPhone",
    android: "安卓",

    // Dashboard access
    accessDashboard: "访问您的个人礼宾仪表板",
    dashboardDesc: "管理服务、探索体验并直接与您的礼宾联系",
    dashboardButton: "仪表板",

    // Booking form
    bookingHeader: "您的时间宝贵。立即开始。",
    bookingDesc:
      "预订您私人管家五天仅需100美元。预订后，我们将直接与您联系，确认您的到达详情、偏好和优先事项。",
    fullName: "全名 *",
    email: "电子邮件 *",
    emailHint: "您将使用此电子邮件登录您的礼宾仪表板",
    phoneWhatsapp: "电话/WhatsApp *",
    languagePreference: "语言偏好",
    arabic: "阿拉伯语",
    english: "英语",
    russian: "俄语",
    arrivalDate: "到达日期 *",
    departureDate: "离开日期 *",
    interests: "兴趣",
    shopping: "购物",
    diningCulinary: "餐饮与美食",
    protection: "保护",
    medical: "医疗",
    culture: "文化",
    events: "活动",
    specialInstructions: "特殊说明",
    reserveButton: "预订我的礼宾",
    reserveDisclaimer:
      "这仅是预订。我们将在12小时内联系您确认可用性和偏好。网站上不收取任何费用。",

    // Footer
    footerTagline: '"始终与您同在。即使世界不在。"',
    footerNavigation: "导航",
    footerLegal: "法律",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    faq: "常见问题",
    footerContact: "联系",
    phoneNumber: "+7 (XXX) XXX-XXXX",
    emailAddress: "service@reluxi.com",
    copyright: " 2025 Reluxi礼宾服务。保留所有权利。",
    personalTravelAssistant: "您的个人旅行助理",
    footerPoweredBy: "以保密为动力，以信任为基础，以卓越为灵感。",

    // Main service intro
    serviceSubtitle: "一项预订、规划和提升的服务",
    serviceIntro:
      "从晚餐计划到临时司机，Reluxi处理各种细节，让您能像当地人一样享受莫斯科 — 没有任何压力。",

    // Service offerings
    privateTransport: "私人交通",
    privateTransportDesc:
      "从豪华轿车到可信赖的出租车，我们安排符合您节奏、舒适度和谨慎需求的交通工具 — 无论白天还是黑夜。",
    diningArrangements: "餐饮安排",
    diningArrangementsDesc:
      "从最佳餐厅的预订到送餐到您的酒店 — 一切都按照您的口味和时间安排。",
    dayPlanning: "日程规划与个人安排",
    dayPlanningDesc:
      "您的一天，经过周到安排 — 从第一步到最终计划，用心让这座城市感觉像是您自己的。",
    healthWellness: "健康与养生",
    healthWellnessDesc:
      "我们为您连接顶级水疗中心、诊所和专家 — 根据您的舒适度、隐私需求和日程安排访问。",
    vipShopping: "VIP购物",
    vipShoppingDesc:
      "专为您筛选莫斯科顶级精品店的专享通道 — 提供个人造型、私密和无缝购物体验。",
    culturalExperiences: "文化体验",
    culturalExperiencesDesc:
      "莫斯科地标和隐藏瑰宝的私人导览 — 由会说您语言的内部人士引导。",
    eveningAccess: "夜生活通道与活动",
    eveningAccessDesc:
      "从独家休息室到精致的社交聚会，这些都是您在网上找不到的。",
    security: "安保服务",
    securityDesc: "在需要时安排个人保护 — 为那些隐私和安心至关重要的时刻。",
    gifting: "礼品与关怀",
    giftingDesc: "鲜花、小礼品或有意义的贴心细节 — 完美送达。",

    reserve: "预订",
    your: "您的",
    concierge: "礼宾服务",
    signUp: "注册",

    // Installation steps
    iosInstallationSteps: "iOS 安装步骤",
    openInSafari: "在 Safari 中打开此页面",
    tapShareIcon: "点击屏幕底部的分享图标",
    scrollAddHomeScreen: '向下滚动并点击"添加到主屏幕"',
    tapAdd: '点击右上角的"添加"',
    androidInstallationSteps: "Android 安装步骤",
    openInChrome: "在 Chrome 中打开此页面",
    tapThreeDots: "点击右上角的三点菜单",
    tapAddHomeScreen: '点击"添加到主屏幕"',
    confirmAdd: '通过点击"添加"确认',

    // Dashboard page
    moscowWeather: "莫斯科天气",
    manageProfile: "管理个人资料",
    yourPreviousRequests: "您的以往请求",
    serviceLabel: "服务",
    categoryLabel: "类别",
    quantityLabel: "数量",
    statusLabel: "状态",
    dateLabel: "日期",
    searchServices: "搜索服务...",
    dearClient: "尊敬的",
    trustedConcierge: "您值得信赖的礼宾服务，一键即可获取 — 随时准备为您服务。",
    yourConciergeList: "您的礼宾服务列表为空",
    browseServices: "浏览服务",
    myConciergeRequests: "我的礼宾服务请求",
    requestWillBeSent:
      "您的请求将发送给我们的礼宾团队，他们将与您联系以确认时间和偏好。",
    sendToConciergeTeam: "发送至礼宾团队",
    requestSubmitted: "请求已提交！",
    addedToList: "已将 {{service}} 添加到您的礼宾服务列表",
    loginRequired: "您必须登录才能提交请求",
    requestSubmitSuccess: "您的礼宾请求已提交！",
    requestSubmitFailed: "提交请求失败。请重试。",
    failedLoadRequests: "加载您的以往请求失败",
    pending: "待处理",
    confirmed: "已确认",
    completed: "已完成",
    cancelled: "已取消",

    // Weather conditions
    sunny: "晴朗",
    clear: "晴天",
    cloudy: "多云",
    overcast: "阴天",
    rain: "雨",
    drizzle: "毛毛雨",
    shower: "阵雨",
    snow: "雪",
    blizzard: "暴风雪",
    ice: "冰",
    thunder: "雷",
    lightning: "闪电",
    fog: "雾",
    mist: "薄雾",
    wind: "风",

    // Service cards
    addToConciergeList: "添加到我的礼宾清单",
    noServicesFound: '未找到与"{query}"匹配的服务。请尝试不同的搜索词。',
    loadingServices: "正在加载服务...",

    // Service titles
    premiumFlowerService: "高级鲜花服务",
    flowerServiceDesc: "为任何场合提供精美的花卉安排。",
    privateChaufferService: "私人司机服务",
    chaufferServiceDesc: "以时尚、安全和谨慎的方式抵达任何地方。",
    personalShoppingExperience: "个人购物体验",
    shoppingExperienceDesc: "专业个人购物顾问带您游览独家购物场所。",
    restaurantReservations: "餐厅和酒吧预订",
    restaurantReservationsDesc: "在最负盛名的餐厅预留座位，享受全景视野。",
    architecturalIcons: "永恒的建筑图标",
    architecturalIconsDesc: "在专业向导的带领下，独家参观宗教和文化地标。",
    medicalServices: "医疗协助服务",
    medicalServicesDesc: "顶级医疗专业人士提供的综合健康服务。",
    securityServices: "安保服务",
    securityServicesDesc: "专业安保人员确保您的安全和安心。",
    taxiBooking: "出租车预订",
    taxiBookingDesc: "便捷可靠的出租车服务触手可及。",
    wellnessBookings: "健康与水疗预订",
    wellnessBookingsDesc: "焕然一新的水疗护理和健康体验，带来极致放松。",
    eventPlanning: "活动策划",
    eventPlanningDesc: "为难忘场合提供全面的活动策划服务。",
    romanticEvening: "浪漫晚宴策划",
    romanticEveningDesc: "通过我们专业的策划服务，创造完美的浪漫体验。",
    hotelSelection: "酒店选择",
    hotelSelectionDesc: "高级酒店选择和预订服务，带来难忘的住宿体验。",

    whyUsQuoteSource: "灵感来自阿姆尔·迪亚布的'Tamly Ma'ak'",
    whyChooseReluxi: "为什么选择",
    whyChooseReluxiDesc:
      "Reluxi不仅仅是一个礼宾服务——它是您在陌生城市中值得信赖的存在。面对太多选择、时间不足且没有人为您过滤噪音时，我们在这里指导、简化并支持您。我们的使命是消除陌生环境中的压力和摩擦，使每一刻都感到有意义、被关怀并完全属于您自己。",
    ourServicePhilosophy: "我们的服务",
    philosophy: "理念",

    // Why Us advantages
    alwaysOnSupport: "全天候支持",
    alwaysOnSupportDesc:
      "我们以速度、关怀和安静的一致性处理您的计划——全天候服务。我们的大多数客户再也不会在没有我们的情况下旅行。",
    effortlessCommunication: "轻松沟通",
    effortlessCommunicationDesc:
      "大多数客户只需发送一条消息——我们就会从那里接手。没有应用程序，没有电话，没有来回沟通。只有在您需要时提供的顺畅、即时的支持。",
    tailoredAccess: "定制访问",
    tailoredAccessDesc:
      "我们不只是预订可用的服务。我们安排的是能让您一直期待的旅行变为现实的体验——经过深思熟虑且精确无误。",
    trustedByThoseWhoDeserveMore: "受到值得更多的人们信赖",
    trustedByDesc1:
      "从国际旅行者和公众人物到企业家、外交官和创意人士——Reluxi是他们在莫斯科时光背后安静的常量。",
    trustedByDesc2:
      "他们因声誉而来，因心灵的平静而留下，并因为没有人像我们一样了解他们而返回。",
    trustedByDesc3: "这不仅仅是您尝试的服务——而是您可以依赖的服务。",

    // Hero section
    // ... existing code ...

    // Service Category Headings
    shoppingCategory: "购物",
    diningCulinaryCategory: "餐饮与美食",
    cultureHistoryCategory: "文化与历史",
    transportCategory: "交通",
    medicalWellnessCategory: "医疗与健康",
    nightlifeEventsCategory: "夜生活与活动",
    travelSupportCategory: "旅行支持",
    allCategories: "全部",
    coreServices: "核心服务",
    lifestyleRomantic: "生活方式与浪漫",
    familyCultural: "家庭与文化",
    businessSecurity: "商务与安全",

    // Categories for service cards
    coreCategory: "核心服务",
    shoppingCategory2: "购物",
    cultureCategory: "文化",
    medicalCategory: "医疗",
    transportCategory2: "交通",
    businessSecurityCategory: "商务与安全",
    lifestyleRomanticCategory: "生活方式与浪漫",
    familyCulturalCategory: "家庭与文化",

    // Message concierge
    messageConcierge: "联系礼宾",
    contactYourExecutiveAssistant: "联系您的行政助理",
    selectPreferredMethod: "选择您联系个人行政助理的首选方式",

    // Profile management page
    profileManagement: "个人资料管理",
    updatePersonalInfo: "更新您的个人信息",
    backToDashboard: "返回仪表板",
    emailCannotBeChanged: "电子邮件无法更改",
    updateProfile: "更新个人资料",
    updating: "更新中...",
    cancel: "取消",
    profileUpdateSuccess: "个人资料更新成功",
    profileUpdateFailed: "个人资料更新失败",
    unknownError: "未知错误",
    redirectingToLogin: "正在重定向到登录页面...",

    // Communication methods and apps
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    botim: "Botim",
    wechat: "微信",
  },

  RU: {
    // Navigation
    home: "Главная",
    pricing: "Цены",
    services: "Услуги",
    offer: "Оферта",
    whyUs: "Почему мы",
    login: "Войти",
    bookNow: "Забронировать",
    welcomeBack: "С возвращением",
    accessSuite: "Доступ к услугам",
    dashboard: "Личный кабинет",
    logout: "Выйти",

    // Why Us page
    whyUsTitle1: "Мы не просто предоставляем услуги.",
    whyUsTitle2: "Мы предоставляем",
    certainty: "Уверенность",
    whyUsDescription:
      "Вам не нужен график. Вам нужен ориентир. Ваш консьерж — больше, чем гид, он ваше доверенное присутствие в чужой стране.",
    whyUsQuote: "Даже когда ты далеко, ты близок к моему сердцу.",
    whyUsQuoteSource: "Вдохновлено песней Амра Диаба 'Tamly Ma'ak'",
    whyChooseReluxi: "Почему стоит выбрать",
    whyChooseReluxiDesc:
      "Reluxi — это больше, чем консьерж-сервис — это ваше доверенное присутствие в чужом городе. Когда слишком много вариантов, недостаточно времени и никто не фильтрует шум, мы здесь, чтобы направлять, упрощать и поддерживать. Наша миссия — устранить стресс и трение незнакомых мест, чтобы каждый момент ощущался целенаправленным, заботливым и полностью вашим.",
    ourServicePhilosophy: "Наш сервис",
    philosophy: "Философия",

    // Why Us advantages
    alwaysOnSupport: "Постоянная поддержка",
    alwaysOnSupportDesc:
      "Мы организуем ваши планы быстро, заботливо и с неизменной последовательностью — 24/7. Большинство наших клиентов больше никогда не путешествуют без нас.",
    effortlessCommunication: "Легкость общения",
    effortlessCommunicationDesc:
      "Большинство клиентов отправляют одно сообщение — и мы берем все на себя. Никаких приложений, звонков, постоянных согласований. Только плавная, немедленная поддержка, когда она вам нужна.",
    tailoredAccess: "Индивидуальный доступ",
    tailoredAccessDesc:
      "Мы не просто бронируем то, что доступно. Мы организуем то, что воплощает поездку, о которой вы мечтали — продуманно и точно.",
    trustedByThoseWhoDeserveMore: "Нам доверяют те, кто заслуживает большего",
    trustedByDesc1:
      "От международных путешественников и публичных персон до предпринимателей, дипломатов и творческих людей — Reluxi является тихой константой во время их пребывания в Москве.",
    trustedByDesc2:
      "Они приходят ради репутации, остаются ради душевного спокойствия и возвращаются, потому что никто не понимает их так, как мы.",
    trustedByDesc3:
      "Это не просто сервис, который вы пробуете — это сервис, на который вы полагаетесь.",

    // Pricing page
    freedom: "Свобода в совершенстве",
    pricingDescription:
      "Откройте для себя наш спектр премиальных услуг консьержа, подобранных под ваши потребности и предпочтения.",
    whatYouReceive: "Что вы получаете в каждом плане:",
    planDescription:
      "С момента начала вашего путешествия мы берем на себя все детали — с точностью, элегантностью и безупречной осмотрительностью. Каждый план открывает полный спектр премиальных услуг, разработанных для освобождения вашего времени, чтобы вы могли полностью сосредоточиться на том, что важно: жить полной жизнью.",
    planOverview: "Обзор планов",
    readyToExperience: "Готовы испытать настоящую роскошь?",
    bookYourPersonal:
      "Забронируйте своего личного консьержа прямо сейчас и превратите свой опыт в Москве в нечто необыкновенное.",
    bookingHeadline: "Ваше время драгоценно. Начните сейчас.",
    bookingSubheading:
      "Забронируйте вашего личного консьержа на 5 дней всего за $100. После бронирования мы свяжемся с вами напрямую для подтверждения деталей вашего прибытия, предпочтений и приоритетов.",
    bookYourConcierge: "Забронировать консьержа",
    selectPlan: "Выбрать план",
    contactUs: "Связаться с нами",
    oneDayPremiumPlans: "Премиальные планы на один день",
    everyDetailMasterfully: "Каждая деталь мастерски организована",

    // Services page
    ourEliteServices: "Наши элитные услуги",
    luxuryServicesForElite: "Роскошные консьерж-услуги для элиты",
    howWeServeYou: "Как мы служим Вам",
    howWe: "Как мы",
    serve: "Служим",
    you: "Вам",
    oneDayExperience: "Однодневный опыт",
    oneDayPrice: "6 500₽ ($75)",
    designedFor: "Создано для",
    oneDayDesignedFor:
      "Особые случаи, деловые потребности или качественное время с семьей — когда один день заслуживает идеального обращения.",
    whatYouGet: "Что вы получаете",
    oneDayWhatYouGet:
      "Индивидуальный однодневный опыт, созданный вокруг ваших целей — личных или профессиональных. Мы занимаемся бронированием, временем и потоком, чтобы ваш день ощущался легко.",
    examplesInclude: "Примеры включают",
    oneDayExample1:
      "Романтический вечер с частным транспортом, бронированием ужина и цветочным сюрпризом",
    oneDayExample2:
      "Семейный день с продуманными мероприятиями, культурными визитами и удобными для группы обедами — все организовано так, чтобы день проходил легко",
    oneDayExample3:
      "Деловой день с бронированием помещений для встреч, координацией ресторанов и транспортом между местами",
    oneDayExampleFooter:
      "Расскажите нам, какой день вам нужен — и мы сделаем его безупречным.",
    oneDayPlan: "Однодневный план",
    requestOneDayPlan: "Запросить однодневный план",

    mostPopular: "Самый популярный",
    threeDayPlan: "3-дневный план консьержа",
    threeDayPrice: "11 500₽ ($139)",
    threeDayDesignedFor:
      "Короткие отпуска, городские перерывы или посетители, которые хотят полной поддержки без долгосрочных обязательств.",
    threeDayWhatYouGet:
      "Три полных дня неограниченной, персонализированной помощи консьержа — доступно в любое время. Идеально для тех, кто хочет испытать лучшее из Москвы без стресса или планирования.",
    includes: "Включает",
    threeDayInclude1:
      "Круглосуточный доступ к консьержу через предпочитаемое вами приложение для обмена сообщениями",
    threeDayInclude2:
      "Бронирование и координация в области питания, транспорта, оздоровления, мероприятий и многого другого",
    threeDayInclude3:
      "Возможность добавить дополнительные дни за $39/день — такой же сервис, такая же легкость",
    threeDayIncludeFooter:
      "Начните ваше путешествие с Reluxi — и испытайте, насколько легким может быть путешествие.",
    multiDayPlan: "Многодневный план",
    startThreeDayPlan: "Начать 3-дневный план",

    monthlyMembership: "Ежемесячное членство",
    monthlyPrice: "28 500₽ ($339)/месяц",
    monthlyDesignedFor:
      "Частые путешественники, занятые профессионалы и жители города, которые хотят постоянного доступа к полной поддержке Reluxi.",
    monthlyWhatYouGet:
      "Неограниченный ежемесячный доступ к услугам консьержа с выделенным контактным лицом, которое изучает ваши предпочтения и адаптируется к вашему ритму.",
    monthlyInclude1: "Круглосуточная доступность без ограничений",
    monthlyInclude2:
      "Персонализированное планирование повседневной жизни, путешествий, питания и многого другого",
    monthlyInclude3:
      "Последовательная забота и обслуживание во время нескольких поездок или постоянных потребностей",
    monthlyIncludeFooter:
      "Наслаждайтесь непрерывной, высококлассной поддержкой — независимо от того, как часто вы нас нуждаетесь.",
    membership: "Членство",
    becomeAMember: "Стать участником",

    quickRequests: "Быстрые запросы",
    oneTaskHandledFast: "Одна задача, быстро выполненная",
    quickRequestsDescription:
      "Отправьте нам свой запрос — мы подтвердим его за фиксированную комиссию в размере $5. Идеально подходит для спонтанных потребностей или пользователей, впервые использующих Reluxi — одно сообщение за раз.",
    howItWorks: "Как это работает",
    quickRequestsHowItWorks:
      "Услуга консьержа с оплатой за запрос — план не требуется",
    commissionFee: "Комиссионный сбор",
    quickRequestsFee: "500₽ ($5) за каждый выполненный запрос",
    idealFor: "Идеально для",
    quickRequestsIdealFor:
      "Разовые бронирования (например, ресторан, транспорт, билеты на мероприятия, курьер)",
    deliveryTime: "Время доставки",
    quickRequestsDeliveryTime:
      "Все организовано в течение нескольких минут — гладко, быстро и подтверждено в режиме реального времени",
    requestABooking: "Запросить бронирование",

    readyToEnjoyTrip:
      "Готовы ли вы действительно наслаждаться поездкой — без потери времени или энергии?",
    reluxiSavesYouHours:
      "Reluxi экономит часы поиска и планирования. Вы сосредотачиваетесь на впечатлениях — мы позаботимся обо всем остальном.",

    // Dashboard page
    welcomeUser: "Добро пожаловать",
    valuedClient: "Уважаемый клиент",
    personalConciergeService: "Ваш персональный консьерж к вашим услугам.",
    youHave: "У вас осталось",
    days: "дней",
    remainingConciergeBooking: "вашего бронирования консьержа.",
    moscowWeather: "Погода в Москве",
    manageProfile: "Управление профилем",
    yourPreviousRequests: "Ваши предыдущие запросы",
    serviceLabel: "Услуга",
    categoryLabel: "Категория",
    quantityLabel: "Количество",
    statusLabel: "Статус",
    dateLabel: "Дата",
    browseAndBookServices: "Просмотр и бронирование услуг",
    searchServices: "Поиск услуг...",
    myConciergeRequests: "Мои запросы консьержа",
    emptyConciergeList: "Ваш список консьержа пуст",
    browseServices: "Просмотр услуг",
    verificationEmailSent: "Подтверждение по электронной почте отправлено",
    checkInbox:
      "Пожалуйста, проверьте вашу электронную почту и нажмите на ссылку для подтверждения",
    afterVerification:
      "После подтверждения вы будете перенаправлены в личный кабинет",
    requestConfirmation:
      "Ваш запрос будет отправлен нашей команде консьержей, которая свяжется с вами для подтверждения времени и предпочтений.",
    requestSubmitted: "Запрос отправлен!",
    sendToConciergeTeam: "Отправить команде консьержа",
    allServices: "Все услуги",
    shoppingCategory: "Шоппинг",
    diningCulinaryCategory: "Рестораны и кулинария",
    cultureHistoryCategory: "Культура и история",
    transportCategory: "Транспорт",
    medicalWellnessCategory: "Медицина и здоровье",
    nightlifeEventsCategory: "Ночная жизнь и мероприятия",
    travelSupportCategory: "Поддержка в путешествии",
    allCategories: "Все",
    coreServices: "Основные услуги",
    lifestyleRomantic: "Образ жизни и романтика",
    familyCultural: "Семья и культура",
    businessSecurity: "Бизнес и безопасность",
    quantity: "Кол-во:",

    // Golden button section
    goldLogo: "Reluxi Лого",
    goldenButton: "Ваша золотая кнопка",
    goldenButtonDesc:
      "Это больше, чем просто кнопка — это ваша прямая линия к роскоши, конфиденциальности и лучшему, что может предложить город. Одно касание соединяет вас с вашим личным консьержем, доступным днем и ночью.",
    goldenButtonInstructions:
      "Нажмите и удерживайте, чтобы добавить на домашний экран.",
    chooseDevice: "Выберите ваше устройство для продолжения:",
    iphone: "iPhone",
    android: "Android",

    // Booking page
    bookYour: "Забронировать",
    personalConcierge: "личного консьержа",
    bookingIntro:
      "Ваше время ценно. Начните сейчас. Забронируйте личного консьержа на 5 дней всего за 100$.",
    howIt: "Как это",
    works: "работает",
    bookNow: "Забронировать сейчас",
    bookNowDesc:
      "Заполните форму бронирования с вашей информацией, датами поездки и предпочтениями. Это только предварительное бронирование, на этом этапе оплата не взимается.",
    confirmation: "Подтверждение",
    confirmationDesc:
      "В течение 12 часов наша команда свяжется с вами непосредственно через предпочтительный вами способ связи, чтобы подтвердить вашу бронь, обсудить любые конкретные требования и ответить на любые вопросы.",
    payment: "Оплата",
    paymentDesc:
      "После подтверждения бронирования вы получите безопасную ссылку для оплаты. Мы принимаем все основные кредитные карты и международные способы оплаты.",
    preArrivalPlanning: "Планирование перед прибытием",
    preArrivalPlanningDesc:
      "Ваш личный консьерж свяжется с вами до вашего прибытия, чтобы разработать индивидуальный план вашего визита, обеспечивая всё необходимое для вашего опыта в Москве.",
    welcomeToMoscow: "Добро пожаловать в Москву",
    welcomeToMoscowDesc:
      "Ваш консьерж встретит вас по прибытии и будет доступен 24/7 в течение всего вашего пребывания, чтобы убедиться, что каждый аспект вашего опыта в Москве превосходит ожидания.",
    frequentlyAsked: "Часто задаваемые",
    questions: "вопросы",
    feeCoverQuestion: "Что включает в себя плата в размере 100$?",
    feeCoverAnswer:
      "Плата в размере 100$ покрывает услуги вашего личного консьержа на 5 дней. Это включает в себя доступность 24/7, персонализированное планирование и помощь на месте. Дополнительные услуги, такие как счета в ресторанах, покупки, билеты и т.д., оплачиваются отдельно.",
    extendServiceQuestion:
      "Могу ли я продлить услуги консьержа более чем на 5 дней?",
    extendServiceAnswer:
      "Да, вы можете продлить услугу по ставке 20$ за дополнительный день. Это можно организовать во время вашего пребывания через вашего личного консьержа.",
    arabicSpeakersQuestion: "Все ли ваши консьержи говорят на арабском?",
    arabicSpeakersAnswer:
      "Да, все наши консьержи свободно владеют арабским, английским и русским языками, обеспечивая беспрепятственное общение в течение всего вашего пребывания.",
    cancellationPolicyQuestion: "Какова ваша политика отмены?",
    cancellationPolicyAnswer:
      "Отмены, сделанные за 72 часа или более до запланированного прибытия, получают полный возврат. Отмены в течение 72 часов подлежат комиссии в размере 50%.",
    discretionQuestion: "Насколько конфиденциальны ваши услуги?",
    discretionAnswer:
      "Абсолютная конфиденциальность — наш приоритет. Ваша приватность священна, и мы сохраняем полную конфиденциальность относительно ваших действий, предпочтений и личной информации.",

    // Booking form
    yourTimeIs: "Ваше время",
    precious: "ценно",
    startNow: "Начните сейчас.",
    bookingFormDesc:
      "Забронируйте личного консьержа на 5 дней всего за 100$. После бронирования мы свяжемся с вами напрямую, чтобы подтвердить детали вашего прибытия, предпочтения и приоритеты.",
    fullName: "Полное имя",
    yourName: "Ваше имя",
    email: "Email",
    yourEmail: "Ваш email",
    emailLoginInfo:
      "Вы будете использовать этот email для входа в вашу панель управления консьержа",
    password: "Пароль",
    enterPassword: "Введите пароль",
    phone: "Телефон",
    phoneExample: "+7 903 123 4567",
    preferredCommunication: "Предпочтительный способ связи",
    selectCommunicationMethod: "Выберите способ связи",
    languagePreference: "Языковые предпочтения",
    selectLanguage: "Выберите язык",
    english: "Английский",
    russian: "Русский",
    arabic: "Арабский",
    chinese: "Китайский",
    iAcceptThe: "Я принимаю",
    termsAndConditions: "условия использования",
    and: "и",
    privacyPolicy: "политику конфиденциальности",
    completeCaptcha: "Пожалуйста, пройдите капчу",
    captchaRequired: "Проверка капчи обязательна перед отправкой",
    validEmailRequired: "Пожалуйста, введите действительный email-адрес",
    passwordMinLength: "Пароль должен содержать не менее 6 символов",
    acceptTermsRequired:
      "Вы должны принять условия использования, чтобы продолжить",
    processing: "Обработка...",
    emailVerificationRequired: "Требуется подтверждение email",
    reserveMyConcierge: "Зарезервировать моего консьержа",
    iHaveReadAgree: "Я прочитал и согласен с условиями",

    checkEmailVerification:
      "Пожалуйста, проверьте свою электронную почту для подтверждения аккаунта",
    verifyEmailPrompt:
      "Пожалуйста, подтвердите свой email-адрес, прежде чем продолжить. Проверьте входящие сообщения на наличие ссылки для подтверждения и вернитесь на эту страницу после подтверждения.",
    loadingState1: "Подбираем для вас личного консьержа",
    loadingState2: "Проверяем доступность премиальных услуг",
    loadingState3: "Обеспечиваем ваш эксклюзивный доступ",
    loadingState4: "Подтверждаем услуги премиальных партнёров",
    loadingState5: "Завершаем ваше бронирование",
    loadingState6: "Добро пожаловать во внутренний круг",
    successTitle: "Бронирование успешно отправлено",
    successMessage:
      "Ваше бронирование получено. Наша команда консьержей свяжется с вами в течение 12 часов для подтверждения деталей и подготовки к вашему прибытию.",
    redirectMessage:
      "Вы будете перенаправлены в свою панель управления в ближайшее время",
    verificationEmailSent: "Требуется подтверждение email",
    checkInbox:
      "Пожалуйста, проверьте свои входящие сообщения и нажмите на ссылку подтверждения, которую мы отправили на ваш email-адрес.",
    afterVerification:
      "После подтверждения вашего email вернитесь на эту страницу, чтобы завершить процесс бронирования.",

    // Dashboard access
    accessDashboard: "Доступ к личному кабинету консьержа",
    dashboardDesc:
      "Управляйте услугами, исследуйте опыт и напрямую общайтесь с консьержем",
    dashboardButton: "Личный кабинет",

    // Booking form
    bookingHeader: "Ваше время ценно. Начните сейчас.",
    bookingDesc:
      "Забронируйте личного консьержа на 5 дней всего за 100$. После бронирования мы свяжемся с вами напрямую, чтобы подтвердить детали вашего прибытия, предпочтения и приоритеты.",
    fullName: "Полное имя *",
    email: "Email *",
    emailHint: "Вы будете использовать этот email для входа в панель консьержа",
    phoneWhatsapp: "Телефон / WhatsApp *",
    languagePreference: "Предпочтительный язык",
    arabic: "Арабский",
    english: "Английский",
    russian: "Русский",
    arrivalDate: "Дата прибытия *",
    departureDate: "Дата отъезда *",
    interests: "Интересы",
    shopping: "Шоппинг",
    diningCulinary: "Рестораны и кулинария",
    protection: "Охрана",
    medical: "Медицина",
    culture: "Культура",
    events: "Мероприятия",
    specialInstructions: "Особые инструкции",
    reserveButton: "Забронировать моего консьержа",
    reserveDisclaimer:
      "Это только предварительное бронирование. С вами свяжутся в течение 12 часов для подтверждения доступности и предпочтений. Оплата на сайте не взимается.",

    // Footer
    footerTagline: '"Всегда с вами. Даже когда мир — нет."',
    footerNavigation: "Навигация",
    footerLegal: "Правовая информация",
    footerPrivacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    faq: "Часто задаваемые вопросы",
    footerContact: "Контакты",
    phoneNumber: "+7 (XXX) XXX-XXXX",
    emailAddress: "service@reluxi.com",
    copyright: " 2025 Reluxi Консьерж. Все права защищены.",
    personalTravelAssistant: "Ваш личный помощник в путешествии",
    footerPoweredBy:
      "Основано на конфиденциальности, построено на доверии, вдохновлено превосходством.",

    // Main service intro
    serviceSubtitle: "Сервис, который бронирует, планирует и улучшает",
    serviceIntro:
      "От планов на ужин до водителей в последнюю минуту, Reluxi берет на себя все детали, чтобы вы могли наслаждаться Москвой как местный житель — без стресса.",

    // Service offerings
    privateTransport: "Частный транспорт",
    privateTransportDesc:
      "От роскошных автомобилей до надежных такси, мы организуем транспорт, соответствующий вашему темпу, комфорту и конфиденциальности — днем или ночью.",
    diningArrangements: "Организация питания",
    diningArrangementsDesc:
      "От резервирования столиков в лучших ресторанах до доставки еды в ваш отель — все организовано в соответствии с вашим вкусом и расписанием.",
    dayPlanning: "Планирование дня и личное расписание",
    dayPlanningDesc:
      "Ваш день, тщательно спланированный — от первых шагов до финальных планов, с заботой, которая делает город по-настоящему вашим.",
    healthWellness: "Здоровье и велнес",
    healthWellnessDesc:
      "Мы связываем вас с ведущими спа-салонами, клиниками и специалистами — с доступом, организованным с учетом вашего комфорта, приватности и расписания.",
    vipShopping: "VIP-шоппинг",
    vipShoppingDesc:
      "Эксклюзивный доступ к лучшим бутикам Москвы — с персональной поддержкой для стиля, приватности и безупречного шоппинга.",
    culturalExperiences: "Культурные впечатления",
    culturalExperiencesDesc:
      "Частные туры по достопримечательностям Москвы и скрытым жемчужинам — с гидами-инсайдерами, говорящими на вашем языке.",
    eveningAccess: "Вечерний доступ и мероприятия",
    eveningAccessDesc:
      "От эксклюзивных лаунжей до изысканных светских мероприятий, которые вы не найдете онлайн.",
    security: "Безопасность",
    securityDesc:
      "Персональная защита, организованная при необходимости — для моментов, когда конфиденциальность и спокойствие имеют наибольшее значение.",
    gifting: "Подарки и жесты внимания",
    giftingDesc:
      "Цветы, небольшие подарки или значимые знаки внимания — доставленные идеально.",

    reserve: "Забронировать",
    your: "Ваш",
    concierge: "Консьерж",
    signUp: "Зарегистрироваться",

    // Installation steps
    iosInstallationSteps: "Шаги установки для iOS",
    openInSafari: "Откройте эту страницу в Safari",
    tapShareIcon: "Нажмите на значок «Поделиться» внизу экрана",
    scrollAddHomeScreen:
      "Прокрутите вниз и нажмите «Добавить на главный экран»",
    tapAdd: "Нажмите «Добавить» в правом верхнем углу",
    androidInstallationSteps: "Шаги установки для Android",
    openInChrome: "Откройте эту страницу в Chrome",
    tapThreeDots: "Нажмите на три точки в правом верхнем углу",
    tapAddHomeScreen: "Нажмите «Добавить на главный экран»",
    confirmAdd: "Подтвердите, нажав «Добавить»",

    // Dashboard page
    moscowWeather: "Погода в Москве",
    manageProfile: "Управление профилем",
    yourPreviousRequests: "Ваши предыдущие запросы",
    serviceLabel: "Услуга",
    categoryLabel: "Категория",
    quantityLabel: "Количество",
    statusLabel: "Статус",
    dateLabel: "Дата",
    searchServices: "Поиск услуг...",
    dearClient: "Уважаемый",
    trustedConcierge:
      "Ваш надежный консьерж в одном клике — готов, когда вы готовы.",
    yourConciergeList: "Ваш список консьерж-услуг пуст",
    browseServices: "Просмотр услуг",
    myConciergeRequests: "Мои запросы консьержу",
    requestWillBeSent:
      "Ваш запрос будет отправлен нашей команде консьержей, которые свяжутся с вами для подтверждения времени и предпочтений.",
    sendToConciergeTeam: "Отправить команде консьержей",
    requestSubmitted: "Запрос отправлен!",
    addedToList: "{{service}} добавлен в ваш список консьерж-услуг",
    loginRequired: "Вы должны войти в систему, чтобы отправлять запросы",
    requestSubmitSuccess: "Ваш запрос консьержу отправлен!",
    requestSubmitFailed:
      "Не удалось отправить ваш запрос. Пожалуйста, попробуйте снова.",
    failedLoadRequests: "Не удалось загрузить ваши предыдущие запросы",
    pending: "В ожидании",
    confirmed: "Подтверждено",
    completed: "Выполнено",
    cancelled: "Отменено",

    // Weather conditions
    sunny: "солнечно",
    clear: "ясно",
    cloudy: "облачно",
    overcast: "пасмурно",
    rain: "дождь",
    drizzle: "морось",
    shower: "ливень",
    snow: "снег",
    blizzard: "метель",
    ice: "лёд",
    thunder: "гром",
    lightning: "молния",
    fog: "туман",
    mist: "дымка",
    wind: "ветер",

    // Service cards
    addToConciergeList: "Добавить в мой список консьержа",
    noServicesFound:
      'Не найдено услуг, соответствующих "{query}". Попробуйте другой поисковый запрос.',
    loadingServices: "Загрузка услуг...",

    // Service titles
    premiumFlowerService: "Премиальная служба доставки цветов",
    flowerServiceDesc: "Изысканные цветочные композиции для любого случая.",
    privateChaufferService: "Услуги личного водителя",
    chaufferServiceDesc:
      "Прибытие в любое место со стилем, безопасностью и конфиденциальностью.",
    personalShoppingExperience: "Персональный шоппинг",
    shoppingExperienceDesc:
      "Эксперт по шоппингу, сопровождающий вас по эксклюзивным торговым площадкам.",
    restaurantReservations: "Бронирование ресторанов и баров",
    restaurantReservationsDesc:
      "Забронированные места в самых престижных ресторанах с панорамным видом.",
    architecturalIcons: "Архитектурные достопримечательности",
    architecturalIconsDesc:
      "Эксклюзивный доступ к религиозным и культурным достопримечательностям с опытными гидами.",
    medicalServices: "Медицинская помощь",
    medicalServicesDesc:
      "Комплексные медицинские услуги с лучшими медицинскими специалистами.",
    securityServices: "Услуги безопасности",
    securityServicesDesc:
      "Профессиональная охрана для вашей безопасности и спокойствия.",
    taxiBooking: "Заказ такси",
    taxiBookingDesc:
      "Удобные и надежные услуги такси на кончиках ваших пальцев.",
    wellnessBookings: "Бронирование спа и оздоровительных услуг",
    wellnessBookingsDesc:
      "Омолаживающие спа-процедуры и оздоровительные программы для полного расслабления.",
    eventPlanning: "Планирование мероприятий",
    eventPlanningDesc:
      "Комплексные услуги по планированию мероприятий для незабываемых событий.",
    romanticEvening: "Планирование романтического вечера",
    romanticEveningDesc:
      "Создайте идеальные романтические впечатления с нашей специализированной услугой планирования.",
    hotelSelection: "Подбор отелей",
    hotelSelectionDesc:
      "Премиальные услуги по выбору и бронированию отелей для незабываемого пребывания.",

    // Service Category Headings
    shoppingCategory: "Шоппинг",
    diningCulinaryCategory: "Рестораны и кулинария",
    cultureHistoryCategory: "Культура и история",
    transportCategory: "Транспорт",
    medicalWellnessCategory: "Медицина и здоровье",
    nightlifeEventsCategory: "Ночная жизнь и мероприятия",
    travelSupportCategory: "Поддержка в путешествии",
    allCategories: "Все",
    coreServices: "Основные услуги",
    lifestyleRomantic: "Образ жизни и романтика",
    familyCultural: "Семья и культура",
    businessSecurity: "Бизнес и безопасность",

    // Categories for service cards
    coreCategory: "Основные услуги",
    shoppingCategory2: "Шоппинг",
    cultureCategory: "Культура",
    medicalCategory: "Медицина",
    transportCategory2: "Транспорт",
    businessSecurityCategory: "Бизнес и безопасность",
    lifestyleRomanticCategory: "Образ жизни и романтика",
    familyCulturalCategory: "Семья и культура",

    // Message concierge
    messageConcierge: "Связаться с консьержем",
    contactYourExecutiveAssistant: "Свяжитесь с вашим личным ассистентом",
    selectPreferredMethod:
      "Выберите предпочтительный способ связи с вашим персональным ассистентом",

    // Golden button section
    goldLogo: "Reluxi Лого",
    goldenButton: "Добавьте Reluxi на Ваш домашний экран",
    goldenButtonDesc:
      "Это больше, чем просто кнопка — это ваша прямая линия к роскоши, конфиденциальности и лучшему, что может предложить город. Одно касание соединяет вас с вашим личным консьержем, доступным днем и ночью.",
    yourGoldenButton: "Ваша золотая кнопка",
    goldenButtonInstructions:
      "Нажмите и удерживайте, чтобы добавить на домашний экран.",
    chooseDevice: "Выберите ваше устройство для продолжения:",
    iphone: "iPhone",
    android: "Android",

    // Basic words
    reserve: "Забронировать",
    your: "Ваш",
    concierge: "Консьерж",
    signUp: "Зарегистрироваться",

    // Profile management page
    profileManagement: "Управление профилем",
    updatePersonalInfo: "Обновите вашу личную информацию",
    backToDashboard: "Вернуться к панели управления",
    emailCannotBeChanged: "Электронная почта не может быть изменена",
    updateProfile: "Обновить профиль",
    updating: "Обновление...",
    cancel: "Отмена",
    profileUpdateSuccess: "Профиль успешно обновлен",
    profileUpdateFailed: "Не удалось обновить профиль",
    unknownError: "Неизвестная ошибка",
    redirectingToLogin: "Перенаправление на страницу входа...",

    // Communication methods and apps
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    botim: "Botim",
    wechat: "WeChat",
  },
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["EN", "AR", "CN", "RU"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);

    // Just set the language attribute without changing direction
    if (language === "AR") {
      // Set language attribute for proper language rendering
      document.documentElement.lang = "ar";

      // Add a class to identify Arabic language for styling purposes
      document.documentElement.classList.add("ar-lang");
      document.documentElement.classList.remove("ltr-lang");
      document.documentElement.classList.remove("cn-lang");
      document.documentElement.classList.remove("ru-lang");
    } else if (language === "CN") {
      document.documentElement.lang = "zh";
      document.documentElement.classList.add("cn-lang");
      document.documentElement.classList.remove("ltr-lang");
      document.documentElement.classList.remove("ar-lang");
      document.documentElement.classList.remove("ru-lang");
    } else if (language === "RU") {
      document.documentElement.lang = "ru";
      document.documentElement.classList.add("ru-lang");
      document.documentElement.classList.remove("ltr-lang");
      document.documentElement.classList.remove("ar-lang");
      document.documentElement.classList.remove("cn-lang");
    } else {
      document.documentElement.lang = language.toLowerCase();
      document.documentElement.classList.add("ltr-lang");
      document.documentElement.classList.remove("ar-lang");
      document.documentElement.classList.remove("cn-lang");
      document.documentElement.classList.remove("ru-lang");
    }

    // Always maintain LTR direction for all languages
    document.documentElement.dir = "ltr";
  }, [language]);

  // Translation function
  const t = (key: string, vars?: Record<string, string>): string => {
    let text = translations[language]?.[key] || translations["EN"][key] || key;

    // Replace variables if provided
    if (vars) {
      Object.entries(vars).forEach(([varKey, value]) => {
        text = text.replace(`{{${varKey}}}`, value);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
