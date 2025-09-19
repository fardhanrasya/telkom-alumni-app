"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API fails, redirect to login
      router.push("/auth/login");
      router.refresh();
    }
  };

  return <Button onClick={logout}>Logout</Button>;
}
