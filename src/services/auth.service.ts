import { type Locale } from 'compiled-i18n';
import { supabase } from '~/lib/db';
// import { _ } from 'compiled-i18n';
import type { UserProfile, UserSess } from '~/root';
import type { Signal } from '@builder.io/qwik';
//import { v4 as uuidv4 } from 'uuid';

const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL || 'http://localhost:5173';

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
    await supabase.auth.signOut();
    const apiResponse = await fetch('/api/logout/', {
      method: 'POST',
      credentials: 'include', // per inviare i cookie
    });
    if (!apiResponse.ok) {
      throw new Error('Failed to logout');
    }
  },

  async resetPassword(email: string, currentLocale: Locale, t: Record<string, string>) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: `http://localhost:5173/${currentLocale}/${_('slug_update_password')}/`,

      // redirectTo: `${PUBLIC_BASE_URL}/${currentLocale}/${_('slug_update_password')}/`,
      redirectTo: `${PUBLIC_BASE_URL}/${currentLocale}/${t.slug_update_password}/`,
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

  async uploadImageProfileToTheStorage(
    userSession: UserSess,
    currentFile: Signal<any>,
    imgUrl: Signal<string>,
    CDNURL: string,
    type: 'profile' | 'avatar'
  ) {
    if (!userSession.userId) return;

    let fileToUpload: File | null = null;
    if (currentFile.value) {
      if ('_serialized' in currentFile.value) fileToUpload = currentFile.value.value as File;
      else fileToUpload = currentFile.value as File;
    }

    if (!fileToUpload) return;

    // Rimuovi eventuale file precedente
    try {
      await supabase.storage.from('professionals').remove([`${userSession.userId}/${type}`]);
    } catch (err) {
      // ignora se il file non esiste
    }

    const filePath = `${userSession.userId}/${type}`;

    const { error } = await supabase.storage.from('professionals').upload(filePath, fileToUpload, { upsert: true });

    if (error) {
      console.error('Errore upload:', error);
      return;
    }

    //imgUrl.value = `${CDNURL}${filePath}`;
    imgUrl.value = `${CDNURL}${filePath}?v=${Date.now()}`;
  },

  async insertUser(userProfile: UserProfile) {
    const { error: insertUserError } = await supabase.from('professionals').insert(userProfile);
    if (insertUserError) {
      console.error(insertUserError);
    }
  },
};
