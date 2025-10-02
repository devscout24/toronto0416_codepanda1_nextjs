import { TOrderDetails } from "@/types/orders.type";

export const orderDetails: TOrderDetails = {
  orderId: "643636442",
  trackingId: "643636442",
  items: [
    {
      id: "1",
      image: "/images/card-img.jpg",
      productName: "Superior Halal Beef Burgers",
      quantity: "2kg",
      price: 50.2,
      sku: "SPHE•XCCZ",
    },
    {
      id: "2",
      image: "/images/card-img.jpg",
      productName: "Superior Halal Beef Burgers",
      quantity: "1kg",
      price: 50.2,
      sku: "SPHE•XCCZ",
    },
    {
      id: "3",
      image: "/images/card-img.jpg",
      productName: "Superior Halal Beef Burgers",
      quantity: "2kg",
      price: 50.2,
      sku: "SPHE•XCCZ",
    },
  ],
  summary: {
    subtotal: 150.0,
    shippingFee: 0.0,
    vat: 10.0,
    vatPercentage: "15%",
    total: 150.0,
    productCount: 3,
  },
  statusTimeline: [
    {
      status: "Order Placed",
      date: "Jan 20",
      completed: true,
    },
    {
      status: "Processing",
      date: "Jan 22",
      completed: true,
    },
    {
      status: "Shipped",
      date: "Jan 24",
      completed: false,
    },
    {
      status: "Delivered",
      date: "Jan 27",
      completed: false,
    },
  ],
};
