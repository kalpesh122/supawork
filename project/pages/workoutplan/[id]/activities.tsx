import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import PrimaryButton from "../../../components/PrimaryButton";
import StickyFooterContainer from "../../../components/StickyFooterContainer";
import WorkoutPlanActivitiesForm from "../../../components/WorkoutPlanActivitiesForm";
import WorkoutPlanActivitiesHeaderContent from "../../../components/WorkoutPlanActivitiesHeaderContent";

import useUser from "../../../libs/hooks/useUser";

function WorkoutPlanActivities() {
  const [user] = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState([
    [[], [], [], [], [], [], []],
  ]);
  const { data: activities, error: activitiesError } = useSWR(() =>
    router.query.id
      ? `/api/activities?workout_plan_id=${router.query.id}`
      : null
  );
  // Modal
  const { data: workouts, error: workoutsError } = useSWR("/api/workouts");

  const workoutsLoading = !workouts && !workoutsError;

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Workout Plan Activities</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <WorkoutPlanActivitiesHeaderContent />
        </Header>

        <Container as="main">
          <WorkoutPlanActivitiesForm />
        </Container>

        <Footer />

        {/* Modal */}
        {/* <div>
        <h2>Find Workout</h2>
        <button onClick={() => router.push("/workout/create")}>+</button>

        {workoutsLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {workouts.data.map((workout: any) => (
              <li key={workout.id}>{workout.name}</li>
            ))}
          </ul>
        )}
      </div> */}
      </StickyFooterContainer>
    </>
  );
}

export default WorkoutPlanActivities;
