"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import {
  Slot,
  type WithAsChild,
} from "@/components/animate-ui/primitives/animate/slot";

type ButtonProps = WithAsChild<
  Omit<HTMLMotionProps<"button">, "children"> & {
    children?: React.ReactNode;
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({
  hoverScale = 1,
  tapScale = 0.98,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
