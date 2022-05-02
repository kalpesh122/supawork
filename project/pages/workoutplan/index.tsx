import { differenceInCalendarDays, format } from "date-fns";
import { groupBy } from "lodash";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import CalendarModal from "../../components/CalendarModal";

import Container from "../../components/Container";
import CreateExerciseModal from "../../components/CreateExerciseModal";
import CreateWorkoutExerciseModal from "../../components/CreateWorkoutExerciseModal";
import ExerciseModal from "../../components/ExerciseModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderButton from "../../components/HeaderButton";
import PlanCreatorSection from "../../components/PlanCreatorSection";
import PlanInformationSection from "../../components/PlanInformationSection";
import SelectPlanLink from "../../components/SelectPlanLink";
import StickyFooterContainer from "../../components/StickyFooterContainer";
import WorkoutButton from "../../components/WorkoutButton";
import WorkoutExerciseModal from "../../components/WorkoutExerciseModal";
import WorkoutPlanHeaderContent from "../../components/WorkoutPlanHeaderContent";
import useUser from "../../libs/hooks/useUser";
import Styles from "../../styles/pages/workout-plan.module.scss";

function WorkoutPlan() {
  const [user] = useUser({ redirectTo: "/login" });
  const [activeDate, setActiveDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<null | any>(null);
  const [showWorkoutExerciseModal, setShowWorkoutExerciseModal] =
    useState(false);
  const { data: activeWorkoutPlans, error: activeWorkoutPlansError } = useSWR(
    () => `/api/active_workout_plans?user_id=${user!.id}`
  );
  const { data: workoutPlans, error: workoutPlansError } = useSWR(
    () => `/api/workout_plans/${activeWorkoutPlans.data[0].workout_plan_id}`
  );
  const { data: activities, error: activitiesError } = useSWR(
    () => `/api/activities?workout_plan_id=${workoutPlans.data[0].id}`
  );
  const { data: activityTypes, error: activityTypesError } = useSWR(
    "/api/activity_types"
  );
  console.log(user);

  const activeWorkoutPlansLoading =
    !activeWorkoutPlans && !activeWorkoutPlansError;
  const workoutPlanLoading = !workoutPlans && !workoutPlansError;
  const activitiesLoading = !activities && !activitiesError;

  const activeDay = workoutPlanLoading
    ? null
    : differenceInCalendarDays(
        activeDate,
        new Date(activeWorkoutPlans.data[0].started_at)
      ) + 1;

  const todaysActivities = activitiesLoading
    ? []
    : activities.data.filter((activity:any) => activity.day === activeDay);

  const { data: workouts, error: workoutsError } = useSWR(() => {
    const todaysActivitiesWithWorkouts = todaysActivities
      .filter((activity:any) => activity.workout_id)
      .map((activity:any) => activity.workout_id);

    if (todaysActivitiesWithWorkouts.length === 0) return null;

    return `/api/workouts/${todaysActivitiesWithWorkouts.join(";")}`;
  });
  const { data: workoutsExercises, error: workoutExercisesError } = useSWR(
    () => `/api/workouts_exercises?workout_id=${workouts.data[0].id}`
  );
  const { data: exercises, error: exercisesError } = useSWR(
    () =>
      `/api/exercises/${workoutsExercises.data
        .map((workoutExercise:any) => workoutExercise.exercise_id)
        .join(";")}`
  );
  console.log(workoutsExercises, exercises);

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Workout Plan</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <WorkoutPlanHeaderContent
            headerButton={
              <HeaderButton
                title={format(activeDate, "EEE d")}
                onClick={() => setShowCalendarModal(true)}
              />
            }
          />
        </Header>

        <Container as="main" className={Styles.main}>
          {activeWorkoutPlansLoading ? (
            <p>Loading...</p>
          ) : activeWorkoutPlans.data.length > 0 ? (
            workoutPlanLoading ? (
              <p>Loading...</p>
            ) : activeWorkoutPlans.data[0].price &&
              !activeWorkoutPlans.data[0].paid ? (
              <form
                action="/api/pay"
                method="POST"
                className={Styles["form__pay"]}
              >
                <input
                  type="hidden"
                  name="id"
                  value={activeWorkoutPlans.data[0].id}
                />
                <button type="submit" className={Styles["button__pay"]}>
                  Your coach has assigned you the workout plan{" "}
                  <strong>{workoutPlans.data[0].name}</strong> Click here to
                  pay.
                </button>
              </form>
            ) : (
              <>
                <div>
                  {todaysActivities.length > 0 ? (
                    todaysActivities
                      .sort((a:any, b:any) => b.position - a.position)
                      .map((activity:any) => {
                        const activityType = activityTypes.data.find(
                          (activityType:any) =>
                            activityType.id === activity.activity_type_id
                        ).name;

                        switch (activityType) {
                          case "Rest":
                            return <p className={Styles.rest}>Rest Day!</p>;
                          case "Workout":
                          case "AM Workout":
                          case "PM Workout":
                            if (!workoutsExercises) return <p>Loading...</p>;
                            console.log(
                              "test",
                              Object.entries(
                                groupBy(
                                  workoutsExercises.data,
                                  (workoutExercise) => workoutExercise.section
                                )
                              )
                                .sort((a:any, b:any) => a[0] - b[0])
                                .map((value) =>
                                  value[1].sort(
                                    (a, b) => a.position - b.position
                                  )
                                )
                            );

                            return (
                              <section>
                                {Object.entries(
                                  groupBy(
                                    workoutsExercises.data,
                                    (workoutExercise) => workoutExercise.section
                                  )
                                )
                                  .sort((a:any, b:any) => a[0] - b[0])
                                  .map((value) =>
                                    value[1].sort(
                                      (a, b) => a.position - b.position
                                    )
                                  )
                                  .map((section, index) => (
                                    <>
                                      <h2 className={Styles["section-title"]}>
                                        Section {index + 1}
                                      </h2>
                                      <ol className={Styles["list__workouts"]}>
                                        {section.map((workoutExercise) => {
                                          if (!exercises)
                                            return <p>Loading...</p>;

                                          const exercise = exercises.data.find(
                                            (exercise:any) =>
                                              exercise.id ===
                                              workoutExercise.exercise_id
                                          );

                                          console.log(exercise);

                                          return (
                                            <li
                                              className={
                                                Styles["list-item__workout"]
                                              }
                                            >
                                              <WorkoutButton
                                                reps={workoutExercise.reps}
                                                sets={workoutExercise.sets}
                                                name={exercise.name}
                                                image={exercise.image_url}
                                                onClick={() => {
                                                  setSelectedExercise({
                                                    ...workoutExercise,
                                                    ...exercise,
                                                  });
                                                  setShowWorkoutExerciseModal(
                                                    true
                                                  );
                                                }}
                                              />
                                            </li>
                                          );
                                        })}
                                      </ol>
                                    </>
                                  ))}
                              </section>
                            );
                        }
                      })
                  ) : (
                    <p className={Styles["no-activities"]}>
                      No activities this day
                    </p>
                  )}

                  <PlanInformationSection
                    title={workoutPlans.data[0].name}
                    descriptionParagraphs={[workoutPlans.data[0].description]}
                  />
                </div>

                <PlanCreatorSection
                  creatorId={workoutPlans.data[0].creator_id}
                />
              </>
            )
          ) : user?.trainer_id ? (
            <>
              <p className={Styles["awaiting-plan"]}>
                Your coach has not yet assigned you a workout plan.
              </p>
            </>
          ) : (
            <SelectPlanLink href="/workoutplan/select" />
          )}
        </Container>

        <Footer />
      </StickyFooterContainer>

      <WorkoutExerciseModal
        isOpen={showWorkoutExerciseModal}
        exercise={selectedExercise}
        onRequestClose={() => setShowWorkoutExerciseModal(false)}
      />

      <CalendarModal
        isOpen={showCalendarModal}
        onRequestClose={() => setShowCalendarModal(false)}
        value={activeDate}
        onChange={(date) => {
          setActiveDate(date);
          setShowCalendarModal(false);
        }}
      />
    </>
  );
}

export default WorkoutPlan;
