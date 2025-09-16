import Logo from "@/assets/svgs/Sufis_Logo.svg";
import SearchIcon from "@/assets/icons/search.svg";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  // NavigationMenuTrigger,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "../animate-ui/components/buttons/icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { Badge } from "../ui/badge";

export default function MainNav() {
  const FullScreen = () => (
    <nav className="section-container flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-16">
        <Link href="/">
          <Logo className="cursor-pointer" />
        </Link>

        <NavigationMenu className="gap-10">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="font-semibold">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>All Category</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink className="w-96">Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList> */}

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="font-semibold">
                  All Category
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="font-semibold">
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="font-semibold">
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-5">
        <IconButton
          variant="ghost"
          className="flex size-11 items-center justify-center rounded-full"
        >
          <SearchIcon className="size-[1.5rem]" />
        </IconButton>

        <IconButton className="bg-primary flex size-11 items-center justify-center rounded-full text-white">
          <LoveIcon className="mt-0.5 size-[1.1rem]" />
        </IconButton>

        <IconButton className="bg-primary relative flex size-11 items-center justify-center rounded-full text-white">
          <BagIcon className="size-[1.5rem]" />
          <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
            9+
          </Badge>
        </IconButton>

        <Avatar className="size-11">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );

  const MobileScreen = () => (
    <nav className="section-container flex items-center justify-between">
      <Link href="/">
        <Logo className="cursor-pointer" />
      </Link>

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
            <Logo className="cursor-pointer" />
          </SheetHeader>

          <div className="flex items-center justify-center gap-5">
            <IconButton
              variant="ghost"
              className="flex size-11 items-center justify-center rounded-full"
            >
              <SearchIcon className="size-[1.5rem]" />
            </IconButton>

            <IconButton className="bg-primary flex size-11 items-center justify-center rounded-full text-white">
              <LoveIcon className="mt-1 ml-0.5 size-[1.2rem]" />
            </IconButton>

            <IconButton className="bg-primary relative flex size-11 items-center justify-center rounded-full text-white">
              <BagIcon className="size-[1.5rem]" />
              <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                9+
              </Badge>
            </IconButton>
          </div>

          <div className="ml-6">
            <NavigationMenu className="flex-col items-start">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="font-semibold">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>

              {/* <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>All Category</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink className="w-96">
                        Link
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList> */}

              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="font-semibold">
                      All Category
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="font-semibold">
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="font-semibold">
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );

  return (
    <section className="w-full bg-white">
      <div className="hidden lg:block">
        <FullScreen />
      </div>
      <div className="lg:hidden">
        <MobileScreen />
      </div>
    </section>
  );
}
