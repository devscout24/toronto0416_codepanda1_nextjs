/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { motion, isMotionComponent, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  "ref"
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  const element = React.isValidElement(children) ? children : null;
  const childType = element?.type as React.ElementType | undefined;

  const Base = React.useMemo(() => {
    if (
      childType &&
      typeof childType === "object" &&
      isMotionComponent(childType)
    ) {
      return childType;
    }

    if (childType) {
      return motion.create(childType);
    }

    return motion.div;
  }, [childType]) as React.ForwardRefExoticComponent<any>;

  if (!element) return null;

  const { ref: childRef, ...childProps } = element.props as AnyProps;

  const combinedRef = mergeRefs(
    childRef as React.Ref<HTMLElement>,
    ref as React.Ref<HTMLElement>,
  ) as React.Ref<any>;

  const mergedProps = mergeProps(childProps, props);

  return <Base {...mergedProps} ref={combinedRef} />;
}

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};
