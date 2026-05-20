"use client";

import Link from "next/link";
import { NavItem } from "./NavItem";
import SufisLogo from "../logo";
import { NavigationMenu } from "../ui/navigation-menu";
import { IconButton } from "../animate-ui/components/buttons/icon";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import { Button } from "../animate-ui/components/buttons/button";
import { TUserAccount } from "@/types/user.type";
import SearchField from "./searchField";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../animate-ui/components/radix/dialog";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FullScreen({
  navList,
  isUserLoggedIn,
  cartLength,
  profileUser,
}: {
  navList: { name: string; href: string }[];
  isUserLoggedIn: boolean;
  cartLength: number;
  profileUser: TUserAccount | null;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <nav className="section-container flex w-full items-center justify-between py-2">
      <div className="flex items-center gap-16">
        <SufisLogo size={6} />

        <NavigationMenu className="gap-6! xl:gap-10">
          {navList.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-3 xl:gap-5">
        <div className="hidden lg:block">
          <SearchField />
        </div>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger className="hidden md:block lg:hidden" asChild>
            <button aria-label="Open search">
              <Search className="size-7" />
            </button>
          </DialogTrigger>
          <DialogContent className="top-0 left-0 w-72 translate-x-0 translate-y-0 rounded-none rounded-b-2xl p-4 sm:top-[5%] sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:rounded-2xl">
            <div className="flex items-center gap-2">
              <SearchField isTablet />
            </div>
          </DialogContent>
        </Dialog>

        {isUserLoggedIn ? (
          <>
            <Link href="/account/my-wishlist">
              <IconButton className="bg-primary-700 flex size-11 items-center justify-center rounded-full text-white">
                <LoveIcon className="mt-1 ml-1 size-[1.3rem]" />
              </IconButton>
            </Link>

            <Link href="/cart">
              <IconButton className="bg-primary-700 relative flex size-11 items-center justify-center rounded-full text-white">
                <BagIcon className="size-6" />
                {cartLength > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                    {cartLength < 10 ? cartLength : "9+"}
                  </Badge>
                )}
              </IconButton>
            </Link>

            <Link href={"/account"}>
              <Avatar className="size-11 bg-gray-100">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${profileUser?.profile_image}`}
                />
                <AvatarFallback className="bg-gray-300 font-medium">
                  {profileUser?.name
                    ? `${profileUser.name.split(" ")[0]?.[0] || ""}${
                        profileUser.name.split(" ")[1]?.[0] || ""
                      }`
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <Link href="/cart">
              <IconButton className="bg-primary-700 relative flex size-11 items-center justify-center rounded-full text-white">
                <BagIcon className="size-6" />
                {cartLength > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                    {cartLength < 10 ? cartLength : "9+"}
                  </Badge>
                )}
              </IconButton>
            </Link>
            <Link href="?login-modal=login" scroll={false}>
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
