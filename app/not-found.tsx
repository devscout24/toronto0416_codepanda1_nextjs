"use client";

import Lottie from "react-lottie";
import ErrorAnimation from "@/assets/404 Error.json";

export default function NotFound() {
  return (
    <div className="flex h-[49.6vh] w-full flex-col items-center justify-center bg-white">
      <div className="w-96">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: ErrorAnimation,
          }}
        />
      </div>
    </div>
  );
}
