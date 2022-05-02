import Link from "next/link";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { useState } from "react";
import useSWR from "swr";

import PrimaryButton from "./PrimaryButton";
import ContinueIcon from "../public/vectors/ContinueIcon.svg";
import RadioIconInput from "./RadioIconInput";
import InactiveIcon from "../public/vectors/InactiveIcon.svg";
import FairlyActiveIcon from "../public/vectors/FairlyActiveIcon.svg";
import ActiveIcon from "../public/vectors/ActiveIcon.svg";
import VeryActiveIcon from "../public/vectors/VeryActiveIcon.svg";
import { supabase } from "../libs/supabase";

interface Props {
  className?: string;
  onComplete: () => void;
  userId: string;
}

function ActivityLevelForm({ className, onComplete, userId }: Props) {
  const [error, setError] = useState<string | null>(null);
  const { data: activityLevels, error: activityLevelsError } = useSWR(
    "/api/activity_levels"
  );

  const activityLevelsLoading = !activityLevels && !activityLevelsError;

  return (
    <Formik
      initialValues={{ ActivityLevelId: "" }}
      onSubmit={async ({ ActivityLevelId }) => {
        try {
          const { error: updateProfileError } = await supabase
            .from("profiles")
            .update({ activity_level_id: ActivityLevelId })
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
        <ActivityLevelFormStyles as={Form} className={className}>
          <fieldset>
            <legend className="title">How active are you?</legend>

            {activityLevelsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="radio-container">
                <RadioIconInput
                  title="Inactive"
                  icon={<InactiveIcon />}
                  name="ActivityLevelId"
                  value={String(
                    activityLevels.data.find(
                      (activityLevel: any) => activityLevel.name === "inactive"
                    ).id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Fairly active"
                  icon={<FairlyActiveIcon />}
                  name="ActivityLevelId"
                  value={String(
                    activityLevels.data.find(
                      (activityLevel: any) =>
                        activityLevel.name === "fairly active"
                    ).id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Active"
                  icon={<ActiveIcon />}
                  name="ActivityLevelId"
                  value={String(
                    activityLevels.data.find(
                      (activityLevel: any) => activityLevel.name === "active"
                    ).id
                  )}
                  className="radio-input"
                />

                <RadioIconInput
                  title="Very active"
                  icon={<VeryActiveIcon />}
                  name="ActivityLevelId"
                  value={String(
                    activityLevels.data.find(
                      (activityLevel: any) =>
                        activityLevel.name === "very active"
                    ).id
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
        </ActivityLevelFormStyles>
      )}
    </Formik>
  );
}

const ActivityLevelFormStyles = styled.form`
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

export default ActivityLevelForm;
