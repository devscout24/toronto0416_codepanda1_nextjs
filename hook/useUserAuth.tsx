// hooks/useUserAuth.ts
"use client";

import { useEffect, useState } from "react";
import { isUser } from "@/utils/isUser";

export const useUserAuth = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      const loggedIn = await isUser();
      setIsUserLoggedIn(loggedIn);
      setLoading(false);
    };

    checkUserLoggedIn();

    // Poll every 5 seconds to check auth status
    const interval = setInterval(checkUserLoggedIn, 5000);

    return () => clearInterval(interval);
  }, []);

  return { isUserLoggedIn, loading };
};