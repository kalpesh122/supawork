import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";
import AddClientModalContent from "./AddClientModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
}

Modal.setAppElement("#__next");

function AddClientModal({ closeModal, ...rest }: Props) {
  return (
    <AddClientModalStyles
      as={Modal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        },
      }}
      {...rest}
    >
      <AddClientModalContent closeModal={closeModal} />
    </AddClientModalStyles>
  );
}

const AddClientModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 529px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 20px;
  padding: 60px;
`;

export default AddClientModal;
