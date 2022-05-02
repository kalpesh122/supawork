// import TickBoxIcon from "../public/vectors/TickBoxIcon.svg";

import styled from "styled-components";

interface Props {
  image: string;
  title: string;
  information: React.ReactNode;
  onClick?: () => void;
}

function PlanItemButton({ image, title, information, onClick }: Props) {
  return (
    <PlanItemButtonStyles onClick={onClick}>
      <img src={image} alt="" className="image" />
      <div>
        <p className="title">{title}</p>
        <div className="information">{information}</div>
      </div>
      {/* <TickBoxIcon className="icon__tick" /> */}
    </PlanItemButtonStyles>
  );
}

const PlanItemButtonStyles = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #f7f7f7;
  border-radius: 15px;
  padding: 8px 21px 8px 8px;
  width: 100%;
  text-align: left;

  .image {
    border-radius: 10px;
    width: 83px;
    height: 83px;
    margin-right: 21px;
    object-fit: cover;
  }

  .title {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 4px;
  }

  .information {
    display: flex;
    align-items: center;
  }

  .icon__tick {
    margin-left: auto;
  }
`;

export default PlanItemButton;
