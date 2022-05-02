import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import WorkoutExerciseModalContent from "./WorkoutExerciseModalContent";

interface Props extends ModalProps {
  exercise: any;
}

function WorkoutExerciseModal({ exercise, ...rest }: Props) {
  return (
    <WorkoutExerciseModalStyles
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
      <WorkoutExerciseModalContent exercise={exercise} />
    </WorkoutExerciseModalStyles>
  );
}

const WorkoutExerciseModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 1158px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px 60px 45px;
`;

export default WorkoutExerciseModal;
