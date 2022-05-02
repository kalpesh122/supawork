import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";

import ClientModalContent from "./ClientModalContent";

interface Props extends ModalProps {
  closeModal: () => void;
  client: any;
  selectPlanButtonClicked: () => void;
}

function ClientModal({
  closeModal,
  client,
  selectPlanButtonClicked,
  ...rest
}: Props) {
  return (
    <ClientModalStyles
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
      <ClientModalContent
        closeModal={closeModal}
        client={client}
        selectPlanButtonClicked={selectPlanButtonClicked}
      />
    </ClientModalStyles>
  );
}

const ClientModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 530px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px;
`;

export default ClientModal;
