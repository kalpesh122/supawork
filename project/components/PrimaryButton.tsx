import type { ReactNode, ButtonHTMLAttributes } from "react";

import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  iconPosition?: "before" | "after";
}

interface StyleProps {
  readonly iconPosition?: "before" | "after";
}

function PrimaryButton({
  title,
  icon,
  iconPosition = "before",
  ...rest
}: Props) {
  return (
    <PrimaryButtonStyles iconPosition={iconPosition} {...rest}>
      {icon && iconPosition === "before" && icon}
      {title}
      {icon && iconPosition === "after" && icon}
    </PrimaryButtonStyles>
  );
}

const PrimaryButtonStyles = styled.button<StyleProps>`
  background: linear-gradient(90deg, #f77062 0%, #fe5196 100%);
  box-shadow: 0px 4px 30px rgba(251, 97, 125, 0.5);
  border-radius: 15px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.02em;
  color: #ffffff;
  padding: 24px;

  svg {
    margin-left: ${({ iconPosition }) => iconPosition === "after" && "12px"};
    margin-right: ${({ iconPosition }) => iconPosition === "before" && "12px"};
  }
`;

export default PrimaryButton;
