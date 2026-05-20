"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const baseLinkClasses =
  "px-2 py-1 transition-colors duration-300 hover:text-primary focus-visible:outline-none block";
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
    <Link
      href={href}
      onClick={onNavigate}
      className={getLinkClasses(isActive)}
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <h3 className="text-base font-medium">{name}</h3>
    </Link>
  );
};
