import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, hashPassword } from "@/lib/auth";
import { CreateUserRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const hasAdminAccess = await isAdmin();
    if (!hasAdminAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body: CreateUserRequest = await request.json();
    const { email, password, role, full_name } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, dan role wajib diisi" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert({
        email,
        password_hash: passwordHash,
        role,
        full_name: full_name || null,
        is_active: true,
      })
      .select()
      .single();

    if (userError) {
      return NextResponse.json(
        { error: "Gagal membuat user: " + userError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        full_name: newUser.full_name,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
