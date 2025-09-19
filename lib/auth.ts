import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { UserRole, User } from "./types";
import bcrypt from "bcryptjs";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) return null;

    const supabase = await createClient();

    // Get user from session
    const { data: session } = await supabase
      .from("user_sessions")
      .select(
        `
        *,
        users (*)
      `
      )
      .eq("session_token", sessionToken)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (!session || !session.users) return null;

    const user = Array.isArray(session.users)
      ? session.users[0]
      : session.users;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const supabase = await createClient();

    // Get user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return { success: false, error: "Email atau password salah" };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return { success: false, error: "Email atau password salah" };
    }

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await supabase.from("user_sessions").insert({
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Terjadi kesalahan sistem" };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (sessionToken) {
      const supabase = await createClient();
      await supabase
        .from("user_sessions")
        .delete()
        .eq("session_token", sessionToken);
    }

    cookieStore.delete("session_token");
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roleHierarchy: Record<UserRole, number> = {
    siswa: 1,
    alumni: 2,
    guru: 3,
    admin: 4,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    siswa: "Siswa",
    alumni: "Alumni",
    guru: "Guru",
    admin: "Administrator",
  };

  return roleNames[role];
}

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
