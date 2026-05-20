// ===============================
// Common Order Interfaces
// ===============================

export interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  product_price: number;
}

export interface OrderAddress {
  id: number;
  postal_code: number;
  phone: string;
  city: string;
  block_sector: string;
  area: string;
  street_road: string;
  house_no: string;
  flat_no: string;
  floor_no: string;
  name: string;
  address_type: "home" | "office" | string;
}

export interface Order {
  id: number;
  order_id: string;
  tracking_id: string;
  status: "pending" | "processing" | "completed" | string;
  payment_status: "paid" | "unpaid" | string;
  is_paid: boolean;
  placed_on: string; // ISO string
  sub_total: number;
  shipping_charge: number;
  vat_amount: number;
  discount: number;
  total_price: number;
  items: OrderItem[];
  address: OrderAddress;
}

// ===============================
// Order List (Paginated)
// ===============================

export interface PaginatedOrders {
  count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  results: Order[];
}

export interface OrderListResponse {
  status: string;
  status_code: number;
  message: string;
  data: PaginatedOrders;
}

// ===============================
// Order Details (Single)
// ===============================

export interface OrderDetailsResponse {
  status: string;
  status_code: number;
  data: Order;
}

// billing.types.ts

// ===============================
// Billing / Invoice Model
// ===============================

export interface Invoice {
  id: number;
  invoice_no: string;
  order_id: string;
  amount: string; // API returns string (e.g. "227.20")
  currency: string; // e.g. "USD"
  status: "paid" | "unpaid" | "refunded";
  invoice_file: string | null;
  invoice_download_url: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// ===============================
// Billing History Response
// ===============================

export interface BillingHistoryResponse {
  status: string;
  status_code: number;
  message: string;
  data: Invoice[];
}
