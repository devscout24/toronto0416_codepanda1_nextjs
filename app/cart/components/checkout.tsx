"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { CartMetaData } from "@/types/cart.type";
import Link from "next/link";
import { useState } from "react";
import { applyCoupon, createPayment, postAddressId } from "./action";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Checkout({
  title,
  redirectTo,
  isDisabled = false,
  metadata,
}: {
  title: string;
  redirectTo: string;
  isDisabled?: boolean;
  metadata?: CartMetaData;
}) {
  const [couponCode, setCouponCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const addressId = searchParams.get("address_id");
  const order_id = searchParams.get("orderId");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePostAddressId = async () => {
    if (!addressId) {
      toast.error("Please select an address");
      return;
    }

    try {
      const id = await postAddressId(Number(addressId));

      if (id) {
        router.push(`?orderId=${id}`);
      }
    } catch (error) {
      console.error("Error posting address id:", error);
      toast.error("Failed to proceed");
    }
  };

  const handleCreatePayment = async () => {
    setLoading(true);
    if (!order_id) {
      toast.error("Order ID is missing");
      return;
    }

    try {
      const redirectTo = await createPayment(order_id);
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
    console.log(couponCode, "couponCode");
    setIsVerifying(true);
    try {
      const response = await applyCoupon({ coupon_code: couponCode });
      toast.success(response?.message || "Coupon applied successfully!");
      setAppliedCoupon(couponCode);
      setCouponCode("");
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
            <span className="float-right">${metadata?.sub_total}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>Shipping Fee</p>
            <span className="float-right">${metadata?.shipping_fee}</span>
          </div>

          <div className="flex items-center justify-between">
            <p>VAT(15%)</p>
            <span className="float-right">${metadata?.vat}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="coupon-input">Add Coupon</Label>

          <div className="flex h-12 items-center overflow-hidden rounded-lg border">
            <input
              id="coupon-input"
              type="text"
              placeholder="Enter the Coupon"
              className="h-12 w-full px-4 outline-none"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isVerifying}
            />
            <Button
              variant="secondary"
              className="h-16 rounded-none bg-black text-white hover:bg-black disabled:opacity-50"
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

          {appliedCoupon && (
            <div className="text-primary flex items-center gap-2 text-xs">
              <Check size={16} />
              <span>Coupon {appliedCoupon} applied</span>
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
          <span className="float-right">${metadata?.total_price}</span>
        </div>

        {title === "Proceed to Pay" &&
          (!isDisabled ? (
            <Link href={redirectTo}>
              <Button
                onClick={handlePostAddressId}
                disabled={isDisabled}
                className="w-full"
              >
                {title}
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              Need to Add Address
            </Button>
          ))}

        {title === "Place Order" &&
          (!isDisabled ? (
            // <Link href={redirectTo}>
            <Button
              onClick={handleCreatePayment}
              disabled={isDisabled || loading}
              className="w-full"
            >
              {title} {loading && <Spinner className="size-4" />}
            </Button>
          ) : (
            // </Link>
            <Button className="w-full" disabled>
              Need to Add Address
            </Button>
          ))}
        {title === "Proceed to Checkout" &&
          (!isDisabled ? (
            <Link href={redirectTo}>
              <Button disabled={isDisabled} className="w-full">
                {title}
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              Need to Add Address
            </Button>
          ))}
      </div>
    </section>
  );
}