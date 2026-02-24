"use client";

import FilterIcon from "@/assets/icons/Group.svg";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Slider } from "@/components/ui/slider";
import Rating from "@/components/shared/Rating";
import { Switch } from "@/components/animate-ui/components/headless/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { BrushCleaning, Scroll } from "lucide-react";
import { getFilters } from "./action";
import { TApiFilterDefinition, TApiRangeFilter } from "@/types/filters.type";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [allFilters, setAllFilters] = useState<TApiFilterDefinition[]>([]);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await getFilters();
        setAllFilters(response);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    }

    fetchFilters();
  }, []);

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
    (filter: TApiRangeFilter, value: [number, number]) => {
      const filterMin = Number(filter.min);
      const filterMax = Number(filter.max);

      updateParams((params) => {
        const [minValue, maxValue] = value;

        if (minValue <= filterMin) {
          params.delete(`${filter.queryKey}_min`);
        } else {
          params.set(`${filter.queryKey}_min`, String(minValue));
        }

        if (maxValue >= filterMax) {
          params.delete(`${filter.queryKey}_max`);
        } else {
          params.set(`${filter.queryKey}_max`, String(maxValue));
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

  const RenderFilterSection = ({
    filter,
  }: {
    filter: TApiFilterDefinition;
  }) => {
    switch (filter.type) {
      case "checkbox": {
        const selectedValues = splitQueryValues(
          searchParams.get(filter.queryKey),
        );

        // deduplicate options by value
        const uniqueOptions = filter.options.filter(
          (option, index, self) =>
            index === self.findIndex((o) => o.value === option.value),
        );

        return (
          <>
            <div className="flex flex-col gap-2.5">
              {uniqueOptions.map((option) => {
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
                    <Label className="line-clamp-1" htmlFor={id}>
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>

            <Separator className="my-3.5" />
          </>
        );
      }

      case "range": {
        const filterMin = Number(filter.min);
        const filterMax = Number(filter.max);

        const minParam = readNumericParam(
          searchParams.get(`${filter.queryKey}_min`),
          filterMin,
        );
        const maxParam = readNumericParam(
          searchParams.get(`${filter.queryKey}_max`),
          filterMax,
        );
        const sliderMin = clampNumber(
          Math.min(minParam, maxParam),
          filterMin,
          filterMax,
        );
        const sliderMax = clampNumber(
          Math.max(minParam, maxParam),
          filterMin,
          filterMax,
        );
        const sliderValue: [number, number] = [sliderMin, sliderMax];

        return (
          <>
            <div className="flex flex-col gap-2.5">
              <Slider
                key={`${sliderValue[0]}-${sliderValue[1]}`}
                min={filterMin}
                max={filterMax}
                step={0.01}
                defaultValue={sliderValue}
                onValueCommit={(value) =>
                  handleRangeCommit(filter, value as [number, number])
                }
              />
              <div className="text-muted-foreground mt-1.5 flex items-center justify-between text-sm">
                <span>${sliderValue[0].toFixed(2)}</span>
                <span>${sliderValue[1].toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-3.5" />
          </>
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
          params.delete(`${filter.queryKey}_min`);
          params.delete(`${filter.queryKey}_max`);
        } else {
          params.delete(filter.queryKey);
        }
      });
      // reset static filters
      params.delete("rating");
      params.delete("in_stock");
    });
  }, [updateParams, allFilters]);

  const currentRating = readNumericParam(searchParams.get("rating"), 0);
  const inStockChecked = parseBooleanParam(searchParams.get("in_stock"));

  return (
    <section className="rounded-2xl bg-white shadow lg:sticky lg:top-0">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2.5">
          <FilterIcon />
          <h4 className="text-lg font-semibold">Filters</h4>
        </div>
        <BrushCleaning
          className="size-5 cursor-pointer"
          onClick={() => resetFilters()}
        />
      </div>
      <Separator className="mt-2.5" />
      <ScrollArea className="h-[75vh] w-full p-4">
        {/* Dynamic filters from API */}
        {allFilters.map((filter) => (
          <div key={filter.title}>
            <h5 className="mb-2.5 font-semibold">{filter.title}</h5>
            <RenderFilterSection filter={filter} />
          </div>
        ))}

        {/* Static: Customer Ratings */}
        <div>
          <h5 className="mb-2.5 font-semibold">Customer Ratings</h5>
          <Rating
            max={5}
            value={currentRating}
            onChange={(value) =>
              handleRatingChange("rating", value === currentRating ? 0 : value)
            }
          />
          <Separator className="my-3.5" />
        </div>

        {/* Static: Availability */}
        <div>
          <h5 className="mb-2.5 font-semibold">Availability</h5>
          <div className="flex items-center gap-2.5">
            <Switch
              id="in_stock-toggle"
              checked={inStockChecked}
              onChange={(next) =>
                handleToggleChange(
                  "in_stock",
                  normalizeSwitchValue(next, inStockChecked),
                )
              }
            />
            <Label htmlFor="in_stock-toggle" className="text-nowrap">
              Only in-stock items
            </Label>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}