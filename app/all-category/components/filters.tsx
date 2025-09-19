import FilterIcon from "@/assets/icons/Group.svg";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Slider } from "@/components/ui/slider";
import Rating from "@/components/shared/Rating";
import { Switch } from "@/components/animate-ui/components/headless/switch";
// import Icon from "@/assets/icons/Icon.svg";

export default function Filters() {
  const filters = [
    {
      title: "Categories",
      type: "checkbox",
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
      max: 500,
      step: 1,
      unit: "$",
    },
    {
      title: "Customer Ratings",
      type: "rating",
      max: 5,
    },
    {
      title: "Dietary",
      type: "checkbox",
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
      value: "in_stock",
    },
  ];

  const filterSection = (type: string, filter: (typeof filters)[number]) => {
    switch (type) {
      case "checkbox":
        return (
          <>
            <div className="flex flex-col gap-2.5">
              {filter.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <Checkbox id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>

            <Separator className="my-3.5" />
          </>
        );
      case "toggle":
        return (
          <div className="flex items-center gap-2.5">
            <Switch id={filter.value} />
            <Label htmlFor={filter.value} className="text-nowrap">
              {filter.label}
            </Label>
          </div>
        );
      case "range":
        return (
          <>
            <div className="flex items-center gap-2.5">
              <Label htmlFor={filter.value}>{filter.label}</Label>
              <div className="w-full">
                <Slider max={100} step={1} />
                <div className="mt-1.5 flex w-full items-center justify-between">
                  <span>
                    {filter.unit}
                    {filter.min}
                  </span>
                  <span>
                    {filter.unit}
                    {filter.max}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-3.5" />
          </>
        );
      case "rating":
        return (
          <>
            <div className="flex items-center gap-2.5">
              <Label htmlFor={filter.value}>{filter.label}</Label>
              <Rating rating={filter.max} />
            </div>

            <Separator className="my-3.5" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FilterIcon />
          <h4 className="text-lg font-semibold">Filters</h4>
        </div>
        {/* <Icon /> */}
      </div>
      <Separator className="mt-2.5 mb-5" />

      {filters.map((filter, index) => (
        <div key={index}>
          <h5 className="mb-2.5 font-semibold">{filter.title}</h5>
          {filterSection(filter.type, filter)}
        </div>
      ))}
    </section>
  );
}
