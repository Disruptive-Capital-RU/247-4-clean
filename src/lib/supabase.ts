import { createClient } from "@supabase/supabase-js";

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

console.log("Supabase URL:", supabaseUrl.substring(0, 20) + "...");
console.log("Supabase Key available:", !!supabaseAnonKey);

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define database types
export type User = {
  id: string;
  email: string;
  name: string;
  concierge_end_date: string;
  created_at: string;
};

export type ConciergeRequest = {
  id: string;
  user_id: string;
  service_name: string;
  service_id: string;
  category: string;
  quantity: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  submitted_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  contact: string;
  arrival_date: string;
  departure_date: string;
  language: string;
  interests: string[];
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};

// Demo auth method for easier testing
export const demoSignIn = async (email: string) => {
  try {
    // Always normalize emails for consistency
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Attempting demo sign-in for:", normalizedEmail);

    // First look for the user in our users table
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("email, id")
      .eq("email", normalizedEmail);

    if (userError) {
      console.error("Error checking user existence:", userError);
      throw userError;
    }

    if (!users || users.length === 0) {
      console.error("User not found in users table:", normalizedEmail);

      // Check if the user exists in auth but not in our users table
      const { data: authUser, error: authError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: normalizedEmail, // Demo only!
        });

      // If auth login worked but user wasn't found in the users table,
      // we need to create a user profile
      if (authUser && !authError) {
        console.log(
          "User exists in auth but not in users table - needs profile creation"
        );
        return {
          error: {
            message:
              "User found in auth but missing profile. Please try again after profile creation.",
            code: "MISSING_PROFILE",
          },
        };
      }

      return {
        error: {
          message: "User not found. Please book a concierge first.",
        },
      };
    }

    console.log("User found in database:", users[0]);

    // User exists in our database, now try to sign them in
    // For demo purposes, we'll use password-based authentication with email as password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedEmail, // Demo only!
    });

    if (error) {
      console.log("Password login failed:", error.message);

      // If login fails, try to sign up the user
      if (error.message.includes("Invalid login credentials")) {
        console.log("Demo fallback: Try to sign up the user first");

        // Maybe user was created in our DB but not in auth - let's create them
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: normalizedEmail,
            password: normalizedEmail, // Demo only!
          });

        if (signUpError) {
          console.error("Sign up error in fallback:", signUpError);
          throw signUpError;
        }

        console.log("User signed up successfully, trying login again");

        // Try login again
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: normalizedEmail, // Demo only!
          });

        if (loginError) {
          console.error("Second login attempt failed:", loginError);
          throw loginError;
        }

        console.log("Second login attempt successful");
        return { data: loginData };
      }

      throw error;
    }

    console.log("Login successful on first attempt");
    return { data };
  } catch (error) {
    console.error("Demo sign in error:", error);
    return { error };
  }
};

// Auth helpers
export const signInWithEmail = async (email: string) => {
  // For the demo, let's use a simpler approach
  return demoSignIn(email);

  // In a real app, we'd use OTP:
  // return supabase.auth.signInWithOtp({
  //   email,
  //   options: {
  //     emailRedirectTo: `${window.location.origin}/dashboard`,
  //   },
  // });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// User profile helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
};

export const createUserProfile = async (
  userId: string,
  email: string,
  name: string,
  endDate?: Date
) => {
  // Calculate concierge end date (3 days from now by default)
  const conciergeEndDate = endDate || new Date();
  if (!endDate) {
    conciergeEndDate.setDate(conciergeEndDate.getDate() + 3);
  }

  const { data, error } = await supabase.from("users").insert([
    {
      id: userId,
      email: email.trim().toLowerCase(), // Always normalize emails
      name,
      concierge_end_date: conciergeEndDate.toISOString(),
    },
  ]);

  return { data, error };
};

// Booking helpers
export const getBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const createBooking = async (
  booking: Omit<Booking, "id" | "created_at">
) => {
  const { data, error } = await supabase.from("bookings").insert([booking]);

  return { data, error };
};

// Concierge request helpers
export const getConciergeRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from("concierge_requests")
    .select("*")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  return { data, error };
};

export const createConciergeRequest = async (
  userId: string,
  services: Array<{
    service_id: string;
    service_name: string;
    category: string;
    quantity: number;
  }>
) => {
  const requests = services.map((service) => ({
    user_id: userId,
    service_id: service.service_id,
    service_name: service.service_name,
    category: service.category,
    quantity: service.quantity,
    status: "pending",
    submitted_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("concierge_requests")
    .insert(requests);

  return { data, error };
};

// Helper to check remaining days for concierge service
export const getRemainingDays = (endDateString: string): number => {
  const endDate = new Date(endDateString);
  const today = new Date();

  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};
