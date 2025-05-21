import { supabase } from '~/lib/db';

export const AuthService = {
  async checkEmailExists(email: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('email', email);

    return {
      data: data || [],
      error,
    };
  },

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },
};
