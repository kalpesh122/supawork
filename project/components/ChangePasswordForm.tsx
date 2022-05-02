import { Form, Formik } from "formik";
import { useState } from "react";
import styled from "styled-components";

import { supabase } from "../libs/supabase";
import GradientText from "./GradientText";
import PasswordInput from "./PasswordInput";
import PrimaryButton from "./PrimaryButton";
import SignInIcon from "../public/vectors/SignInIcon.svg";
import { useRouter } from "next/router";

interface Props {
  className?: string;
  onComplete: () => void;
}

function ChangePasswordForm({ onComplete, className }: Props) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        password: "",
      }}
      onSubmit={async ({ password }) => {
        try {
          const { error } = await supabase.auth.api.updateUser(
            supabase.auth.session()!.access_token,
            {
              password,
            }
          );

          if (error) {
            setError(error.message);
            return;
          }

          onComplete();
        } catch (error: any) {
          setError(error.message);
        }
      }}
    >
      {({ isSubmitting }) => (
        <ChangePasswordFormStyles as={Form} className={className}>
          {error && <GradientText className="error">{error}</GradientText>}

          <PasswordInput
            className="input input__password"
            label="New password"
          />

          <PrimaryButton
            title="Change password"
            icon={<SignInIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
            className="button"
          />
        </ChangePasswordFormStyles>
      )}
    </Formik>
  );
}

const ChangePasswordFormStyles = styled.form`
  .error {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 14px;
  }

  .input__password {
    margin-bottom: 40px;
  }

  .button {
    max-width: 333px;
    width: 100%;
    margin: auto;
  }
`;

export default ChangePasswordForm;
