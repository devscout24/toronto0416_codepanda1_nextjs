// components/address-book-client.tsx
"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TAddressBook } from "@/types/user.type";
import { Badge } from "@/components/ui/badge";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { removeAddress } from "@/app/cart/components/action";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/animate-ui/components/base/alert-dialog";
import { useState } from "react";

interface AddressBookClientProps {
  addressBook: TAddressBook[];
}

export function AddressBookClient({ addressBook }: AddressBookClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      await removeAddress({ address_id: id });
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    } finally {
      setIsDeleting(false);
    }
  };

  const DeleteAlertDialog = ({ addressId }: { addressId: number }) => (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="cursor-pointer text-red-600 transition-colors duration-300 hover:scale-105">
            <Trash2 className="h-4 w-4" />
          </button>
        }
      />
      <AlertDialogPopup from="bottom" className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Address?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            address from your address book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(addressId)}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );

  const columns: ColumnDef<TAddressBook>[] = [
    {
      accessorKey: "address",
      header: "Full Addresses",
    },
    // {
    //   accessorKey: "city",
    //   header: "Address",
    // },
    // {
    //   accessorKey: "address_type",
    //   header: "Address Type",
    // },
    // {
    //   accessorKey: "phone",
    //   header: "Phone Number",
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const address = row.original;
        return (
          <div className="flex items-start justify-end gap-3">
            {/* <Link
              href={`?update-shipping-address=update-shipping-modal&id=${address.id}`}
            >
              <button className="text-secondary mb-2 cursor-pointer transition-colors duration-300 hover:scale-105">
                <SquarePen className="h-4 w-4" />
              </button>
            </Link> */}
            <DeleteAlertDialog addressId={address.id} />
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
            <div
              key={entry.id}
              className="mb-4 flex items-start justify-between gap-3.5 border-b pb-4"
            >
              <h3 className="text-sm font-medium">{entry.address}</h3>

              {/* Mobile Actions */}
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <button className="text-red-600 transition-colors hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  }
                />
                <AlertDialogPopup from="bottom" className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this address from your address book.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(entry.id)}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialog>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No addresses found.</p>
        )}
      </div>
    </div>
  );
}