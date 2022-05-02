import type { Props as ModalProps } from "react-modal";

import Modal from "react-modal";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props extends ModalProps {
  value?: Date | Date[] | null | undefined;
  onChange: (date: Date) => void;
}

Modal.setAppElement("#__next");

function CalendarModal({ value, onChange, ...rest }: Props) {
  return (
    <CalendarModalStyles
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
      <Calendar value={value} onChange={onChange} />
    </CalendarModalStyles>
  );
}

const CalendarModalStyles = styled.div`
  background-color: #ffffff;
  max-width: 500px;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 30px;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CalendarModal;
