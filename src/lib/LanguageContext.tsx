"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define supported languages
export type Language = "EN" | "AR" | "CN";

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
      "From the moment your journey begins, we take over every detail — with precision, elegance, and unwavering discretion. Each plan unlocks a complete suite of premium services designed to liberate your time, so you can focus entirely on what matters: living fully.",
    planOverview: "Plan Overview",
    readyToExperience: "Ready to Experience True Luxury?",
    bookYourPersonal:
      "Book your personal concierge now and transform your Moscow experience into something extraordinary.",
    bookYourConcierge: "Book Your Concierge",

    // Hero section
    eliteConciergeService: "Elite Concierge Service",
    alwaysWithYou: "The Art of Effortless Booking",
    heroDescription:
      "A premium personal concierge for travelers visiting Moscow.",
    heroDescription2:
      "Available 24 hours a day, 7 days a week — to arrange, accompany, protect, and serve.",
    reserveYourConcierge: "Reserve Your Concierge",
    pricingInfo: "5 days • $100 USD",
    discoverMore: "Discover More",

    // Main service intro
    serviceMainTitle: "In our own words",
    serviceSubtitle: "A Service of Presence, Power, and Precision",
    serviceIntro:
      "Reluxi is your private gateway to everything Moscow offers — without noise, delay, or compromise. We specialize in anticipating your desires before you express them.",

    // Service offerings
    vipShopping: "VIP Shopping",
    vipShoppingDesc:
      "Private access to Moscow's most prestigious boutiques. Arabic-speaking stylists. Exclusive time slots.",
    highEndDining: "High-End Dining",
    highEndDiningDesc:
      "Guaranteed tables in Moscow's most in-demand restaurants. Chefs prepared for your preferences.",
    chauffeuredVehicles: "Chauffeured Vehicles",
    chauffeuredVehiclesDesc:
      "Black Mercedes, S-Class, Maybach. Professionally trained drivers. Fully discreet. Hourly or daily.",
    privateCulturalTours: "Private Cultural Tours",
    privateCulturalToursDesc:
      "Unlock access to palaces, museums, and Islamic heritage sites with elite guides and interpreters.",
    personalProtection: "Personal Protection",
    personalProtectionDesc:
      "Trained executive protection upon request. For those whose privacy and safety are non-negotiable.",
    healthWellness: "Health & Wellness",
    healthWellnessDesc:
      "Exclusive clinics, VIP access to medical care, cosmetic specialists, and spa recovery — without waiting lists.",
    nightlifeEvents: "Nightlife & Events",
    nightlifeEventsDesc:
      "Entry into closed circles, high society gatherings, and events no tourist can reach.",

    // Golden button section
    goldLogo: "24/7 Logo",
    goldenButton: "Your Golden Button",
    goldenButtonDesc:
      "This is more than just a button — it is your direct line to luxury, discretion, and the finest the city has to offer. One touch connects you to your personal concierge, available day and night.",
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
    bookingHeader: "Your Time Is Precious. Start Now.",
    bookingDesc:
      "Book your personal concierge for 5 days for just $100. Once booked, we'll contact you directly to confirm your arrival details, preferences, and priorities.",
    fullName: "Full Name *",
    email: "Email *",
    emailHint: "You'll use this email to log into your concierge dashboard",
    phoneWhatsapp: "Phone / WhatsApp *",
    languagePreference: "Language Preference",
    arabic: "Arabic",
    english: "English",
    russian: "Russian",
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
    privacyPolicy: "Privacy Policy",
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

    // Hero section
    eliteConciergeService: "خدمة كونسيرج النخبة",
    alwaysWithYou: "دائما معك",
    heroDescription:
      "خدمة كونسيرج شخصية متميزة للمسافرين العرب الذين يزورون موسكو.",
    heroDescription2:
      "متاحة على مدار الساعة طوال أيام الأسبوع - للترتيب والمرافقة والحماية والخدمة.",
    reserveYourConcierge: "احجز الكونسيرج الخاص بك",
    pricingInfo: "5 أيام • 100 دولار أمريكي",
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
    email: "البريد الإلكتروني *",
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

    // Hero section
    eliteConciergeService: "精英礼宾服务",
    alwaysWithYou: "与您同行",
    heroDescription: "为访问莫斯科的阿拉伯旅行者提供高级个人礼宾服务。",
    heroDescription2: "全天候提供服务，全周七天 — 安排、陪同、保护和服务。",
    reserveYourConcierge: "预订您的礼宾服务",
    pricingInfo: "5天 • 100美元",
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
    if (savedLanguage && ["EN", "AR", "CN"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);

    // Add RTL direction for Arabic
    if (language === "AR") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = language.toLowerCase();
    }
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
