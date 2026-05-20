import ShippingAddress from "@/app/cart/modals/shippingAddress";
import SuccessModal from "@/app/cart/components/successModal";
import Modal from "./Modal";
import MyProfileEdit from "@/app/account/components/myProfileEdit";
import { LoginForm } from "../auth";
import Logout from "../auth/logout";
import { SignUpForm } from "../auth/signup";
import { ForgotPasswordForm } from "../auth/resetPassword";
import FailedModal from "@/app/cart/components/FailedModal";
import ReviewModal from "./component/ReviewModal";
import CartModal from "./component/CartModal";

export default function Modals() {
  return (
    <>
      <Modal title="Search" modalId="home-search-modal" openId="search-modal">
        Home search modal
      </Modal>

      <Modal
        title="Find the location for delivery"
        modalId="shipping-address"
        openId="shipping-modal"
      >
        <ShippingAddress />
      </Modal>

      <Modal title="" modalId="place-order-modal" openId="place-order">
        <SuccessModal />
      </Modal>
      <Modal title="" modalId="place-error-modal" openId="place-error">
        <FailedModal />
      </Modal>

      {/* <Modal
        title=""
        modalId="confirm-cancel-order-modal"
        openId="confirm-cancel-order"
      >
        <CancelOrder />
      </Modal> */}

      <Modal
        title="Give a ratings on your purchase"
        modalId="ratings-modal"
        openId="ratings"
      >
        <ReviewModal />
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

      <Modal title="" modalId="signup-modal" openId="signup">
        <SignUpForm />
      </Modal>
      <Modal title="" modalId="resetpassword-modal" openId="resetpassword">
        <ForgotPasswordForm />
      </Modal>
      <Modal title="" modalId="cart-modal" openId="cart">
        <CartModal />
      </Modal>
    </>
  );
}
