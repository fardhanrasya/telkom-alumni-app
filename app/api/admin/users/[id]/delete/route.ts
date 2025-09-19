import { NextRequest, NextResponse } from "next/server";
import { isAdmin, getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check if user is admin
    const hasAdminAccess = await isAdmin();
    if (!hasAdminAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get current admin user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Prevent admin from deleting themselves
    if (currentUser.id === params.id) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus akun sendiri" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user exists
    const { data: userToDelete, error: userError } = await supabase
      .from("users")
      .select("id, email, full_name, role")
      .eq("id", params.id)
      .single();

    if (userError || !userToDelete) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Delete user sessions first
    await supabase.from("user_sessions").delete().eq("user_id", params.id);

    // Delete user
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("id", params.id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Gagal menghapus user: " + deleteError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User ${userToDelete.email} berhasil dihapus`,
      deleted_user: {
        id: userToDelete.id,
        email: userToDelete.email,
        full_name: userToDelete.full_name,
        role: userToDelete.role,
      },
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem" },
      { status: 500 }
    );
  }
}
