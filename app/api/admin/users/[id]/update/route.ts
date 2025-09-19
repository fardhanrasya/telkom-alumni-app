import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/lib/types";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check if user is admin
    const hasAdminAccess = await isAdmin();
    if (!hasAdminAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { full_name, email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email dan role wajib diisi" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", params.id)
      .single();

    if (userError || !existingUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check if email already exists (if email is being changed)
    if (email !== existingUser.email) {
      const { data: emailCheck } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .neq("id", params.id)
        .single();

      if (emailCheck) {
        return NextResponse.json(
          { error: "Email sudah digunakan oleh user lain" },
          { status: 400 }
        );
      }
    }

    // Update user data
    const updateData: any = {
      full_name: full_name || null,
      email,
      role: role as UserRole,
    };

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: "Gagal mengupdate user: " + updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        full_name: updatedUser.full_name,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem" },
      { status: 500 }
    );
  }
}
