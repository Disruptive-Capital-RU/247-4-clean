"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Navigation from "@/components/Navigation";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    language: "english",
    communicationMethod: "whatsapp",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !profile) {
      router.push("/");
    }
  }, [user, profile, router]);

  useEffect(() => {
    // Load profile data when component mounts
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        contact: profile.contact || "",
        language: profile.language || "english",
        communicationMethod: profile.communication_method || "whatsapp",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error(t("loginRequired"));
      return;
    }

    setIsLoading(true);

    try {
      console.log("Updating profile for user:", user.id);
      console.log("Update data:", {
        name: formData.name,
        contact: formData.contact,
        language: formData.language,
        communicationMethod: formData.communicationMethod,
      });

      // Create an update object with only the fields we want to update
      const updateData: Record<string, string> = {};

      // Only include fields that have values
      if (formData.name) updateData.name = formData.name;
      if (formData.contact) updateData.contact = formData.contact;
      if (formData.language) updateData.language = formData.language;
      if (formData.communicationMethod)
        updateData.communication_method = formData.communicationMethod;

      console.log("Final update data:", updateData);

      // Update the user profile in Supabase
      const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id)
        .select();

      if (error) {
        console.error("Error updating profile:", error);

        // Check if this is a RLS error or other permission issue
        if (
          error.message.includes("permission") ||
          error.message.includes("policy")
        ) {
          // We're hitting RLS policies, try to update through a secure RPC function
          console.log(
            "Likely hitting RLS policies, trying to update through RPC function"
          );

          // Try an upsert approach instead
          const { error: upsertError } = await supabase.from("users").upsert(
            {
              id: user.id,
              ...updateData,
            },
            { onConflict: "id" }
          );

          if (upsertError) {
            console.error("Upsert approach failed:", upsertError);
            throw upsertError;
          } else {
            toast.success(t("profileUpdateSuccess"));
            setHasChanges(false);

            // Wait a moment before reloading to show the success message
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } else {
          // For other types of errors, try a simpler approach
          console.log("Trying simple RPC call as fallback");

          // Try using a custom RPC function if available
          const { error: rpcError } = await supabase.rpc(
            "update_user_profile",
            {
              user_id: user.id,
              user_name: formData.name,
              user_contact: formData.contact,
              user_language: formData.language,
              user_communication_method: formData.communicationMethod,
            }
          );

          if (rpcError) {
            console.error("RPC fallback failed:", rpcError);
            throw error; // Throw the original error if RPC also fails
          } else {
            toast.success(t("profileUpdateSuccess"));
            setHasChanges(false);

            // Wait a moment before reloading to show the success message
            if (typeof window !== "undefined") {
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          }
        }
      } else {
        console.log("Update successful, response:", data);

        // Update local profile state in the auth context
        if (data && data.length > 0) {
          toast.success(t("profileUpdateSuccess"));
          setHasChanges(false);

          // Wait a moment before reloading to show the success message
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        `${t("profileUpdateFailed")}: ${
          error instanceof Error ? error.message : t("unknownError")
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original profile data
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        contact: profile.contact || "",
        language: profile.language || "english",
        communicationMethod: profile.communication_method || "whatsapp",
      });
      setHasChanges(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {t("redirectingToLogin")}
      </div>
    );
  }

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

      <div className="container mx-auto px-4 py-12 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-cormorant font-semibold text-white">
                {t("profileManagement")}
              </h1>
              <p className="text-white/60 mt-1">{t("updatePersonalInfo")}</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#111] border border-white/10 rounded-lg hover:bg-[#222] transition-colors text-center sm:text-left w-full sm:w-auto"
            >
              {t("backToDashboard")}
            </Link>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/80 mb-2 text-base sm:text-lg"
                  >
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 sm:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-base sm:text-lg"
                    placeholder={t("yourName")}
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/80 mb-2 text-base sm:text-lg"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 sm:py-4 text-white/60 focus:outline-none cursor-not-allowed text-base sm:text-lg"
                    placeholder={t("yourEmail")}
                    autoComplete="email"
                  />
                  <p className="text-white/40 text-sm mt-1">
                    {t("emailCannotBeChanged")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block text-white/80 mb-2 text-base sm:text-lg"
                  >
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 sm:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-base sm:text-lg"
                    placeholder={t("phoneExample")}
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label
                    htmlFor="communicationMethod"
                    className="block text-white/80 mb-2 text-base sm:text-lg"
                  >
                    {t("preferredCommunication")}
                  </label>
                  <Select
                    value={formData.communicationMethod}
                    onValueChange={(value) =>
                      handleSelectChange("communicationMethod", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 sm:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-base sm:text-lg">
                      <SelectValue
                        placeholder={t("selectCommunicationMethod")}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border border-white/10 text-white">
                      <SelectItem value="whatsapp">{t("whatsapp")}</SelectItem>
                      <SelectItem value="phone">{t("phone")}</SelectItem>
                      <SelectItem value="email">{t("email")}</SelectItem>
                      <SelectItem value="telegram">{t("telegram")}</SelectItem>
                      <SelectItem value="botim">{t("botim")}</SelectItem>
                      <SelectItem value="wechat">{t("wechat")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className="block text-white/80 mb-2 text-base sm:text-lg"
                  >
                    {t("languagePreference")}
                  </label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      handleSelectChange("language", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 sm:py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-base sm:text-lg">
                      <SelectValue placeholder={t("selectLanguage")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border border-white/10 text-white">
                      <SelectItem value="english">{t("english")}</SelectItem>
                      <SelectItem value="russian">{t("russian")}</SelectItem>
                      <SelectItem value="arabic">{t("arabic")}</SelectItem>
                      <SelectItem value="chinese">{t("chinese")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                  <button
                    type="submit"
                    disabled={isLoading || !hasChanges}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {isLoading ? t("updating") : t("updateProfile")}
                  </button>

                  {hasChanges && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-lg transition-colors w-full sm:w-auto"
                    >
                      {t("cancel")}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
