// import { createClient } from '@supabase/supabase-js';

// const supabaseAdmin = createClient(
//   // process.env.PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY! 
// );

// export async function verifyTokenWithSupabase(accessToken: string) {
//   const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
//   if (error || !data.user) throw new Error('Token non valido');
//   return data.user;
// }



import { createClient } from '@supabase/supabase-js';


// Prendi le variabili lato server, fallback a quelle PUBLIC se necessario
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devono essere impostate');
}

// Client admin lato server
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

// Funzione per verificare il token
export async function verifyTokenWithSupabase(accessToken: string) {
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) throw new Error('Token non valido');
  return data.user;
}



