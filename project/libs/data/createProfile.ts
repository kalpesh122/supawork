import { supabase } from "../supabase";

async function createProfile(
  userID: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  genderID: number
) {
  // Create profle
  const { data: profile, error: createProfileError } = await supabase
    .from("profiles")
    .insert({
      id: userID,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      gender_id: genderID,
    });

  if (createProfileError) throw createProfileError;

  // Set onboarding to completed
  const { error: updateUserError } = await supabase
    .from("users")
    .update({ has_onboarded: true })
    .filter("id", "eq", userID);

  if (updateUserError) throw updateUserError;

  return profile;
}

export default createProfile;
