import type { AnchorHTMLAttributes } from "react";

import Link from "next/link";
import styled from "styled-components";

import PlanIcon from "../public/vectors/PlanIcon.svg";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function SelectPlanLink({ href }: Props) {
  return (
    <Link href={href} passHref>
      <SelectPlanLinkStyles>
        <PlanIcon />
        <p>You have no active plans. Click here to select or create a plan.</p>
      </SelectPlanLinkStyles>
    </Link>
  );
}

const SelectPlanLinkStyles = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed #dadada;
  border-radius: 15px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: #dadada;
  height: 50vh;

  svg {
    margin-bottom: 16px;
  }

  p {
    max-width: 258px;
  }
`;

export default SelectPlanLink;
