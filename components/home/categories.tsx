import Categories1Icon from "@/assets/icons/categories1.svg";
import Categories2Icon from "@/assets/icons/categories2.svg";
import Categories3Icon from "@/assets/icons/categories3.svg";
import Categories4Icon from "@/assets/icons/categories4.svg";
import Categories5Icon from "@/assets/icons/categories5.svg";
// import { ArrowRight } from "lucide-react";
// import { IconButton } from "../animate-ui/components/buttons/icon";

export default function Categories() {
  const categories = [
    {
      icon: <Categories1Icon />,
      name: "Vegetable",
      subtitle: "Local market",
    },
    {
      icon: <Categories2Icon />,
      name: "Snacks & Breads",
      subtitle: "In store delivery",
    },
    {
      icon: <Categories3Icon />,
      name: "Fruits",
      subtitle: "Comical Free",
    },
    {
      icon: <Categories4Icon />,
      name: "Milk & Dairy",
      subtitle: "Process Food",
    },
    {
      icon: <Categories5Icon />,
      name: "Chicken legs",
      subtitle: "Frozen Meal",
    },
  ];

  return (
    <section className="relative">
      <div className="section-container">
        <div className="flex flex-col gap-4 lg:flex-row">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="hover:bg-primary-50 group flex w-full cursor-pointer items-start justify-between gap-4 rounded-sm bg-white p-3.5 duration-300 active:scale-95"
            >
              <div>
                <div className="text-2xl font-semibold text-nowrap md:text-4xl lg:text-lg">
                  {category.name}
                </div>
                <div className="md:text-lg lg:text-xs">{category.subtitle}</div>
              </div>
              <div className="mt-8 duration-500 group-hover:scale-120">
                {category.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="bg-primary-900 absolute top-0 right-0 w-fit space-y-[1.62rem] rounded-l-sm p-3.5 text-white">
        <IconButton variant="secondary" className="rounded-full">
          <ArrowRight />
        </IconButton>
        <p>Show All</p>
      </div> */}
    </section>
  );
}
