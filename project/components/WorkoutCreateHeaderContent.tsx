import styled from "styled-components";

import HeaderButton from "./HeaderButton";
import HeaderTitle from "./HeaderTitle";
import BackIcon from "../public/vectors/BackIcon.svg";
import { useRouter } from "next/router";

interface Props {}

function WorkoutCreateHeaderContent({}: Props) {
  const router = useRouter();

  return (
    <WorkoutCreateHeaderContentStyles>
      <HeaderTitle>Create Workouts</HeaderTitle>

      <HeaderButton
        title="Back"
        icon={<BackIcon />}
        type="button"
        onClick={() => router.back()}
      />
    </WorkoutCreateHeaderContentStyles>
  );
}

const WorkoutCreateHeaderContentStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default WorkoutCreateHeaderContent;
