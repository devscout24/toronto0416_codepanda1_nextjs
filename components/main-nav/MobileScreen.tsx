"use client";

import { useState } from "react";
import { NavItem } from "./NavItem";
import SufisLogo from "../logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../animate-ui/components/radix/dialog";
import { IconButton } from "../animate-ui/components/buttons/icon";
import { Clock3, Mail, MapPin, MapPinned, Menu, Search, X } from "lucide-react";
import { TUserAccount } from "@/types/user.type";
import SearchField from "./searchField";

type NavItem = {
  name: string;
  href: string;
};

export type NavGroup = {
  name: string;
  menu: NavItem[];
};

export default function MobileScreen({
  navListMobile,
}: {
  navListMobile: NavGroup[];
  isUserLoggedIn: boolean;
  cartLength: number;
  profileUser: TUserAccount | null;
}) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="section-container flex items-center justify-between">
      <SufisLogo />

      <div className="flex items-center gap-4">
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger asChild>
            <IconButton aria-label="Open search">
              <Search className="size-5" />
            </IconButton>
          </DialogTrigger>
          <DialogContent className="top-0 left-0 max-w-full translate-x-0 translate-y-0 rounded-none rounded-b-2xl p-4 sm:top-[5%] sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchField isMobile />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Sheet open={open} onOpenChange={setOpen}>
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
            <SheetHeader className="flex justify-center border-b border-gray-300">
              <SufisLogo size={6} />
            </SheetHeader>

            <div className="ml-6">
              {navListMobile.map((section) => (
                <div key={section.name} className="mt-6">
                  <p className="mb-3 border-b border-gray-300 pb-1 text-xs font-medium tracking-widest text-gray-500 uppercase">
                    {section.name}
                  </p>

                  <nav className="flex flex-col">
                    {section.menu.map((item) => (
                      <NavItem
                        key={item.name}
                        {...item}
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </nav>
                </div>
              ))}
              <div className="mt-6">
                <p className="mb-3 border-b border-gray-300 pb-1 text-xs font-medium tracking-widest text-gray-500 uppercase">
                  Contact
                </p>

                {[
                  {
                    icon: <MapPin size={14} />,
                    text: "Durham Region- Ajax, ON L1Z- OK5, Canada",
                  },
                  { icon: <Mail size={14} />, text: "info@sufismarket.com" },
                  {
                    icon: <Clock3 size={14} />,
                    text: "Next business day delivery (cutoff: 3 PM)",
                  },
                  {
                    icon: <MapPinned size={14} />,
                    text: "Ajax, Pickering, Whitby, Oshawa, Scarborough",
                  },
                ].map((item, idx) => (
                  <div className="mb-2 flex items-center gap-2" key={idx}>
                    <div>{item.icon}</div>
                    <p className="text-xs">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}