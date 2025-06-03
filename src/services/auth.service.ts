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

    const apiResponse = await fetch('/api/login/', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.session.access_token}`,
      },
      credentials: 'include',
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to establish session');
    }
    return data;
  },

  async signOut() {
    const apiResponse = await fetch('/api/logout/', {
      method: 'POST',
      credentials: 'include', // per inviare i cookie
    });
    if (!apiResponse.ok) {
      throw new Error('Failed to logout');
    }
    await supabase.auth.signOut();
  },

  async resetPassword(email: string, currentLocale: Locale) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:5173/${currentLocale}/${_('slug_update_password')}/`,
    });
    if (error) throw error;
    return data;
  },

  async updatePassword(new_password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
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
