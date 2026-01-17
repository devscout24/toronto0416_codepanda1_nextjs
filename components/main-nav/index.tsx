import { isUser } from "./actions";
import { getCartLength } from "./actions";
import { getProfileInfo } from "@/app/account/components/action";
import { TUserAccount } from "@/types/user.type";
import MainNavClient from "./MainNavClient";

export default async function MainNav() {
  const isUserLoggedIn = await isUser();

  let cartLength = 0;
  let profileUser: TUserAccount | null = null;

  if (isUserLoggedIn) {
    cartLength = await getCartLength();
    profileUser = await getProfileInfo();
  }

  const navList = [
    { name: "Home", href: "/" },
    { name: "All Category", href: "/all-category" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <MainNavClient
      navList={navList}
      isUserLoggedIn={isUserLoggedIn}
      cartLength={cartLength}
      profileUser={profileUser}
    />
  );
}
