import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";
import CreateExerciseModalContent from "./CreateExerciseModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
}

function CreateExerciseModal({ closeModal, ...rest }: Props) {
  return (
    <CreateExerciseModalStyles
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
      <CreateExerciseModalContent closeModal={closeModal} />
    </CreateExerciseModalStyles>
  );
}

const CreateExerciseModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 1025px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px;
`;

export default CreateExerciseModal;
