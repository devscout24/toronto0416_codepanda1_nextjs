import Link from "next/link";
import { NavItem } from ".";
import SufisLogo from "../logo";
import { NavigationMenu } from "../ui/navigation-menu";
import { IconButton } from "../animate-ui/components/buttons/icon";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchIcon from "@/assets/icons/search.svg";
import LoveIcon from "@/assets/icons/love.svg";
import BagIcon from "@/assets/icons/bag.svg";
import { Input } from "../ui/input";
import { Button } from "../animate-ui/components/buttons/button";

export default function FullScreen({
  navList,
  isUserLoggedIn,
}: {
  navList: { name: string; href: string }[];
  isUserLoggedIn: boolean;
}) {
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
          <div className="relative w-full">
            <Input
              placeholder="Search"
              className="w-[15rem] xl:w-[18rem] rounded-full pr-8"
            />
            <SearchIcon className="absolute top-1.5 right-2 size-[1.5rem]" />
          </div>

          <Link href="/account/my-wishlist">
            <IconButton className="bg-primary-700 flex size-11 items-center justify-center rounded-full text-white">
              <LoveIcon className="mt-1 ml-1 size-[1.3rem]" />
            </IconButton>
          </Link>

          <Link href="/cart">
            <IconButton className="bg-primary-700 relative flex size-11 items-center justify-center rounded-full text-white">
              <BagIcon className="size-[1.5rem]" />
              <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500">
                9+
              </Badge>
            </IconButton>
          </Link>

          <Link href={"/account"}>
            <Avatar className="size-11">
              <AvatarImage src="/images/images.png" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div className="relative w-full">
            <Input
              placeholder="Search"
              className="w-[18rem] rounded-full pr-8"
            />
            <SearchIcon className="absolute top-1.5 right-2 size-[1.5rem]" />
          </div>

          <Link href="?login-modal=login">
            <Button variant="secondary">Sign in</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
