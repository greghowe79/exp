// import { createClient } from "@supabase/supabase-js";


// export const supabase = createClient<any>(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  
// );



// src/lib/db.ts
import { createClient } from "@supabase/supabase-js";

// Helper per ottenere env vars in modo sicuro con type safety
function getEnvVar(key: string, defaultValue: string = ''): string {
  // Prova import.meta.env (Vite/build time)
  if (typeof import.meta !== 'undefined' && import.meta.env?.[key]) {
    return String(import.meta.env[key]);
  }
  // Fallback a process.env (Node/SSR)
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return String(process.env[key]);
  }
  // Durante il build, usa placeholder o default
  if (defaultValue) {
    return defaultValue;
  }
  console.warn(`⚠️ ${key} not found, using placeholder`);
  return key === 'PUBLIC_SUPABASE_URL' 
    ? 'https://placeholder.supabase.co' 
    : 'placeholder-key';
}

const supabaseUrl: string = getEnvVar('PUBLIC_SUPABASE_URL');
const supabaseAnonKey: string = getEnvVar('PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient<any>(
  supabaseUrl,
  supabaseAnonKey
);
