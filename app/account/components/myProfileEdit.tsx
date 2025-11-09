"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { getProfileInfo, updateProfileInfo } from "./action";
import { TUserAccount } from "@/types/user.type";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
});

export default function MyProfileEdit() {
  const [userData, setUserData] = useState<TUserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfileInfo();
        if (response) {
          setUserData(response);
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      country: userData?.country || "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
      });
    }
  }, [userData, form]);

  // On submit, call the function to update profile info
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    try {
      const response = await updateProfileInfo(values);
       console.log(response, "response")// Pass the form values to the update function
      if (response) {
        console.log("Profile updated successfully", response);
        window.history.back();  // Go back after successful update
        console.log(response, "response");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Your form rendering here


  return (
    <section>
      <div className="mx-auto my-5 w-fit">
        <Avatar className="size-28">
          <AvatarImage src={userData?.image} />
          <AvatarFallback className="text-4xl font-semibold">
            {userData?.name?.split(" ")[0]?.[0]}
            {userData?.name?.split(" ")[1]?.[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
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
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Country</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      className="border-neutral-50"
                      {...field}
                      readOnly
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
                      placeholder="+880 1234567890"
                      className="border-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              type="button"
              className="w-full flex-1"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full flex-1">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}