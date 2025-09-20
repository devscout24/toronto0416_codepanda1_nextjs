'use client';

import * as React from "react";

import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
  SwitchIcon as SwitchIconPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from "@/components/animate-ui/primitives/headless/switch";
import { cn } from "@/lib/utils";

type SwitchProps = SwitchPrimitiveProps & {
  pressedWidth?: number;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  thumbIcon?: React.ReactElement;
};

function Switch({
  className,
  pressedWidth = 19,
  startIcon,
  endIcon,
  thumbIcon,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive
      className={cn(
        "peer focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-5 w-8 shrink-0 items-center justify-start rounded-full border border-transparent px-px shadow-xs duration-500 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "data-[checked]:bg-primary bg-input dark:bg-input/80 data-[checked]:justify-end",
        className,
      )}
      {...props}
    >
      <SwitchThumbPrimitive
        className={cn(
          'dark:bg-foreground pointer-events-none relative z-10 block size-4 rounded-full bg-neutral-100 ring-0 data-[checked="true"]:bg-white',
        )}
        pressedAnimation={{ width: pressedWidth }}
      >
        {thumbIcon && (
          <SwitchIconPrimitive
            position="thumb"
            className="absolute top-1/2 left-1/2 -translate-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]"
          >
            {thumbIcon}
          </SwitchIconPrimitive>
        )}
      </SwitchThumbPrimitive>

      {startIcon && (
        <SwitchIconPrimitive
          position="left"
          className="absolute top-1/2 left-0.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]"
        >
          {startIcon}
        </SwitchIconPrimitive>
      )}
      {endIcon && (
        <SwitchIconPrimitive
          position="right"
          className="absolute top-1/2 right-0.5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 [&_svg]:size-[9px]"
        >
          {endIcon}
        </SwitchIconPrimitive>
      )}
    </SwitchPrimitive>
  );
}

export { Switch, type SwitchProps };
