"use client";

import type { PropsWithChildren, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{ className?: string }>;

export default function CardActionGuard({ className, children }: Props) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
