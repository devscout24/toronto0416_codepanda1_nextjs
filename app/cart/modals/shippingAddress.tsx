"use client";

import { useState } from "react";
import FindLocationPage, { Location } from "./FindLocationModal";
import { toast } from "sonner";
import { addAddress } from "@/app/account/components/action";

export default function shippingAddress() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnConfirm = async (location: Location) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await addAddress({
        address: location.address,
        is_default: "True",
      });

      console.log(res, "response from addAddress in shippingAddress component");

      if (!res) {
        setErrorMessage("Something went wrong. Please try again.");
        return;
      }

      if (res.status === "error") {
        setErrorMessage(res.message);
        return;
      }

      toast.success(res.message || "Address added successfully!");
      window.history.back();
    } catch (error: unknown) {
      console.error("Error adding address:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to add address. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FindLocationPage
        errorMessage={errorMessage}
        onConfirm={handleOnConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
