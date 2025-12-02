// components/address-book-client.tsx
"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TAddressBook } from "@/types/user.type";
import { Badge } from "@/components/ui/badge";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

interface AddressBookClientProps {
  addressBook: TAddressBook[];
}

export function AddressBookClient({ addressBook }: AddressBookClientProps) {
  const handleDelete = (id: number) => {
    console.log("Delete ID:", id);
    // Add your delete logic here
  };

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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const address = row.original;
        return (
          <div className="flex items-center justify-end gap-3">
            <Link
              href={`?update-shipping-address=update-shipping-modal&id=${address.id}`}
            >
              <button className="text-secondary cursor-pointer transition-colors duration-300 hover:scale-105">
                <SquarePen className="h-4 w-4" />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(address.id)}
              className="cursor-pointer text-red-600 transition-colors duration-300 hover:scale-105"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
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

              {/* Mobile Actions */}
              <div className="mt-3 flex items-center gap-3">
                <button
                  // onClick={() => handleEdit(entry.id)}
                  className="text-blue-600 transition-colors hover:text-blue-700"
                >
                  <SquarePen className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-600 transition-colors hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No addresses found.</p>
        )}
      </div>
    </div>
  );
}
