import FacebookIcon from "@/assets/icons/facebook.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import LocationIcon from "@/assets/icons/location.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import EmailIcon from "@/assets/icons/email.svg";
// import PaypalIcon from "@/assets/svgs/Paypal.svg";
// import AmexIcon from "@/assets/svgs/Amex.svg";
// import AppleIcon from "@/assets/svgs/Apple pay.svg";
// import DiscoverIcon from "@/assets/svgs/Discover.svg";
// import GoogleIcon from "@/assets/svgs/Google pay.svg";
import MasterCadIcon from "@/assets/svgs/Mastercad.svg";
import VisaIcon from "@/assets/svgs/Visa.svg";
import SufisLogo from "../logo";
import { Separator } from "../ui/separator";
import Link from "next/link";
import StripeIcon from "@/assets/icons/stripe.svg";
import { Clock3, MapPinned } from "lucide-react";

export default function Footer() {
  const footerNav = {
    Resources: [
      { name: "Home", href: "/" },
      { name: "Best Selling", href: "/#best-selling" },
      { name: "Weekly Special", href: "/#weekly-specials" },
      { name: "Explore All", href: "/all-category" },
    ],
    Information: [
      { name: "Contact Us", href: "/contact-us" },
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Terms & conditions", href: "/terms-condition" },
      // { name: "Refund policy", href: "#" },
      // { name: "Shipping & return", href: "#" },
    ],
  };

  return (
    <footer className="pb-15 text-white md:pb-0">
      <section className="bg-primary-900 w-full py-15">
        <div className="section-container flex flex-col items-start gap-10 lg:flex-row">
          <div className="lg:w-[30%]">
            <SufisLogo size={9} />
            <p className="mt-4 mb-5">
              Distracted by the readable content of a page when looking at its
              layout.
            </p>
            <div className="flex items-center gap-5">
              <FacebookIcon className="hover:text-secondary cursor-pointer" />
              <InstaIcon className="hover:text-secondary cursor-pointer" />
              <TwitterIcon className="hover:text-secondary cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row lg:w-[70%]">
            {Object.keys(footerNav).map((category, idx) => (
              <div key={idx}>
                <p className="mb-5 text-xl font-semibold">{category}</p>
                <ul>
                  {footerNav[category as keyof typeof footerNav].map(
                    (item, idx) => (
                      <li key={idx} className="group mb-2 cursor-pointer">
                        <Link href={item.href}>
                          <div className="w-fit">
                            <p>{item.name}</p>
                            <Separator className="origin-left scale-x-0 duration-300 group-hover:scale-x-100" />
                          </div>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}

            <div>
              <p className="mb-5 text-xl font-semibold">Contact</p>

              {[
                {
                  icon: <LocationIcon />,
                  text: "Durham Region- Ajax, ON L1Z- OK5, Canada",
                },
                // {
                //   icon: <PhoneIcon />,
                //   text: "+1 2356-12389\n+1 5632-36215",
                // },
                { icon: <EmailIcon />, text: "info@sufismarket.com" },
                {
                  icon: <Clock3 size={16} />,
                  text: "Next business day delivery (cutoff: 3 PM)",
                },
                {
                  icon: <MapPinned size={16} />,
                  text: "Ajax, Pickering, Whitby, Oshawa, Scarborough",
                },
              ].map((item, idx) => (
                <div className="mb-2 flex items-center gap-2" key={idx}>
                  {item.icon}
                  <p className="whitespace-pre-line">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-800 flex w-full items-center justify-between py-6">
        <div className="section-container flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center justify-center gap-6 md:justify-start">
            <p>Payment Method:</p>
            <span className="rounded-md bg-white px-5">
              <StripeIcon />
            </span>
            {/* <div className="flex flex-wrap items-center gap-2">
              <PaypalIcon />
              <AmexIcon />
              <AppleIcon />
              <DiscoverIcon />
              <GoogleIcon />
              <MasterCadIcon />
              <VisaIcon />
            </div> */}
          </div>
          <p className="md:text-nowrap">
            © Copyright {new Date().getFullYear()} Sufis. All Rights Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}
