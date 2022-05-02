import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import useUser from "../libs/hooks/useUser";

export default function Home() {
  const router = useRouter();
  const [user, userLoading] = useUser({
    onboardingRequired: true,
    redirectTo: "/login",
  });

  useEffect(() => {
    if (!router) return;

    router.replace("/workoutplan");
  }, [router]);

  if (userLoading) return <p>Loading...</p>;

  return (
    <main style={{ flex: 1 }}>
      <Header />
      <h1>Home</h1>
    </main>
  );
}
