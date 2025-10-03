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
