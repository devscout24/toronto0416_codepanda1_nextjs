import { Button } from "@/components/animate-ui/components/buttons/button";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TPersonalInfo } from "@/types/user.type";

export default function PersonalInfo({
  userData,
}: {
  userData: TPersonalInfo;
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personal Info</h2>
        <Button
          variant="ghost"
          className="text-secondary hover:text-secondary text-xl"
        >
          Edit
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3>Name</h3>
          <p>{userData.name}</p>
        </div>

        <Separator className="mt-1.5 mb-2.5" />

        <div className="flex items-center justify-between">
          <h3>Email</h3>
          <p>{userData.email}</p>
        </div>

        <Separator className="mt-1.5 mb-2.5" />

        <div className="flex items-center justify-between">
          <h3>Country</h3>
          <p>{userData.country}</p>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Receive marketing email</Label>
        </div>
      </div>
    </>
  );
}
