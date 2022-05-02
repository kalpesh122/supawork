import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";
import SelectWorkoutModalContent from "./SelectWorkoutModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  workoutOnClick: (workout: any) => void;
}

function SelectWorkoutModal({ closeModal, workoutOnClick, ...rest }: Props) {
  return (
    <SelectWorkoutModalStyles
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
      <SelectWorkoutModalContent
        closeModal={closeModal}
        workoutOnClick={workoutOnClick}
      />
    </SelectWorkoutModalStyles>
  );
}

const SelectWorkoutModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 960px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px 60px 45px;
`;

export default SelectWorkoutModal;
