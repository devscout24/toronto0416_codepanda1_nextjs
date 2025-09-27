"use client";

import LikeIcon from "@/assets/icons/love.svg";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";
import { MouseEvent, useState } from "react";

export default function LikeButton({
  favorite = false,
}: {
  favorite?: boolean;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(favorite);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <IconButton
      variant="secondary"
      className={cn(
        "bg-secondary-100 hover:text-secondary text-secondary-foreground hover:bg-secondary-100 rounded-full duration-200",
        isLiked && "text-secondary",
      )}
      onClick={handleClick}
    >
      <LikeIcon className="mt-0.5 size-[1.1rem]" />
    </IconButton>
  );
}
