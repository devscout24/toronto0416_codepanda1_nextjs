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
                href={`/all-category?categories=${category.slug}`}
                key={idx}
              >
                <div className="hover:bg-primary-50 group flex w-full flex-1 cursor-pointer items-start justify-between gap-2 rounded-sm bg-white p-3 duration-300 active:scale-95 md:gap-4 md:p-3.5">
                  <div className="select-none">
                    <div className="text-sm font-medium text-nowrap md:text-lg md:font-semibold">
                      {category.name}
                    </div>
                    <div className="text-xs text-nowrap">{category.slogan}</div>
                  </div>
                  <div className="mt-8 h-10 w-10 duration-500 group-hover:scale-120 md:h-12 md:w-12">
                    <Image
                      src={
                        category.icon || category.svg_icon || Categories1Icon
                      }
                      alt={category.name}
                      width={100}
                      height={100}
                      className="h-10 w-auto md:h-12"
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
