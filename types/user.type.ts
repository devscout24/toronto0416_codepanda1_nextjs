export type TPersonalInfo = {
  name: string;
  email: string;
  phone: string;
  country: string;
  receiveMarketingEmail: boolean;
};

export type TAddressBookEntry = {
  name: string;
  phone: string;
  address: string;
  type: "Home" | "Office";
};

export type TOrder = {
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

export type TInvoice = {
  id: string;
  status: "Paid" | "Pending" | "Failed";
  amount: string;
  downloadUrl?: string; // Optional since it's an action
};
