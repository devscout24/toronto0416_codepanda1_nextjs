"use client";

import Categories1Icon from "@/assets/icons/categories1.png";
import Categories2Icon from "@/assets/icons/categories2.svg";
import Categories3Icon from "@/assets/icons/categories3.svg";
import Categories4Icon from "@/assets/icons/categories4.svg";
import Categories5Icon from "@/assets/icons/categories5.svg";
import { ArrowRight } from "lucide-react";
import { handleMouseDown } from "@/utils/handleMouseDown";
import Link from "next/link";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { TCategory } from "@/types/testimonials.type";
import { useEffect, useState } from "react";
import { getCategories } from "./actions";
import Image from "next/image";

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  // const categories = [
  //   {
  //     icon: Categories1Icon,
  //     name: "Vegetable",
  //     subtitle: "Local market",
  //   },
  //   {
  //     icon: Categories2Icon,
  //     name: "Snacks & Breads",
  //     subtitle: "In store delivery",
  //   },
  //   {
  //     icon: Categories3Icon,
  //     name: "Fruits",
  //     subtitle: "Comical Free",
  //   },
  //   {
  //     icon: Categories1Icon,
  //     name: "Vegetable",
  //     subtitle: "Local market",
  //   },
  //   {
  //     icon: Categories4Icon,
  //     name: "Milk & Dairy",
  //     subtitle: "Process Food",
  //   },
  //   {
  //     icon: Categories5Icon,
  //     name: "Chicken legs",
  //     subtitle: "Frozen Meal",
  //   },
  //   {
  //     icon: Categories2Icon,
  //     name: "Snacks & Breads",
  //     subtitle: "In store delivery",
  //   },
  // ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response || []);
      } catch (error) {
        console.error(`Error fetching categories`, error);
        return null;
      }
    };

    fetchCategories();
  }, []);
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
              <Link
                href={`/all-category?categories=${category.name}`}
                key={idx}
              >
                <div className="hover:bg-primary-50 group flex w-full flex-1 cursor-pointer items-start justify-between gap-4 rounded-sm bg-white p-3.5 duration-300 active:scale-95">
                  <div className="select-none">
                    <div className="text-lg font-semibold text-nowrap">
                      {category.name}
                    </div>
                    <div className="text-xs text-nowrap">{category.slogan}</div>
                  </div>
                  <div className="mt-8 h-12 w-12 duration-500 group-hover:scale-120">
                    <Image
                      src={
                        category.icon || category.svg_icon || Categories1Icon
                      }
                      alt={category.name}
                      width={100}
                      height={100}
                      className="h-12 w-auto"
                    />
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/all-category">
              <div className="bg-primary-900 flex-1 space-y-6 rounded-sm p-3.5 text-nowrap text-white">
                <IconButton variant="secondary" className="rounded-full">
                  <ArrowRight />
                </IconButton>
                <p>Show All</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
