export type TPersonalInfo = {
  id: number;
  name: string;
  phone: string;
  country: string;
  created_at: string;
  updated_at: string;
};

export type TAddressBookEntry = {
  image?: string
  id: number;
  city: string;
  area: string;
  blockSector: string;
  streetRoad: string;
  houseNo: string;
  flatNo: string;
  floorNo: string;
  name: string;
  phone: string;
  deliveryNote: string;
  addressType: "home" | "office";
  is_default: boolean;
};

export type TOrder = {
  orderId: string;
  placedOn: string;
  item: string;
  total: string;
  status: "In Shipping" | "Completed" | "Canceled";
};

export type TUserProfile = {
  personal_info: TPersonalInfo;
  addresses: TAddressBookEntry[];
  orders: TOrder[];
};

export type TUserProfileResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TUserProfile;
};

export type TInvoice = {
  id: string;
  status: "Paid" | "Pending" | "Failed";
  amount: string;
  downloadUrl?: string; // Optional since it's an action
};

// sing in resposne
// types/apiResponse.ts

export interface ApiResponse<T> {
  status: string;
  status_code: number;
  message: string;
  data: T;
}

export interface LoginData {
  access: string;
  refresh: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
}



export type TUserAccount = {
  id: number;
  name: string;
  phone: string;
  country: string;
  email?: string; // optional if your API doesn't return email
  image?: string; // optional
};

export type TUserResponse = {
  data : TUserAccount
}



export type TAddressBook = {
  id: number;
  city: string;
  area: string;
  blockSector: string;
  streetRoad: string;
  houseNo: string;
  flatNo: string;
  floorNo: string;
  name: string;
  phone: string;
  deliveryNote: string;
  addressType: "home" | "office"; // use literal types if only these values exist
  is_default: boolean;
};

export type TAddressBookResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TAddressBook;
};
