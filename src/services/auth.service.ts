import { type Locale } from 'compiled-i18n';
import { supabase } from '~/lib/db';
import { _ } from 'compiled-i18n';

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

  async resetPassword(email: string, currentLocale: Locale) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:5173/${currentLocale}/${_('slug_update_password')}/`,
    });
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },
};
