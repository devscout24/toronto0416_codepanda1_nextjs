import FacebookIcon from "@/assets/icons/facebook.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import EmailIcon from "@/assets/icons/email.svg";
import LocationIcon from "@/assets/icons/location.svg";
import stripeIcon from "@/assets/icons/stripe.png";
import SufisLogo from "../logo";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Clock3, MapPinned, Phone, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const customerServiceLinks = [
    { name: "Home", href: "/" },
    { name: "Best Selling", href: "/#best-selling" },
    { name: "Weekly Special", href: "/#weekly-specials" },
    { name: "Explore All Categories", href: "/all-category" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-condition" },
    // { name: "Refund Policy", href: "#" },
    // { name: "Shipping & Returns", href: "#" },
  ];

  const contactDetails = [
    {
      icon: <LocationIcon className="mt-0.5 shrink-0" />,
      text: "Durham Region — Ajax, ON L1Z 0K5, Canada",
    },
    {
      icon: <EmailIcon className="shrink-0" />,
      text: "info@sufismarket.com",
      href: "mailto:info@sufismarket.com",
    },
    // {
    //   icon: <Phone size={15} className="shrink-0" />,
    //   text: "+1 (235) 612-3890",
    //   href: "tel:+12356123890",
    // },
  ];

  const deliveryDetails = [
    {
      icon: <Clock3 size={15} className="mt-0.5 shrink-0" />,
      text: "Next business day delivery. Order cutoff: 3:00 PM.",
    },
    {
      icon: <MapPinned size={15} className="mt-0.5 shrink-0" />,
      text: "Serving: Ajax · Pickering · Whitby · Oshawa · Scarborough",
    },
  ];

  return (
    <footer className="text-white">
      {/* ── Main footer body ── */}
      <section className="bg-primary-900 w-full">
        <div className="section-container grid grid-cols-1 gap-x-10 gap-y-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Column 1 — Brand (wider than the rest) */}
          <div className="flex flex-col gap-6">
            <SufisLogo size={8} />
            <p className="max-w-xs text-sm leading-relaxed">
              Sufis Market brings fresh, certified halal groceries, produce and
              We serve families across the Durham Region with reliable next
              business day delivery — because quality food should always be
              within reach.
            </p>
          </div>

          {/* Column 2 — Customer Service */}
          <div>
            <p className="mb-4 text-base font-semibold tracking-wide uppercase">
              Customer Service
            </p>
            <ul className="space-y-3">
              {customerServiceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary group flex items-center gap-1.5 text-sm transition-colors duration-200"
                  >
                    <ChevronRight
                      size={13}
                      className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Policies & Contact */}
          <div>
            <p className="mb-4 text-base font-semibold tracking-wide uppercase">
              Policies
            </p>
            <ul className="mb-10 space-y-3">
              {policyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary group flex items-center gap-1.5 text-sm transition-colors duration-200"
                  >
                    <ChevronRight
                      size={13}
                      className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mb-4 text-base font-semibold tracking-wide uppercase">
              Get in Touch
            </p>
            <ul className="space-y-4">
              {contactDetails.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-secondary mt-0.5 shrink-0">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-secondary text-sm leading-relaxed transition-colors duration-200"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Delivery Info + Follow Us */}
          <div>
            <p className="mb-4 text-base font-semibold tracking-wide uppercase">
              Delivery Info
            </p>
            <ul className="space-y-4">
              {deliveryDetails.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-secondary mt-0.5 shrink-0">
                    {item.icon}
                  </span>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="mb-4 text-base font-semibold tracking-wide uppercase">
                Follow Us
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  <InstaIcon />
                </a>
                <a
                  href="#"
                  aria-label="Twitter / X"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <Separator className="bg-white/10" />

      {/* ── Bottom bar ── */}
      <section className="bg-primary-800 w-full">
        <div className="section-container flex w-full flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <p className="text-sm">Secure payments via</p>
            <Image
              src={stripeIcon}
              alt="Stripe"
              className="h-8 w-auto rounded bg-white px-4 py-2"
              width={100}
              height={40}
            />
          </div>
          <p className="text-sm md:text-nowrap">
            © {new Date().getFullYear()} Sufis Market. All Rights Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}