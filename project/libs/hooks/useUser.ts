import type { User } from "../types";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { supabase } from "../supabase";

interface Options {
  redirectTo?: null | string;
  redirectIfFound?: Boolean;
  onboardingRequired?: Boolean;
}

function useUser(options: Options): [User | null, Boolean, String | null] {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      if (!supabase.auth.user()) throw new Error("User is not signed in");

      const { data: currentUser, error } = await supabase
        .from<User>("users")
        .select("*")
        .match({ id: supabase.auth.user()!.id })
        .single();

      if (error || !currentUser) throw error;

      setUser(currentUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggedIn(Boolean(user));
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      redirectTo = null,
      redirectIfFound = false,
      onboardingRequired = false,
    } = options;

    // No redirect
    if (!redirectTo || isLoggedIn === null) return;

    // User found and onboarding required redirect
    if (user && onboardingRequired && !user.has_onboarded) {
      router.push("/onboarding");
      return;
    }
    // if (!user) {
    //   router.push("/onboarding");
    //   return;
    // }

    // User found redirect
    if (redirectTo && redirectIfFound && user) {
      router.push(redirectTo);
      return;
    }

    // User not found redirect
    if (redirectTo && !redirectIfFound && !user) {
      router.push(redirectTo);
      return;
    }
  }, [isLoggedIn]);

  return [user, loading, error];
}

export default useUser;
