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
import { userData } from "@/consts/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
});

export default function MyProfileEdit() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.personalInfo.name || "",
      email: userData.personalInfo.email || "",
      phone: userData.personalInfo.phone || "",
      country: userData.personalInfo.country || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    window.history.back();
  }

  return (
    <section>
      <div className="mx-auto my-5 w-fit">
        <Image
          src={userData.personalInfo.image}
          width={100}
          height={100}
          alt="avatar"
          className="size-28 rounded-full"
        />
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
              name="email"
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
              name="phone"
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
