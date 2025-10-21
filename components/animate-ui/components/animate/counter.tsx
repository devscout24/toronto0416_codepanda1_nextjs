import * as React from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import {
  Counter as CounterPrimitive,
  CounterNumber as CounterNumberPrimitive,
  CounterMinusButton as CounterMinusButtonPrimitive,
  CounterPlusButton as CounterPlusButtonPrimitive,
  type CounterProps as CounterPropsPrimitive,
} from "@/components/animate-ui/primitives/animate/counter"; // Adjust the import path if necessary
import { Button } from "@/components/animate-ui/components/buttons/button";
import { cn } from "@/lib/utils";

type CounterProps = Omit<CounterPropsPrimitive, "children" | "asChild"> & {
  value: number;
  onChange?: (value: number) => void;
};

function Counter({ value, onChange, className }: CounterProps) {
  return (
    <CounterPrimitive
      className={cn("flex items-center overflow-hidden rounded-lg border", className)}
      value={value}
      onValueChange={onChange}
    >
      <CounterMinusButtonPrimitive asChild>
        <Button
          size="icon-sm"
          variant="accent"
          className="my-0.5 rounded-none border-r bg-transparent shadow-none hover:bg-transparent"
        >
          <MinusIcon className="size-4" />
        </Button>
      </CounterMinusButtonPrimitive>

      <CounterNumberPrimitive className="px-2.5" />

      <CounterPlusButtonPrimitive asChild>
        <Button
          size="icon-sm"
          variant="accent"
          className="my-0.5 rounded-none border-l bg-transparent shadow-none hover:bg-transparent"
        >
          <PlusIcon className="size-4" />
        </Button>
      </CounterPlusButtonPrimitive>
    </CounterPrimitive>
  );
}

export { Counter, type CounterProps };
