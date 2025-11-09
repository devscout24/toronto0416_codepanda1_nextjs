import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TAddressBookEntry } from "@/types/user.type";
import Link from "next/link";
import ordinal from "ordinal";

export default function AddressBook({
  addressBook,
}: {
  addressBook: TAddressBookEntry[];
}) {
  return (
    <>
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Address Book</h2>
        <Link href={"/account/address-book"}><Button
          variant="ghost"
          className="text-primary hover:text-primary text-xl"
        >
          Show All
        </Button></Link>
      </div>

      <ScrollArea className="h-full md:h-40">
       <div
  className={`grid w-full items-center gap-2 "md:grid-cols-1"
   grid-cols-1`}
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
              {address?.addressType === "home" ? "Home" : "Office"}
            </Badge>
          </div>
        </div>
        <p className="text-sm">{address?.phone}</p>
        <Separator className="my-2.5" />
        <p className="text-sm">
          Flat#{address?.flatNo}, {ordinal(Number(address?.floorNo))} floor,{" "}
          {address?.houseNo}, {address?.streetRoad}, {address?.blockSector},{" "}
          {address?.area}, {address?.city}
        </p>
      </div>
    ))}
</div>

      </ScrollArea>
    </>
  );
}
