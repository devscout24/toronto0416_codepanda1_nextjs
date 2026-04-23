"use client";

import FindLocationPage, { Location } from "./FindLocationModal";

const handleOnConfirm = (
  location: Location,
  orderType: "delivery" | "pickup",
) => {
  console.log(orderType, location);
  window.history.back();
};

export default function shippingAddress() {
  return (
    <div>
      <FindLocationPage onConfirm={handleOnConfirm} />
    </div>
  );
}
