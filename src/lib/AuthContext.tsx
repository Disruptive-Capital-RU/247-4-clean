"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
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
  resetLoading: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const previousPathRef = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Track path changes to prevent auth rechecks during internal navigation
  useEffect(() => {
    if (previousPathRef.current && previousPathRef.current !== pathname) {
      console.log(`Navigation from ${previousPathRef.current} to ${pathname}`);
      // Don't show loading screen for internal navigation if already authenticated
      if (user) {
        setLoading(false);
      }
    }
    previousPathRef.current = pathname;
  }, [pathname, user]);

  // Force reset loading state - used as an escape hatch
  const resetLoading = () => {
    console.log("Manually resetting loading state");
    setLoading(false);
  };

  // Initial auth check that runs once
  useEffect(() => {
    // Check for active session on mount
    const checkUser = async () => {
      try {
        setLoading(true);
        // Check if we have auth data in localStorage to avoid a loading flash
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }

        const user = await getCurrentUser();
        console.log("Current user from session:", user?.email);

        if (user) {
          // Store minimal user data in localStorage for quick access
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              id: user.id,
              email: user.email,
            })
          );

          setUser(user);

          const { data: profileData, error: profileError } =
            await getUserProfile(user.id);
          if (profileError) {
            console.error("Profile error:", profileError);
            throw new Error(profileError.message);
          }
          setProfile(profileData);
        } else {
          // Clear stored user if no active session
          localStorage.removeItem("authUser");
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    checkUser();
  }, []);

  // Set up auth state change subscription
  useEffect(() => {
    if (!isInitialized) return;

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);

      // Only set loading to true for meaningful auth events
      if (event !== "INITIAL_SESSION" && event !== "TOKEN_REFRESHED") {
        setLoading(true);
      }

      // Special handling for SIGNED_IN event
      if (event === "SIGNED_IN") {
        console.log("User signed in event detected");
        // Store session info
        if (session?.access_token) {
          localStorage.setItem("sb-access-token", session.access_token);
          localStorage.setItem("sb-refresh-token", session.refresh_token || "");
        }
      }

      if (session?.user) {
        // Store minimal user data in localStorage for quick access
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            id: session.user.id,
            email: session.user.email,
          })
        );

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
        localStorage.removeItem("authUser");
        localStorage.removeItem("sb-access-token");
        localStorage.removeItem("sb-refresh-token");
        setUser(null);
        setProfile(null);
      }

      // Only set loading to false for meaningful auth events
      if (event !== "INITIAL_SESSION" && event !== "TOKEN_REFRESHED") {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isInitialized]);

  // Handle visibility changes to prevent reload on window focus
  useEffect(() => {
    if (!isInitialized) return;

    const handleVisibilityChange = () => {
      // Don't trigger auth rechecks when the tab becomes visible again
      if (document.visibilityState === "visible") {
        console.log("Tab became visible, checking auth state");
        // If we have a user locally but loading is true, reset loading
        if (user && loading) {
          console.log("Forcing loading state to false on visibility change");
          setLoading(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isInitialized, user, loading]);

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
      // First clear the user and profile state to ensure immediate UI update
      localStorage.removeItem("authUser");
      setUser(null);
      setProfile(null);

      // Then perform the actual signout
      const { error } = await signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }

      // Navigate after state is cleared
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
        resetLoading,
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
