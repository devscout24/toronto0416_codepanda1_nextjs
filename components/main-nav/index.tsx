"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useEffect, useState } from "react";
import FullScreen from "./FullScreen";
import MobileScreen from "./MobileScreen";

export const NavItem = ({ name, href }: { name: string; href: string }) => (
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href={href}>
        <h3 className="text-2xl font-semibold lg:text-base">{name}</h3>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
);

export default function MainNav() {
  const [isSticky, setIsSticky] = useState(false);
  const navList = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Category",
      href: "/all-category",
    },
    {
      name: "About Us",
      href: "/",
    },
    {
      name: "Contact Us",
      href: "/",
    },
  ];

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`w-full bg-white ${
        isSticky
          ? "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out"
          : ""
      }`}
      style={{
        top: isSticky ? "0" : "auto",
      }}
    >
      <div className="hidden lg:block">
        <FullScreen navList={navList} />
      </div>
      <div className="lg:hidden">
        <MobileScreen navList={navList} />
      </div>
    </section>
  );
}
