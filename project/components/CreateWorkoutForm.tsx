import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import useUser from "../libs/hooks/useUser";
import { supabase } from "../libs/supabase";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import TextArea from "./TextArea";
import ExerciseModal from "./ExerciseModal";
import CreateExerciseModal from "./CreateExerciseModal";
import CreateWorkoutExerciseModal from "./CreateWorkoutExerciseModal";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import AddIconGrey from "../public/vectors/AddIconGrey.svg";

interface Props {}

interface WorkoutExercises {
  sections: SectionsEntity[];
}

interface SectionsEntity {
  exercises: ExercisesEntity[];
}

interface ExercisesEntity {
  data: any;
  reps: number;
  sets: number;
}

interface InitialValues {
  name: string;
  description: string;
  workoutExercises: WorkoutExercises;
}

type ActiveModal =
  | null
  | "exercise list"
  | "select exercise"
  | "create exercise";

Modal.setAppElement("#__next");

function CreateWorkoutForm({}: Props) {
  const [user] = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const initialValues: InitialValues = {
    name: "",
    description: "",
    workoutExercises: {
      sections: [{ exercises: [] }],
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ name, description, workoutExercises }) => {
        try {
          const { data: workout, error } = await supabase
            .from("workouts")
            .insert({
              name,
              description,
              creator_id: user!.id,
            })
            .single();

          if (error) throw error;

          await workoutExercises.sections.forEach(
            async (workoutExerciseSection, workoutExerciseSectionIndex) => {
              await workoutExerciseSection.exercises.forEach(
                async (workoutExercise, workoutExerciseIndex) => {
                  const { error } = await supabase
                    .from("workouts_exercises")
                    .insert({
                      workout_id: workout.id,
                      exercise_id: workoutExercise.data.id,
                      reps: workoutExercise.reps,
                      sets: workoutExercise.sets,
                      position: workoutExerciseIndex + 1,
                      section: workoutExerciseSectionIndex + 1,
                    })
                    .single();

                  if (error) throw error;
                }
              );
            }
          );

          router.back();
        } catch (error) {
          setError(error.message);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <CreateWorkoutFormStyles as={Form}>
          <div className="form-container">
            <div>
              <FloatingLabelInput
                name="name"
                label="Workout name"
                required
                className="input__name"
              />

              <TextArea
                name="description"
                label="Workout description/information"
                required
                className="input__description"
              />
            </div>

            <FieldArray name="workoutExercises.sections">
              {({ push }) => (
                <div>
                  {values.workoutExercises.sections.map(
                    (workoutExerciseSection, index) => (
                      <div className="section">
                        <p className="section-title">Section {index + 1}</p>
                        <FieldArray
                          name={`workoutExercises.sections[${index}].exercises`}
                        >
                          {({ push }) => (
                            <>
                              {workoutExerciseSection.exercises.map(
                                (exercise) => (
                                  <div className="exercise">
                                    <img src={exercise.data.image_url} alt="" />
                                    <div>
                                      <p>{exercise.data.name}</p>
                                      <div>
                                        <p>{exercise.reps} reps</p>

                                        <svg
                                          width="4"
                                          height="4"
                                          viewBox="0 0 4 4"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <circle
                                            cx="2"
                                            cy="2"
                                            r="2"
                                            fill="#D3CFD6"
                                          />
                                        </svg>

                                        <p>{exercise.sets} sets</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}

                              <button
                                type="button"
                                onClick={() => setActiveModal("exercise list")}
                                className="add-exercise-button"
                              >
                                <AddIconGrey />
                                Add new exercise
                              </button>
                              <ExerciseModal
                                isOpen={activeModal === "exercise list"}
                                onRequestClose={() => setActiveModal(null)}
                                closeModal={() => setActiveModal(null)}
                                createOnClick={() =>
                                  setActiveModal("create exercise")
                                }
                                exerciseOnClick={(exercise) => {
                                  setSelectedExercise(exercise);
                                  setActiveModal("select exercise");
                                }}
                              />
                              <CreateExerciseModal
                                isOpen={activeModal === "create exercise"}
                                closeModal={() =>
                                  setActiveModal("exercise list")
                                }
                                onRequestClose={() => setActiveModal(null)}
                              />
                              <CreateWorkoutExerciseModal
                                isOpen={activeModal === "select exercise"}
                                closeModal={() =>
                                  setActiveModal("exercise list")
                                }
                                onRequestClose={() => setActiveModal(null)}
                                exercise={selectedExercise}
                                onSubmit={({ exercise, reps, sets }) => {
                                  push({ data: exercise, reps, sets });
                                  setActiveModal(null);
                                }}
                              />
                            </>
                          )}
                        </FieldArray>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => push({ exercises: [] })}
                    className="add-section-button"
                  >
                    Add new section
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <PrimaryButton
            title="Create Workout"
            type="submit"
            disabled={isSubmitting}
            icon={<ConfirmIcon />}
          />
        </CreateWorkoutFormStyles>
      )}
    </Formik>
  );
}

const CreateWorkoutFormStyles = styled.form`
  .form-container {
    display: flex;

    > * {
      flex: 1;

      &:first-child {
        margin-right: 150px;
        margin-bottom: 32px;
      }
    }
  }

  .input__name {
    margin-bottom: 10px;
  }

  /*  */

  .section {
    margin-bottom: 32px;
  }

  .section-title {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #dadada;
    margin-bottom: 21px;
  }

  .exercise {
    padding: 8px;
    display: flex;
    align-items: center;
    border: 1px solid #f7f7f7;
    border-radius: 15px;
    margin-bottom: 10px;

    img {
      width: 83px;
      height: 83px;
      border-radius: 10px;
      margin-right: 16px;
      object-fit: cover;
    }

    div {
      > p {
        font-weight: 700;
        font-size: 20px;
        letter-spacing: -0.02em;
        color: #200e32;
        margin-bottom: 4px;
      }

      div {
        display: flex;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.02em;
          color: #d3cfd6;
        }

        svg {
          margin: 0 8px;
        }
      }
    }
  }

  .add-exercise-button {
    font-weight: 600;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.02em;
    color: #dadada;
    background-color: transparent;
    border: 2px dashed #dadada;
    border-radius: 15px;
    padding: 38px;
    width: 100%;

    > svg {
      margin-right: 12px;
    }
  }

  .add-section-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #dadada;
    background-color: transparent;
    border: 2px dashed #dadada;
    border-radius: 15px;
    padding: 16px;
    width: 100%;
  }
`;

export default CreateWorkoutForm;
