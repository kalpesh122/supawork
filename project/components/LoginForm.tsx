import { Form, Formik } from "formik";
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

// import app from '../libs/firebase';
import FloatingLabelInput from "./FloatingLabelInput";
import GradientText from "./GradientText";
import PrimaryButton from "./PrimaryButton";
import SignInIcon from "../public/vectors/SignInIcon.svg";
import PasswordInput from "./PasswordInput";
import { router, useRouter } from "next/router";
import axios from "axios";
import { supabase } from "../libs/supabase";

interface Props {
  className?: string;
  onComplete: () => void;
}

function LoginForm({ className, onComplete }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);

  // const formatAuthUser = (user) => ({
  //   uid: user.uid,
  //   email: user.email
  // });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async ({ email, password }) => {
        console.log(email, password)

        try {
          console.log("Form Submitted")
          // if(email !="" && password != ""){
          //   onComplete();
          // }
          // if (email === "kalpeshmail006@gmail.com" && password === "Kalpesh@122") {
          //   // onComplete();
          //   router.push('/onboarding')
          // }
          router.push('/onboarding')

          // const res = await axios.post('https://pharmawebb.herokuapp.com/api/auth/login',{
          //   email,
          //   password
          // })

          // console.log(res)


          // if ( res.data.success ==true) {

          //   console.log("this ")
          //   onComplete();
          //  router.push("/")
          // }

          console.log("Submitted")
          console.log(email, password)
          // const { error } = await supabase.auth.signIn({ email, password });

          // if (error) throw error.message;


        } catch (error) {
          // setError(error.message);
        }

        // try {
        //   // setLoading(true)
        //   const { error } = await supabase.auth.signIn({ email })
        //   if (error) throw error
        //   alert('Check your email for the login link!')
        // } catch (error:any) {
        //   alert(error.error_description || error.message)

        // } finally {
        //   // setLoading(false)
        // }
      }}
    >
      {({ isSubmitting }) => (
        <LoginFormStyles as={Form} className={className}>
          {error && <GradientText className="error">{error}</GradientText>}
          <FloatingLabelInput
            name="email"
            label="Email"
            className="input input__email"
            required
          />

          <PasswordInput className="input input__password" />

          <PrimaryButton
            title="Sign in"
            icon={<SignInIcon />}
            iconPosition="after"
            type="submit"
            disabled={isSubmitting}
            // onSubmit={subForm}
            className="button"
          />
        </LoginFormStyles>
      )}
    </Formik>
  );
}

const LoginFormStyles = styled.form`
  .error {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 14px;
  }

  .input__email {
    margin-bottom: 10px;
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

export default LoginForm;
