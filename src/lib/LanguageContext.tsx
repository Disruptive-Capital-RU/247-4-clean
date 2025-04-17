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
  t: (key: string) => string;
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
    whyUsDescription: "You don't need a schedule. You need a signal. Your concierge is more than a guide — they are your trusted presence in a foreign land.",
    whyUsQuote: "Even when you're far, you're close to my heart.",
    whyUsQuoteSource: "Inspired by Amr Diab's 'Tamly Ma'ak'",
    whyChooseReluxi: "Why Choose",
    whyChooseReluxiDesc: "We elevate your Moscow experience through a commitment to excellence that goes beyond conventional concierge services.",
    ourServicePhilosophy: "Our Service",
    philosophy: "Philosophy",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "Your Personal Travel Assistant",
    heroDescription:
      "We save you hours of searching and planning.",
    heroDescription2:
      "Available 24 hours a day, 7 days a week.",
    reserveYourConcierge: "Reserve Your Concierge",
    pricingInfo: "",
    discoverMore: "Discover More",

    // Main service intro

    serviceSubtitle: "A Service That Books, Plans, and Elevates",
    serviceIntro:
      "From dinner plans to last-minute drivers, Reluxi handles the details so you can enjoy Moscow like a local — with none of the stress.",

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
    requestConfirmation: "Your request will be sent to our concierge team, who will reach out to confirm timing and preferences.",
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
    
    // Booking page
    bookYour: "Book Your",
    personalConcierge: "Personal Concierge",
    bookingIntro: "Your time is precious. Start now. Share a few details with us, and we'll be in touch right away to lift the stress off your stay.",
    howIt: "How It",
    works: "Works",
    bookNow: "Book Now",
    bookNowDesc: "Complete the booking form with your information, travel dates, and preferences. This is a pre-reservation only, no payment is collected at this stage.",
    confirmation: "Confirmation",
    confirmationDesc: "Within 12 hours, our team will contact you directly via your preferred communication method to confirm your reservation, discuss any specific requirements, and answer any questions.",
    payment: "Payment",
    paymentDesc: "Once your reservation is confirmed, you'll receive a secure payment link. We accept all major credit cards and international payment methods.",
    preArrivalPlanning: "Pre-Arrival Planning",
    preArrivalPlanningDesc: "Your personal concierge will contact you before your arrival to develop a tailored plan for your visit, ensuring everything is prepared for your Moscow experience.",
    welcomeToMoscow: "Welcome to Moscow",
    welcomeToMoscowDesc: "Your concierge will meet you upon arrival and be available 24/7 throughout your stay to ensure every aspect of your Moscow experience exceeds expectations.",
    frequentlyAsked: "Frequently Asked",
    questions: "Questions",
    feeCoverQuestion: "What does the $100 fee cover?",
    feeCoverAnswer: "The $100 fee covers your personal concierge service for 5 days. This includes 24/7 availability, personalized planning, and on-the-ground assistance. Additional services like restaurant bills, shopping, tickets, etc. are billed separately.",
    extendServiceQuestion: "Can I extend my concierge service beyond 5 days?",
    extendServiceAnswer: "Yes, you can extend your service at a rate of $20 per additional day. This can be arranged during your stay through your personal concierge.",
    arabicSpeakersQuestion: "Are all your concierges Arabic speakers?",
    arabicSpeakersAnswer: "Yes, all our concierges are fluent in Arabic, English, and Russian, ensuring seamless communication throughout your stay.",
    cancellationPolicyQuestion: "What is your cancellation policy?",
    cancellationPolicyAnswer: "Cancellations made 72 hours or more before your scheduled arrival receive a full refund. Cancellations within 72 hours are subject to a 50% fee.",
    discretionQuestion: "How discreet is your service?",
    discretionAnswer: "Absolute discretion is our priority. Your privacy is sacred, and we maintain complete confidentiality about your activities, preferences, and personal information.",
    
    // Booking form
    yourTimeIs: "Your Time Is",
    precious: "Precious",
    startNow: "Start Now.",
    bookingFormDesc: "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    fullName: "Full Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "Your email",
    emailLoginInfo: "You'll use this email to log into your concierge dashboard",
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

    checkEmailVerification: "Please check your email to verify your account",
    verifyEmailPrompt: "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.",
    loadingState1: "Matching you with a personal concierge",
    loadingState2: "Checking availability of premium experiences",
    bookingHeadline: "Your Time Is Precious. Start Now.",
    bookingSubheading: "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest.",
    loadingState3: "Securing your exclusive access",
    loadingState4: "Confirming luxury partner services",
    loadingState5: "Finalizing your reservation",
    loadingState6: "Welcome to the Inner Circle",
    successTitle: "Booking Successfully Submitted",
    successMessage: "Your booking has been received. Our concierge team will contact you within 12 hours to confirm details and prepare for your arrival.",
    redirectMessage: "You will be redirected to your dashboard shortly",
    verificationEmailSent: "Email Verification Required",
    checkInbox: "Please check your inbox and click the verification link we sent to your email address.",
    afterVerification: "After verifying your email, return to this page to complete your booking process.",

    // Golden button section
    goldLogo: "24/7 Logo",
    goldenButton: "Add Reluxi To Your Homescreen",
    goldenButtonDesc:
      "This is more than just a button — it is your direct line to luxury, discretion, and the finest the city has to offer. One touch connects you to your personal concierge, available day and night.",
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
  },

  AR: {
    // Navigation
    home: "الرئيسية",
    pricing: "الأسعار",
    services: "الخدمات",
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
    whyUsDescription: "أنت لا تحتاج إلى جدول. أنت تحتاج إلى إشارة. المسؤول الخاص بك هو أكثر من مجرد مرشد — إنه حضورك الموثوق في أرض أجنبية.",
    whyUsQuote: "حتى عندما تكون بعيدًا، فأنت قريب من قلبي.",
    whyUsQuoteSource: "مستوحى من أغنية عمرو دياب 'تملي معاك'",
    whyChooseReluxi: "لماذا تختار",
    whyChooseReluxiDesc: "نحن نرفع من مستوى تجربتك في موسكو من خلال التزامنا بالتميز الذي يتجاوز خدمات الكونسيرج التقليدية.",
    ourServicePhilosophy: "فلسفة",
    philosophy: "خدمتنا",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "مساعد السفر الشخصي الخاص بك",
    heroDescription:
      "نوفر لك ساعات من البحث والتخطيط.",
    heroDescription2:
      "متاحة على مدار الساعة طوال أيام الأسبوع.",
    reserveYourConcierge: "احجز الكونسيرج الخاص بك",
    pricingInfo: "",
    discoverMore: "اكتشف المزيد",

    // Main service intro
    serviceMainTitle: "بكلماتنا الخاصة",
    serviceSubtitle: "خدمة ذات حضور وقوة ودقة",
    serviceIntro:
      "ريلوكسي هي بوابتك الخاصة لكل ما تقدمه موسكو — بدون ضوضاء أو تأخير أو تنازلات. نحن متخصصون في توقع رغباتك قبل أن تعبر عنها.",

    // Service offerings
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
    
    // Booking page
    bookYour: "احجز",
    personalConcierge: "مساعدك الشخصي",
    bookingIntro: "وقتك ثمين. ابدأ الآن. احجز مساعدك الشخصي لمدة 5 أيام مقابل 100 دولار فقط.",
    howIt: "كيف",
    works: "تعمل",
    bookNow: "احجز الآن",
    bookNowDesc: "أكمل نموذج الحجز بمعلوماتك وتواريخ سفرك وتفضيلاتك. هذا حجز مسبق فقط، لا يتم تحصيل أي مدفوعات في هذه المرحلة.",
    confirmation: "التأكيد",
    confirmationDesc: "خلال 12 ساعة، سيتواصل فريقنا معك مباشرة عبر وسيلة الاتصال المفضلة لديك لتأكيد حجزك ومناقشة أي متطلبات محددة والإجابة على أي أسئلة.",
    payment: "الدفع",
    paymentDesc: "بمجرد تأكيد حجزك، ستتلقى رابط دفع آمن. نقبل جميع بطاقات الائتمان الرئيسية وطرق الدفع الدولية.",
    preArrivalPlanning: "التخطيط قبل الوصول",
    preArrivalPlanningDesc: "سيتواصل معك مساعدك الشخصي قبل وصولك لوضع خطة مخصصة لزيارتك، لضمان أن كل شيء جاهز لتجربتك في موسكو.",
    welcomeToMoscow: "مرحبا بك في موسكو",
    welcomeToMoscowDesc: "سيستقبلك مساعدك الشخصي عند وصولك وسيكون متاحاً على مدار الساعة طوال مدة إقامتك لضمان أن كل جانب من جوانب تجربتك في موسكو يفوق توقعاتك.",
    frequentlyAsked: "الأسئلة",
    questions: "المتكررة",
    feeCoverQuestion: "ماذا تغطي رسوم 100 دولار؟",
    feeCoverAnswer: "تغطي رسوم 100 دولار خدمة المساعد الشخصي لمدة 5 أيام. وهذا يشمل التوفر على مدار الساعة طوال أيام الأسبوع، والتخطيط الشخصي، والمساعدة على الأرض. الخدمات الإضافية مثل فواتير المطاعم والتسوق والتذاكر وما إلى ذلك تحسب بشكل منفصل.",
    extendServiceQuestion: "هل يمكنني تمديد خدمة المساعد الشخصي لأكثر من 5 أيام؟",
    extendServiceAnswer: "نعم، يمكنك تمديد الخدمة بمعدل 20 دولارًا لكل يوم إضافي. يمكن ترتيب ذلك أثناء إقامتك من خلال مساعدك الشخصي.",
    arabicSpeakersQuestion: "هل جميع المساعدين الشخصيين يتحدثون العربية؟",
    arabicSpeakersAnswer: "نعم، جميع مساعدينا الشخصيين يتحدثون العربية والإنجليزية والروسية بطلاقة، مما يضمن التواصل السلس طوال فترة إقامتك.",
    cancellationPolicyQuestion: "ما هي سياسة الإلغاء الخاصة بكم؟",
    cancellationPolicyAnswer: "الإلغاءات التي تتم قبل 72 ساعة أو أكثر من موعد الوصول المحدد تحصل على استرداد كامل. الإلغاءات في غضون 72 ساعة تخضع لرسوم بنسبة 50%.",
    discretionQuestion: "ما مدى سرية خدمتكم؟",
    discretionAnswer: "السرية المطلقة هي أولويتنا. خصوصيتك مقدسة، ونحافظ على السرية التامة بشأن أنشطتك وتفضيلاتك ومعلوماتك الشخصية.",
    
    // Booking form
    yourTimeIs: "وقتك",
    precious: "ثمين",
    startNow: "ابدأ الآن.",
    bookingFormDesc: "احجز مساعدك الشخصي لمدة 5 أيام مقابل 100 دولار فقط. بمجرد الحجز، سنتواصل معك مباشرة لتأكيد تفاصيل وصولك وتفضيلاتك وأولوياتك.",
    fullName: "الاسم الكامل",
    yourName: "اسمك",
    email: "البريد الإلكتروني",
    yourEmail: "بريدك الإلكتروني",
    emailLoginInfo: "ستستخدم هذا البريد الإلكتروني لتسجيل الدخول إلى لوحة تحكم المساعد الشخصي",
    password: "كلمة المرور",
    enterPassword: "أدخل كلمة المرور",
    phone: "الهاتف",
    phoneExample: "+971 55 123 4567",
    preferredCommunication: "طريقة الاتصال المفضلة",
    selectCommunicationMethod: "اختر طريقة الاتصال",
    languagePreference: "تفضيل اللغة",
    selectLanguage: "اختر اللغة",
    english: "الإنجليزية",
    russian: "الروسية",
    arabic: "العربية",
    chinese: "الصينية",
    iAcceptThe: "أوافق على",
    termsAndConditions: "الشروط والأحكام",
    and: "و",
    privacyPolicy: "سياسة الخصوصية",
    completeCaptcha: "يرجى إكمال التحقق من الكابتشا",
    captchaRequired: "التحقق من الكابتشا مطلوب قبل التقديم",
    validEmailRequired: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    passwordMinLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    acceptTermsRequired: "يجب أن توافق على الشروط والأحكام للمتابعة",
    processing: "جاري المعالجة...",
    emailVerificationRequired: "مطلوب التحقق من البريد الإلكتروني",
    reserveMyConcierge: "احجز مساعدي الشخصي",

    checkEmailVerification: "يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك",
    verifyEmailPrompt: "يرجى التحقق من عنوان بريدك الإلكتروني قبل المتابعة. تحقق من بريدك الوارد للحصول على رابط التأكيد وعد إلى هذه الصفحة بعد التأكيد.",
    loadingState1: "مطابقتك مع مساعد شخصي",
    loadingState2: "التحقق من توفر التجارب المميزة",
    loadingState3: "تأمين وصولك الحصري",
    loadingState4: "تأكيد خدمات الشركاء الفاخرة",
    loadingState5: "إنهاء حجزك",
    loadingState6: "مرحباً بك في الدائرة الداخلية",
    successTitle: "تم تقديم الحجز بنجاح",
    successMessage: "تم استلام حجزك. سيتواصل معك فريق المساعد الشخصي خلال 12 ساعة لتأكيد التفاصيل والاستعداد لوصولك.",
    redirectMessage: "سيتم توجيهك إلى لوحة التحكم الخاصة بك قريباً",
    verificationEmailSent: "مطلوب التحقق من البريد الإلكتروني",
    checkInbox: "يرجى التحقق من بريدك الوارد والنقر على رابط التحقق الذي أرسلناه إلى عنوان بريدك الإلكتروني.",
    afterVerification: "بعد التحقق من بريدك الإلكتروني، عد إلى هذه الصفحة لإكمال عملية الحجز الخاصة بك.",
    
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
    requestConfirmation: "سيتم إرسال طلبك إلى فريق المساعد الشخصي، الذي سيتواصل معك لتأكيد التوقيت والتفضيلات.",
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

    // Golden button section
    goldLogo: "شعار 24/7",
    goldenButton: "زرك الذهبي",
    goldenButtonDesc:
      "هذا أكثر من مجرد زر — إنه خطك المباشر للفخامة والتميز وأرقى ما تقدمه المدينة. لمسة واحدة تربطك بالكونسيرج الشخصي الخاص بك، المتاح ليلاً ونهاراً.",
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
    requestConfirmation: "您的请求将发送给我们的礼宾团队，他们将与您联系以确认时间和偏好。",
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

    // Why Us page
    whyUsTitle1: "我们不仅提供服务。",
    whyUsTitle2: "我们提供",
    certainty: "确定性",
    whyUsDescription: "您不需要日程安排。您需要的是信号。您的礼宾员不仅仅是导游——他们是您在异国他乡的可信赖存在。",
    whyUsQuote: "即使距离遥远，你也近在我心。",
    whyUsQuoteSource: "火从阿姆尔·迪亚布的「Tamly Ma'ak」歌曲中获得灵感",
    whyChooseReluxi: "为什么选择",
    whyChooseReluxiDesc: "我们通过对卓越的承诺，提升您在莫斯科的体验，超越了传统礼宾服务。",
    ourServicePhilosophy: "我们的服务",
    philosophy: "理念",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "您的个人旅行助手",
    heroDescription: "我们为您节省数小时的搜索和规划时间。",
    heroDescription2: "全天候24/7服务。",
    reserveYourConcierge: "预订您的礼宾",
    pricingInfo: "",
    discoverMore: "了解更多",

    // Main service intro
    serviceMainTitle: "用我们自己的话说",
    serviceSubtitle: "一项具有存在感、力量和精确性的服务",
    serviceIntro:
      "Reluxi是您通往莫斯科所有优质体验的私人通道 — 没有噪音、延迟或妥协。我们专注于在您表达之前预测您的愿望。",

    // Service offerings
    vipShopping: "贵宾购物",
    vipShoppingDesc:
      "私人通道进入莫斯科最负盛名的精品店。会说阿拉伯语的造型师。专属时段。",
    highEndDining: "高端餐饮",
    highEndDiningDesc:
      "保证在莫斯科最热门的餐厅预留餐位。厨师为您的喜好做好准备。",
    chauffeuredVehicles: "专车服务",
    chauffeuredVehiclesDesc:
      "黑色奔驰、S级、迈巴赫。专业训练的司机。完全谨慎。按小时或按日计费。",
    privateCulturalTours: "私人文化之旅",
    privateCulturalToursDesc:
      "通过精英导游和翻译开启进入宫殿、博物馆和伊斯兰遗产地的通道。",
    personalProtection: "个人安保",
    personalProtectionDesc:
      "应要求提供训练有素的行政保护。为那些隐私和安全不可协商的人服务。",
    healthWellness: "健康与养生",
    healthWellnessDesc:
      "专属诊所、贵宾医疗通道、美容专家和水疗恢复 — 无需等候名单。",
    nightlifeEvents: "夜生活与活动",
    nightlifeEventsDesc: "进入封闭圈子、上流社会聚会和游客无法触及的活动。",

    // Booking page
    bookYour: "预订您的",
    personalConcierge: "私人管家",
    bookingIntro: "您的时间很宝贵。现在开始。将您的私人管家预订5天，仅需100美元。",
    howIt: "如何",
    works: "运作",
    bookNow: "立即预订",
    bookNowDesc: "填写预订表格，包括您的信息、旅行日期和偏好。这只是预先预订，在此阶段不收取任何付款。",
    confirmation: "确认",
    confirmationDesc: "在12小时内，我们的团队将通过您偏好的通信方式直接与您联系，以确认您的预订，讨论任何特定要求，并回答任何问题。",
    payment: "付款",
    paymentDesc: "预订确认后，您将收到安全的付款链接。我们接受所有主要信用卡和国际支付方式。",
    preArrivalPlanning: "到达前规划",
    preArrivalPlanningDesc: "您的私人管家将在您到达前与您联系，为您的访问制定量身定制的计划，确保您的莫斯科体验做好一切准备。",
    welcomeToMoscow: "欢迎来到莫斯科",
    welcomeToMoscowDesc: "您的管家将在您到达时迎接您，并在您整个停留期间全天怙为您服务，确保您在莫斯科的每一面体验都超出预期。",
    frequentlyAsked: "常见",
    questions: "问题",
    feeCoverQuestion: "100美元费用包括哪些服务？",
    feeCoverAnswer: "100美元费用包括5天的私人管家服务。这包含全天候的可用性、个性化规划和实地协助。餐厅账单、购物、门票等额外服务将另行收费。",
    extendServiceQuestion: "我可以将管家服务延长超过5天吗？",
    extendServiceAnswer: "是的，您可以以每天增加20美元的费率来延长您的服务。这可以在您停留期间通过您的私人管家安排。",
    arabicSpeakersQuestion: "您所有的管家都会说阿拉伯语吗？",
    arabicSpeakersAnswer: "是的，我们所有的管家都能流利地说阿拉伯语、英语和俄语，确保在您整个停留期间沟通无睹。",
    cancellationPolicyQuestion: "您的取消政策是什么？",
    cancellationPolicyAnswer: "在预定到达时间72小时或更长时间前取消的，将获得全额退款。在72小时内取消的将收取50%的费用。",
    discretionQuestion: "您的服务有多么谨慎？",
    discretionAnswer: "绝对的谨慎是我们的首要任务。您的隐私是神圣的，我们对您的活动、偏好和个人信息保持完全的保密。",

    // Booking form
    yourTimeIs: "您的时间",
    precious: "很宝贵",
    startNow: "现在开始。",
    bookingFormDesc: "预订您私人管家五天仅需100美元。预订后，我们将直接与您联系，确认您的到达详情、偏好和优先事项。",
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

    checkEmailVerification: "请检查您的电子邮件以验证您的账户",
    verifyEmailPrompt: "请在继续之前验证您的电子邮件地址。检查您的收件箱以获取确认链接，并在确认后返回此页面。",
    loadingState1: "为您匹配私人管家",
    loadingState2: "检查高端体验的可用性",
    loadingState3: "确保您的独家访问权",
    loadingState4: "确认豪华合作伙伴服务",
    loadingState5: "完成您的预订",
    loadingState6: "欢迎加入内部圈子",
    successTitle: "预订成功提交",
    successMessage: "您的预订已收到。我们的管家团队将在12小时内与您联系，以确认详细信息并为您的到来做好准备。",
    redirectMessage: "您将很快被重定向到您的仪表板",
    bookingHeadline: "您的时间很宝贵。立即开始。",
    bookingSubheading: "仅需100美元即可预订您的私人礼宾服务5天。预订后，我们将直接与您联系，确认您的到达详情、偏好和优先事项。",
    verificationEmailSent: "需要电子邮件验证",
    checkInbox: "请检查您的收件箱并点击我们发送给您电子邮件地址的验证链接。",
    afterVerification: "验证电子邮件后，返回此页面完成您的预订过程。",

    // Golden button section
    goldLogo: "24/7标志",
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
      "预订您的个人礼宾服务5天仅需100美元。一旦预订，我们将直接联系您确认您的到达详情、偏好和优先事项。",
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
    verificationEmailSent: "验证邮件已发送",
    checkInbox: "请检查您的收件箱并点击验证链接",
    afterVerification: "验证后，您将被重定向到您的仪表板",
  },

  RU: {
    // Navigation
    home: "Главная",
    pricing: "Цены",
    services: "Услуги",
    whyUs: "Почему мы",
    login: "Войти",
    bookNow: "Забронировать",
    welcomeBack: "С возвращением",
    accessSuite: "Доступ к услугам",
    dashboard: "Личный кабинет",
    logout: "Выйти",

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
    bookingSubheading: "Забронируйте вашего личного консьержа на 5 дней всего за $100. После бронирования мы свяжемся с вами напрямую для подтверждения деталей вашего прибытия, предпочтений и приоритетов.",
    bookYourConcierge: "Забронировать консьержа",
    selectPlan: "Выбрать план",
    contactUs: "Связаться с нами",
    oneDayPremiumPlans: "Премиальные планы на один день",
    everyDetailMasterfully: "Каждая деталь мастерски организована",
    
    // Services page
    ourEliteServices: "Наши элитные услуги",
    luxuryServicesForElite: "Роскошные консьерж-услуги для элиты",
    
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
    checkInbox: "Пожалуйста, проверьте вашу электронную почту и нажмите на ссылку для подтверждения",
    afterVerification: "После подтверждения вы будете перенаправлены в личный кабинет",
    requestConfirmation: "Ваш запрос будет отправлен нашей команде консьержей, которая свяжется с вами для подтверждения времени и предпочтений.",
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

    // Why Us page
    whyUsTitle1: "Мы не просто предоставляем услуги.",
    whyUsTitle2: "Мы предоставляем",
    certainty: "Уверенность",
    whyUsDescription: "Вам не нужен расписание. Вам нужен сигнал. Ваш консьерж — это больше, чем просто гид, это ваше доверенное присутствие в чужой стране.",
    whyUsQuote: "Даже когда ты далеко, ты близок к моему сердцу.",
    whyUsQuoteSource: "Вдохновлено песней Амра Диаба 'Тамли Ма'ак'",
    whyChooseReluxi: "Почему выбрать",
    whyChooseReluxiDesc: "Мы повышаем уровень вашего опыта в Москве благодаря нашей приверженности к совершенству, которая выходит за рамки традиционных услуг консьержа.",
    ourServicePhilosophy: "Наша сервисная",
    philosophy: "философия",

    // Hero section
    eliteConciergeService: "",
    alwaysWithYou: "Ваш Личный Ассистент в Путешествии",
    heroDescription:
      "Мы экономим ваше время на поиск и планирование.",
    heroDescription2:
      "Доступен 24 часа в сутки, 7 дней в неделю.",
    reserveYourConcierge: "Забронировать консьержа",
    pricingInfo: "",
    discoverMore: "Узнать больше",

    // Main service intro
    serviceMainTitle: "Нашими словами",
    serviceSubtitle: "Сервис присутствия, силы и точности",
    serviceIntro:
      "Reluxi — ваш личный доступ ко всему, что предлагает Москва — без шума, задержек или компромиссов. Мы специализируемся на предвосхищении ваших желаний, прежде чем вы их выразите.",

    // Service offerings
    vipShopping: "VIP шоппинг",
    vipShoppingDesc:
      "Приватный доступ к самым престижным бутикам Москвы. Русскоговорящие стилисты. Эксклюзивные временные слоты.",
    highEndDining: "Высокая кухня",
    highEndDiningDesc:
      "Гарантированные столики в самых востребованных ресторанах Москвы. Шеф-повара, готовые к вашим предпочтениям.",
    chauffeuredVehicles: "Автомобили с водителем",
    chauffeuredVehiclesDesc:
      "Черный Mercedes, S-класс, Maybach. Профессионально обученные водители. Полная конфиденциальность. Почасовая или ежедневная аренда.",
    privateCulturalTours: "Частные культурные туры",
    privateCulturalToursDesc:
      "Доступ к дворцам, музеям и культурным объектам с элитными гидами и переводчиками.",
    personalProtection: "Личная охрана",
    personalProtectionDesc:
      "Обученная исполнительная защита по запросу. Для тех, чья конфиденциальность и безопасность не подлежат обсуждению.",
    healthWellness: "Здоровье и Велнес",
    healthWellnessDesc:
      "Эксклюзивные клиники, VIP-доступ к медицинской помощи, косметическим специалистам и спа-восстановлению — без листов ожидания.",
    nightlifeEvents: "Ночная жизнь и мероприятия",
    nightlifeEventsDesc:
      "Вход в закрытые круги, светские мероприятия и события, недоступные обычным туристам.",

    // Golden button section
    goldLogo: "24/7 Лого",
    goldenButton: "Ваша золотая кнопка",
    goldenButtonDesc:
      "Это больше, чем просто кнопка — это ваша прямая линия к роскоши, конфиденциальности и лучшему, что может предложить город. Одно касание соединяет вас с вашим личным консьержем, доступным днем и ночью.",
    goldenButtonInstructions: "Нажмите и удерживайте, чтобы добавить на домашний экран.",
    chooseDevice: "Выберите ваше устройство для продолжения:",
    iphone: "iPhone",
    android: "Android",

    // Booking page
    bookYour: "Забронировать",
    personalConcierge: "личного консьержа",
    bookingIntro: "Ваше время ценно. Начните сейчас. Забронируйте личного консьержа на 5 дней всего за 100$.",
    howIt: "Как это",
    works: "работает",
    bookNow: "Забронировать сейчас",
    bookNowDesc: "Заполните форму бронирования с вашей информацией, датами поездки и предпочтениями. Это только предварительное бронирование, на этом этапе оплата не взимается.",
    confirmation: "Подтверждение",
    confirmationDesc: "В течение 12 часов наша команда свяжется с вами непосредственно через предпочтительный вами способ связи, чтобы подтвердить вашу бронь, обсудить любые конкретные требования и ответить на любые вопросы.",
    payment: "Оплата",
    paymentDesc: "После подтверждения бронирования вы получите безопасную ссылку для оплаты. Мы принимаем все основные кредитные карты и международные способы оплаты.",
    preArrivalPlanning: "Планирование перед прибытием",
    preArrivalPlanningDesc: "Ваш личный консьерж свяжется с вами до вашего прибытия, чтобы разработать индивидуальный план вашего визита, обеспечивая всё необходимое для вашего опыта в Москве.",
    welcomeToMoscow: "Добро пожаловать в Москву",
    welcomeToMoscowDesc: "Ваш консьерж встретит вас по прибытии и будет доступен 24/7 в течение всего вашего пребывания, чтобы убедиться, что каждый аспект вашего опыта в Москве превосходит ожидания.",
    frequentlyAsked: "Часто задаваемые",
    questions: "вопросы",
    feeCoverQuestion: "Что включает в себя плата в размере 100$?",
    feeCoverAnswer: "Плата в размере 100$ покрывает услуги вашего личного консьержа на 5 дней. Это включает в себя доступность 24/7, персонализированное планирование и помощь на месте. Дополнительные услуги, такие как счета в ресторанах, покупки, билеты и т.д., оплачиваются отдельно.",
    extendServiceQuestion: "Могу ли я продлить услуги консьержа более чем на 5 дней?",
    extendServiceAnswer: "Да, вы можете продлить услугу по ставке 20$ за дополнительный день. Это можно организовать во время вашего пребывания через вашего личного консьержа.",
    arabicSpeakersQuestion: "Все ли ваши консьержи говорят на арабском?",
    arabicSpeakersAnswer: "Да, все наши консьержи свободно владеют арабским, английским и русским языками, обеспечивая беспрепятственное общение в течение всего вашего пребывания.",
    cancellationPolicyQuestion: "Какова ваша политика отмены?",
    cancellationPolicyAnswer: "Отмены, сделанные за 72 часа или более до запланированного прибытия, получают полный возврат. Отмены в течение 72 часов подлежат комиссии в размере 50%.",
    discretionQuestion: "Насколько конфиденциальны ваши услуги?",
    discretionAnswer: "Абсолютная конфиденциальность — наш приоритет. Ваша приватность священна, и мы сохраняем полную конфиденциальность относительно ваших действий, предпочтений и личной информации.",

    // Booking form
    yourTimeIs: "Ваше время",
    precious: "ценно",
    startNow: "Начните сейчас.",
    bookingFormDesc: "Забронируйте личного консьержа на 5 дней всего за 100$. После бронирования мы свяжемся с вами напрямую, чтобы подтвердить детали вашего прибытия, предпочтения и приоритеты.",
    fullName: "Полное имя",
    yourName: "Ваше имя",
    email: "Email",
    yourEmail: "Ваш email",
    emailLoginInfo: "Вы будете использовать этот email для входа в вашу панель управления консьержа",
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
    acceptTermsRequired: "Вы должны принять условия использования, чтобы продолжить",
    processing: "Обработка...",
    emailVerificationRequired: "Требуется подтверждение email",
    reserveMyConcierge: "Зарезервировать моего консьержа",

    checkEmailVerification: "Пожалуйста, проверьте свою электронную почту для подтверждения аккаунта",
    verifyEmailPrompt: "Пожалуйста, подтвердите свой email-адрес, прежде чем продолжить. Проверьте входящие сообщения на наличие ссылки для подтверждения и вернитесь на эту страницу после подтверждения.",
    loadingState1: "Подбираем для вас личного консьержа",
    loadingState2: "Проверяем доступность премиальных услуг",
    loadingState3: "Обеспечиваем ваш эксклюзивный доступ",
    loadingState4: "Подтверждаем услуги премиальных партнёров",
    loadingState5: "Завершаем ваше бронирование",
    loadingState6: "Добро пожаловать во внутренний круг",
    successTitle: "Бронирование успешно отправлено",
    successMessage: "Ваше бронирование получено. Наша команда консьержей свяжется с вами в течение 12 часов для подтверждения деталей и подготовки к вашему прибытию.",
    redirectMessage: "Вы будете перенаправлены в свою панель управления в ближайшее время",
    verificationEmailSent: "Требуется подтверждение email",
    checkInbox: "Пожалуйста, проверьте свои входящие сообщения и нажмите на ссылку подтверждения, которую мы отправили на ваш email-адрес.",
    afterVerification: "После подтверждения вашего email вернитесь на эту страницу, чтобы завершить процесс бронирования.",

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
      document.documentElement.classList.add('ar-lang');
      document.documentElement.classList.remove('ltr-lang');
      document.documentElement.classList.remove('cn-lang');
      document.documentElement.classList.remove('ru-lang');
    } else if (language === "CN") {
      document.documentElement.lang = "zh";
      document.documentElement.classList.add('cn-lang');
      document.documentElement.classList.remove('ltr-lang');
      document.documentElement.classList.remove('ar-lang');
      document.documentElement.classList.remove('ru-lang');
    } else if (language === "RU") {
      document.documentElement.lang = "ru";
      document.documentElement.classList.add('ru-lang');
      document.documentElement.classList.remove('ltr-lang');
      document.documentElement.classList.remove('ar-lang');
      document.documentElement.classList.remove('cn-lang');
    } else {
      document.documentElement.lang = language.toLowerCase();
      document.documentElement.classList.add('ltr-lang');
      document.documentElement.classList.remove('ar-lang');
      document.documentElement.classList.remove('cn-lang');
      document.documentElement.classList.remove('ru-lang');
    }
    
    // Always maintain LTR direction for all languages
    document.documentElement.dir = "ltr";
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"][key] || key;
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
