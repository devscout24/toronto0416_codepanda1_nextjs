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

export default function ContactUsPage() {
  return (
    <section>
      <div className="bg-[url('/images/bg-image1.png')] bg-cover bg-center py-[3.7rem]">
        <h2 className="text-center text-3xl font-semibold text-white">
          Contact with Us
        </h2>
      </div>

      <div className="section-container my-10 flex flex-col items-start gap-5 md:flex-row">
        <div className="w-full space-y-8 md:w-[50%] lg:w-[30%]">
          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">Address</h3>

            <div className="flex items-center gap-5">
              <LocationIcon />
              <p>Chinatown, Chicago, IL 60616 USA</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold">Contact information</h3>

            <div className="flex items-center gap-5">
              <PhoneIcon />
              <div>
                <p>+1 5632-36215</p>
                <p>+1 2356-12389</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <EmailIcon />
              <p>easymartinfo@gmail.com</p>
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

        <div className="w-full rounded-3xl bg-white p-8 md:w-[50%] lg:w-[70%]">
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              <div className="flex-1 space-y-2.5">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>

              <div className="flex-1 space-y-2.5">
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label>Description</Label>
              <Textarea placeholder="Type here..." rows={10} className="h-40" />
            </div>

            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </div>

      <div className="section-container my-14">
        <h3 className="pb-10 text-2xl font-semibold">Find us in map</h3>

        <Image
          src="/images/Map.png"
          alt="map"
          width={1000}
          height={500}
          className="w-full rounded-xl"
        />
      </div>
    </section>
  );
}
