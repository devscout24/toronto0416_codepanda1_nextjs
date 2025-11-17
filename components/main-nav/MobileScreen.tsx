"use client";

import Link from "next/link";
import { IconButton } from "../animate-ui/components/buttons/icon";
import SufisLogo from "../logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { NavigationMenu } from "../ui/navigation-menu";
import { NavItem } from ".";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import { Menu } from "lucide-react";
import { Button } from "../animate-ui/components/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchField from "./searchField";
import { useEffect, useState } from "react";
import { getCartLength } from "./actions";
import { TUserAccount } from "@/types/user.type";
import { getProfileInfo } from "@/app/account/components/action";

export default function MobileScreen({
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
    <nav className="section-container flex items-center justify-between">
      <SufisLogo />

      <Sheet>
        <SheetTrigger asChild>
          <IconButton>
            <Menu />
          </IconButton>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="sr-only">Main menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation links and quick actions
          </SheetDescription>
          <SheetHeader className="flex items-center justify-center">
            <SufisLogo size={10} />
          </SheetHeader>

          <SearchField isMobile />

          {isUserLoggedIn ? (
            <div className="flex items-center justify-center gap-5">
              <IconButton className="bg-primary flex size-11 items-center justify-center rounded-full text-white">
                <LoveIcon className="mt-1 ml-1 size-[1.3rem]" />
              </IconButton>

              <Link href="/cart">
                <IconButton className="bg-primary relative flex size-11 items-center justify-center rounded-full text-white">
                  <BagIcon className="size-6" />
                  {cartLength > 0 && (
                    <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                      {cartLength < 10 ? cartLength : "9+"}
                    </Badge>
                  )}
                </IconButton>
              </Link>

              <Link href={"/account"}>
                <Avatar className="size-11">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${profileUser?.profile_image}`}
                  />
                  <AvatarFallback>
                    {profileUser?.name?.split(" ")[0]?.[0]}
                    {profileUser?.name?.split(" ")[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <Link href="?login-modal=login" className="mx-2">
              <Button variant="secondary" className="w-full">
                Sign in
              </Button>
            </Link>
          )}

          <div className="ml-6">
            <NavigationMenu className="mt-8 flex-col items-start">
              {navList.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </NavigationMenu>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
