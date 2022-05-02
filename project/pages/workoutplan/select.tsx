import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SelectPlanButton from "../../components/SelectPlanButton";
import SelectPlanHeaderContent from "../../components/SelectPlanHeaderContent";
import StickyFooterContainer from "../../components/StickyFooterContainer";
import useUser from "../../libs/hooks/useUser";
import Styles from "../../styles/pages/select-plan.module.scss";
import CreatePlanIcon from "../../public/vectors/CreatePlanIcon.svg";

function WorkoutPlanSelect() {
  const [user] = useUser({ redirectTo: "/login" });
  const { data: workoutPlans, error: workoutPlansError } = useSWR(
    () => `/api/workout_plans?creator_id=${user!.id}`
  );

  const workoutPlansLoading = !workoutPlans && !workoutPlansError;

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Select Workout Plan</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <SelectPlanHeaderContent />
        </Header>

        <Container as="main" className={Styles.main}>
          {workoutPlansLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className={Styles.plans}>
              {workoutPlans.data.map((workoutPlan: any) => (
                <li key={workoutPlan.id} className={Styles.plan}>
                  <SelectPlanButton
                    planName={workoutPlan.name}
                    planType="workout"
                  />
                </li>
              ))}
              <li>
                <Link href="/workoutplan/create">
                  <a className={Styles["link__create-plan"]}>
                    <CreatePlanIcon />
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </Container>

        <Footer />
      </StickyFooterContainer>
    </>
  );
}

export default WorkoutPlanSelect;
