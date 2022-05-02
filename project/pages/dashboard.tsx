import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

import AddClientModal from "../components/AddClientModal";
import ClientModal from "../components/ClientModal";
import Container from "../components/Container";
import DashboardHeaderContent from "../components/DashboardHeaderContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SelectPlanButton from "../components/SelectPlanButton";
import SelectPlanModal from "../components/SelectPlanModal";
import StickyFooterContainer from "../components/StickyFooterContainer";
import useUser from "../libs/hooks/useUser";
import CreatePlanIcon from "../public/vectors/CreatePlanIcon.svg";
import Styles from "../styles/pages/dashboard.module.scss";

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    null | "add client" | "client" | "select plan"
  >(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [user] = useUser({ redirectTo: "/login" });
  const { data: clients, error } = useSWR(
    () => `/api/users?trainer_id=${user!.id}`
  );
  const { data: profiles, error: profilesError } = useSWR(
    () => `/api/profiles`
  );
  const { data: workoutPlans, error: workoutPlansError } = useSWR(
    () => `/api/workout_plans?creator_id=${user!.id}`
  );

  const clientsLoading = !clients && !error;
  const workoutPlansLoading = !workoutPlans && !workoutPlansError;

  return (
    <>
      <Head>
        <title>Rose June Taylor Coaching - Dashboard</title>
      </Head>

      <StickyFooterContainer>
        <Header>
          <DashboardHeaderContent />
        </Header>

        <Container as="main" className={Styles.main}>
          <section className={Styles.section}>
            <h2 className={Styles.subtitle}>Clients</h2>

            {clientsLoading ? (
              <p>Loading...</p>
            ) : clients.data.length > 0 ? (
              <ul className={Styles["list__clients"]}>
                {clients.data.map((client : any ) => {
                  const profile = profiles.data.find(
                    (profile :any ) => profile.id === client.id
                  );

                  return (
                    <li className={Styles["list-item__client"]}>
                      <button
                        onClick={() => {
                          setSelectedClient({ ...profile, ...client });
                          setActiveModal("client");
                        }}
                      >
                        <p>
                          {profile.first_name} {profile.last_name}
                        </p>
                        <p>{client.email}</p>
                      </button>
                    </li>
                  );
                })}
                <button
                  className={Styles["button__add-client"]}
                  onClick={() => setActiveModal("add client")}
                >
                  Add Client
                </button>
              </ul>
            ) : (
              <button
                className={Styles["button__no-clients"]}
                onClick={() => setActiveModal("add client")}
              >
                <p>You have no clients. Click here to add one.</p>
              </button>
            )}
          </section>

          <section className={Styles.section}>
            <h2 className={Styles.subtitle}>Workout Plans</h2>

            {workoutPlansLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className={Styles.plans}>
                {workoutPlans.data.map((workoutPlan: any) => (
                  <li key={workoutPlan.id} className={Styles.plan}>
                    <Link
                      href={`/workoutplan/${workoutPlan.id}/activities`}
                      passHref
                    >
                      <SelectPlanButton
                        planName={workoutPlan.name}
                        planType="workout"
                        as="a"
                      />
                    </Link>
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
          </section>
        </Container>

        <Footer />
      </StickyFooterContainer>

      <AddClientModal
        isOpen={activeModal === "add client"}
        closeModal={() => setActiveModal(null)}
        onRequestClose={() => setActiveModal(null)}
      />

      <ClientModal
        isOpen={activeModal === "client"}
        closeModal={() => setActiveModal(null)}
        onRequestClose={() => setActiveModal(null)}
        client={selectedClient}
        selectPlanButtonClicked={() => setActiveModal("select plan")}
      />

      <SelectPlanModal
        isOpen={activeModal === "select plan"}
        closeModal={() => setActiveModal(null)}
        onRequestClose={() => setActiveModal(null)}
        client={selectedClient}
      />
    </>
  );
}

export default Dashboard;
