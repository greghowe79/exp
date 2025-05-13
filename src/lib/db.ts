//import { RequestEventBase } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";
//import { createServerClient } from "supabase-auth-helpers-qwik";
//import type { Database } from "./schema";

export const supabase = createClient<any>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  //import.meta.env.VITE_SERVICE_ROLE
);


