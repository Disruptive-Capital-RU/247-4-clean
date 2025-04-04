"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";

interface ContactOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function MessageConciergeModal() {
  const contactOptions: ContactOption[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-green-500"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M12.042 17.793a7.5 7.5 0 10-7.5-7.5 7.5 7.5 0 007.5 7.5zM6.75 9a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016.75 9zm5.25 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0112 9zm-6 3a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"
          />
        </svg>
      ),
      action: () => window.open("https://wa.me/+123456789", "_blank"),
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-blue-500"
        >
          <path
            d="M12 0c-6.626 0-12 5.372-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm-1.25 16.518l-3.5-3.319 1.396-1.435 2.1 1.9 4.461-4.521 1.395 1.436-5.852 5.939z"
            clipRule="evenodd"
          />
          <path d="M5.166 13.325l1.42-6.054c0.09-.394.371-.674.753-.714a17.95 17.95 0 018.368 0c.382.04.663.32.753.714l1.42 6.054c.097.414-.197.8-.634.8h-11.446c-.437 0-.731-.386-.634-.8z" />
        </svg>
      ),
      action: () => window.open("https://t.me/executiveassistant", "_blank"),
    },
    {
      id: "botim",
      name: "Botim",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-purple-500"
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.886.455-5.857.51-1.267.036-2.533.036-3.8 0-1.97-.055-3.917-.226-5.857-.51-1.978-.292-3.348-2.024-3.348-3.97V6.74c0-1.946 1.37-3.678 3.348-3.97z"
            clipRule="evenodd"
          />
          <path d="M18.75 10.5a.75.75 0 000-1.5h-1.513C17.5 6.702 15.798 5 13.5 5h-3c-2.298 0-4 1.702-4 4v4.5c0 .414.336.75.75.75h1a.75.75 0 00.75-.75V10.5h-1V9a2.5 2.5 0 012.5-2.5h3A2.5 2.5 0 0116 9v1.5z" />
        </svg>
      ),
      action: () => window.open("botim://chat?id=executiveassistant", "_blank"),
    },
    {
      id: "phone",
      name: "Phone",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
      action: () => window.open("tel:+123456789", "_blank"),
    },
    {
      id: "email",
      name: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-amber-500"
        >
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
      action: () => window.open("mailto:assistant@example.com", "_blank"),
    },
  ];

  return (
    <Modal>
      <ModalTrigger className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg transition-colors">
        Message Concierge
      </ModalTrigger>
      <ModalBody className="bg-[#111] border border-[#D4AF37]/30 text-white md:max-w-md w-full mx-4">
        <ModalContent>
          <h2 className="text-2xl font-cormorant font-semibold mb-6 text-center">
            Contact Your Executive Assistant
          </h2>
          <p className="text-white/70 mb-8 text-center">
            Select your preferred method to reach your personal executive
            assistant
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {contactOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="flex flex-col items-center p-4 bg-[#222] hover:bg-[#333] rounded-lg transition-all hover:scale-105 border border-white/5 hover:border-[#D4AF37]/30"
              >
                <div className="w-12 h-12 mb-3 relative flex items-center justify-center rounded-full bg-[#D4AF37]/10">
                  {option.icon}
                </div>
                <span className="text-white font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
