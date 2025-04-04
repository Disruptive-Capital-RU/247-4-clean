import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use server-side environment variables to create a Supabase client with admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing environment variables for Supabase admin client");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create a Supabase client with the service role key (admin privileges)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Parse the request body
    const { id, email, name, conciergeEndDate } = await request.json();

    if (!id || !email || !name || !conciergeEndDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Creating user with admin privileges:", { id, email, name });

    // Insert the user using the admin client which bypasses RLS
    const { data, error } = await supabaseAdmin.from("users").insert([
      {
        id,
        email,
        name,
        concierge_end_date: conciergeEndDate,
      },
    ]);

    if (error) {
      console.error("Error creating user with admin privileges:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Unexpected error in create-user API:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
