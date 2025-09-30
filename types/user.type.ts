type TPersonalInfo = {
  name: string;
  email: string;
  phone: string;
  country: string;
  receiveMarketingEmail: boolean;
};

type TAddressBookEntry = {
  name: string;
  phone: string;
  address: string;
  type: "Home" | "Office";
};

type TOrder = {
  orderId: string;
  placedOn: string;
  item: string;
  total: string;
  status: "In Shipping" | "Completed" | "Canceled";
};

export type TUserProfile = {
  personalInfo: TPersonalInfo;
  addressBook: TAddressBookEntry[];
  recentOrders: TOrder[];
};
