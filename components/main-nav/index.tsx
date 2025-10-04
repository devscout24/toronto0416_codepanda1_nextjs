"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useEffect, useState } from "react";
import FullScreen from "./FullScreen";
import MobileScreen from "./MobileScreen";
import { usePathname } from "next/navigation";

const baseLinkClasses =
  "px-2 py-1 transition-colors duration-300 hover:text-primary focus-visible:outline-none";
const getLinkClasses = (isActive: boolean) =>
  `${baseLinkClasses} ${isActive ? "text-primary font-semibold" : "text-neutral-600"}`;

export const NavItem = ({ name, href }: { name: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          href={href}
          className={getLinkClasses(isActive)}
          data-active={isActive ? "true" : undefined}
          aria-current={isActive ? "page" : undefined}
        >
          <h3 className="text-2xl font-semibold lg:text-base">{name}</h3>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default function MainNav() {
  const [isSticky, setIsSticky] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const isUserLoggedIn = true;

  const navList = [
    { name: "Home", href: "/" },
    { name: "All Category", href: "/all-category" },
    // { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);

    if (typeof window !== "undefined") {
      setIsUserLoggedIn(localStorage.getItem("user") === null ? false : true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`w-full bg-white ${
        isSticky
          ? "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out"
          : ""
      }`}
      style={{ top: isSticky ? "0" : "auto" }}
    >
      <div className="hidden lg:block">
        <FullScreen navList={navList} isUserLoggedIn={isUserLoggedIn} />
      </div>
      <div className="lg:hidden">
        <MobileScreen navList={navList} isUserLoggedIn={isUserLoggedIn} />
      </div>
    </section>
  );
}
