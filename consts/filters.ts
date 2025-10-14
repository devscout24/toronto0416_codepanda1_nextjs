import { TFilterDefinition } from "@/types/filters.type";

export const allFilters: TFilterDefinition[] = [
  {
    title: "Categories",
    type: "checkbox",
    queryKey: "categories",
    options: [
      { label: "Vegetable", value: "vegetable" },
      { label: "Meats", value: "meats" },
      { label: "Milk & Dairy", value: "milk_dairy" },
      { label: "Snacks & Breads", value: "snacks_breads" },
      { label: "Fruits", value: "fruits" },
      { label: "Drinks", value: "drinks" },
    ],
  },
  {
    title: "Brand",
    type: "checkbox",
    queryKey: "brands",
    options: [
      { label: "Aarong Dairy", value: "aarong_dairy" },
      { label: "Pran", value: "pran" },
      { label: "Fresh", value: "fresh" },
      { label: "Nestlé", value: "nestle" },
    ],
  },
  {
    title: "Price Range",
    type: "range",
    min: 0,
    max: 50000,
    step: 1,
    unit: "$",
    minQueryKey: "price_min",
    maxQueryKey: "price_max",
  },
  {
    title: "Customer Ratings",
    type: "rating",
    max: 5,
    queryKey: "rating",
  },
  {
    title: "Dietary",
    type: "checkbox",
    queryKey: "dietary",
    options: [
      { label: "Sugar-Free", value: "sugar_free" },
      { label: "Gluten-Free", value: "gluten_free" },
      { label: "Vegan", value: "vegan" },
      { label: "Halal Certified", value: "halal_certified" },
    ],
  },
  {
    title: "Availability",
    type: "toggle",
    label: "Show only in-stock items",
    queryKey: "in_stock",
  },
];
