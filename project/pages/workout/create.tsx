import Head from "next/head";
import Container from "../../components/Container";
import CreateWorkoutForm from "../../components/CreateWorkoutForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import StickyFooterContainer from "../../components/StickyFooterContainer";
import WorkoutCreateHeaderContent from "../../components/WorkoutCreateHeaderContent";
import Styles from "../../styles/pages/create-workout.module.scss";

function WorkoutCreate() {
  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Create Workout</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <WorkoutCreateHeaderContent />
        </Header>

        <Container as="main" className={Styles.main}>
          <CreateWorkoutForm />
        </Container>

        <Footer />
      </StickyFooterContainer>
    </>
  );
}

export default WorkoutCreate;
