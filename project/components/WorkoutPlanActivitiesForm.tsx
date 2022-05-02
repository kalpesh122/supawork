import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import CreateActivityModal from "./CreateActivityModal";
import PrimaryButton from "./PrimaryButton";
import AddIconGrey from "../public/vectors/AddIconGrey.svg";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";

interface Props {}

function WorkoutPlanActivitiesForm({}: Props) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState([
    [[""], [], [], [], [], [], []],
  ]);
  const { data: activities, error: actvitiesError, mutate } = useSWR(
    () => `/api/activities?workout_plan_id=${router.query.id}`
  );
  const { data: workouts, error: workoutsError } = useSWR("/api/workouts");
  const { data: activityTypes, error: activityTypesError } = useSWR(
    "/api/activity_types"
  );

  useEffect(() => {
    if (!activities || !workouts || !activityTypes) return;

    const amountOfWeeks = Math.max(
      ...activities.data.map((activity) => Math.ceil((activity.day + 1) / 8))
    );

    let newSelectedActivities = [];
    for (let i = 0; i < amountOfWeeks; i++) {
      newSelectedActivities[i] = [[], [], [], [], [], [], []];
    }

    for (const activity of activities.data) {
      const week = Math.ceil((activity.day + 1) / 8);
      const day = ((activity.day - 1) % 7) + 1;
      const position = activity.position;

      if (activity.workout_id) {
        newSelectedActivities[week - 1][day - 1][
          position - 1
        ] = workouts.data.find(
          (workout) => workout.id === activity.workout_id
        ).name;
      } else {
        newSelectedActivities[week - 1][day - 1][
          position - 1
        ] = activityTypes.data.find(
          (type) => type.id === activity.activity_type_id
        ).name;
      }
    }

    setSelectedActivities(newSelectedActivities);
  }, [activities, workouts, activityTypes]);

  return (
    <WorkoutPlanActivitiesFormContainer>
      <ol>
        {selectedActivities.map((week, weekIndex) => (
          <li className="container__week">
            <p className="title__week">Week {weekIndex + 1}</p>

            <ol className="list__days">
              {week.map((day, dayIndex) => (
                <li>
                  <p className="title__day">Day {dayIndex + 1}</p>

                  <ol className="list__activities">
                    {day.map((activity) => (
                      <li className="list-item__activity">{activity}</li>
                    ))}
                    <li>
                      <button
                        className="button__add-activity"
                        onClick={() => {
                          setSelectedDay(dayIndex + 1 + weekIndex * 7);
                          setSelectedPosition(day.length + 1);
                          setModalIsOpen(true);
                        }}
                      >
                        Add activity
                      </button>
                    </li>
                  </ol>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <button
        onClick={() =>
          setSelectedActivities((prev) => {
            const selectedActivitiesClone = JSON.parse(JSON.stringify(prev));
            selectedActivitiesClone.push([[], [], [], [], [], [], []]);

            return selectedActivitiesClone;
          })
        }
        className="button__add-week"
      >
        <AddIconGrey />
        Add another week
      </button>

      <PrimaryButton
        title="Confirm"
        onClick={() => router.push("/")}
        icon={<ConfirmIcon />}
      />

      {/* Modal */}
      <CreateActivityModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        onSubmit={() => {
          mutate();
          setModalIsOpen(false);
        }}
        onRequestClose={() => setModalIsOpen(false)}
        day={selectedDay}
        position={selectedPosition}
      />
    </WorkoutPlanActivitiesFormContainer>
  );
}

const WorkoutPlanActivitiesFormContainer = styled.section`
  margin: 52px 0 230px;

  .title__week {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 12px;
    margin-left: 32px;
  }

  .list__days {
    display: flex;
    background: #f4f4f4;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;

    > li {
      flex: 1;
      margin-right: 18px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .title__day {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #727272;
    margin-bottom: 10px;
  }

  .list__activities {
    .list-item__activity {
      background: linear-gradient(90deg, #0ba360 0%, #3cba92 100%);
      box-shadow: 0px 4px 10px rgba(36, 175, 122, 0.3);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.02em;
      color: #ffffff;
      height: 54px;
      margin-bottom: 10px;
    }
  }

  .button__add-activity {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.02em;
    color: #727272;
    border: 2px dashed #727272;
    border-radius: 15px;
    background-color: transparent;
  }

  .button__add-week {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #dadada;
    border-radius: 15px;
    background: transparent;
    margin-bottom: 50px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #dadada;

    svg {
      margin-right: 10px;
    }
  }
`;

export default WorkoutPlanActivitiesForm;
