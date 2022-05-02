import type { ReactNode, AnchorHTMLAttributes } from "react";

import Link from "next/link";
import styled from "styled-components";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

interface StyleProps {
  readonly active?: boolean;
}

function NavLink({ title, icon, href, active = false, ...rest }: Props) {
  return (
    <Link href={href} passHref>
      <NavLinkStyles {...rest} active={active}>
        {icon}
        {title}
      </NavLinkStyles>
    </Link>
  );
}

const NavLinkStyles = styled.a<StyleProps>`
  background: ${({ active }) => (active ? "#200e32" : null)};
  color: ${({ active }) => (active ? "#ffffff" : "#dadada")};
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
  padding: 15px 16px;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 12px;

    * {
      fill: ${({ active }) => active && "#ffffff"};
    }
  }
`;

export default NavLink;
