"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, User, Handbag, Compass } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TUserAccount } from "@/types/user.type";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type BottomNavClientProps = {
  isUserLoggedIn: boolean;
  cartLength: number;
  profileUser: TUserAccount | null;
};

const loggedInNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/all-category", icon: Compass },
  { label: "Cart", href: "/cart", icon: Handbag },
  { label: "Wishlist", href: "/account/my-wishlist", icon: Heart },
  { label: "Account", href: "/account", icon: User },
];

const loggedOutNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/all-category", icon: Compass },
  { label: "Cart", href: "/cart", icon: Handbag },
];

export default function BottomNavClient({
  isUserLoggedIn,
  cartLength,
  profileUser,
}: BottomNavClientProps) {
  const pathname = usePathname();

  const navItems = isUserLoggedIn ? loggedInNavItems : loggedOutNavItems;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-100 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      <ul className="flex items-center justify-around px-2 py-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          const isCart = href === "/cart";

          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "group flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all duration-200",
                  isActive ? "text-green-600" : "text-gray-400",
                )}
              >
                <span
                  className={cn(
                    "relative flex h-8 w-10 items-center justify-center rounded-xl transition-all duration-200",
                    isActive
                      ? "scale-110 bg-green-50"
                      : "group-active:scale-95 group-active:bg-gray-100",
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {isCart && cartLength > 0 && (
                    <Badge className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 p-0 text-[9px] text-white">
                      {cartLength < 10 ? cartLength : "9+"}
                    </Badge>
                  )}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide",
                    isActive ? "opacity-100" : "opacity-60",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}

        {!isUserLoggedIn && (
          <li className="flex flex-1 items-center justify-center py-1">
            <Link
              href="?login-modal=login"
              className="bg-primary-700 rounded-full px-4 py-2 text-xs font-semibold text-white transition-opacity active:opacity-80"
            >
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
