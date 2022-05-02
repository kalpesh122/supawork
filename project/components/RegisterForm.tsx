import { Field, Form, Formik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import register from "../libs/data/register";
import FloatingLabelInput from "./FloatingLabelInput";
import GradientText from "./GradientText";
import PasswordInput from "./PasswordInput";
import PrimaryButton from "./PrimaryButton";
import ContinueIcon from "../public/vectors/ContinueIcon.svg";
import useSWR from "swr";

interface Props {
  className?: string;
  onComplete: () => void;
}

function RegisterForm({ className, onComplete }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: trainer } = useSWR(
    () => `/api/users?username=${router.query.trainer}`
  );


  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        isCoach: false,
      }}
      onSubmit={async ({ username, email, password, isCoach }) => {
        try {
          const user = await register(
            username,
            email,
            password,
            isCoach,
            trainer?.data[0]?.id ?? null
          );
          console.log(user)
          if (user.is_coach) {
            // SEPERATE COACH ONBOARDING REDIRECT?
          }

          onComplete();
        } catch (error:any) {
          setError(error.message);
        }
      }}
    >
      {({ isSubmitting }) => (
        <RegisterFormStyles as={Form} className={className}>
          {error && <GradientText className="error">{error}</GradientText>}

          <FloatingLabelInput
            name="email"
            label="Email"
            className="input input__email"
            required
          />

          <FloatingLabelInput
            name="username"
            label="Username"
            className="input input__username"
            required
          />

          <PasswordInput className="input input__password" />

          {!router.query.trainer && (
            <div className="checkbox-container">
              <Field
                name="isCoach"
                type="checkbox"
                id="isCoach"
                className="checkbox"
              />
              <label htmlFor="isCoach" className="checkbox-label">
                Are you a coach?
              </label>
            </div>
          )}

          <PrimaryButton
            title="Create account"
            icon={<ContinueIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
            className="button"
          />
        </RegisterFormStyles>
      )}
    </Formik>
  );
}

const RegisterFormStyles = styled.form`
  .error {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 14px;
  }

  .input {
    margin-bottom: 10px;
  }

  .input__password {
    margin-bottom: 16px;
  }

  .button {
    max-width: 333px;
    width: 100%;
    margin: auto;
  }

  .checkbox-container {
    text-align: left;
    display: flex;
    align-items: center;
    margin-bottom: 51px;
  }

  .checkbox {
    appearance: none;
    width: 32px;
    height: 32px;
    border: 2px solid #c4c4c4;
    border-radius: 5px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:checked {
      background: #c4c4c4;

      &::after {
        content: "✔";
        color: #ffffff;
      }
    }
  }

  .checkbox-label {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: #200e32;
  }
`;

export default RegisterForm;
