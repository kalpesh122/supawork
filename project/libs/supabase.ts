import type { Session, User } from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function isTypeSession(data: Session | User): data is Session {
  return data.hasOwnProperty("user");
}
