"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LocationIcon from "@/assets/icons/location.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import EmailIcon from "@/assets/icons/email.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/animate-ui/components/buttons/button";
import Image from "next/image";
import { submitContactForm } from "./component/action";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      await submitContactForm(data);
      toast.success("Message sent successfully!");
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="bg-[url('/images/bg-image1.png')] bg-cover bg-center py-[3.7rem]">
        <h2 className="text-center text-3xl font-semibold text-white">
          Contact with Us
        </h2>
      </div>

      <div className="section-container my-10 flex flex-col items-start gap-5 px-5 md:px-8 lg:flex-row lg:px-5">
        <div className="w-full space-y-8 lg:w-[40%]">
          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">Address</h3>

            <div className="flex items-center gap-5">
              <LocationIcon />
              <p>Durham Region- Ajax, ON L1Z- OK5</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">Contact information</h3>

            {/* <div className="flex items-center gap-5">
              <PhoneIcon />
              <div>
                <p>+1 5632-36215</p>
                <p>+1 2356-12389</p>
              </div>
            </div> */}

            <div className="flex items-center gap-5">
              <EmailIcon />
              <p>info@sufismarket.com</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">Social media</h3>

            <div className="flex items-center gap-5">
              <FacebookIcon className="hover:text-secondary cursor-pointer" />
              <InstaIcon className="hover:text-secondary cursor-pointer" />
              <TwitterIcon className="hover:text-secondary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">We are open</h3>
            <p>
              Our store has re-opened for shopping, exchanges Every day 11am to
              7pm.
            </p>
          </div>
        </div>

        <div className="w-full rounded-3xl bg-white p-8 lg:w-[70%]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-5 lg:flex-row">
              <div className="w-full space-y-2.5 lg:w-1/2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-2.5 lg:w-1/2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full space-y-2.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Enter subject here ..."
                className="w-full"
                {...form.register("subject")}
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="message">Description</Label>
              <Textarea
                id="message"
                placeholder="Write your message here ..."
                rows={10}
                className="h-40"
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>

      <div className="section-container my-14">
        <h3 className="pb-10 text-2xl font-semibold">Find us in map</h3>

        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{ paddingBottom: "50%" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.175064565021!2d-79.01370952381208!3d43.863621371092954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4e00460d8677b%3A0xfce54fd363636a75!2s289%20Kingston%20Rd%20E%2C%20Ajax%2C%20ON%20L1Z%200K5%2C%20Canada!5e1!3m2!1sen!2sbd!4v1776801310576!5m2!1sen!2sbd"
            className="absolute top-0 left-0 h-full w-full rounded-xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}