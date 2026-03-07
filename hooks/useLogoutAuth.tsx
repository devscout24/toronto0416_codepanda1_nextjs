// hooks/useLogout.ts
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/action";

export const useLogoutAuth = () => {
  const router = useRouter();

  // The hook exposes this function
  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  return { handleLogout };
};
