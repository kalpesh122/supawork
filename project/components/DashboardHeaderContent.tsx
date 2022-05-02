import styled from "styled-components";

import HeaderTitle from "./HeaderTitle";

interface Props {}

function DashboardHeaderContent({}: Props) {
  return (
    <>
      <DashboardHeaderContentStyles>
        <HeaderTitle>Dashboard</HeaderTitle>
      </DashboardHeaderContentStyles>
    </>
  );
}

const DashboardHeaderContentStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default DashboardHeaderContent;
