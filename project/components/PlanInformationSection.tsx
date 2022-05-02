import styled from "styled-components";

interface Props {
  title: string;
  descriptionParagraphs: string[];
}

function PlanInformationSection({ title, descriptionParagraphs }: Props) {
  return (
    <PlanInformationSectionStyles>
      <h2 className="title">
        {title} <span>Plan Information</span>
      </h2>
      <p className="subtitle">Description</p>
      {descriptionParagraphs.map((descriptionParagraph) => (
        <p className="description">{descriptionParagraph}</p>
      ))}
    </PlanInformationSectionStyles>
  );
}

const PlanInformationSectionStyles = styled.section`
  .title {
    font-weight: 700;
    font-size: 34px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 32px;

    span {
      margin-top: 4px;
      display: block;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: -0.02em;
      color: #dadada;
    }
  }

  .subtitle {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 16px;
  }

  .description {
    font-weight: 500;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #56505b;
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export default PlanInformationSection;
