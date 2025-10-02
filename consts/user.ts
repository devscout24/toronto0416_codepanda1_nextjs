import { TUserProfile } from "@/types/user.type";

export const userData: TUserProfile = {
  personalInfo: {
    image: "/images/images.png",
    name: "Kodu Azad",
    email: "kodu@azad.com",
    phone: "+1 555-0128",
    country: "U.S.A.",
    receiveMarketingEmail: true,
  },
  addressBook: [
    {
      name: "Kodu Azad",
      phone: "+880 1253 254652",
      address:
        "Shathi, Dhalamulgow, purboadhab, Netrokona, Purbothala Sadar, Netrokona, Mymensingh",
      type: "Home",
    },
    {
      name: "Kodu Azad",
      phone: "+880 1253 254652",
      address:
        "Shathi, Dhalamulgow, purboadhab, Netrokona, Purbothala Sadar, Netrokona, Mymensingh",
      type: "Office",
    },
  ],
  recentOrders: [
    {
      orderId: "674854679769885",
      placedOn: "16/06/2025",
      item: "1",
      total: "$100.00",
      status: "In Shipping",
    },
    {
      orderId: "674854679769885",
      placedOn: "16/06/2025",
      item: "2",
      total: "$100.00",
      status: "Completed",
    },
    {
      orderId: "674854679769885",
      placedOn: "16/06/2025",
      item: "3",
      total: "$100.00",
      status: "Canceled",
    },
    {
      orderId: "674854679769885",
      placedOn: "16/08/2025",
      item: "4",
      total: "$100.00",
      status: "In Shipping",
    },
  ],
};
