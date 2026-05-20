import { isUser } from "./actions";
import { getCartLength } from "./actions";
import { getProfileInfo } from "@/app/account/components/action";
import { TUserAccount } from "@/types/user.type";
import MainNavClient from "./MainNavClient";

export default async function MainNav() {
  const isUserLoggedIn = await isUser();
  
  let cartLength = 0;
  cartLength = await getCartLength();
  let profileUser: TUserAccount | null = null;

  if (isUserLoggedIn) {
    profileUser = await getProfileInfo();
  }

  const navList = [
    { name: "Home", href: "/" },
    { name: "All Category", href: "/all-category" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const navListMobile = [
    {
      name: "Resources",
      menu: [
        { name: "Home", href: "/" },
        { name: "All Category", href: "/all-category" },
        { name: "Best Selling", href: "/best-selling" },
        { name: "Weekly Special", href: "/weekly-special" },
        { name: "Explore All", href: "/explore-all" },
      ],
    },

    {
      name: "Information",
      menu: [
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Condition", href: "/terms-condition" },
      ],
    },
  ];

  return (
    <MainNavClient
      navList={navList}
      navListMobile={navListMobile}
      isUserLoggedIn={isUserLoggedIn}
      cartLength={cartLength}
      profileUser={profileUser}
    />
  );
}
