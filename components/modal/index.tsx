import Modal from "./Modal";

export default function Modals() {
  return (
    <>
      <Modal title="Test Modal" modalId="modal" openId="test-modal">
        Test Modal
      </Modal>

      <Modal title="Test Modal 2" modalId="modal2" openId="test-modal2">
        Test Modal 2
      </Modal>
    </>
  );
}
