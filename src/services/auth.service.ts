import { type Locale } from 'compiled-i18n';
import { supabase } from '~/lib/db';
import { _ } from 'compiled-i18n';
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

  async resetPassword(email: string, currentLocale: Locale) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: `http://localhost:5173/${currentLocale}/${_('slug_update_password')}/`,

      redirectTo: `${PUBLIC_BASE_URL}/${currentLocale}/${_('slug_update_password')}/`,
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

  // async uploadImageProfileToTheStorage(userSession: UserSess, currentFile: Signal<any>, imgUrl: Signal<string>, CDNURL: string) {
  //   if (!currentFile.value) {
  //     console.error('Nessun file da caricare!');
  //     return;
  //   }
  //   if (!userSession.userId) {
  //     console.error('User ID mancante!');
  //     return;
  //   }
  //   console.log('PRIMA', currentFile.value);
  //   const { data, error } = await supabase.storage.from('professionals').upload(userSession.userId + '/' + uuidv4(), currentFile.value);
  //   console.log('DOPO', currentFile.value);
  //   if (data) {
  //     imgUrl.value = CDNURL + data.path;
  //   } else {
  //     console.log(error);
  //   }
  // },

  // async uploadImageProfileToTheStorage(
  //   userSession: UserSess,
  //   currentFile: Signal<any>,
  //   imgUrl: Signal<string>,
  //   CDNURL: string,
  //   type: 'profile' | 'avatar' // nuovo parametro
  // ) {
  //   if (!currentFile.value) {
  //     console.error('Nessun file da caricare!');
  //     return;
  //   }
  //   if (!userSession.userId) {
  //     console.error('User ID mancante!');
  //     return;
  //   }

  //   console.log('PRIMA', currentFile.value);

  //   const ext = currentFile.value.name.split('.').pop(); // mantiene l’estensione
  //   const filePath = `${userSession.userId}/${type}.${ext}`;

  //   const { data, error } = await supabase.storage.from('professionals').upload(filePath, currentFile.value, {
  //     upsert: true, // sovrascrive il file esistente
  //   });

  //   console.log('DOPO', currentFile.value);

  //   if (data) {
  //     imgUrl.value = CDNURL + data.path; // aggiorna il signal
  //   } else {
  //     console.log(error);
  //   }
  // },

  // async uploadImageProfileToTheStorage(
  //   userSession: UserSess,
  //   currentFile: Signal<any>,
  //   imgUrl: Signal<string>,
  //   CDNURL: string,
  //   type: 'profile' | 'avatar'
  // ) {
  //   if (!currentFile.value) {
  //     console.error('Nessun file da caricare!');
  //     return;
  //   }
  //   if (!userSession.userId) {
  //     console.error('User ID mancante!');
  //     return;
  //   }

  //   let fileToUpload: File | null = null;

  //   // estrai il File reale
  //   if (currentFile.value) {
  //     if ('_serialized' in currentFile.value) {
  //       fileToUpload = currentFile.value.value as File;
  //     } else {
  //       fileToUpload = currentFile.value as File;
  //     }
  //   }

  //   if (!fileToUpload) {
  //     console.error('Nessun file valido da caricare!');
  //     return;
  //   }

  //   console.log('PRIMA', fileToUpload);

  //   const ext = fileToUpload.name.split('.').pop() || 'jpg';
  //   const filePath = `${userSession.userId}/${type}.${ext}`;

  //   const { data, error } = await supabase.storage.from('professionals').upload(filePath, fileToUpload, {
  //     upsert: true,
  //   });

  //   console.log('DOPO', fileToUpload);

  //   if (data) {
  //     imgUrl.value = CDNURL + filePath;
  //   } else {
  //     console.log(error);
  //   }
  // },

  // async uploadImageProfileToTheStorage(
  //   userSession: UserSess,
  //   currentFile: Signal<any>, // può essere File o NoSerialize<File>
  //   imgUrl: Signal<string>,
  //   CDNURL: string,
  //   type: 'profile' | 'avatar'
  // ) {
  //   // Controllo userId
  //   if (!userSession.userId) {
  //     console.error('User ID mancante!');
  //     return;
  //   }

  //   // Estrai il File reale
  //   let fileToUpload: File | null = null;
  //   if (currentFile.value) {
  //     if ('_serialized' in currentFile.value) {
  //       fileToUpload = currentFile.value.value as File; // NoSerialize<File>
  //     } else {
  //       fileToUpload = currentFile.value as File;
  //     }
  //   }

  //   // Se non c'è file, esci senza log
  //   if (!fileToUpload) return;

  //   console.log('PRIMA', fileToUpload);

  //   // Mantieni estensione originale
  //   const ext = fileToUpload.name.split('.').pop() || 'jpg';
  //   const filePath = `${userSession.userId}/${type}.${ext}`;

  //   try {
  //     const { data, error } = await supabase.storage.from('professionals').upload(filePath, fileToUpload, { upsert: true }); // Sovrascrive se già presente

  //     console.log('DOPO', fileToUpload);

  //     if (error) {
  //       console.error('Errore upload:', error);
  //       return;
  //     }

  //     if (data) {
  //       // Aggiorna il Signal con l’URL finale
  //       imgUrl.value = `${CDNURL}${filePath}`;
  //     }
  //   } catch (err) {
  //     console.error('Errore upload:', err);
  //   }
  // },

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

    console.log('SONO FUORI DA INSERT USER');
    //getProducts(productsTable);
  },
};
