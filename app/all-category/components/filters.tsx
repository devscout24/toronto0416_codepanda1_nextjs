"use client";

import FilterIcon from "@/assets/icons/Group.svg";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Slider } from "@/components/ui/slider";
import Rating from "@/components/shared/Rating";
import { Switch } from "@/components/animate-ui/components/headless/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback } from "react";
import { TFilterDefinition, TRangeFilter } from "@/types/filters.type";
import { BrushCleaning } from "lucide-react";
import { allFilters } from "@/consts/filters";

const splitQueryValues = (value: string | null) =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const joinQueryValues = (values: string[]) => values.join(",");

const readNumericParam = (value: string | null, fallback: number) => {
  if (value === null) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const parseBooleanParam = (value: string | null) =>
  value === "true" || value === "1";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.toString();

      mutator(params);

      const next = params.toString();
      if (next === current) return;

      router.push(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const normalizeSwitchValue = (
    value: boolean | FormEvent<HTMLButtonElement>,
    current: boolean,
  ) => {
    if (typeof value === "boolean") return value;
    const aria = value.currentTarget.getAttribute("aria-checked");
    if (aria === "true") return true;
    if (aria === "false") return false;
    return !current;
  };

  const handleCheckboxChange = useCallback(
    (key: string, optionValue: string, next: boolean | "indeterminate") => {
      updateParams((params) => {
        const selected = new Set(splitQueryValues(params.get(key)));
        const shouldCheck = next === true || next === "indeterminate";

        if (shouldCheck) {
          selected.add(optionValue);
        } else {
          selected.delete(optionValue);
        }

        if (selected.size) {
          const sorted = Array.from(selected).sort();
          params.set(key, joinQueryValues(sorted));
        } else {
          params.delete(key);
        }
      });
    },
    [updateParams],
  );

  const handleToggleChange = useCallback(
    (key: string, isChecked: boolean) => {
      updateParams((params) => {
        if (isChecked) {
          params.set(key, "true");
        } else {
          params.delete(key);
        }
      });
    },
    [updateParams],
  );

  const handleRangeCommit = useCallback(
    (filter: TRangeFilter, value: [number, number]) => {
      updateParams((params) => {
        const [minValue, maxValue] = value;

        if (minValue <= filter.min) {
          params.delete(filter.minQueryKey);
        } else {
          params.set(filter.minQueryKey, String(minValue));
        }

        if (maxValue >= filter.max) {
          params.delete(filter.maxQueryKey);
        } else {
          params.set(filter.maxQueryKey, String(maxValue));
        }
      });
    },
    [updateParams],
  );

  const handleRatingChange = useCallback(
    (key: string, rating: number) => {
      updateParams((params) => {
        if (rating > 0) {
          params.set(key, String(rating));
        } else {
          params.delete(key);
        }
      });
    },
    [updateParams],
  );

  const RenderFilterSection = ({ filter }: { filter: TFilterDefinition }) => {
    switch (filter.type) {
      case "checkbox": {
        const selectedValues = splitQueryValues(
          searchParams.get(filter.queryKey),
        );

        return (
          <>
            <div className="flex flex-col gap-2.5">
              {filter.options.map((option) => {
                const checked = selectedValues.includes(option.value);
                const id = `${filter.queryKey}-${option.value}`;

                return (
                  <div key={option.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={(next) =>
                        handleCheckboxChange(
                          filter.queryKey,
                          option.value,
                          next,
                        )
                      }
                    />
                    <Label htmlFor={id}>{option.label}</Label>
                  </div>
                );
              })}
            </div>

            <Separator className="my-3.5" />
          </>
        );
      }

      case "range": {
        const minParam = readNumericParam(
          searchParams.get(filter.minQueryKey),
          filter.min,
        );
        const maxParam = readNumericParam(
          searchParams.get(filter.maxQueryKey),
          filter.max,
        );
        const sliderMin = clampNumber(
          Math.min(minParam, maxParam),
          filter.min,
          filter.max,
        );
        const sliderMax = clampNumber(
          Math.max(minParam, maxParam),
          filter.min,
          filter.max,
        );
        const sliderValue: [number, number] = [sliderMin, sliderMax];

        return (
          <>
            <div className="flex flex-col gap-2.5">
              <Slider
                key={`${sliderValue[0]}-${sliderValue[1]}`}
                min={filter.min}
                max={filter.max}
                step={filter.step}
                defaultValue={sliderValue}
                onValueCommit={(value) =>
                  handleRangeCommit(filter, value as [number, number])
                }
              />
              <div className="text-muted-foreground mt-1.5 flex items-center justify-between text-sm">
                <span>
                  {filter.unit ?? ""}
                  {sliderValue[0]}
                </span>
                <span>
                  {filter.unit ?? ""}
                  {sliderValue[1]}
                </span>
              </div>
            </div>

            <Separator className="my-3.5" />
          </>
        );
      }

      case "rating": {
        const currentRating = readNumericParam(
          searchParams.get(filter.queryKey),
          0,
        );

        return (
          <>
            <Rating
              max={filter.max}
              value={currentRating}
              onChange={(value) =>
                handleRatingChange(
                  filter.queryKey,
                  value === currentRating ? 0 : value,
                )
              }
            />

            <Separator className="my-3.5" />
          </>
        );
      }

      case "toggle": {
        const checked = parseBooleanParam(searchParams.get(filter.queryKey));
        const id = `${filter.queryKey}-toggle`;

        return (
          <div className="flex items-center gap-2.5">
            <Switch
              id={id}
              checked={checked}
              onChange={(next) =>
                handleToggleChange(
                  filter.queryKey,
                  normalizeSwitchValue(next, checked),
                )
              }
            />
            <Label htmlFor={id} className="text-nowrap">
              {filter.label}
            </Label>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const resetFilters = useCallback(() => {
    updateParams((params) => {
      allFilters.forEach((filter) => {
        if (filter.type === "range") {
          params.delete(filter.minQueryKey);
          params.delete(filter.maxQueryKey);
        } else {
          params.delete(filter.queryKey);
        }
      });
    });
  }, [updateParams]);

  return (
    <section className="rounded-2xl bg-white p-5 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FilterIcon />
          <h4 className="text-lg font-semibold">Filters</h4>
        </div>
        <BrushCleaning
          className="size-5 cursor-pointer"
          onClick={() => resetFilters()}
        />
      </div>
      <Separator className="mt-2.5 mb-5" />

      {allFilters.map((filter) => (
        <div key={filter.title}>
          <h5 className="mb-2.5 font-semibold">{filter.title}</h5>
          <RenderFilterSection filter={filter} />
        </div>
      ))}
    </section>
  );
}
