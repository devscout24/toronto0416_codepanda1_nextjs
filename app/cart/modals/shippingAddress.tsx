"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { TCartAddress } from "@/types/cart.type";

const formSchema = z.object({
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  blockSector: z.string().min(1, "Block/Sector is required"),
  streetRoad: z.string().min(1, "Street/Road is required"),
  houseNo: z.string().min(1, "House No is required"),
  flatNo: z.string().min(1, "Flat No is required"),
  floorNo: z.string().min(1, "Floor No is required"),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(
      1,
      "Phone number is required",
    ) /* .regex(/^\+880\d{9}$/, "Invalid phone number") */,
  deliveryNote: z.string().optional(),
});

export default function ShippingAddress({
  setAddress,
}: {
  setAddress?: Dispatch<SetStateAction<TCartAddress | null>>;
}) {
  const [addressSelected, setAddressSelected] = useState<"home" | "office">(
    "home",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      area: "",
      blockSector: "",
      streetRoad: "",
      houseNo: "",
      flatNo: "",
      floorNo: "",
      name: "",
      phone: "",
      deliveryNote: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (setAddress) {
      setAddress({ ...values, addressType: addressSelected });
    }
    window.history.back();
  }

  return (
    <section>
      <div className="mb-5">
        <Label>Select a label</Label>
        <div className="gap mt-2.5 flex items-center gap-5">
          <button
            className={cn(
              "w-full rounded-lg px-5 py-2.5 duration-500 hover:bg-black/5 hover:text-black",
              addressSelected === "home" &&
                "bg-black text-white hover:bg-black/80 hover:text-white",
            )}
            onClick={() => setAddressSelected("home")}
          >
            Home Address
          </button>
          <button
            className={cn(
              "w-full rounded-lg px-5 py-2.5 duration-500 hover:bg-black/5 hover:text-black",
              addressSelected === "office" &&
                "bg-black text-white hover:bg-black/80 hover:text-white",
            )}
            onClick={() => setAddressSelected("office")}
          >
            Office Address
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangladesh"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="blockSector"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Block/Sector</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetRoad"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Street/Road</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangladesh"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="houseNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>House No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dhaka"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flatNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Flat No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dhaka"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="floorNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Floor No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter area"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="deliveryNote"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Note</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Note"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <Button
              variant="outline"
              type="button"
              className="flex-1"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
