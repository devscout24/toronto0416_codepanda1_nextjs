"use client";

import Categories1Icon from "@/assets/icons/categories1.svg";
import Categories2Icon from "@/assets/icons/categories2.svg";
import Categories3Icon from "@/assets/icons/categories3.svg";
import Categories4Icon from "@/assets/icons/categories4.svg";
import Categories5Icon from "@/assets/icons/categories5.svg";
import { ArrowRight } from "lucide-react";
import { IconButton } from "../animate-ui/components/buttons/icon";

export default function Categories() {
  const categories = [
    {
      icon: Categories1Icon,
      name: "Vegetable",
      subtitle: "Local market",
    },
    {
      icon: Categories2Icon,
      name: "Snacks & Breads",
      subtitle: "In store delivery",
    },
    {
      icon: Categories3Icon,
      name: "Fruits",
      subtitle: "Comical Free",
    },
    {
      icon: Categories1Icon,
      name: "Vegetable",
      subtitle: "Local market",
    },
    {
      icon: Categories4Icon,
      name: "Milk & Dairy",
      subtitle: "Process Food",
    },
    {
      icon: Categories5Icon,
      name: "Chicken legs",
      subtitle: "Frozen Meal",
    },
    {
      icon: Categories2Icon,
      name: "Snacks & Breads",
      subtitle: "In store delivery",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollContainer = e.currentTarget;
    if (!scrollContainer) return;

    const startX = e.clientX;
    const scrollLeft = scrollContainer.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - startX;
      scrollContainer.scrollLeft = scrollLeft - x;
    };

    const handleMouseUp = () => {
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
    };

    scrollContainer.addEventListener("mousemove", handleMouseMove);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section>
      <div className="section-container">
        <div
          className="no-scrollbar w-full cursor-grabbing overflow-x-auto"
          onMouseDown={handleMouseDown}
          style={{ cursor: "grab" }}
        >
          <div className="flex items-center gap-4">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="hover:bg-primary-50 group flex w-full flex-1 cursor-pointer items-start justify-between gap-4 rounded-sm bg-white p-3.5 duration-300 active:scale-95"
              >
                <div className="select-none">
                  <div className="text-lg font-semibold text-nowrap">
                    {category.name}
                  </div>
                  <div className="text-xs text-nowrap">{category.subtitle}</div>
                </div>
                <div className="mt-8 duration-500 group-hover:scale-120">
                  <category.icon />
                </div>
              </div>
            ))}
            <div className="bg-primary-900 flex-1 space-y-6 rounded-sm p-3.5 text-nowrap text-white">
              <IconButton variant="secondary" className="rounded-full">
                <ArrowRight />
              </IconButton>
              <p>Show All</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
