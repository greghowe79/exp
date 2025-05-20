// import { supabase } from '~/lib/db';

// export const AuthService = {
//   async signUp(email: string, password: string) {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       throw error;
//     }

//     return data;
//   },
// };
// ~/services/auth.service.ts
import { supabase } from '~/lib/db';

export const AuthService = {
  async checkEmailExists(email: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('email', email);

    return {
      data: data || [], // Se `data` è null, usa array vuoto (senza `??` superfluo)
      error,
    };
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },
};
