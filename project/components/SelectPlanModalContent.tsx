import { Form, Formik } from "formik";
import styled from "styled-components";
import useSWR from "swr";

import useUser from "../libs/hooks/useUser";
import PrimaryButton from "./PrimaryButton";
import Select from "./Select";
import ConfirmIcon from "../public/vectors/ConfirmIcon.svg";
import { supabase } from "../libs/supabase";
import FloatingLabelInput from "./FloatingLabelInput";

interface Props {
  closeModal: () => void;
  client: any;
}

function SelectPlanModalContent({ closeModal, client }: Props) {
  const [user] = useUser({});
  const { data: workoutPlans, error: workoutPlansError } = useSWR(
    () => `/api/workout_plans?creator_id=${user!.id}`
  );

  const workoutPlansLoading = !workoutPlans && !workoutPlansError;

  if (workoutPlansLoading) return <p>Loading...</p>;

  return (
    <SelectPlanModalContentContainer>
      <header>
        <h2>Select plan</h2>
      </header>

      <p>User: {client.email}</p>

      <Formik
        initialValues={{ workoutPlanId: "", paymentType: "payment", price: 0 }}
        onSubmit={async ({ workoutPlanId, paymentType, price }) => {
          try {
            const { error } = await supabase
              .from("active_workout_plans")
              .insert({
                user_id: client.id,
                workout_plan_id: Number(workoutPlanId),
                paid: false,
                price: price > 0 ? price : null,
                payment_type: paymentType,
              });

            if (error) throw error;

            closeModal();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Select
              data={workoutPlans.data.map((workoutPlan: any) => ({
                value: workoutPlan.id,
                label: workoutPlan.name,
              }))}
              label="Select a workout plan"
              name="workoutPlanId"
              className="input__workout-plan"
            />

            <Select
              data={[
                { value: "payment", label: "One time" },
                { value: "subscription", label: "Recurring" },
              ]}
              label="Select a payment type"
              name="paymentType"
              className="input__workout-plan"
            />

            <FloatingLabelInput
              name="price"
              label={
                values.paymentType === "payment"
                  ? "Price in GBP (Leave 0 for free)"
                  : "Price in GBP per month (Leave 0 for free)"
              }
              type="number"
              min="0"
              className="input__price"
            />

            <PrimaryButton
              title="Confirm"
              icon={<ConfirmIcon />}
              type="submit"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </SelectPlanModalContentContainer>
  );
}

const SelectPlanModalContentContainer = styled.section`
  header h2 {
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #200e32;
    text-align: center;
    margin-bottom: 50px;
  }

  p {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: #200e32;
    margin-bottom: 12px;
  }

  .input__workout-plan {
    margin-bottom: 20px;
  }

  .input__price {
    margin-bottom: 32px;
  }
`;

export default SelectPlanModalContent;
