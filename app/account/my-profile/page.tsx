import { Button } from "@/components/animate-ui/components/buttons/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userData } from "@/consts/user";

export default function MyProfilePage() {
  const ShowField = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="space-y-0.5">
        <p className="text-sm text-neutral-300">{title}</p>
        <p>{value}</p>
      </div>
    );
  };

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">My Profile</h2>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <h2 className="text-xl font-semibold">Personal Info</h2>

        <Avatar className="mt-5 size-28">
          <AvatarImage src={userData.personalInfo.image} />
          <AvatarFallback>
            {userData.personalInfo.name.split(" ")[0][0]}
            {userData.personalInfo.name.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <ShowField title="Name" value={userData.personalInfo.name} />
          <ShowField title="Email" value={userData.personalInfo.email} />
          <ShowField title="Phone" value={userData.personalInfo.phone} />
          <ShowField title="Country" value={userData.personalInfo.country} />
        </div>

        <div className="mt-5 flex justify-end">
          <Button>Edit Profile</Button>
        </div>
      </div>
    </section>
  );
}
