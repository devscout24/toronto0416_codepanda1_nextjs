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
import SearchIcon from "@/assets/icons/search.svg";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import { Menu } from "lucide-react";

export default function MobileScreen({
  navList,
}: {
  navList: { name: string; href: string }[];
}) {
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

          <div className="flex items-center justify-center gap-5">
            <Link href={"?home-search-modal=search-modal"}>
              <IconButton
                variant="ghost"
                className="flex size-11 items-center justify-center rounded-full"
              >
                <SearchIcon className="size-[1.5rem]" />
              </IconButton>
            </Link>

            <IconButton className="bg-primary flex size-11 items-center justify-center rounded-full text-white">
              <LoveIcon className="mt-1 ml-1 size-[1.3rem]" />
            </IconButton>

            <Link href="/cart">
              <IconButton className="bg-primary relative flex size-11 items-center justify-center rounded-full text-white">
                <BagIcon className="size-[1.5rem]" />
                <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                  9+
                </Badge>
              </IconButton>
            </Link>
          </div>

          <div className="ml-6">
            <NavigationMenu className="flex-col items-start">
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
