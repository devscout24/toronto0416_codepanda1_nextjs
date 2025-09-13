import LoginForm from "./LoginForm";
import Modal from "./Modal";
import Register from "./Register";

export default function Modals() {
  return (
    <>
      <Modal title="Sign In" modalId="modal" openId="sign-in">
        <LoginForm />
      </Modal>

      <Modal title="Sign Up" modalId="modal" openId="sign-up">
        <Register />
      </Modal>

      <Modal title="Forgot password?" modalId="modal" openId="forgot-password">
        Forgot password form goes here
      </Modal>
    </>
  );
}
