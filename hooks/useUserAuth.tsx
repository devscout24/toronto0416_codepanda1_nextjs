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
  }, []);

  return { isUserLoggedIn, loading };
};
