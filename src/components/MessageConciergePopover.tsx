"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/lib/LanguageContext";

interface ContactOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function MessageConciergePopover() {
  const { t } = useLanguage();

  const contactOptions: ContactOption[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-8 h-8"
        >
          <path
            fill="#25D366"
            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
          />
          <path
            fill="#FFFFFF"
            d="M35.166,12.795c-2.799-2.8-6.596-4.402-10.541-4.431c-8.243,0-14.95,6.695-14.95,14.923
            c-0.001,2.629,0.686,5.208,1.991,7.475l-2.116,7.72l7.918-2.073c2.25,1.23,4.771,1.897,7.367,1.897c0.002,0,0.003,0,0.004,0
            c8.241,0,15.001-6.694,15.001-14.925C39.842,19.382,38.220,15.821,35.166,12.795z M24.6,34.365L24.6,34.365
            c-2.357,0-4.582-0.638-6.507-1.835l-0.476-0.284l-4.856,1.272l1.302-4.741l-0.308-0.492c-1.299-2.071-1.986-4.45-1.985-6.893
            c0.002-7.125,5.813-12.922,12.95-12.922c3.426,0.016,6.709,1.366,9.135,3.798c2.423,2.432,3.759,5.709,3.751,9.127
            C37.606,28.564,31.747,34.365,24.6,34.365z M31.064,26.811c-0.413-0.206-2.396-1.184-2.767-1.319c-0.372-0.135-0.643-0.203-0.913,0.204
            c-0.27,0.407-1.048,1.319-1.286,1.589c-0.237,0.271-0.475,0.305-0.889,0.1c-0.414-0.205-1.757-0.647-3.342-2.064
            c-1.23-1.1-2.059-2.459-2.299-2.873c-0.24-0.413-0.026-0.635,0.18-0.841c0.184-0.185,0.414-0.482,0.621-0.723
            c0.203-0.243,0.27-0.414,0.406-0.69c0.135-0.274,0.068-0.516-0.034-0.723c-0.103-0.207-0.913-2.201-1.252-3.014
            c-0.345-0.818-0.711-0.683-0.986-0.683c-0.255-0.001-0.545-0.001-0.837-0.001c-0.291,0-0.763,0.104-1.162,0.516
            c-0.398,0.414-1.527,1.491-1.527,3.636c0,2.147,1.562,4.222,1.78,4.497c0.215,0.272,2.924,4.722,7.269,6.423
            c1.353,0.583,2.372,0.962,3.179,1.242c1.367,0.435,2.612,0.374,3.596,0.227c1.098-0.164,2.396-0.983,2.736-1.934
            c0.341-0.95,0.341-1.767,0.239-1.936C31.773,27.117,31.477,27.016,31.064,26.811z"
          />
        </svg>
      ),
      action: () => window.open("https://wa.me/+79160665133", "_blank"),
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-8 h-8"
        >
          <path fill="#29B6F6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
          <path
            fill="#FFFFFF"
            d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
          />
          <path
            fill="#B0BEC5"
            d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
          />
          <path
            fill="#CFD8DC"
            d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
          />
        </svg>
      ),
      action: () => window.open("https://t.me/+79160665133", "_blank"),
    },
    {
      id: "messenger",
      name: "Messenger",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-8 h-8"
        >
          <path
            fill="#448AFF"
            d="M24,4C13,4,4,12.1,4,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.9,0.5,3.9,0.7,6.2,0.7c11,0,20-8.1,20-18S35,4,24,4z"
          />
          <path fill="#FFFFFF" d="M12,28l7-4l3.5,4l7.5-7l-7,4l-3.5-4L12,28z" />
        </svg>
      ),
      action: () => window.open("https://m.me/reluxi", "_blank"),
    },
    {
      id: "botim",
      name: "Botim",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-8 h-8"
        >
          <circle fill="#40C3FF" cx="24" cy="24" r="20" />
          <path
            fill="#FFFFFF"
            d="M24,10c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2s2-0.9,2-2v-8C26,10.9,25.1,10,24,10z"
          />
          <circle fill="#FFFFFF" cx="24" cy="12" r="3" />
          <path
            fill="#FFFFFF"
            d="M28,20c0,0-2-4-4-4s-4,4-4,4s-4,9,0,16c0,0,2,2,4,2s4-2,4-2C32,29,28,20,28,20z"
          />
        </svg>
      ),
      action: () => window.open("botim://chat?id=+79160665133", "_blank"),
    },
    {
      id: "phone",
      name: "Phone",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
        >
          <circle cx="12" cy="12" r="12" fill="black" />
          <path
            d="M8.5,13.8c1.7,2.2,3.4,3.6,5.1,4.2c0.8,0.3,1.5,0.4,1.9,0.1c0.2-0.1,0.3-0.3,0.4-0.5l1-2.4c0.1-0.3,0-0.6-0.3-0.8 l-2.1-1.1c-0.2-0.1-0.5-0.1-0.7,0.1l-0.7,0.7c-0.1,0.1-0.3,0.2-0.5,0.1c-0.6-0.3-1.7-1-2.9-2.8c-0.1-0.1-0.1-0.3,0-0.5l0.7-0.7 c0.2-0.2,0.2-0.5,0.1-0.7l-1-2.1c-0.1-0.3-0.5-0.4-0.8-0.3l-2.4,1C6,8.3,5.8,8.5,5.7,8.7C5.4,9.1,5.5,9.8,5.9,10.6 C6.4,11.7,7.2,12.7,8.5,13.8z"
            fill="#D4AF37"
          />
        </svg>
      ),
      action: () => window.open("tel:+79160665133", "_blank"),
    },
    {
      id: "email",
      name: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-8 h-8"
        >
          <circle fill="#F44336" cx="24" cy="24" r="20" />
          <path
            fill="#FFFFFF"
            d="M34,15H14c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V17C36,15.9,35.1,15,34,15z M32.9,17
            L24,24.3L15.1,17H32.9z M14,31V19.5l10,8.5l10-8.5V31H14z"
          />
        </svg>
      ),
      action: () => window.open("mailto:my@reluxi.ru", "_blank"),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg transition-colors">
        {t("messageConcierge")}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        className="bg-[#111] border border-[#D4AF37]/30 text-white p-6 shadow-lg sm:w-[350px] w-[320px] sm:translate-x-[-80px] translate-x-[-40px]"
      >
        <h2 className="text-xl font-cormorant font-semibold mb-4 text-center">
          {t("contactYourExecutiveAssistant")}
        </h2>
        <p className="text-white/70 mb-4 text-center text-sm">
          {t("selectPreferredMethod")}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {contactOptions.map((option) => (
            <button
              key={option.id}
              onClick={option.action}
              className="flex flex-col items-center p-2 bg-[#222] hover:bg-[#333] rounded-lg transition-all hover:scale-105 border border-white/5 hover:border-[#D4AF37]/30"
            >
              <div className="w-10 h-10 mb-1 relative flex items-center justify-center">
                {option.icon}
              </div>
              <span className="text-white font-medium text-xs">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
