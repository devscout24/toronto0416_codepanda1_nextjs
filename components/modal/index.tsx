import ShippingAddress from "@/app/cart/modals/shippingAddress";
import SuccessModal from "@/app/cart/components/successModal";
import Modal from "./Modal";
import Rating from "../shared/Rating";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../animate-ui/components/buttons/button";
import CancelOrder from "@/app/account/components/cancelOrder";
import MyProfileEdit from "@/app/account/components/myProfileEdit";
import { LoginForm } from "../auth";
import Logout from "../auth/logout";

export default function Modals() {
  return (
    <>
      <Modal title="Search" modalId="home-search-modal" openId="search-modal">
        Home search modal
      </Modal>

      <Modal
        title="Add new shipping address"
        modalId="shipping-address"
        openId="shipping-modal"
      >
        <ShippingAddress />
      </Modal>

      <Modal title="" modalId="place-order-modal" openId="place-order">
        <SuccessModal />
      </Modal>

      <Modal
        title=""
        modalId="confirm-cancel-order-modal"
        openId="confirm-cancel-order"
      >
        <CancelOrder />
      </Modal>

      <Modal
        title="Give a ratings on your purchase"
        modalId="ratings-modal"
        openId="ratings"
      >
        <div className="space-y-5">
          <div className="space-y-2.5">
            <Label>Add Ratings</Label>
            <Rating />
          </div>

          <div className="space-y-2.5">
            <Label>Comment (Optional)</Label>
            <Textarea placeholder="Write your comment.." rows={10} />
          </div>

          <Button className="w-full">Submit</Button>
        </div>
      </Modal>

      <Modal
        title="Edit My Profile"
        modalId="profile-edit-modal"
        openId="profile-edit"
      >
        <MyProfileEdit />
      </Modal>

      <Modal title="" modalId="login-modal" openId="login">
        <LoginForm />
      </Modal>

      <Modal title="" modalId="logout-modal" openId="logout">
        <Logout />
      </Modal>
    </>
  );
}
