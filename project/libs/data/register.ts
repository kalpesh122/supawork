import type { User } from "../types";

import { supabase } from "../supabase";

async function register(
  username: string,
  email: string,
  password: string,
  isCoach: boolean,
  trainerId: null | string
) {
  // Check if username is already in use
  const { data: userWithUsername } = await supabase
    .from<User>("users")
    .select("id")
    .filter("username", "eq", username)
    .single();

  // Possible check for network/server error needed before assuming it's a username error
  if (userWithUsername) throw new Error("Username is already in use");

  // Sign up user using supabase auth
  const { user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !user) throw signUpError;

  // Create user in custom users table
  const { data: createdUser, error: userError } = await supabase
    .from<User>("users")
    .insert({
      id: user.id,
      username,
      email: user.email,
      is_coach: isCoach,
      trainer_id: trainerId,
    })
    .single();

  if (userError || !createdUser) throw userError;

  return createdUser;
}

export default register;
