import type { ReactNode } from "react";

import { useState } from "react";
import styled from "styled-components";

import CaretDown from "../public/vectors/CaretDown.svg";

interface Props {
  title: string;
  children: ReactNode;
  open?: boolean;
}

interface StyleProps {
  readonly isOpen: boolean;
}

function Accordion({ title, children, open = false }: Props) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <AccordionContainer isOpen={isOpen}>
      <h3>
        <button
          aria-expanded={isOpen}
          aria-controls="accordion-content"
          onClick={() => setIsOpen((prev) => !prev)}
          id="accordion-button"
          className="button"
        >
          {title}
          <CaretDown className="caret" />
        </button>
      </h3>
      <div
        role="region"
        aria-labelledby="accordion-button"
        className="content"
        id="accordion-content"
        hidden={!isOpen}
      >
        {children}
      </div>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div<StyleProps>`
  border: 1px solid #f7f7f7;
  border-radius: 15px;

  .button {
    background-color: transparent;
    border: none;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #200e32;
  }

  .caret {
    ${({ isOpen }) => isOpen && "transform: rotate(-90deg);"}
  }

  .content {
    padding: 0 24px 30px;
  }
`;

export default Accordion;
