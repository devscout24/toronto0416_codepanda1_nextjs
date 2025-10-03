// components/Breadcrumbs.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

function formatLabel(label: string) {
  // Check if the label is a number (ID)
  if (/^\d+$/.test(label)) {
    return "Details"; // Replace ID/number with "Details"
  }
  return label
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Exclude breadcrumb on the home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="border-t bg-white py-2.5">
      <BreadcrumbList className="section-container">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem
                className={index < segments.length - 1 ? "" : "text-black"}
              >
                <BreadcrumbLink asChild>
                  <Link href={href}>{formatLabel(segment)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index < segments.length - 1 && (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
