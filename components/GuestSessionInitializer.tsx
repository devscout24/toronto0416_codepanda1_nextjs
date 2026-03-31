"use client";

import { useEffect } from "react";
import { ensureGuestSessionIdClient } from "@/lib/guest-session";

export default function GuestSessionInitializer() {
  useEffect(() => {
    void ensureGuestSessionIdClient();
  }, []);

  return null;
}
