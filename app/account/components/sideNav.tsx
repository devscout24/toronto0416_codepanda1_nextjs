import HelpIcon from "@/assets/icons/profile (1).svg";
import PoliciesIcon from "@/assets/icons/profile (2).svg";
import SettingsIcon from "@/assets/icons/profile (3).svg";
import OrdersIcon from "@/assets/icons/profile (4).svg";
import PaymentIcon from "@/assets/icons/profile (5).svg";
import AddressIcon from "@/assets/icons/profile (6).svg";
import ProfileIcon from "@/assets/icons/profile (7).svg";
import UserIcon from "@/assets/icons/profile (8).svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SideNav() {
  // Define the type for navigation items, including child items for dropdowns
  type TNavItem = {
    label: string;
    icon: React.FC<React.SVGProps<SVGElement>>;
    path?: string;
    children?: TNavItem[];
  };

  // Create the navigation object with dropdown menus (children)
  const navItems: TNavItem[] = [
    {
      label: "Manage My Account",
      icon: UserIcon,
      children: [
        {
          label: "My Profile",
          icon: ProfileIcon,
          path: "/account/profile",
        },
        {
          label: "Address Book",
          icon: AddressIcon,
          path: "/account/address-book",
        },
        {
          label: "Payment & Billing",
          icon: PaymentIcon,
          path: "/account/payment",
        },
      ],
    },
    {
      label: "My Orders",
      icon: OrdersIcon,
      path: "/account/orders",
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      path: "/account/settings",
    },
    {
      label: "Policies",
      icon: PoliciesIcon,
      path: "/account/policies",
    },
    {
      label: "Help & Support",
      icon: HelpIcon,
      path: "/account/help-support",
    },
  ];

  return (
    <nav>
      <h2 className="mb-5">Hello, Kodu Azad</h2>

      <ul className="space-y-5">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.path || ""}>
              <div className="hover:text-primary flex items-center gap-3 duration-300">
                <item.icon />
                <span>{item.label}</span>
              </div>
              {
                // If the item has children, render a dropdown
                item.children && (
                  <ul className="mt-5 ml-5">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        {child.path ? (
                          <Link href={child.path}>
                            <div className="hover:text-primary flex items-center gap-3 duration-300">
                              <child.icon />
                              <span>{child.label}</span>
                            </div>
                          </Link>
                        ) : (
                          // Otherwise, render the label
                          <div className="flex items-center gap-3">
                            <child.icon />
                            <span>{child.label}</span>
                          </div>
                        )}

                        {item.children &&
                          item.children.length - 1 !== childIndex && (
                            <Separator className="my-2.5 bg-neutral-100" />
                          )}
                      </li>
                    ))}
                  </ul>
                )
              }
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
