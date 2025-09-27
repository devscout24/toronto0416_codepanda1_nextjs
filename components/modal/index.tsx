// import ShippingAddress from "@/app/cart/modals/shippingAddress";
import Modal from "./Modal";

export default function Modals() {
  return (
    <>
      <Modal title="Search" modalId="home-search-modal" openId="search-modal">
        Home search modal
      </Modal>

      {/* <Modal
        title="Add new shipping address"
        modalId="shipping-address"
        openId="shipping-modal"
      >
        <ShippingAddress />
      </Modal> */}
    </>
  );
}
