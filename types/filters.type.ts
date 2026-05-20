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

export type TToggleFilter = {
  title: string;
  type: "toggle";
  label: string;
  queryKey: string;
};

export type TFilterDefinition =
  | TCheckboxFilter
  | TRangeFilter
  | TRatingFilter
  | TToggleFilter;

// API Response Types
export type TApiCheckboxOption = {
  label: string;
  value: string;
};

export type TApiCheckboxFilter = {
  title: string;
  type: "checkbox";
  queryKey: string;
  options: TApiCheckboxOption[];
};

export type TApiRangeFilter = {
  title: string;
  type: "range";
  queryKey: string;
  min: string;
  max: string;
};

export type TApiRatingFilter = {
  title: string;
  type: "rating";
  max: number;
  queryKey: string;
};

export type TApiToggleFilter = {
  title: string;
  type: "toggle";
  label: string;
  queryKey: string;
};

export type TApiFilterDefinition =
  | TApiCheckboxFilter
  | TApiRangeFilter
  | TApiRatingFilter
  | TApiToggleFilter;

export type TApiFilterResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TApiFilterDefinition[];
};