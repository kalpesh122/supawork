import styled from "styled-components";
import useSWR from "swr";

interface Props {
  closeModal: () => void;
  client: any;
  selectPlanButtonClicked: () => void;
}

function ClientModalContent({
  closeModal,
  selectPlanButtonClicked,
  client,
}: Props) {
  const { data: genders } = useSWR("/api/genders");
  const { data: goals } = useSWR("/api/goals");
  const { data: activityLevels } = useSWR("/api/activity_levels");
  const { data: activeWorkoutPlans } = useSWR(
    `/api/active_workout_plans?user_id=${client.id}`
  );
  const { data: workoutPlan } = useSWR(
    () => `/api/workout_plans/${activeWorkoutPlans.data[0].workout_plan_id}`
  );

  console.log(workoutPlan);

  if (!genders || !goals || !activityLevels || !activeWorkoutPlans)
    return <p>Loading...</p>;

  const gender = genders.data.find(
    (gender) => gender.id === client.gender_id
  ).name;
  const goal = goals.data.find((goal) => goal.id === client.goal_id).name;
  const activityLevel = activityLevels.data.find(
    (activityLevel) => activityLevel.id === client.activity_level_id
  ).name;

  return (
    <ClientModalContentContainer>
      <header>
        <h2>Client</h2>
      </header>

      <ul>
        <li>
          Name:{" "}
          <span>
            {client.first_name} {client.last_name}
          </span>
        </li>
        <li>
          Email: <span>{client.email}</span>
        </li>
        <li>
          Gender: <span>{gender}</span>
        </li>
        <li>
          Goal: <span>{goal}</span>
        </li>
        <li>
          Activity level: <span>{activityLevel}</span>
        </li>
        <li>
          Active Workout Plan:{" "}
          {activeWorkoutPlans.data.length > 0 ? (
            workoutPlan?.data ? (
              <span>{workoutPlan.data[0].name}</span>
            ) : (
              <span>Loading...</span>
            )
          ) : (
            <button onClick={selectPlanButtonClicked}>
              No active plan. Click here to add one.
            </button>
          )}
        </li>
      </ul>
    </ClientModalContentContainer>
  );
}

const ClientModalContentContainer = styled.section`
  header h2 {
    font-weight: 800;
    font-size: 32px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 16px;
  }

  li {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 4px;

    span {
      font-weight: 600;
      font-size: 18px;
    }

    button {
      font-weight: 600;
      font-size: 18px;
      text-decoration: underline;
      background: transparent;
      border: none;
      display: inline;
    }
  }
`;

export default ClientModalContent;
