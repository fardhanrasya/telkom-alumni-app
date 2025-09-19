"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { RoleBadge } from "./role-badge";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user from server
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <div className="w-24 h-8 bg-muted animate-pulse rounded"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Halo, {user.full_name || user.email}!</span>
          <RoleBadge role={user.role} />
        </div>
        {user.role === "admin" && (
          <Button asChild size="sm" variant="outline">
            <Link href="/admin">Dashboard Admin</Link>
          </Button>
        )}
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Masuk</Link>
      </Button>
    </div>
  );
}
