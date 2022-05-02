import styled from "styled-components";

import CreateExerciseForm from "./CreateExerciseForm";
import BackCaret from "../public/vectors/BackCaret.svg";

interface Props {
  closeModal: () => void;
}

function CreateExerciseModalContent({ closeModal }: Props) {
  return (
    <CreateExerciseModalContentContainer>
      <header>
        <button type="button" className="button__back" onClick={closeModal}>
          <BackCaret />
        </button>

        <h2 className="title">Create Exercise</h2>
      </header>

      <CreateExerciseForm onComplete={() => closeModal()} />
    </CreateExerciseModalContentContainer>
  );
}

const CreateExerciseModalContentContainer = styled.section`
  header {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
  }

  .button__back {
    margin-right: 43px;
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 4px;
    background: rgba(32, 14, 50, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #200e32;
  }
`;

export default CreateExerciseModalContent;
