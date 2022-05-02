import { Field, Form, Formik } from "formik";
import { upperFirst } from "lodash";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import useUser from "../libs/hooks/useUser";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import RadioIconInput from "./RadioIconInput";
import Select from "./Select";
import WeightLossIcon from "../public/vectors/WeightLossIcon.svg";
import MuscleGainIcon from "../public/vectors/MuscleGainIcon.svg";
import MaintainIcon from "../public/vectors/MaintainIcon.svg";
import ToningIcon from "../public/vectors/ToningIcon.svg";
import InactiveIcon from "../public/vectors/InactiveIcon.svg";
import FairlyActiveIcon from "../public/vectors/FairlyActiveIcon.svg";
import ActiveIcon from "../public/vectors/ActiveIcon.svg";
import VeryActiveIcon from "../public/vectors/VeryActiveIcon.svg";
import { isTypeSession, supabase } from "../libs/supabase";
import generatePassword from "../libs/generatePassword";

interface Props {
  closeModal: () => void;
}

function AddClientModalContent({ closeModal }: Props) {
  const [currentUser] = useUser({});
  const [activeFormSection, setActiveFormSection] = useState<
    "details" | "goal" | "activity level"
  >("details");
  const { data: genders, error: gendersError } = useSWR("/api/genders");
  const { data: goals, error: goalsError } = useSWR("/api/goals");
  const { data: activityLevels, error: activityLevelsError } = useSWR(
    "/api/activity_levels"
  );
  const [error, setError] = useState<null | string>(null);

  const goalsLoading = !goals && !goalsError;
  const activityLevelsLoading = !activityLevels && !activityLevelsError;

  return (
    <AddClientModalContainer>
      <header>
        <h2 className="title">Add Client - {upperFirst(activeFormSection)}</h2>
      </header>

      {error && <p className="error">{error}</p>}

      <Formik
        initialValues={{
          email: "",
          username: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          genderId: "",
          goalId: "",
          activityLevelId: "",
        }}
        onSubmit={async ({
          email,
          username,
          firstName,
          lastName,
          dateOfBirth,
          genderId,
          goalId,
          activityLevelId,
        }) => {
          setError(null);

          if (!activityLevelId) {
            setError("Activity level is required.");
            return;
          }

          const password = generatePassword(8);

          const {
            data,
            error: signUpError,
          } = await supabase.auth.api.signUpWithEmail(email, password);

          if (signUpError) {
            console.log(signUpError);
            return;
          }

          const user = isTypeSession(data!) ? data.user : data;

          // Create user in custom users table
          const { data: createdUser, error: userError } = await supabase
            .from("users")
            .insert({
              id: user!.id,
              username,
              email: user!.email,
              is_coach: false,
              trainer_id: currentUser!.id,
            })
            .single();

          if (userError || !createdUser) return;

          // Create profle
          const {
            data: profile,
            error: createProfileError,
          } = await supabase.from("profiles").insert({
            id: createdUser.id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            gender_id: genderId,
            goal_id: goalId,
            activity_level_id: activityLevelId,
          });

          if (createProfileError) throw createProfileError;

          // Set onboarding to completed
          const { error: updateUserError } = await supabase
            .from("users")
            .update({ has_onboarded: true })
            .filter("id", "eq", createdUser.id);

          if (updateUserError) throw updateUserError;

          const res = await fetch("/api/invite", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          closeModal();
        }}
      >
        {({ values }) => (
          <Form>
            {activeFormSection === "details" && (
              <section>
                <FloatingLabelInput
                  name="email"
                  label="Email"
                  type="email"
                  required
                />

                <FloatingLabelInput
                  name="username"
                  label="Username"
                  type="text"
                  required
                />

                <FloatingLabelInput
                  name="firstName"
                  label="First name"
                  className="input input__first-name"
                  required
                />

                <FloatingLabelInput
                  name="lastName"
                  label="Last name"
                  className="input input__last-name"
                  required
                />

                <FloatingLabelInput
                  name="dateOfBirth"
                  label="Date of birth"
                  className="input input__date-of-birth"
                  type="date"
                  active={true}
                  required
                />

                <Select
                  data={
                    genders?.data
                      ? genders.data.map((gender: any) => ({
                        value: gender.id,
                        label: upperFirst(gender.name),
                      }))
                      : []
                  }
                  name="genderId"
                  label="Select a gender"
                />

                <PrimaryButton
                  title="Continue"
                  type="button"
                  onClick={async () => {
                    setError(null);

                    if (
                      !values.email ||
                      !values.username ||
                      !values.firstName ||
                      !values.lastName ||
                      !values.dateOfBirth ||
                      !values.genderId
                    ) {
                      setError("All fields are required to continue.");
                      return;
                    }

                    // Check email is valid
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(values.email)) {
                      setError("Email is not valid.");
                      return;
                    }

                    // Check if email is in use
                    const { data: userWithEmail } = await supabase
                      .from("users")
                      .select("id")
                      .filter("email", "eq", values.email)
                      .single();

                    if (userWithEmail) {
                      setError("Email is already in use.");
                      return;
                    }

                    // Check if username is already in use
                    const { data: userWithUsername } = await supabase
                      .from("users")
                      .select("id")
                      .filter("username", "eq", values.username)
                      .single();

                    // Possible check for network/server error needed before assuming it's a username error
                    if (userWithUsername) {
                      setError("Username is already in use.");
                      return;
                    }

                    setActiveFormSection("goal");
                  }}
                />
              </section>
            )}

            {activeFormSection === "goal" && (
              <section className="goal-section">
                {goalsLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="radio-container">
                    <RadioIconInput
                      title="Weight loss"
                      icon={<WeightLossIcon />}
                      name="goalId"
                      value={String(
                        goals.data.find(
                          (goal: any) => goal.name === "weight loss"
                        ).id
                      )}
                      className="radio-input"
                    />

                    <RadioIconInput
                      title="Muscle gain"
                      icon={<MuscleGainIcon />}
                      name="goalId"
                      value={String(
                        goals.data.find(
                          (goal: any) => goal.name === "muscle gain"
                        ).id
                      )}
                      className="radio-input"
                    />

                    <RadioIconInput
                      title="Maintain"
                      icon={<MaintainIcon />}
                      name="goalId"
                      value={String(
                        goals.data.find((goal: any) => goal.name === "maintain")
                          .id
                      )}
                      className="radio-input"
                    />

                    <RadioIconInput
                      title="Toning"
                      icon={<ToningIcon />}
                      name="goalId"
                      value={String(
                        goals.data.find((goal: any) => goal.name === "toning")
                          .id
                      )}
                      className="radio-input"
                    />
                  </div>
                )}

                <PrimaryButton
                  title="Continue"
                  type="button"
                  onClick={() => {
                    setError(null);

                    if (!values.goalId) {
                      setError("Goal is required.");
                      return;
                    }

                    setActiveFormSection("activity level");
                  }}
                />
              </section>
            )}

            {activeFormSection === "activity level" && (
              <section className="goal-section">
                {activityLevelsLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="radio-container">
                    <RadioIconInput
                      title="Inactive"
                      icon={<InactiveIcon />}
                      name="activityLevelId"
                      value={String(
                        activityLevels.data.find(
                          (activityLevel: any) =>
                            activityLevel.name === "inactive"
                        ).id
                      )}
                      className="radio-input"
                    />

                    <RadioIconInput
                      title="Fairly active"
                      icon={<FairlyActiveIcon />}
                      name="activityLevelId"
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
                      name="activityLevelId"
                      value={String(
                        activityLevels.data.find(
                          (activityLevel: any) =>
                            activityLevel.name === "active"
                        ).id
                      )}
                      className="radio-input"
                    />

                    <RadioIconInput
                      title="Very active"
                      icon={<VeryActiveIcon />}
                      name="activityLevelId"
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

                <PrimaryButton title="Add" type="submit" />
              </section>
            )}
          </Form>
        )}
      </Formik>
    </AddClientModalContainer>
  );
}

const AddClientModalContainer = styled.section`
  header {
    text-align: center;
    margin-bottom: 50px;

    h2 {
      font-weight: 800;
      font-size: 24px;
      letter-spacing: -0.02em;
      color: #200e32;
    }
  }

  .error {
    text-align: center;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 700;
    background: linear-gradient(90deg, #f77062 0%, #fe5196 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  form section {
    > div {
      margin-bottom: 20px;
    }

    button {
      width: 100%;
    }
  }

  .goal-section {
    display: flex;
    flex-direction: column;
  }

  .radio-container {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 21px;
    margin: 0 auto 50px;
    height: 300px;
  }
`;

export default AddClientModalContent;
