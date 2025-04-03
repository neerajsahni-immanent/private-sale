import { Box, Modal, Typography } from "@mui/material";
export default function CustomModal({
  customClass,
  isOpen,
  closeModal,
  children,
}) {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={customClass}
      >
        <Box>{children}</Box>
      </Modal>
    </>
  );
}
