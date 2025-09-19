import { NextRequest, NextResponse } from "next/server";
import { isAdmin, hashPassword } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function PUT(request: NextRequest) {
  try {
    // Check if user is admin
    const hasAdminAccess = await isAdmin();
    if (!hasAdminAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { user_id, new_password } = body;

    if (!user_id || !new_password) {
      return NextResponse.json(
        { error: "User ID dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, full_name")
      .eq("id", user_id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hash new password
    const newPasswordHash = await hashPassword(new_password);

    // Update password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: newPasswordHash })
      .eq("id", user_id);

    if (updateError) {
      return NextResponse.json(
        { error: "Gagal reset password: " + updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password untuk ${userData.email} berhasil direset`,
      user: {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
      },
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem" },
      { status: 500 }
    );
  }
}
