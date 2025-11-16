import { Button } from "@/components/animate-ui/components/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Header from "../components/header";
import { getProfileInfo } from "../components/action";
import { TUserAccount } from "@/types/user.type";

const ShowField = ({ title, value }: { title?: string; value?: string }) => {
  return (
    <div className="space-y-0.5">
      <p className="text-sm text-neutral-300">{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default async function MyProfilePage() {
  let userData: TUserAccount | null = null;

  try {
    const response = await getProfileInfo(); // returns TUserAccount | null
    if (response) {
      userData = response; // assign the single object
    }
  } catch (error) {
    console.error("Error fetching profile info:", error);
  }
  return (
    <section className="w-full">
      {/* <h2 className="text-xl font-semibold">My Profile</h2> */}
      <Header>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <h2 className="text-xl font-semibold">Personal Info</h2>

        <Avatar className="mt-5 size-28">
          <AvatarImage src={userData?.image} />

          <AvatarFallback className="text-4xl font-semibold">
            {userData?.name?.split(" ")[0]?.[0]}
            {userData?.name?.split(" ")[1]?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>


        <div className="mt-5 grid grid-cols-2 gap-5">
          <ShowField title="Name" value={userData?.name || ""} />
          <ShowField title="Email" value={userData?.email || ""} />
          <ShowField title="Phone" value={userData?.phone || ""} />
          <ShowField title="Country" value={userData?.country || ""} />
        </div>

        <Link href={"?profile-edit-modal=profile-edit"}>
          <div className="mt-5 flex justify-end">
            <Button>Edit Profile</Button>
          </div>
        </Link>
      </div>
    </section>
  );
}
