"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TAddressBookEntry } from "@/types/user.type";
import { userData } from "@/consts/user";
import Link from "next/link";
import Header from "../components/header";

export default function AddressBookPage() {
  const columns: ColumnDef<TAddressBookEntry>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return (
          <span className="w-[30%] text-wrap">{row.original.address}</span>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Address Type",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
  ];

  return (
    <section className="w-full">
      {/* <h2 className="text-xl font-semibold">Address Book</h2> */}
      <Header><h1 className="text-xl font-semibold">Address Book</h1></Header>

      <div className="col-span-2 mt-5 rounded-xl bg-white p-5">
        <div>
          <DataTable
            columns={columns}
            data={userData.addressBook}
            enableColumnVisibility={false}
            enableFiltering={false}
            enablePagination={false}
          />
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
