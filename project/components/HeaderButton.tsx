import type { ReactNode, ButtonHTMLAttributes } from "react";

import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
}

function HeaderButton({ title, icon, ...rest }: Props) {
  return (
    <HeaderButtonStyles {...rest}>
      {icon}
      {title}
    </HeaderButtonStyles>
  );
}

const HeaderButtonStyles = styled.button`
  background: #ffffff;
  box-shadow: 0px 5.28px 13.2px rgba(201, 201, 201, 0.3);
  border-radius: 100px;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #200e32;
  padding: 20px 36px;
  border: none;

  svg {
    margin-right: 12px;
  }
`;

export default HeaderButton;
