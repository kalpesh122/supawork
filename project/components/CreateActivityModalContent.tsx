import { Formik, Form } from "formik";
import styled from "styled-components";
import useSWR from "swr";

import Select from "./Select";
import PrimaryButton from "./PrimaryButton";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import { supabase } from "../libs/supabase";
import { useRouter } from "next/router";
import SelectWorkoutModal from "./SelectWorkoutModal";
import { useState } from "react";

interface Props {
  closeModal: () => void;
  onSubmit: () => void;
  day: number;
  position: number;
}

function CreateActivityModalContent({
  closeModal,
  onSubmit,
  day,
  position,
}: Props) {
  const router = useRouter();
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const { data: activityTypes, error: ActivityTypesError } = useSWR(
    "/api/activity_types"
  );

  const activityTypesLoading = !activityTypes && !ActivityTypesError;

  return (
    <CreateActivityModalContainer>
      <header>
        <h2 className="title">Add Activity</h2>
      </header>

      <Formik
        initialValues={{ typeId: "" }}
        onSubmit={async ({ typeId }) => {
          if (
            (typeId === "1" || typeId === "2" || typeId === "3") &&
            !selectedWorkout
          )
            return;

          const { data: activity, error } = await supabase
            .from("activities")
            .insert({
              activity_type_id: typeId,
              workout_plan_id: router.query.id,
              day,
              position,
              workout_id:
                typeId === "1" || typeId === "2" || typeId === "3"
                  ? selectedWorkout.id
                  : null,
            });

          onSubmit();
        }}
      >
        {({ isSubmitting, handleChange, setFieldValue, values }) => (
          <>
            <Form>
              {activityTypesLoading || !activityTypes?.data ? (
                <p>Loading...</p>
              ) : (
                <>
                  <Select
                    name="typeId"
                    label="Select a type"
                    data={activityTypes.data.map((activityType: any) => ({
                      value: activityType.id,
                      label: activityType.name,
                    }))}
                    className="input__select"
                    onChange={(e) => {
                      if (
                        e.target.value === "1" ||
                        e.target.value === "2" ||
                        e.target.value === "3"
                      ) {
                        setShowModal(true);
                      }
                      handleChange(e);
                    }}
                  />

                  {selectedWorkout &&
                    (values.typeId === "1" ||
                      values.typeId === "2" ||
                      values.typeId === "3") && (
                      <p className="workout-label">
                        Workout: <span>{selectedWorkout.name}</span>
                      </p>
                    )}
                </>
              )}

              <PrimaryButton
                title="Add Activity"
                disabled={isSubmitting}
                icon={<ConfirmIcon />}
                type="submit"
              />
            </Form>

            <SelectWorkoutModal
              isOpen={showModal}
              onRequestClose={() => {
                setFieldValue("typeId", "");
                setShowModal(false);
              }}
              closeModal={() => {
                setFieldValue("typeId", "");
                setShowModal(false);
              }}
              workoutOnClick={(workout) => {
                setSelectedWorkout(workout);
                setShowModal(false);
              }}
            />
          </>
        )}
      </Formik>
    </CreateActivityModalContainer>
  );
}

const CreateActivityModalContainer = styled.section`
  header {
    text-align: center;
    margin-bottom: 50px;

    h2 {
      font-weight: 800;
      font-size: 24px;
      letter-spacing: -0.02em;
      color: #200e32;
    }
  }

  .input__select {
    margin-bottom: 10px;
  }

  .workout-label {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-left: 16px;
    margin-bottom: 32px;

    span {
      font-weight: 500;
    }
  }
`;

export default CreateActivityModalContent;
