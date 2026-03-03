"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const orderStatusFlow = [
  { status: "pending", label: "Pending" },
  { status: "order_placed", label: "Order Placed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
];

export default function OrderTracker({ order }: { order: { status: string } }) {
  const isCancelled = order?.status === "cancelled";

  const currentIndex = orderStatusFlow.findIndex(
    (s) => s.status === order?.status,
  );

  return (
    <div className="w-full rounded-xl bg-white p-5">
      {isCancelled ? (
        <div className="mt-2 flex items-start gap-4">
          <div className="bg-destructive relative z-10 mt-1 flex size-5 shrink-0 items-center justify-center rounded-full">
            <svg
              className="size-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="border-destructive/20 bg-destructive/5 mb-2 flex-1 rounded-lg border px-4 py-3">
            <p className="text-destructive font-semibold">Order Cancelled</p>
            <p className="text-destructive/70 mt-0.5 text-sm">
              This order was cancelled. If you have questions, please{" "}
              <Link
                href="/contact-us"
                className="text-destructive underline underline-offset-2 hover:opacity-80"
              >
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-0">
          {orderStatusFlow.map((item, index) => {
            const isCompleted = !isCancelled && index <= currentIndex;
            const isActive = !isCancelled && index === currentIndex;

            return (
              <div key={index} className="relative flex items-start gap-4">
                {/* Connector Line */}
                {index !== orderStatusFlow.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-5 left-[9px] h-full w-0.5 transition-colors duration-300",
                      isCompleted && index < currentIndex
                        ? "bg-primary"
                        : "bg-neutral-200",
                    )}
                  />
                )}

                {/* Dot */}
                <div
                  className={cn(
                    "relative z-10 mt-1 size-5 shrink-0 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-primary ring-primary/20 ring-4"
                      : isCompleted
                        ? "bg-primary"
                        : "bg-neutral-200",
                  )}
                />

                {/* Text */}
                <div className="pb-8">
                  <p
                    className={cn(
                      "font-medium",
                      isActive
                        ? "text-primary"
                        : isCompleted
                          ? "text-primary"
                          : "text-neutral-400",
                    )}
                  >
                    {item.label}
                  </p>
                  {/* <p className="text-sm text-neutral-500">date</p> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
