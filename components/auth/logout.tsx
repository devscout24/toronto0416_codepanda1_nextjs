"use client";

import { useCallback } from "react";
import { BadgeAlert } from "lucide-react";
import { Button } from "../ui/button";

export default function Logout() {
  const handleCancel = useCallback(() => window.history.back(), []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    window.history.back();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <BadgeAlert className="size-20" />

      <div className="text-center">
        <p>Are you sure,</p>
        <p>You want to logout?</p>
      </div>

      <div className="flex items-center justify-center gap-2.5">
        <Button
          variant="outline"
          className="w-full flex-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          className="w-full flex-1"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </section>
  );
}
