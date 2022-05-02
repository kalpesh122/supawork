import { Field, Form, Formik } from "formik";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { upperFirst } from "lodash";

import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ContinueIcon from "../public/vectors/ContinueIcon.svg";
import createProfile from "../libs/data/createProfile";

interface Props {
  className?: string;
  onComplete: () => void;
  userId: string;
}

function ProfileForm({ className, onComplete, userId }: Props) {
  const [error, setError] = useState<string | null>(null);
  const { data: genders, error: gendersError } = useSWR("/api/genders");

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        genderId: "",
      }}
      onSubmit={async ({ firstName, lastName, dateOfBirth, genderId }) => {
        try {
          await createProfile(
            userId,
            firstName,
            lastName,
            new Date(dateOfBirth),
            Number(genderId)
          );
        } catch (error) {
          setError(error.message);
          return;
        }

        onComplete();
      }}
    >
      {({ isSubmitting }) => (
        <ProfileFormStyles as={Form} className={className}>
          <h1 className="title">Let's get to know you</h1>

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

          <Field name="genderId" as="select" className="select" required>
            <option value="" disabled className="select-placeholder">
              Select a gender
            </option>
            {genders?.data.map((gender: any) => (
              <option key={gender.id} value={gender.id}>
                {upperFirst(gender.name)}
              </option>
            ))}
          </Field>

          <PrimaryButton
            title="Fitness details"
            icon={<ContinueIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
            className="button"
          />
        </ProfileFormStyles>
      )}
    </Formik>
  );
}

const ProfileFormStyles = styled.form`
  .title {
    font-weight: 800;
    font-size: 60px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 46px;
  }

  .input {
    margin-bottom: 10px;
  }

  .select {
    width: 100%;
    height: 66px;
    background: #f7f7f7;
    border-radius: 10px;
    border: none;
    padding: 0 16px;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 41px;
  }

  .button {
    max-width: 333px;
    width: 100%;
    margin: auto;
  }
`;

export default ProfileForm;
