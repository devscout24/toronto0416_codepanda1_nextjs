import { Button } from "@/components/animate-ui/components/buttons/button";
import { TAddressBook } from "@/types/user.type";
import Link from "next/link";

export default function AddressBook({
  addressBook,
}: {
  addressBook: TAddressBook[];
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
        {addressBook?.length > 0 ? (
          addressBook.map((address, idx) => (
            <div key={idx} className="w-full rounded-lg border p-2.5">
              <p className="font-semibold">{address?.address}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No addresses found.</p>
        )}
      </div>
    </>
  );
}