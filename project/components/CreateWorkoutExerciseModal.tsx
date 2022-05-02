import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import CreateWorkoutExerciseModalContent from "./CreateWorkoutExerciseModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  exercise: any;
  onSubmit: ({}: { exercise: any; sets: string; reps: string }) => void;
}

function CreateWorkoutExerciseModal({
  closeModal,
  exercise,
  onSubmit,
  ...rest
}: Props) {
  return (
    <CreateWorkoutExerciseModalStyles
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
      <CreateWorkoutExerciseModalContent
        closeModal={closeModal}
        exercise={exercise}
        onSubmit={onSubmit}
      />
    </CreateWorkoutExerciseModalStyles>
  );
}

const CreateWorkoutExerciseModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 1158px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px 60px 45px;
`;

export default CreateWorkoutExerciseModal;
