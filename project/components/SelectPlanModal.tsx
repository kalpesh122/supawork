import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import SelectPlanModalContent from "./SelectPlanModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  client: any;
}

function SelectPlanModal({ closeModal, client, ...rest }: Props) {
  return (
    <SelectPlanModalStyles
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
      <SelectPlanModalContent closeModal={closeModal} client={client} />
    </SelectPlanModalStyles>
  );
}

const SelectPlanModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 530px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px;
`;

export default SelectPlanModal;
