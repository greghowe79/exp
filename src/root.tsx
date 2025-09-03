import {
  $,
  component$,
  createContextId,
  type QRL,
  type Signal,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { isDev } from '@builder.io/qwik';

import './global.css';
import { supabase } from './lib/db';

export interface UserProfile {
  id: string;
  img_url: string;
  avatar_img_url: string;
  first_name: string;
  last_name: string;
  job_title: string;
  description: string;
  email: string;
  telephone: string;
  service_title: string;
  service_description: string;
  service_primary_name: string;
  service_secondary_name: string;
  service_tertiary_name: string;
  service_primary_percent: string;
  service_secondary_percent: string;
  service_tertiary_percent: string;
  bg_color: string;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  github?: string | null;
  website?: string | null;
  position: string;
  created_at: string;
}

export interface PopupData {
  title: string;
  description: string;
  isSuccess: boolean;
  redirectAfterClose?: string;
  primaryButtonLabel?: string;
  onPrimaryAction?: QRL<() => void>;
}

export interface PopupProps {
  id: string;
  data: PopupData;
}

export interface PopupContextState {
  popup: PopupProps | null;
  open: QRL<(id: string, data: PopupData) => void>;
  close: QRL<(redirectUrl?: string) => Promise<string | undefined>>;
}

export type UserSess = {
  userId: string | null;
  email: string | undefined;
  isLoggedIn: boolean;
  hasAccess: boolean;
  stripe_seller: any;
  charges_enabled: boolean;
  seller_info: any;
  plan: 'free' | 'premium' | 'pro'; // Aggiungi altri piani se necessario
  username?: string; // Aggiungi username se necessario
};

export const PopupContext = createContextId<PopupContextState>('popup-context');
export const FormContext = createContextId<Signal<boolean>>('form-context');
export const UserSessionContext = createContextId<UserSess>('user-session');
export const SessionLoadingContext = createContextId<Signal<boolean>>('loading-session');
export const ImagesContext = createContextId<Signal<any>>('images-context');

export default component$(() => {
  const isFormVisible = useSignal(false);
  const userSession = useStore<UserSess>({
    userId: '',
    email: '',
    isLoggedIn: false,
    hasAccess: false,
    stripe_seller: {},
    charges_enabled: false,
    seller_info: {},
    plan: 'free',
    username: undefined,
  });
  const isSessionLoading = useSignal(true);
  const images: Signal<any> = useSignal([]);

  //const userStore = useStore(userSession);
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  const state = useStore<PopupContextState>({
    popup: null,
    open: undefined as any,
    close: undefined as any,
  });

  useTask$(() => {
    state.open = $((id: string, data: PopupData) => {
      state.popup = { id, data };
    });

    state.close = $(() => {
      const redirectUrl = state.popup?.data.redirectAfterClose;
      state.popup = null;
      return Promise.resolve(redirectUrl);
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token && session.refresh_token) {
      const { data: user } = await supabase.from('profiles').select().eq('id', session.user.id).single();
      const apiResponse = await fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: 'include',
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to establish session');
      }
      console.log('Sessione trovata al refresh:', session.user);
      userSession.userId = session.user.id;
      userSession.isLoggedIn = true;
      userSession.hasAccess = user.has_access;
      userSession.email = session.user.email;

      isSessionLoading.value = false;
    } else {
      console.log('Nessuna sessione attiva');
      userSession.isLoggedIn = false;
      isSessionLoading.value = false;
    }

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('MANNAIA');
      // let user = null;
      // if (session?.user.id) {
      //   const { data } = await supabase.from('profiles').select().eq('id', session.user.id).single();
      //   user = data;
      //   console.log('data', data);
      // }
      if (event === 'PASSWORD_RECOVERY') {
        isFormVisible.value = true;
      } else if (event === 'SIGNED_IN' && session?.access_token && session.refresh_token) {
        console.log('SIGNED IN');
        // console.log('session', session);
        userSession.userId = session.user.id;
        userSession.isLoggedIn = true;
        // userSession.hasAccess = user.has_access;
        userSession.email = session.user.email;
        isSessionLoading.value = false;
      } else if (event === 'SIGNED_OUT') {
        console.log('SIGNED OUT');
        userSession.isLoggedIn = false;
        userSession.userId = '';
      } else if (event === 'INITIAL_SESSION' && session?.access_token && session.refresh_token) {
        console.log('DIO IMPALATO');
        userSession.userId = session.user.id;

        //userSession.isLoggedIn = false;
        userSession.isLoggedIn = true;
        userSession.email = session.user.email;
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  useContextProvider(PopupContext, state);
  useContextProvider(FormContext, isFormVisible);
  useContextProvider(UserSessionContext, userSession);
  useContextProvider(SessionLoadingContext, isSessionLoading);
  useContextProvider(ImagesContext, images);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
