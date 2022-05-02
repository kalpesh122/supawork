import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

import useUser from "../libs/hooks/useUser";
import { supabase } from "../libs/supabase";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ContinueIcon from "../public/vectors/ContinueIcon.svg";
import styled from "styled-components";
import TextArea from "./TextArea";

function CreateWorkoutPlanForm() {
  const [user] = useUser({});
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      onSubmit={async ({ name, description }) => {
        try {
          const { data: workoutPlan, error } = await supabase
            .from("workout_plans")
            .insert({
              name,
              description,
              creator_id: user!.id,
            })
            .single();

          if (error) throw error;

          router.push(`/workoutplan/${workoutPlan.id}/activities`);
        } catch (error) {
          setError(error.message);
        }
      }}
    >
      {({ isSubmitting }) => (
        <CreateWorkoutPlanFormStyles as={Form}>
          <FloatingLabelInput
            name="name"
            label="Plan name"
            className="input__name"
            required
          />

          <TextArea name="description" className="input__description" />

          <PrimaryButton
            title="Create Plan"
            icon={<ContinueIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
          />
        </CreateWorkoutPlanFormStyles>
      )}
    </Formik>
  );
}

const CreateWorkoutPlanFormStyles = styled.form`
  max-width: 514px;

  .input__name {
    margin-bottom: 21px;
  }

  .input__description {
    margin-bottom: 50px;
  }
`;

export default CreateWorkoutPlanForm;
