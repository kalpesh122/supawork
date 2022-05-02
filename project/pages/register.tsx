import Link from "next/link";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

import useUser from "../libs/hooks/useUser";
import Logo from "../public/vectors/Logo.svg";
import AuthContainer from "../components/AuthContainer";
import Styles from "../styles/pages/register.module.scss";
import RegisterForm from "../components/RegisterForm";
import AuthFooter from "../components/AuthFooter";
import Head from "next/head";

function Register() {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Register</title>
      </Head>

      <AuthContainer>
        <main className={Styles.main}>
          <Logo className={Styles.logo} />

          <RegisterForm
            onComplete={() => router.push("/onboarding")}
            className={Styles.form}
          />

          {/* <Link href="/login">
          <a className={[Styles.link, Styles.link__login].join(" ")}>
            Have an account? sign in now
          </a>
        </Link> */}
        </main>

        <AuthFooter />
      </AuthContainer>
    </>
  );
}

export default Register;
