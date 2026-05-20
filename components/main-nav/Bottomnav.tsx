import { TUserAccount } from "@/types/user.type";
import { getCartLength, isUser } from "./actions";
import { getProfileInfo } from "@/app/account/components/action";
import BottomNavClient from "./BottomnavClient";

export default async function BottomNav() {
  const isUserLoggedIn = await isUser();

  let cartLength = 0;
  cartLength = await getCartLength();

  let profileUser: TUserAccount | null = null;
  if (isUserLoggedIn) {
    profileUser = await getProfileInfo();
  }

  return (
    <BottomNavClient
      isUserLoggedIn={isUserLoggedIn}
      cartLength={cartLength}
      profileUser={profileUser}
    />
  );
}
