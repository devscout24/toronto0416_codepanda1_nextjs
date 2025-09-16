import Logo from "@/assets/svgs/Sufis_Logo.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";

import PaypalIcon from "@/assets/svgs/Paypal.svg";
import AmexIcon from "@/assets/svgs/Amex.svg";
import AppleIcon from "@/assets/svgs/Apple pay.svg";
import DiscoverIcon from "@/assets/svgs/Discover.svg";
import GoogleIcon from "@/assets/svgs/Google pay.svg";
import MasterCadIcon from "@/assets/svgs/Mastercad.svg";
import VisaIcon from "@/assets/svgs/Visa.svg";

export default function Footer() {
  return (
    <footer className="text-white">
      <section className="bg-primary-900 w-full py-15">
        <div className="section-container w-full">
          <div>
            <Logo />
            <p className="mt-4 mb-5">
              Distracted by the readable content of <br /> a page when looking
              at its layout.
            </p>
            <div className="flex items-center gap-5">
              <FacebookIcon />
              <InstaIcon />
              <TwitterIcon />
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <section className="bg-primary-800 flex w-full items-center justify-between py-6">
        <div className="section-container flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-6">
            <p>Payment Method:</p>
            <div className="flex items-center gap-2">
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
