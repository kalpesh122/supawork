import type { InputHTMLAttributes, FocusEvent, ReactNode } from "react";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Field, useField } from "formik";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  buttonIcon?: ReactNode;
  buttonOnClick?: () => void;
  center?: boolean;
  active?: boolean;
}

interface StyleProps {
  readonly isActive: boolean;
  readonly center: boolean;
}

function FloatingLabelInput({
  name,
  label,
  className,
  buttonIcon,
  buttonOnClick,
  center = false,
  active,
  ...rest
}: Props) {
  const [field] = useField(name);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (field.value === "") return;

    setIsActive(true);
  }, [field.value]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);

    if (field.value !== "") return;

    setIsActive(false);
  };

  return (
    <FloatingLabelInputContainer
      className={className}
      isActive={active || isActive}
      center={center}
    >
      <label htmlFor={name}>{label || name}</label>
      <Field
        name={name}
        id={name}
        {...rest}
        onFocus={() => setIsActive(true)}
        onBlur={handleBlur}
      />
      {buttonIcon && (
        <button type="button" onClick={buttonOnClick}>
          {buttonIcon}
        </button>
      )}
    </FloatingLabelInputContainer>
  );
}

const FloatingLabelInputContainer = styled.div<StyleProps>`
  background: #f7f7f7;
  border-radius: 10px;
  font-size: 18px;
  letter-spacing: -0.02em;
  height: 66px;
  position: relative;
  text-align: left;

  label {
    color: rgba(32, 14, 50, 0.3);
    position: absolute;
    transition: top 0.1s, font-size 0.1s;
    top: ${({ isActive }) => (isActive ? "14px" : "22px")};
    font-size: ${({ isActive }) => (isActive ? "16px" : "18px")};
    font-weight: 600;
    left: ${({ center }) => (center ? "50%" : "16px")};
    transform: ${({ center }) => center && "translateX(-50%)"};
    pointer-events: none;
    z-index: 1;
  }

  input {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    padding: 22px 16px 0;
    color: #200e32;
    border-radius: 10px;
    font-weight: 600;
    text-align: ${({ center }) => center && "center"};
  }

  button {
    display: flex;
    background: transparent;
    border: none;
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default FloatingLabelInput;
