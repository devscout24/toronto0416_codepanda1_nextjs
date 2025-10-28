"use client";

import { addOrRemoveWishList } from "@/app/all-category/components/action";
import LikeIcon from "@/assets/icons/love.svg";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { MouseEvent} from "react";

export default function LikeButton({ payload }: { payload?: TProduct }) {

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!payload?.id) return;
    try {
      await addOrRemoveWishList(payload.id);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <IconButton
      variant="secondary"
      className={cn(
        "bg-secondary-100 hover:text-secondary text-secondary-foreground hover:bg-secondary-100 rounded-full duration-200",
        payload?.isFavorite && "text-secondary",
      )}
      onClick={handleClick}
    >
      <LikeIcon className="mt-0.5 size-[18px]" />
    </IconButton>
  );
}
