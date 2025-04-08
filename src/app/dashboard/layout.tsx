"use client";

import { useEffect } from "react";
import RequireAuth from "@/lib/requireAuth";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resetLoading } = useAuth();

  // Reset any stuck loading states when the dashboard layout is mounted
  useEffect(() => {
    console.log(
      "Dashboard layout mounted - resetting any stuck loading states"
    );

    // Use a small delay to let initial auth checks complete
    const timer = setTimeout(() => {
      resetLoading();
    }, 500);

    return () => clearTimeout(timer);
  }, [resetLoading]);

  return <RequireAuth>{children}</RequireAuth>;
}
