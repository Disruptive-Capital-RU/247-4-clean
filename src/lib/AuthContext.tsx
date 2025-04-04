"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  getCurrentUser,
  getUserProfile,
  signInWithEmail,
  signOut,
  User,
  supabase,
} from "./supabase";

interface AuthContextType {
  user: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string) => Promise<{ success: boolean; message: string }>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on mount
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log("Current user from session:", user?.email);
        setUser(user);

        if (user) {
          const { data: profileData, error: profileError } =
            await getUserProfile(user.id);
          if (profileError) {
            console.error("Profile error:", profileError);
            throw new Error(profileError.message);
          }
          setProfile(profileData);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      if (session?.user) {
        setUser(session.user);
        try {
          const { data: profileData, error: profileError } =
            await getUserProfile(session.user.id);
          if (profileError) {
            console.error("Profile fetch error:", profileError);
            // We don't throw here as we don't want to break the app if profile fetch fails
          }
          setProfile(profileData);
        } catch (err) {
          console.error("Error fetching profile on auth change:", err);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in user:", email);

      // For simplicity in this demo, we'll do a password-based sign-in instead of OTP
      // since we have access to the user's password (randomly generated when creating the user)
      // In a real app, we would use signInWithOtp

      // Try to sign in with the demo method
      const { data, error } = await signInWithEmail(email);

      if (error) {
        console.error("Sign in error:", error);
        throw new Error(error.message || "Failed to sign in");
      }

      console.log("Sign in successful for demo:", data);

      // In a real app with magic links, we would now wait for the user to click the link
      // For demo purposes, we'll just say the login was successful and they'll get an email

      return {
        success: true,
        message:
          "Sign in successful! You will be redirected to your dashboard shortly.",
      };
    } catch (err) {
      console.error("Detailed sign in error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in");
      return {
        success: false,
        message: err instanceof Error ? err.message : "Failed to sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
