"use client";

import React from "react";
import HelpIcon from "@/assets/icons/profile (1).svg";
import PoliciesIcon from "@/assets/icons/profile (2).svg";
import SettingsIcon from "@/assets/icons/profile (3).svg";
import OrdersIcon from "@/assets/icons/profile (4).svg";
import PaymentIcon from "@/assets/icons/profile (5).svg";
import AddressIcon from "@/assets/icons/profile (6).svg";
import ProfileIcon from "@/assets/icons/profile (7).svg";
import UserIcon from "@/assets/icons/profile (8).svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    path: "/account/orders",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    path: "/account/settings",
  },
  {
    label: "Policies",
    icon: PoliciesIcon,
    path: "/account/policies",
  },
  {
    label: "Help & Support",
    icon: HelpIcon,
    path: "/account/help-support",
  },
];

const baseLinkClasses =
  "flex items-center gap-3 duration-300 hover:text-primary";
const getLinkClasses = (isActive: boolean) =>
  `${baseLinkClasses} ${isActive ? "text-primary" : "text-neutral-500"}`;

export default function SideNav() {
  const pathname = usePathname();

  const isPathActive = (path?: string): boolean =>
    path ? pathname === path : false;

  return (
    <nav>
      <h2 className="mb-5">Hello, Kodu Azad</h2>

      <ul className="space-y-5">
        {navItems.map((item, index) => {
          const children = item.children ?? [];
          const hasActiveChild = children.some((child) =>
            isPathActive(child.path),
          );
          const itemIsActive = isPathActive(item.path) || hasActiveChild;

          return (
            <li key={index}>
              {item.path ? (
                <Link
                  href={item.path}
                  className={getLinkClasses(itemIsActive)}
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
                    const childIsActive = isPathActive(child.path);

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
