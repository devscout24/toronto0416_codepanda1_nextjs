"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
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
import { TAddressBook } from "@/types/user.type";
import {
  getSingleAddress,
  updateAddress,
} from "@/app/account/components/action";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  block_Sector: z.string().min(1, "Block/Sector is required"),
  street_road: z.string().min(1, "Street/Road is required"),
  postal_code: z.string().length(5, "Postal code will 5 characters long"),
  house_no: z.string().min(1, "House No is required"),
  flat_no: z.string().min(1, "Flat No is required"),
  floor_no: z.string().min(1, "Floor No is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  delivery_note: z.string().optional(),
});

export default function UpdateShippingAddress() {
  const searchParams = useSearchParams();
  const addressId = searchParams.get("id");

  const [addressSelected, setAddressSelected] = useState<"home" | "office">(
    "home",
  );
  const [loading, setLoading] = useState(true);
  const [address, setAddressData] = useState<TAddressBook | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      area: "",
      postal_code: "",
      block_Sector: "",
      street_road: "",
      house_no: "",
      flat_no: "",
      floor_no: "",
      name: "",
      phone: "",
      delivery_note: "",
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getSingleAddress(Number(addressId));
        setAddressData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address:", error);
        setLoading(false);
      }
    };

    fetchAddress();
  }, [addressId]);

  // Set form values when address data is loaded
  useEffect(() => {
    if (address) {
      form.reset({
        city: address.city || "",
        area: address.area || "",
        postal_code: String(address.postal_code || ""),
        block_Sector: address.block_sector || "",
        street_road: address.street_road || "",
        house_no: address.house_no || "",
        flat_no: address.flat_no || "",
        floor_no: address.floor_no || "",
        name: address.name || "",
        phone: address.phone || "",
        delivery_note: address.delivery_note || "",
      });
      setAddressSelected(address.addressType || "home");
    }
  }, [address, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!addressId) return;

    try {
      await updateAddress({
        addressId: Number(addressId),
        body: {
          ...values,
          addressType: addressSelected,
          is_default: address?.is_default || false,
        },
      });

      window.history.back();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
          <p className="mt-4 text-sm text-gray-500">Loading address...</p>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500">Address not found</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Select a label</Label>
          <div className="flex gap-3">
            <div
              className={cn(
                "flex-1 cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                addressSelected === "home"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300",
              )}
              onClick={() => setAddressSelected("home")}
            >
              Home Address
            </div>
            <div
              className={cn(
                "flex-1 cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                addressSelected === "office"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300",
              )}
              onClick={() => setAddressSelected("office")}
            >
              Office Address
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Enter area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter postal code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="block_Sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block/Sector</FormLabel>
                <FormControl>
                  <Input placeholder="Enter block/sector" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="street_road"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street/Road</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street/road" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="house_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter house number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="flat_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter flat number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter floor number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter recipient name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="delivery_note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Note (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add delivery instructions..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Update Address
          </Button>
        </div>
      </form>
    </Form>
  );
}