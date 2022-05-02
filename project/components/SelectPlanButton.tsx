import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import SelectWorkoutPlanIcon from "../public/vectors/SelectWorkoutPlanIcon.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  planType: "workout" | "meal";
  planName: string;
  as: any;
}

function SelectPlanButton({ planName, planType, as, ...rest }: Props) {
  return (
    <SelectPlanButtonStyles as={as} {...rest}>
      <SelectWorkoutPlanIcon />
      {planName}
    </SelectPlanButtonStyles>
  );
}

const SelectPlanButtonStyles = styled.button`
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: rgba(32, 14, 50, 0.5);
  width: 94px;
  display: block;
`;

export default SelectPlanButton;
