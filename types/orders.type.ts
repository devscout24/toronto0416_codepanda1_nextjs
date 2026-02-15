type TOrderStatus = "Order Placed" | "Processing" | "Shipped" | "Delivered";

export type TOrderItem = {
  id: string;
  image: string;
  productName: string;
  quantity: string;
  price: number;
  sku: string;
};

export type TStatusTimeline = {
  status: TOrderStatus;
  date: string;
  completed: boolean;
};

export type TOrderSummary = {
  subtotal: number;
  shippingFee: number;
  vat: number;
  vatPercentage: string;
  total: number;
  productCount: number;
};

export type TOrderDetails = {
  orderId: string;
  trackingId: string;
  items: TOrderItem[];
  summary: TOrderSummary;
  statusTimeline: TStatusTimeline[];
};



// 
// order.type.ts

export type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  product_price: number;
};

export type OrderAddress = {
  id: number;
  postal_code: number | string;
  phone: string;
  city: string;
  block_sector?: string;
  area?: string;
  street_road?: string;
  house_no?: string;
  flat_no?: string;
  floor_no?: string;
  name: string;
  address_type: "home" | "office" | string;
};

export type OrderData = {
  id: number;
  order_id: string;
  tracking_id: string;
  status: string;
  is_paid: boolean;
  placed_on: string; // ISO string, can be parsed to Date
  sub_total: number;
  shipping_charge: number;
  vat_amount: number;
  discount: number;
  total_price: number;
  items: OrderItem[];
  address: OrderAddress;
};

export type OrderResponse = {
  status: "success" | "error" | string;
  status_code: number;
  message: string;
  data: OrderData;
};