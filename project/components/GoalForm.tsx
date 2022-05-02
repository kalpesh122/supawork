import Link from "next/link";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { useState } from "react";
import useSWR from "swr";

import PrimaryButton from "./PrimaryButton";
import ContinueIcon from "../public/vectors/ContinueIcon.svg";
import RadioIconInput from "./RadioIconInput";
import WeightLossIcon from "../public/vectors/WeightLossIcon.svg";
import MuscleGainIcon from "../public/vectors/MuscleGainIcon.svg";
import MaintainIcon from "../public/vectors/MaintainIcon.svg";
import ToningIcon from "../public/vectors/ToningIcon.svg";
import { supabase } from "../libs/supabase";

interface Props {
  className?: string;
  onComplete: () => void;
  userId: string;
}

function GoalForm({ className, onComplete, userId }: Props) {
  const [error, setError] = useState<string | null>(null);
  const { data: goals, error: goalsError } = useSWR("/api/goals");

  const goalsLoading = !goals && !goalsError;

  return (
    <Formik
      initialValues={{ goalId: "" }}
      onSubmit={async ({ goalId }) => {
        try {
          const { error: updateProfileError } = await supabase
            .from("profiles")
            .update({ goal_id: goalId })
            .filter("id", "eq", userId);

          if (updateProfileError) throw updateProfileError;
        } catch (error) {
          setError(error.message);
          return;
        }

        onComplete();
      }}
    >
      {({ isSubmitting }) => (
        <GoalFormStyles as={Form} className={className}>
          <fieldset>
            <legend className="title">What's your goal?</legend>

            {goalsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="radio-container">
                <RadioIconInput
                  title="Weight loss"
                  icon={<WeightLossIcon />}
                  name="goalId"
                  value={String(
                    goals.data.find((goal: any) => goal.name === "weight loss")
                      .id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Muscle gain"
                  icon={<MuscleGainIcon />}
                  name="goalId"
                  value={String(
                    goals.data.find((goal: any) => goal.name === "muscle gain")
                      .id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Maintain"
                  icon={<MaintainIcon />}
                  name="goalId"
                  value={String(
                    goals.data.find((goal: any) => goal.name === "maintain").id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Toning"
                  icon={<ToningIcon />}
                  name="goalId"
                  value={String(
                    goals.data.find((goal: any) => goal.name === "toning").id
                  )}
                  className="radio-input"
                />
              </div>
            )}
          </fieldset>

          <PrimaryButton
            title="Next"
            icon={<ContinueIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
            className="button"
          />

          <Link href="/">
            <a className="link__skip">Skip</a>
          </Link>
        </GoalFormStyles>
      )}
    </Formik>
  );
}

const GoalFormStyles = styled.form`
  fieldset {
    border: none;
    padding: 0;
  }

  .title {
    font-weight: 800;
    font-size: 60px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 40px;
  }

  .radio-container {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 21px;
    margin: 0 auto 50px;
  }

  .radio-input {
    width: 156px;
    height: 156px;
  }

  .button {
    max-width: 333px;
    width: 100%;
    margin: 0 auto 26px;
  }

  .link__skip {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.02em;
    color: #200e32;
  }
`;

export default GoalForm;
