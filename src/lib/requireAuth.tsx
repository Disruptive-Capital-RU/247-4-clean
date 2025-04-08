"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, resetLoading } = useAuth();
  const router = useRouter();
  const [showTimeout, setShowTimeout] = useState(false);
  const hasAuthenticated = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationCountRef = useRef(0);

  // If we've successfully loaded the user before, remember it
  useEffect(() => {
    if (user && !loading) {
      hasAuthenticated.current = true;
    }
  }, [user, loading]);

  // Main authentication effect
  useEffect(() => {
    // Clear any existing timeouts when dependencies change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Track navigation/mounting
    navigationCountRef.current += 1;
    console.log(
      `RequireAuth mounted/updated: ${navigationCountRef.current} times`
    );

    // Skip loading check if we've authenticated before
    if (hasAuthenticated.current && loading) {
      console.log(
        "Auth loading is true but we've authenticated before - skipping redirect check"
      );
      // Use an immediate timeout to reset loading state to avoid infinite loading
      setTimeout(() => {
        resetLoading();
      }, 100);
      return;
    }

    if (!loading && !user) {
      console.log("No authenticated user - redirecting to homepage");
      router.push("/");
    }

    // Add a timeout to handle cases where loading might get stuck
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        console.log(
          "Loading timeout triggered - authentication is taking too long"
        );
        setShowTimeout(true);
      }
    }, 5000); // 5 seconds timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user, loading, router, resetLoading]);

  // If we previously authenticated successfully and now we're loading again
  // (likely due to window focus), we can skip showing the loading UI
  if (loading && hasAuthenticated.current) {
    console.log("Already authenticated before, skipping loading screen");
    return <>{children}</>;
  }

  // Check for localStorage auth data as a fallback
  if (loading) {
    try {
      const storedAuth = localStorage.getItem("authUser");
      if (storedAuth) {
        console.log(
          "Found stored auth data, showing content instead of loading"
        );
        return <>{children}</>;
      }
    } catch (e) {
      console.error("Error checking localStorage:", e);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-pulse text-[#D4AF37] text-xl font-cormorant mb-4">
          Loading your exclusive experience...
        </div>
        {showTimeout && (
          <div className="text-white/80 text-sm max-w-md text-center">
            <p>It's taking longer than expected.</p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => {
                  setShowTimeout(false);
                  resetLoading();
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                }}
                className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-md transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => {
                  resetLoading();
                  router.push("/");
                }}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium rounded-md transition-colors"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
}
