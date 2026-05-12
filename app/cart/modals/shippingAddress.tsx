"use client";

import { useState } from "react";
import FindLocationPage, { Location } from "./FindLocationModal";
import { toast } from "sonner";
import { addAddress } from "@/app/account/components/action";
import { useSearchParams } from "next/dist/client/components/navigation";

export default function shippingAddress() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const product_id = searchParams.get("product_id");

 const handleOnConfirm = async (location: Location) => {
   setErrorMessage(null);
   setIsLoading(true);

   try {
     const res = await addAddress({
       address: location.address,
       is_default: "True",
     });

     //  console.log(res, "response from addAddress in shippingAddress component");

     if (!res) {
       setErrorMessage("Something went wrong. Please try again.");
       return;
     }

     if (res.status === "error") {
       setErrorMessage(res.message);
       return;
     }

     toast.success(res.message || "Address added successfully!");

     if (product_id) {
       window.location.replace(
         `${window.location.pathname}?cart-modal=cart&product_id=${product_id}`,
       );
       return; // stop here, don't call history.back()
     }

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
