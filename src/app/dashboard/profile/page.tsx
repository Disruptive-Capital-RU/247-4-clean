"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Updating profile for user:", user.id);
      console.log("Update data:", {
        name: formData.name,
        contact: formData.contact,
      });

      // Create an update object with only the fields we want to update
      const updateData: Record<string, string> = {};

      // Only include fields that have values
      if (formData.name) updateData.name = formData.name;
      if (formData.contact) updateData.contact = formData.contact;

      console.log("Final update data:", updateData);

      // Update the user profile in Supabase
      const { data, error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id)
        .select();

      if (error) {
        console.error("Supabase update error:", error);

        // Check if the error is related to missing fields or constraints
        if (
          error.message.includes("violates") ||
          error.message.includes("constraint")
        ) {
          console.log(
            "Database constraint error, trying full upsert with all required fields"
          );

          // Fallback: Try upsert instead if update fails
          console.log("Trying upsert as fallback...");
          const { data: upsertData, error: upsertError } = await supabase
            .from("users")
            .upsert({
              id: user.id,
              name: formData.name,
              email: formData.email || user.email,
              contact: formData.contact,
              // Include the required fields from profile to maintain existing data
              concierge_end_date:
                profile?.concierge_end_date ||
                new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
              created_at: profile?.created_at || new Date().toISOString(),
            })
            .select();

          if (upsertError) {
            console.error("Upsert fallback failed:", upsertError);
            throw upsertError;
          }

          console.log("Upsert successful:", upsertData);

          if (upsertData && upsertData.length > 0) {
            toast.success("Profile updated successfully");
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
            }
          );

          if (rpcError) {
            console.error("RPC fallback failed:", rpcError);
            throw error; // Throw the original error if RPC also fails
          } else {
            toast.success("Profile updated successfully");
            setHasChanges(false);

            // Wait a moment before reloading to show the success message
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        }
      } else {
        console.log("Update successful, response:", data);

        // Update local profile state in the auth context
        if (data && data.length > 0) {
          toast.success("Profile updated successfully");
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
        `Failed to update profile: ${
          error instanceof Error ? error.message : "Unknown error"
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
      });
      setHasChanges(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Redirecting to login...
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

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-cormorant font-semibold text-white">
                Profile Management
              </h1>
              <p className="text-white/60 mt-1">
                Update your personal information
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#111] border border-white/10 rounded-lg hover:bg-[#222] transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white/60 focus:outline-none cursor-not-allowed"
                    placeholder="Your email address"
                  />
                  <p className="text-white/40 text-sm mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label htmlFor="contact" className="block text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="pt-4 flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading || !hasChanges}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </button>

                  {hasChanges && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-[#111] border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-cormorant font-semibold mb-4">
              Account Security
            </h2>
            <p className="text-white/60 mb-4">
              For security purposes, changes to your password and other account
              security settings require verification.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
