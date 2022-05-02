import type { ReactNode } from "react";

import { Field } from "formik";
import styled from "styled-components";

interface Props {
  title: string;
  icon: ReactNode;
  name: string;
  value: string;
  className?: string;
}

function RadioIconInput({ title, icon, name, value, className }: Props) {
  return (
    <>
      <RadioIconInputStyles
        as={Field}
        type="radio"
        name={name}
        value={value}
        id={`${name}-${value}`}
        className="hidden"
      />
      <RadioIconLabelStyles htmlFor={`${name}-${value}`} className={className}>
        {icon}
        {title}
      </RadioIconLabelStyles>
    </>
  );
}

const RadioIconInputStyles = styled.input`
  &:checked + label {
    background: linear-gradient(90deg, #f77062 0%, #fe5196 100%);
    box-shadow: 0px 4px 30px rgba(251, 96, 125, 0.3);
    color: #ffffff;

    svg * {
      fill: #ffffff;
    }
  }
`;

const RadioIconLabelStyles = styled.label`
  background: #f7f7f7;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  font-weight: 800;
  font-size: 20px;
  color: #200e32;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  svg {
    margin-bottom: 16px;
  }
`;

export default RadioIconInput;
