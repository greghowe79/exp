// import { createClient } from '@supabase/supabase-js';

// const supabaseAdmin = createClient(
//     process.env.PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY! 
// );

// export async function verifyTokenWithSupabase(accessToken: string) {
//   const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
//   if (error || !data.user) throw new Error('Token non valido');
//   console.log('User:', data.user);
//   return data.user;
// }
//


import { createClient } from '@supabase/supabase-js';

if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('⚠️ Missing Supabase environment variables for server-side usage.');
}

const supabaseAdmin = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function verifyTokenWithSupabase(accessToken: string) {
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) throw new Error('Token non valido');
  return data.user;
}
