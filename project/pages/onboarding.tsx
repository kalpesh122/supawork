import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ActivityLevelForm from "../components/ActivityLevelForm";
import AuthContainer from "../components/AuthContainer";
import AuthFooter from "../components/AuthFooter";
import GoalForm from "../components/GoalForm";
import ProfileForm from "../components/ProfileForm";
import useUser from "../libs/hooks/useUser";
import Logo from "../public/vectors/Logo.svg";
import Styles from "../styles/pages/onboarding.module.scss";

type ActiveForm = "details" | "goal" | "activity";

function Onboarding() {
  const [activeForm, setActiveForm] = useState<ActiveForm>("details");
  const [user, userLoading] = useUser({
    redirectTo: "/login",
  });
  const router = useRouter();

  useEffect(() => {
    // if (!user) return;

    router.push("/");
    // if (user.has_onboarded) {
    //   console.log(user, "hello")
    // }
  }, []);

  return (
    <AuthContainer>
      <main className={Styles.main}>
        <Logo className={Styles.logo} />

        {userLoading || !user ? (
          "Loading..."
        ) : (
          <>
            {activeForm === "details" && (
              <ProfileForm
                onComplete={() => {
                  setActiveForm("goal");
                }}
                className={[Styles.form, Styles["form__profile"]].join(" ")}
                userId={user!.id}
              />
            )}

            {activeForm === "goal" && (
              <GoalForm
                onComplete={() => {
                  setActiveForm("activity");
                }}
                userId={user!.id}
              />
            )}

            {activeForm === "activity" && (
              <ActivityLevelForm
                onComplete={() => {
                  router.push("/");
                }}
                userId={user!.id}
              />
            )}
          </>
        )}
      </main>

      <AuthFooter />
    </AuthContainer >
  );
}

export default Onboarding;
