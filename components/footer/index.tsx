import FacebookIcon from "@/assets/icons/facebook.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import LocationIcon from "@/assets/icons/location.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import EmailIcon from "@/assets/icons/email.svg";
import PaypalIcon from "@/assets/svgs/Paypal.svg";
import AmexIcon from "@/assets/svgs/Amex.svg";
import AppleIcon from "@/assets/svgs/Apple pay.svg";
import DiscoverIcon from "@/assets/svgs/Discover.svg";
import GoogleIcon from "@/assets/svgs/Google pay.svg";
import MasterCadIcon from "@/assets/svgs/Mastercad.svg";
import VisaIcon from "@/assets/svgs/Visa.svg";
import SufisLogo from "../logo";
import { Separator } from "../ui/separator";

export default function Footer() {
  const footerNav = {
    Resources: [
      { name: "Home", href: "#" },
      { name: "Best Selling", href: "#" },
      { name: "Weekly Special", href: "#" },
      { name: "Explore All", href: "#" },
    ],
    Information: [
      { name: "Contact Us", href: "#" },
      { name: "Privacy policy", href: "#" },
      { name: "Refund policy", href: "#" },
      { name: "Shipping & return", href: "#" },
      { name: "Terms & conditions", href: "#" },
    ],
  };

  return (
    <footer className="text-white">
      <section className="bg-primary-900 w-full py-15">
        <div className="section-container flex w-full flex-col items-start justify-between gap-10 md:flex-row">
          <div>
            <SufisLogo size={9} />
            <p className="mt-4 mb-5">
              Distracted by the readable content of <br /> a page when looking
              at its layout.
            </p>
            <div className="flex items-center gap-5">
              <FacebookIcon className="hover:text-secondary cursor-pointer" />
              <InstaIcon className="hover:text-secondary cursor-pointer" />
              <TwitterIcon className="hover:text-secondary cursor-pointer" />
            </div>
          </div>

          {Object.keys(footerNav).map((category, idx) => (
            <div key={idx}>
              <p className="mb-5 text-xl font-semibold">{category}</p>
              <ul>
                {footerNav[category as keyof typeof footerNav].map(
                  (item, idx) => (
                    <li key={idx} className="group mb-2 cursor-pointer">
                      <div className="w-fit">
                        <p>{item.name}</p>
                        <Separator className="origin-left scale-x-0 duration-300 group-hover:scale-x-100" />
                      </div>
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
                text: "Chinatown,\nChicago, IL 60616 USA",
              },
              {
                icon: <PhoneIcon />,
                text: "+1 2356-12389\n+1 5632-36215",
              },
              { icon: <EmailIcon />, text: "cleanthemeinfo@gmail.com" },
            ].map((item, idx) => (
              <div className="mb-2 flex items-center gap-2" key={idx}>
                {item.icon}
                <p className="whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-800 flex w-full items-center justify-between py-6">
        <div className="section-container flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center justify-center gap-6 md:justify-start">
            <p>Payment Method:</p>
            <div className="flex flex-wrap items-center gap-2">
              <PaypalIcon />
              <AmexIcon />
              <AppleIcon />
              <DiscoverIcon />
              <GoogleIcon />
              <MasterCadIcon />
              <VisaIcon />
            </div>
          </div>
          <p className="text-nowrap">© Copyright 2025 By Sufis</p>
        </div>
      </section>
    </footer>
  );
}
