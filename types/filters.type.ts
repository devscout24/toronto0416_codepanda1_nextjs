export type TCheckboxOption = { label: string; value: string };

export type TCheckboxFilter = {
  title: string;
  type: "checkbox";
  queryKey: string;
  options: TCheckboxOption[];
};

export type TRangeFilter = {
  title: string;
  type: "range";
  min: number;
  max: number;
  step?: number;
  unit?: string;
  minQueryKey: string;
  maxQueryKey: string;
};

export type TRatingFilter = {
  title: string;
  type: "rating";
  max: number;
  queryKey: string;
};

export type ToggleFilter = {
  title: string;
  type: "toggle";
  label: string;
  queryKey: string;
};

export type TFilterDefinition =
  | TCheckboxFilter
  | TRangeFilter
  | TRatingFilter
  | ToggleFilter;
