"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { CartMetaData } from "@/types/cart.type";
import Link from "next/link";
import { useState } from "react";
import {
  applyCoupon,
  createCheckout,
  createPayment,
  processPay,
} from "./action";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Checkout({
  title,
  // redirectTo,
  isDisabled = false,
  metadata,
  isUserLoggedIn,
}: {
  title: string;
  // redirectTo: string;
  isDisabled?: boolean;
  metadata?: CartMetaData;
  isUserLoggedIn?: boolean;
}) {
  const [couponCode, setCouponCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const addressId = searchParams.get("address_id");
  // const order_id = searchParams.get("orderId");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState("guest@example.com");

  // checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const status = await createCheckout();
      if (status === "success") {
        router.push(`/cart/checkout`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to proceed to checkout.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async () => {
    setLoading(true);

    try {
      const redirectTo = await createPayment({
        address_id: Number(addressId),
        guest_email: guestEmail,
      });
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        toast.error("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Something went wrong while creating payment");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    setIsVerifying(true);
    try {
      const response = await applyCoupon({ coupon_code: couponCode });
      if (response?.status === "success") {
        toast.success(response?.message || "Coupon applied successfully!");
        setAppliedCoupon(couponCode);
        setCouponCode("");
      } else {
        toast.error(
          response?.message || "Failed to apply coupon. Please try again.",
        );
      }
    } catch (error: unknown) {
      console.error("Error applying coupon:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to apply coupon. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  };

  return (
    <section className="rounded-2xl bg-white p-5">
      <div>Checkout</div>
      <Separator className="mt-2.5 mb-5" />

      <div className="space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-semibold">
            <p>Subtotal</p>
            <span className="float-right">
              ${metadata?.sub_total.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <span className="float-right">
              ${metadata?.shipping_fee.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p>HST</p>
            <span className="float-right">${metadata?.vat.toFixed(2)}</span>
          </div>
        </div>

        <div className="h-16">
          {metadata?.discount && metadata?.discount > 0 ? (
            <div className="text-primary border-primary bg-primary/10 flex h-12 items-center gap-2 rounded-lg border px-4 text-sm font-medium">
              <Check size={16} />
              <span>Coupon {appliedCoupon} applied</span>
            </div>
          ) : (
            <div>
              <Label htmlFor="coupon-input">Add Coupon</Label>

              <div className="mt-2 flex items-center overflow-hidden rounded-lg border">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Enter the Coupon"
                  className="h-10 w-full px-4 outline-none"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isVerifying}
                />
                <Button
                  variant="secondary"
                  className="h-10 rounded-none bg-black text-white hover:bg-black disabled:opacity-50"
                  onClick={handleApplyCoupon}
                  disabled={isVerifying || !couponCode.trim()}
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2 px-2">
                      <Spinner className="size-4" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-primary flex items-center justify-between">
          <p>Discount</p>
          <span className="float-right">
            {metadata?.discount && metadata?.discount > 0
              ? `-${metadata?.discount}`
              : 0}
          </span>
        </div>

        {/* {metadata?.discount && (
          <div className="text-primary flex items-center justify-between">
            <p>Discount</p>
            <span className="float-right">- ${metadata?.discount}</span>
          </div>
        )} */}

        <div className="flex items-center justify-between font-semibold">
          <p>Total</p>
          <span className="float-right">
            ${metadata?.total_price.toFixed(2)}
          </span>
        </div>

        {title === "Proceed to Checkout" &&
          (!isDisabled ? (
            // <Link href={redirectTo}>
            <Button
              onClick={handleCheckout}
              disabled={isDisabled || loading}
              className="w-full"
            >
              {title} {loading && <Spinner />}
            </Button>
          ) : (
            // </Link>
            <Button className="w-full" disabled>
              Need to Add Address
            </Button>
          ))}

        {title === "Proceed to Pay" &&
          (!isDisabled ? (
            <div className="space-y-3">
              {!isUserLoggedIn && (
                <div className="space-y-1">
                  <Label
                    htmlFor="guest-email"
                    className="text-xs text-neutral-400"
                  >
                    Email is needed for payment receipt
                  </Label>
                  <input
                    id="guest-email"
                    type="email"
                    className="h-8 w-full rounded-md border px-3 text-xs outline-none focus:ring-1 focus:ring-black"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>
              )}
              <Button
                onClick={handleCreatePayment}
                disabled={isDisabled}
                className="w-full"
              >
                {title} {loading && <Spinner className="size-4" />}
              </Button>
            </div>
          ) : (
            <Button className="w-full" disabled>
              Need to Add Address
            </Button>
          ))}
      </div>
    </section>
  );
}