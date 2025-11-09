"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TAddressBook } from "@/types/user.type";
import Link from "next/link";
import Header from "../components/header";
import { Badge } from "@/components/ui/badge";
import { getAddressBook } from "../components/action";

export default function AddressBookPage() {
  const [addressBook, setAddressBook] = useState<TAddressBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddressBook();
        if (data) setAddressBook(data);
      } catch (error) {
        console.error("Error fetching address book:", error);
        setAddressBook([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const columns: ColumnDef<TAddressBook>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <span className="w-[30%] text-wrap">{row.original.city}</span>
      ),
    },
    {
      accessorKey: "addressType",
      header: "Address Type",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
  ];

  if (loading) {
    return (
      <section className="flex w-full items-center justify-center py-20">
        <p className="text-gray-500">Loading addresses...</p>
      </section>
    );
  }

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
          {addressBook.map((entry) => (
            <div key={entry.id} className="mb-4 border-b pb-4">
              <span className="flex items-center justify-between">
                <h3 className="font-semibold">{entry.name}</h3>
                <Badge>{entry.addressType}</Badge>
              </span>
              <p className="my-2">{entry.city}</p>
              <p className="">{entry.phone}</p>
            </div>
          ))}
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
