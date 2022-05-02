import Link from "next/link";
import { useRouter } from "next/router";
// import app from './../libs/firebase';
import useUser from "../libs/hooks/useUser";
import Logo from "../public/vectors/Logo.svg";
import AuthContainer from "../components/AuthContainer";
import Styles from "../styles/pages/login.module.scss";
import LoginForm from "../components/LoginForm";
import AuthFooter from "../components/AuthFooter";
import Head from "next/head";

function Login() {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Login</title>
      </Head>

      <AuthContainer>
        <main className={Styles.main}>
          <Logo className={Styles.logo} />

          <LoginForm
            onComplete={() => router.push("/")}
            className={Styles.form}
          />

          <Link href="/forgot">
          <a
            className={[Styles.link, Styles["link__forgot-password"]].join(" ")}
          >
            Forgot your password?
          </a>
        </Link>
        

          <Link href="/register">
          <a
            className={[Styles.link, Styles["link__create-account"]].join(" ")}
          >
            Dont have an account? Sign up now
          </a>
        </Link>
        </main>

        <AuthFooter />
      </AuthContainer>
    </>
  );
}

export default Login;
