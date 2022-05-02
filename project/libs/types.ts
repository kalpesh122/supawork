export interface User {
  id: string;
  email: string;
  username: string;
  is_coach: boolean;
  has_onboarded: boolean;
  created_at: Date;
  updated_at: Date;
  trainer_id: null | string;
}
