"use client";

import React from "react";
import HelpIcon from "@/assets/icons/profile (1).svg";
import PoliciesIcon from "@/assets/icons/profile (2).svg";
// import SettingsIcon from "@/assets/icons/profile (3).svg";
import OrdersIcon from "@/assets/icons/profile (4).svg";
import PaymentIcon from "@/assets/icons/profile (5).svg";
import AddressIcon from "@/assets/icons/profile (6).svg";
import ProfileIcon from "@/assets/icons/profile (7).svg";
import UserIcon from "@/assets/icons/profile (8).svg";
import LogOutIcon from "@/assets/icons/log-out.svg";
import LoveIcon from "@/assets/icons/heart.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type TNavItem = {
  label: string;
  icon: React.FC<React.SVGProps<SVGElement>>;
  path?: string;
  children?: TNavItem[];
};

const navItems: TNavItem[] = [
  {
    label: "Manage My Account",
    icon: UserIcon,
    path: "/account",
    children: [
      {
        label: "My Profile",
        icon: ProfileIcon,
        path: "/account/my-profile",
      },
      {
        label: "Address Book",
        icon: AddressIcon,
        path: "/account/address-book",
      },
      {
        label: "Payments & Billings",
        icon: PaymentIcon,
        path: "/account/payments-billings",
      },
    ],
  },
  {
    label: "My Orders",
    icon: OrdersIcon,
    path: "/account/my-orders",
  },
  // {
  //   label: "Settings",
  //   icon: SettingsIcon,
  //   path: "/account/settings",
  // },
  {
    label: "Wishlist",
    icon: LoveIcon,
    path: "/account/my-wishlist",
  },
  {
    label: "Policies",
    icon: PoliciesIcon,
    path: "/privacy-policy",
  },
  {
    label: "Help & Support",
    icon: HelpIcon,
    path: "/contact-us",
  },
  {
    label: "Logout",
    icon: LogOutIcon,
    path: "?logout-modal=logout",
  },
];

const baseLinkClasses =
  "flex items-center gap-3 duration-300 hover:text-primary";
const getLinkClasses = (isActive: boolean) =>
  `${baseLinkClasses} ${isActive ? "text-primary" : "text-neutral-500"}`;

export default function SideNav() {
  const pathname = usePathname();

  const matchPath = (path?: string, allowNested = false): boolean => {
    if (!path) return false;

    if (pathname === path) return true;

    if (!allowNested) return false;

    const normalized = path.endsWith("/") ? path : `${path}/`;
    return pathname.startsWith(normalized);
  };

  return (
    <nav>
      <h2 className="mb-5 font-semibold">Hello, Kodu Azad</h2>

      <ul className="space-y-5">
        {navItems.map((item, index) => {
          const children = item.children ?? [];
          const hasActiveChild = children.some((child) =>
            matchPath(child.path, true),
          );
          const itemIsActive =
            matchPath(item.path, children.length === 0) || hasActiveChild;

          return (
            <li key={index}>
              {item.path ? (
                <Link
                  href={item.path}
                  className={cn(
                    getLinkClasses(itemIsActive),
                    item.label === "Logout" &&
                      "text-red-500 hover:text-red-500",
                  )}
                  aria-current={itemIsActive ? "page" : undefined}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div className={getLinkClasses(itemIsActive)}>
                  <item.icon />
                  <span>{item.label}</span>
                </div>
              )}

              {children.length > 0 && (
                <ul className="mt-5 ml-5">
                  {children.map((child, childIndex) => {
                    const childIsActive = matchPath(child.path, true);

                    return (
                      <li key={childIndex}>
                        {child.path ? (
                          <Link
                            href={child.path}
                            className={getLinkClasses(childIsActive)}
                            aria-current={childIsActive ? "page" : undefined}
                          >
                            <child.icon />
                            <span>{child.label}</span>
                          </Link>
                        ) : (
                          <div className={getLinkClasses(childIsActive)}>
                            <child.icon />
                            <span>{child.label}</span>
                          </div>
                        )}

                        {childIndex !== children.length - 1 && (
                          <Separator className="my-2.5 bg-neutral-100" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
