import Head from "next/head";
import { useRouter } from "next/router";

import AuthContainer from "../components/AuthContainer";
import AuthFooter from "../components/AuthFooter";
import ChangePasswordForm from "../components/ChangePasswordForm";
import useUser from "../libs/hooks/useUser";
import Logo from "../public/vectors/Logo.svg";
import Styles from "../styles/pages/login.module.scss";

function Password() {
  const [user, userLoading] = useUser({
    redirectTo: "/login",
  });
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Password</title>
      </Head>

      <AuthContainer>
        <main className={Styles.main}>
          <Logo className={Styles.logo} />

          <ChangePasswordForm
            onComplete={() => router.push("/")}
            className={Styles.form}
          />
        </main>

        <AuthFooter />
      </AuthContainer>
    </>
  );
}

export default Password;
