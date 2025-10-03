import { createClient } from "@supabase/supabase-js";


export const supabase = createClient<any>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  
);



