import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  //  process.env.PUBLIC_SUPABASE_URL!,
  //  process.env.SUPABASE_SERVICE_ROLE_KEY! 
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
   
);

export async function verifyTokenWithSupabase(accessToken: string) {
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) throw new Error('Token non valido');
  return data.user;
}



