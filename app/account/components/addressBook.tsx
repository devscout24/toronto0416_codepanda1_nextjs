import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TAddressBookEntry } from "@/types/user.type";
import Link from "next/link";

export default function AddressBook({
  addressBook,
}: {
  addressBook: TAddressBookEntry[];
}) {
  return (
    <>
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Address Book</h2>
        <Link href={"/account/address-book"}>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary text-xl"
          >
            See All
          </Button>
        </Link>
      </div>

      <div
        className={`"md:grid-cols-1" grid w-full grid-cols-1 items-center gap-2`}
      >
        {addressBook?.length > 0 &&
          addressBook
            .filter((address) => address?.is_default === true)
            .map((address, idx) => (
              <div key={idx} className="w-full rounded-lg border p-2.5">
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold">{address?.name}</p>
                    <Badge className="rounded-full bg-black">
                      {address?.address_type === "home" ? "Home" : "Office"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{address?.phone}</p>
                <Separator className="my-2.5" />
                <p className="text-sm">
                  {address?.flat_no ? `Flat ${address.flat_no}, ` : ""}
                  {address?.floor_no ? `Floor ${address.floor_no}, ` : ""}
                  {address?.house_no ? `House ${address.house_no}, ` : ""}
                  {address?.street_road ? `${address.street_road}, ` : ""}
                  {address?.block_sector ? `${address.block_sector}, ` : ""}
                  {address?.area ? `${address.area}, ` : ""}
                  {address?.city ? `${address.city}, ` : ""}
                  {address?.postal_code ? `${address.postal_code}` : ""}
                </p>
              </div>
            ))}
      </div>
    </>
  );
}
