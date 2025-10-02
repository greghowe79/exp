// import { createClient } from "@supabase/supabase-js";


// export const supabase = createClient<any>(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  
// );



import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

// ⚠️ Non lanciare un errore in fase di build
// Se non ci sono variabili, metti stringhe vuote (il client fallirà al runtime, non in build)
export const supabase = createClient<any>(
  supabaseUrl || "",
  supabaseKey || ""
);
