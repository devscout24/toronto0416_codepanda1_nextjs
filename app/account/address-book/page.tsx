// app/address-book/page.tsx
import { Button } from "@/components/animate-ui/components/buttons/button";
import { TAddressBook } from "@/types/user.type";
import Link from "next/link";
import Header from "../components/header";
import { getAddressBook } from "../components/action";
import { AddressBookClient } from "./addressBookClient";

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

  return (
    <section className="w-full">
      <Header>
        <h1 className="text-xl font-semibold">Address Book</h1>
      </Header>

      <AddressBookClient addressBook={addressBook} />

      <div className="mt-5 flex justify-end">
        <Link href="?shipping-address=shipping-modal" scroll={false}>
          <Button>Add New Address</Button>
        </Link>
      </div>
    </section>
  );
}