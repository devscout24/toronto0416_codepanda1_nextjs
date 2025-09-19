"use client";

import LikeIcon from "@/assets/icons/love.svg";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LikeButton({
  favorite = false,
}: {
  favorite?: boolean;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(favorite);

  return (
    <IconButton
      variant="secondary"
      className={cn(
        "bg-secondary-100 hover:text-secondary text-secondary-foreground hover:bg-secondary-100 rounded-full duration-200",
        isLiked && "text-secondary",
      )}
      onClick={() => setIsLiked(!isLiked)}
    >
      <LikeIcon className="mt-0.5 size-[1.1rem]" />
    </IconButton>
  );
}
