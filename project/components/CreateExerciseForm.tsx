import { Field, FieldArray, Form, Formik } from "formik";
import styled from "styled-components";
import { upperFirst } from "lodash";
import useSWR from "swr";
import { useState } from "react";

import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import Select from "./Select";
import ImageInput from "./ImageInput";
import useUser from "../libs/hooks/useUser";
import { supabase } from "../libs/supabase";
import generateId from "../libs/generateId";
import AddIconGrey from "../public/vectors/AddIconGrey.svg";

interface Props {
  onComplete: () => void;
}

interface InitialValues {
  name: string;
  instructions: string[];
  muscleGroupId: string;
  image: null | File;
}

function CreateExerciseForm({ onComplete }: Props) {
  const [user] = useUser({});
  const [error, setError] = useState({});
  const { data: muscleGroups, error: muscleGroupsError } =
    useSWR("/api/muscle_groups");

  const muscleGroupsLoading = !muscleGroups && !muscleGroupsError;

  const initialValues: InitialValues = {
    name: "",
    instructions: [""],
    muscleGroupId: "",
    image: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ name, instructions, muscleGroupId, image }) => {
        try {
          const imageExt = image!.name.split(".").pop();
          const imagePath = `${name}/${generateId()}.${imageExt}`;

          const { error: imageError, data } = await supabase.storage
            .from("exercise-images")
            .upload(imagePath, image!);

          if (imageError) throw imageError;

          const { publicURL, error: publicURLError } = await supabase.storage
            .from("exercise-images")
            .getPublicUrl(imagePath);

          if (publicURLError) throw publicURLError;

          const { data: exercise, error } = await supabase
            .from("exercises")
            .insert({
              name,
              muscle_group_id: muscleGroupId,
              image_url: publicURL,
              creator_id: user!.id,
            })
            .single();

          if (error) throw error;

          const { error: exerciseInstructionError } = await supabase
            .from("exercises_instructions")
            .insert(
              instructions.map((instruction, index) => ({
                instruction,
                position: index + 1,
                exercise_id: exercise.id,
              }))
            );

          if (exerciseInstructionError) throw exerciseInstructionError;

          onComplete();
        } catch (error) {
          setError(error.message);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <CreateExerciseFormStyles as={Form}>
          <div>
            <FloatingLabelInput
              name="name"
              id="name"
              label="Exercise name"
              required
              className="input__name"
            />

            <p className="subtitle">Instructions</p>
            <FieldArray name="instructions">
              {({ push }) => (
                <>
                  <ol className="instructions">
                    {values.instructions.map((_, index) => (
                      <li>
                        <Field name={`instructions.${index}`} required />
                      </li>
                    ))}
                  </ol>

                  <button
                    type="button"
                    className="button__add-instruction"
                    onClick={() => {
                      console.log("running");
                      push("");
                    }}
                  >
                    <AddIconGrey />
                    Add instruction
                  </button>
                </>
              )}
            </FieldArray>

            {muscleGroupsLoading ? (
              <p>Loading...</p>
            ) : (
              <Select
                name="muscleGroupId"
                label="Select a Muscle Group"
                id="muscle-group"
                data={muscleGroups.data.map((muscleGroup: any) => ({
                  value: muscleGroup.id,
                  label: upperFirst(muscleGroup.name),
                }))}
                required
              />
            )}
          </div>

          <div>
            <ImageInput name="image" className="input__image" required />

            <PrimaryButton
              title="Confirm Exercise"
              icon={<ConfirmIcon />}
              type="submit"
              disabled={isSubmitting}
              className="button"
            />
          </div>
        </CreateExerciseFormStyles>
      )}
    </Formik>
  );
}

const CreateExerciseFormStyles = styled.form`
  display: flex;

  > div {
    flex: 1;

    &:first-child {
      margin-right: 44px;
    }
  }

  .input__name {
    margin-bottom: 32px;
  }

  .subtitle {
    font-weight: 700;
    font-size: 16px;
    color: #d3cfd6;
    margin-bottom: 16px;
  }

  .instructions {
    list-style: inside decimal;

    li {
      margin-bottom: 10px;
    }

    input {
      width: calc(100% - 18px);
      background: #f7f7f7;
      border: none;
      border-radius: 10px;
      height: 44px;
      padding: 0 8px;
      font-size: 18px;
      color: #200e32;
      font-weight: 600;
    }
  }

  .button__add-instruction {
    border: 2px dashed #dadada;
    border-radius: 8px;
    background-color: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #dadada;
    padding: 8px 0;
    margin-bottom: 32px;

    svg {
      margin-right: 12px;
    }
  }

  .input__image {
    margin-bottom: 31px;
  }

  .button {
    width: 100%;
  }
`;

export default CreateExerciseForm;
