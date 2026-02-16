import React from "react";
import FailedIcon from "@/assets/svgs/cancel.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function FailedModal() {
  return (
    <div className="flex flex-col items-center">
      <FailedIcon className="text-destructive" />
      <div className="my-10 text-center">
        <h1 className="text-3xl font-medium">Order Failed</h1>
        <p className="text-lg text-neutral-400">
          Something went wrong with your order
        </p>
      </div>
      <Link className="w-full" href={"/all-category"}>
        <Button className="w-full" variant="destructive">
          Try Again
        </Button>
      </Link>
    </div>
  );
}
