"use client";

import Link from "next/link";
import { NavItem } from ".";
import SufisLogo from "../logo";
import { NavigationMenu } from "../ui/navigation-menu";
import { IconButton } from "../animate-ui/components/buttons/icon";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import { Button } from "../animate-ui/components/buttons/button";
import SearchField from "./searchField";
import { useEffect, useState } from "react";
import { getCartLength } from "./actions";
import { getProfileInfo } from "@/app/account/components/action";
import { TUserAccount } from "@/types/user.type";

export default function FullScreen({
  navList,
  isUserLoggedIn,
}: {
  navList: { name: string; href: string }[];
  isUserLoggedIn: boolean;
}) {
  const [cartLength, setCartLength] = useState(0);
  const [profileUser, setProfileUser] = useState<TUserAccount | null>(null);

  useEffect(() => {
    async function fetchCartLength() {
      try {
        const length = await getCartLength();
        setCartLength(length);
      } catch (error) {
        console.error("Error fetching cart length:", error);
      }
    }

    fetchCartLength();
  }, []);

  useEffect(() => {
    async function fetchProfileInfo() {
      if (!isUserLoggedIn) return;

      try {
        const response = await getProfileInfo();
        if (response) {
          // Set the profile image from the response
          if (response.profile_image) {
            setProfileUser(response);
          }
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    }

    fetchProfileInfo();
  }, [isUserLoggedIn]);

  return (
    <nav className="section-container flex w-full items-center justify-between py-2">
      <div className="flex items-center gap-16">
        <SufisLogo size={6} />

        {/* <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>All Category</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="w-96">Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList> */}

        <NavigationMenu className="gap-10">
          {navList.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </NavigationMenu>
      </div>

      {isUserLoggedIn ? (
        <div className="flex items-center gap-5">
          <SearchField />

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
              <AvatarFallback>
                {profileUser?.name
                  ? `${profileUser.name.split(" ")[0]?.[0] || ""}${
                      profileUser.name.split(" ")[1]?.[0] || ""
                    }`
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <SearchField />

          <Link href="?login-modal=login">
            <Button variant="secondary">Sign in</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
