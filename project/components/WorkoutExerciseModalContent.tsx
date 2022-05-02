import { Formik, Form } from "formik";
import useSWR from "swr";

import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import styled from "styled-components";
import Accordion from "./Accordion";
import BackCaret from "../public/vectors/BackCaret.svg";

interface Props {
  exercise: any;
}

function CreateWorkoutExerciseModalContent({ exercise }: Props) {
  const { data: exerciseInstuctions, error: exerciseInstructionsError } =
    useSWR(`/api/exercises_instructions?exercise_id=${exercise.id}`);

  const exerciseInstructionsLoading =
    !exerciseInstuctions &&
    !exerciseInstructionsError &&
    !exerciseInstuctions?.data;

  return (
    <CreateWorkoutExerciseModalContentContainer>
      <header>
        <h2 className="title">{exercise.name}</h2>

        <div>
          <p>{exercise.reps} reps</p>

          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
            fill="#D3CFD6"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>

          <p>{exercise.sets} sets</p>
        </div>
      </header>

      <div className="container">
        <div>
          <Accordion title="Instructions" open>
            {exerciseInstructionsLoading ? (
              <p>Loading...</p>
            ) : (
              <ol>
                {exerciseInstuctions.data.map(
                  (exerciseInstuction: any, index: number) => (
                    <li className="instruction">
                      {index + 1}. {exerciseInstuction.instruction}
                    </li>
                  )
                )}
              </ol>
            )}
          </Accordion>
        </div>

        <div>
          <img src={exercise.image_url} alt="" className="image" />
        </div>
      </div>
    </CreateWorkoutExerciseModalContentContainer>
  );
}

const CreateWorkoutExerciseModalContentContainer = styled.section`
  header {
    margin-bottom: 86px;

    h2 {
      margin-bottom: 12px;
    }

    div {
      display: flex;
      align-items: center;

      p {
        font-weight: 600;
        font-size: 20px;
        letter-spacing: -0.02em;
        color: #d3cfd6;
      }
    }
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
    font-size: 60px;
    letter-spacing: -0.02em;
    color: #200e32;
  }

  .container {
    display: flex;

    > div {
      flex: 1;

      &:first-child {
        margin-right: 32px;
      }
    }
  }

  .instruction {
    margin-bottom: 21px;
    font-weight: 500;
    font-size: 18px;
    color: #200e32;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .image {
    width: 100%;
    height: 301px;
    border-radius: 30px;
    margin-bottom: 21px;
    object-fit: cover;
  }

  .container__inputs {
    display: flex;
    margin-bottom: 21px;
  }

  .input {
    flex: 1;

    &:first-child {
      margin-right: 21px;
    }
  }

  .button {
    width: 100%;
  }
`;

export default CreateWorkoutExerciseModalContent;
