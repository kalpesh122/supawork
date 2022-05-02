import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import ExerciseModalContent from "./ExerciseModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  createOnClick: () => void;
  exerciseOnClick: (exercise: any) => void;
}

function ExerciseModal({
  closeModal,
  createOnClick,
  exerciseOnClick,
  ...rest
}: Props) {
  return (
    <ExerciseModalStyles
      as={Modal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      {...rest}
    >
      <ExerciseModalContent
        closeModal={closeModal}
        createOnClick={createOnClick}
        exerciseOnClick={exerciseOnClick}
      />
    </ExerciseModalStyles>
  );
}

const ExerciseModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 960px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px;
`;

export default ExerciseModal;
