"use client";

import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { usePathname } from "next/navigation";

const baseLinkClasses =
  "px-2 py-1 transition-colors duration-300 hover:text-primary focus-visible:outline-none";
const getLinkClasses = (isActive: boolean) =>
  `${baseLinkClasses} ${isActive ? "text-primary font-semibold" : "text-neutral-600"}`;

export const NavItem = ({
  name,
  href,
  onNavigate,
}: {
  name: string;
  href: string;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={getLinkClasses(isActive)}
          data-active={isActive ? "true" : undefined}
          aria-current={isActive ? "page" : undefined}
        >
          <Link href={href} onClick={onNavigate}>
            <h3 className="text-lg font-semibold md:text-xl lg:text-base">
              {name}
            </h3>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};
