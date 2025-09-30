import { Button } from "@/components/animate-ui/components/buttons/button";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userData } from "@/consts/user";

export default function AccountPage() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold">Manage My Account</h2>

      <div className="mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full rounded-xl bg-white p-5">
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
                <p>{userData.personalInfo.name}</p>
              </div>

              <Separator className="mt-1.5 mb-2.5" />

              <div className="flex items-center justify-between">
                <h3>Email</h3>
                <p>{userData.personalInfo.email}</p>
              </div>

              <Separator className="mt-1.5 mb-2.5" />

              <div className="flex items-center justify-between">
                <h3>Country</h3>
                <p>{userData.personalInfo.country}</p>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Receive marketing email</Label>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Address Book</h2>
              <Button
                variant="ghost"
                className="text-secondary hover:text-secondary text-xl"
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="col-span-2 rounded-xl bg-white p-5">
            <div>
              <h2 className="text-xl font-semibold">Recent orders</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
