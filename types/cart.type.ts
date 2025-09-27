export type TCartProduct = {
  id: string;
  image: string;
  product_name: string;
  sku: string;
  price: number;
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

export type TCart = {
  checkout: TCheckoutCart;
  cart: TCartProduct[];
};

export type TCartAddress = {
  addressType: "home" | "office";
  city: string;
  area: string;
  blockSector: string;
  streetRoad: string;
  houseNo: string;
  flatNo: string;
  floorNo: string;
  name: string;
  phone: string;
  deliveryNote?: string;
};
