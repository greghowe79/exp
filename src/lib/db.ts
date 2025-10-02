// import { createClient } from "@supabase/supabase-js";


// export const supabase = createClient<any>(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  
// );



import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY devono essere impostate');
}

export const supabase = createClient<any>(supabaseUrl, supabaseKey);
