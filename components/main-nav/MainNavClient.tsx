"use client";

import { useState, useEffect } from "react";
import FullScreen from "./FullScreen";
import MobileScreen from "./MobileScreen";
import { TUserAccount } from "@/types/user.type";

export default function MainNavClient({
  navList,
  isUserLoggedIn,
  cartLength,
  profileUser,
}: {
  navList: { name: string; href: string }[];
  isUserLoggedIn: boolean;
  cartLength: number;
  profileUser: TUserAccount | null;
}) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`w-full bg-white ${
        isSticky ? "fixed top-0 right-0 left-0 z-50 transition-all" : ""
      }`}
    >
      <div className="hidden lg:block">
        <FullScreen
          navList={navList}
          isUserLoggedIn={isUserLoggedIn}
          cartLength={cartLength}
          profileUser={profileUser}
        />
      </div>

      <div className="lg:hidden">
        <MobileScreen
          navList={navList}
          isUserLoggedIn={isUserLoggedIn}
          cartLength={cartLength}
          profileUser={profileUser}
        />
      </div>
    </section>
  );
}
