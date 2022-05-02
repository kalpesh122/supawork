import Head from "next/head";

import Container from "../../components/Container";
import CreatePlanHeaderContent from "../../components/CreatePlanHeaderContent";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import StickyFooterContainer from "../../components/StickyFooterContainer";
import useUser from "../../libs/hooks/useUser";
import Styles from "../../styles/pages/create-plan.module.scss";
import CreateWorkoutPlanForm from "../../components/CreateWorkoutPlanForm";

function WorkoutPlanCreate() {
  useUser({ redirectTo: "/login" });

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Create Workout Plan</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <CreatePlanHeaderContent />
        </Header>

        <Container as="main" className={Styles.main}>
          <CreateWorkoutPlanForm />
        </Container>

        <Footer />
      </StickyFooterContainer>
    </>
  );
}

export default WorkoutPlanCreate;
