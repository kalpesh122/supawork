import type { ReactNode } from "react";

import styled from "styled-components";
import Container from "./Container";

import Nav from "./Nav";

interface Props {
  children: ReactNode;
}

function Header({ children }: Props) {
  return (
    <HeaderStyles>
      <Container>
        <Nav />

        {children}
      </Container>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  background-color: #f7f7f7;

  padding: 36px 0 50px;
  height: 447px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

export default Header;
