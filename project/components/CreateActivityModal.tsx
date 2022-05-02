import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import CreateActivityModalContent from "./CreateActivityModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  onSubmit: () => void;
  day: number;
  position: number;
}

Modal.setAppElement("#__next");

function CreateActivityModal({
  closeModal,
  onSubmit,
  day,
  position,
  ...rest
}: Props) {
  return (
    <CreateActivityModalStyles
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
      <CreateActivityModalContent
        closeModal={closeModal}
        onSubmit={onSubmit}
        day={day}
        position={position}
      />
    </CreateActivityModalStyles>
  );
}

const CreateActivityModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 529px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 20px;
  padding: 60px;
`;

export default CreateActivityModal;
