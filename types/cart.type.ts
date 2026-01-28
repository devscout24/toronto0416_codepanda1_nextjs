
export type TCartProduct = {
  id: number;
  image: string;
  product_name: string;
  sku: string;
  price: string;
  quantity: number;
};

type TCoupon = {
  code: string;
  is_valid: boolean;
};

export type TCheckoutCart = {
  product: number;
  subtotal: number;
  shipping_fee: number;
  vat: number;
  total: number;
  coupon: TCoupon;
};

export type CartMetaData = {
  sub_total: number;
  shipping_fee: number;
  vat: number;
  discount: number;
  total_price: number;
};

export type TCartItems = {
  items: TCartProduct[];
  sub_total: number;
  shipping_fee: number;
  vat: number;
  discount: number;
  total_price: number;
};

export type TCartAPIResponse = {
  status: string;
  status_code: number;
  message: string;
  metadata: CartMetaData;
  data: TCartItems;
};

export type TCartAddress = {
  address_type: "home" | "office";
  city: string;
  area: string;
  block_sector: string;
  street_road: string;
  postal_code: string;
  house_no: string;
  flat_no: string;
  floor_no: string;
  name: string;
  phone: string;
  delivery_note?: string;
  is_default: boolean;
};

export type PostalCodeAPIResponse = {
  status: string;
  status_code: number;
  message: string;
  data: {
    available: "yes" | "no";
  };
};

export type TDeliveryOption = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export type TDeliveryResponse = {
  status: string;
  status_code: number;
  message: string;
  data: TDeliveryOption[];
};
