"use client";

import { addOrRemoveWishList } from "@/app/all-category/components/action";
import LikeIcon from "@/assets/icons/love.svg";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { MouseEvent, useState } from "react";

export default function LikeButton({ payload }: { payload?: TProduct }) {
  const [isFavorite, setIsFavorite] = useState(payload?.isFavorite || false);
  const [loading, setLoading] = useState(false);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!payload?.id || loading) return;

    // Optimistic update
    setIsFavorite(!isFavorite);
    setLoading(true);

    try {
      await addOrRemoveWishList(payload.id);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // rollback if failed
      setIsFavorite(isFavorite);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      variant="secondary"
      className={cn(
        "bg-secondary-100 hover:text-secondary text-secondary-foreground hover:bg-secondary-100 rounded-full duration-200",
        isFavorite && "text-secondary",
        loading && "cursor-not-allowed opacity-60",
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <LikeIcon className="mt-0.5 size-[18px]" />
    </IconButton>
  );
}
