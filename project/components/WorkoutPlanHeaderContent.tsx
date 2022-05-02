import styled from "styled-components";

import HeaderButton from "./HeaderButton";
import HeaderTitle from "./HeaderTitle";
import ChatIcon from "../public/vectors/ChatIcon.svg";

interface Props {
  headerButton: React.ReactNode;
}

function WorkoutPlanHeaderContent({ headerButton }: Props) {
  return (
    <WorkoutPlanHeaderContentStyles>
      <HeaderTitle>Work Out</HeaderTitle>
      {headerButton}
      {/* <HeaderButton title="Contact Rose" icon={<ChatIcon />} /> */}
    </WorkoutPlanHeaderContentStyles>
  );
}

const WorkoutPlanHeaderContentStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default WorkoutPlanHeaderContent;
