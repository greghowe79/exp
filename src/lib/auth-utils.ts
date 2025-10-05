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


// import { createClient } from '@supabase/supabase-js';



// if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
//   throw new Error('⚠️ Missing Supabase environment variables for server-side usage.');
// }

// const supabaseAdmin = createClient(
//   process.env.PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// export async function verifyTokenWithSupabase(accessToken: string) {
//   const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
//   if (error || !data.user) throw new Error('Token non valido');
//   return data.user;
// }


// src/lib/auth-utils.ts
import { createClient } from '@supabase/supabase-js';

// Helper per ottenere env vars in modo sicuro
function getEnvVar(key: string): string {
  // Prova import.meta.env (Vite/build time)
  if (typeof import.meta !== 'undefined' && import.meta.env?.[key]) {
    return import.meta.env[key];
  }
  // Fallback a process.env (Node/SSR)
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key];
  }
  // Durante il build, usa placeholder
  return key === 'PUBLIC_SUPABASE_URL' 
    ? 'https://placeholder.supabase.co' 
    : 'placeholder-key';
}

const supabaseUrl = getEnvVar('PUBLIC_SUPABASE_URL');
const supabaseServiceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

// NON lanciare errori durante il build - controlla solo a runtime
const isBuildTime = supabaseUrl.includes('placeholder');

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    if (isBuildTime) {
      console.warn('⚠️ Using placeholder Supabase client during build');
    }
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabaseAdmin;
}

export async function verifyTokenWithSupabase(accessToken: string) {
  const client = getSupabaseAdmin();
  
  // Verifica a runtime se le credenziali sono valide
  if (isBuildTime) {
    throw new Error('⚠️ Supabase not configured - cannot verify token during build');
  }
  
  const { data, error } = await client.auth.getUser(accessToken);
  
  if (error || !data.user) {
    throw new Error('Token non valido');
  }
  
  return data.user;
}
