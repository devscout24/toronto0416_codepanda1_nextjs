"use client";

import React, { useMemo, useState } from "react";
import Star from "@/assets/icons/h431.svg";

type RatingProps = {
  // Controlled value (SSR-safe): pass a number to display a rating
  value?: number;
  // Initial value for uncontrolled mode (interactive only)
  defaultValue?: number;
  // Called on user changes (client-only). Optional so SSR works without passing functions
  onChange?: (rating: number) => void;
  // Back-compat with previous API
  rating?: number;
  setRating?: (rating: number) => void;
  // Visual config
  max?: number; // default 5
  size?: number;
  className?: string;
  // If true, shows as read-only (no interactions)
  readOnly?: boolean;
};

const Rating: React.FC<RatingProps> = ({
  value,
  defaultValue,
  onChange,
  rating, // legacy
  setRating, // legacy
  max = 5,
  className = "",
  readOnly = false,
}) => {
  // Determine controlled vs uncontrolled
  const controlledValue = value ?? rating;
  const isControlled = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState<number>(
    controlledValue ?? defaultValue ?? 0,
  );
  const [hoverValue, setHoverValue] = useState<number>(0);

  const current = useMemo(
    () => hoverValue || (isControlled ? controlledValue! : uncontrolledValue),
    [hoverValue, isControlled, controlledValue, uncontrolledValue],
  );

  const commit = (next: number) => {
    // Update internal state only in uncontrolled mode
    if (!isControlled) setUncontrolledValue(next);
    // Notify clients if provided (client-only)
    onChange?.(next);
    setRating?.(next); // legacy callback
  };

  const stars = useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max],
  );

  return (
    <div
      className={`flex gap-2 ${className}`}
      role={readOnly ? "img" : "group"}
      aria-label={readOnly ? `Rating: ${current} of ${max}` : undefined}
    >
      {stars.map((i) => {
        const filled = i <= current;
        return (
          <button
            key={i}
            type="button"
            className={`rounded transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none ${
              readOnly ? "cursor-default" : "hover:scale-110"
            }`}
            onClick={readOnly ? undefined : () => commit(i)}
            onMouseEnter={readOnly ? undefined : () => setHoverValue(i)}
            onMouseLeave={readOnly ? undefined : () => setHoverValue(0)}
            aria-label={
              readOnly ? undefined : `Rate ${i} star${i !== 1 ? "s" : ""}`
            }
            aria-pressed={
              !readOnly &&
              i <= (isControlled ? controlledValue! : uncontrolledValue)
            }
            disabled={readOnly}
          >
            <Star
              className={`transition-colors duration-150 ${
                filled
                  ? "text-secondary-600"
                  : "hover:text-secondary-300 text-neutral-100"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
