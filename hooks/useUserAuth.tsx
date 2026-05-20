"use client";

import { isUser } from "@/components/main-nav/actions";
import { useEffect, useState } from "react";

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
  }, []);

  return { isUserLoggedIn, loading };
};
