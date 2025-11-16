import { Button } from "@/components/animate-ui/components/buttons/button";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TAddressBook } from "@/types/user.type";
import Link from "next/link";
import Header from "../components/header";
import { Badge } from "@/components/ui/badge";
import { getAddressBook } from "../components/action";

export default async function AddressBookPage() {
  let addressBook: TAddressBook[] = [];

  try {
    const response = await getAddressBook();

    // ✅ getAddressBook already returns the array
    if (Array.isArray(response)) {
      addressBook = response;
    } else {
      console.error("Invalid address book response:", response);
    }
  } catch (error) {
    console.error("Error fetching address book:", error);
  }
// console.log(addressBook[1], "this is the data")
  const columns: ColumnDef<TAddressBook>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
    },
    {
      accessorKey: "city",
      header: "Address",
    },
    {
      accessorKey: "address_type",
      header: "Address Type",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
  ];

  return (
    <section className="w-full">
      <Header>
        <h1 className="text-xl font-semibold">Address Book</h1>
      </Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        {/* Table for larger screens */}
        <div className="hidden md:block">
          <DataTable
            columns={columns}
            data={addressBook}
            enableColumnVisibility={false}
            enableFiltering={false}
            enablePagination={false}
          />
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden">
          {addressBook.length > 0 ? (
            addressBook.map((entry) => (
              <div key={entry.id} className="mb-4 border-b pb-4">
                <span className="flex items-center justify-between">
                  <h3 className="font-semibold">{entry.name}</h3>
                  <Badge>{entry.address_type}</Badge>
                </span>
                <p className="my-2">{entry.city}</p>
                <p className="">{entry.phone}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No addresses found.</p>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <Link href="?shipping-address=shipping-modal">
            <Button>Add New Address</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}