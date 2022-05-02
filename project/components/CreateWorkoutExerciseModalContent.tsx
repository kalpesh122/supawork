import { Formik, Form } from "formik";
import useSWR from "swr";

import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import styled from "styled-components";
import Accordion from "./Accordion";
import BackCaret from "../public/vectors/BackCaret.svg";

interface Props {
  closeModal: () => void;
  exercise: any;
  onSubmit: ({}: { exercise: any; sets: string; reps: string }) => void;
}

function CreateWorkoutExerciseModalContent({
  closeModal,
  exercise,
  onSubmit,
}: Props) {
  const { data: exerciseInstuctions, error: exerciseInstructionsError } =
    useSWR(`/api/exercises_instructions?exercise_id=${exercise.id}`);

  const exerciseInstructionsLoading =
    !exerciseInstuctions && !exerciseInstructionsError;

  return (
    <CreateWorkoutExerciseModalContentContainer>
      <header>
        <button type="button" className="button__back" onClick={closeModal}>
          <BackCaret />
        </button>
        <h2 className="title">{exercise.name}</h2>
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

          <Formik
            initialValues={{ reps: "", sets: "" }}
            onSubmit={({ reps, sets }) => {
              onSubmit({ exercise: exercise, reps, sets });
            }}
          >
            <Form>
              <div className="container__inputs">
                <FloatingLabelInput
                  name="reps"
                  id="reps"
                  label="Reps"
                  type="number"
                  className="input"
                  center
                  required
                />

                <FloatingLabelInput
                  name="sets"
                  id="reps"
                  label="Sets"
                  type="number"
                  className="input"
                  center
                  required
                />
              </div>

              <PrimaryButton
                type="submit"
                title="Add Exercise"
                icon={<ConfirmIcon />}
                className="button"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </CreateWorkoutExerciseModalContentContainer>
  );
}

const CreateWorkoutExerciseModalContentContainer = styled.section`
  header {
    display: flex;
    align-items: center;
    margin-bottom: 86px;
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
