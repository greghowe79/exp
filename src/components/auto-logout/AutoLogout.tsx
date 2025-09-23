import { component$, useSignal, useOnDocument, useVisibleTask$, useContext, $ } from '@builder.io/qwik';

import { PopupContext, UserSessionContext } from '~/root';

import { useNavigate } from '@builder.io/qwik-city';
import { AuthService } from '~/services/auth.service';
import { getLocale } from 'compiled-i18n';

export const AutoLogout = component$(() => {
  const isInactive = useSignal(false);
  const lastActivity = useSignal(Date.now());
  const popupContext = useContext(PopupContext);
  const userSession = useContext(UserSessionContext);
  const navigate = useNavigate();
  const currentLocale = getLocale();

  const INACTIVITY_TIMEOUT = 300000; // 5 minuti
  const LOGOUT_TIMEOUT = 600000; // 10 minuti

  const logoutExecuted = useSignal(false);

  // Reset solo il timer e logoutExecuted, non cambia isInactive
  const resetActivity = $(() => {
    lastActivity.value = Date.now();
    logoutExecuted.value = false;
  });

  // Funzione logout da eseguire
  const logoutUser = $(async () => {
    try {
      await AuthService.signOut();
      await navigate(`/${currentLocale}/`);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      userSession.isLoggedIn = false;
      userSession.userId = '';
      popupContext.close();
    }
  });

  useOnDocument('mousemove', resetActivity);
  useOnDocument('keydown', resetActivity);
  useOnDocument('click', resetActivity);
  useOnDocument('scroll', resetActivity);
  useOnDocument('touchstart', resetActivity);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (!userSession.isLoggedIn) {
        isInactive.value = false;
        logoutExecuted.value = false;
        lastActivity.value = Date.now();
        return;
      }

      const now = Date.now();
      const inactivityDuration = now - lastActivity.value;

      if (inactivityDuration > LOGOUT_TIMEOUT && !logoutExecuted.value) {
        logoutExecuted.value = true;
        isInactive.value = false; // logout = non più inattivo
        logoutUser();
      } else if (inactivityDuration > INACTIVITY_TIMEOUT && !isInactive.value) {
        isInactive.value = true;
        popupContext.open('RESULT_POPUP', {
          title: 'Attenzione!',
          description: 'Sei inattivo da 10 secondi',
          isSuccess: false,
          primaryButtonLabel: 'Continuare la navigazione?',
          onPrimaryAction: $(() => {
            isInactive.value = false; // Solo qui diventa attivo
            resetActivity();
          }),
        });
      }
    }, 1000);

    cleanup(() => clearInterval(interval));
  });

  return null;
});
