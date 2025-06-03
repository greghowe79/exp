// import { component$, useSignal, useContext, useTask$, useOnDocument, $ } from '@builder.io/qwik';
// import { PopupContext, UserSessionContext } from '~/root';

// export const AutoLogout = component$(() => {
//   const userSession = useContext(UserSessionContext);
//   const popupContext = useContext(PopupContext);
//   const warningPopupShown = useSignal(false);
//   const timeoutId = useSignal<ReturnType<typeof setTimeout> | null>(null);

//   // Wrappiamo showWarning in $ per renderla serializzabile da Qwik
//   const showWarning = $(() => {
//     if (!warningPopupShown.value) {
//       popupContext.open('RESULT_POPUP', {
//         title: 'Attenzione!',
//         description: 'Sei inattivo da 30 secondi',
//         isSuccess: false,
//         primaryButtonLabel: 'Continuare la navigazione ?',
//       });
//       warningPopupShown.value = true;
//     }
//   });

//   useTask$(({ cleanup, track }) => {
//     track(() => userSession.isLoggedIn);

//     if (!userSession.isLoggedIn) {
//       if (timeoutId.value) {
//         clearTimeout(timeoutId.value);
//         timeoutId.value = null;
//       }
//       warningPopupShown.value = false;
//       return;
//     }

//     if (timeoutId.value) clearTimeout(timeoutId.value);
//     timeoutId.value = setTimeout(() => {
//       showWarning();
//     }, 30000);

//     cleanup(() => {
//       if (timeoutId.value) {
//         clearTimeout(timeoutId.value);
//       }
//     });
//   });

//   useOnDocument(
//     'mousemove',
//     $(() => {
//       if (userSession.isLoggedIn) {
//         if (timeoutId.value) {
//           clearTimeout(timeoutId.value);
//         }
//         warningPopupShown.value = false;
//         timeoutId.value = setTimeout(() => showWarning(), 30000);
//       }
//     })
//   );

//   useOnDocument(
//     'keydown',
//     $(() => {
//       if (userSession.isLoggedIn) {
//         if (timeoutId.value) {
//           clearTimeout(timeoutId.value);
//         }
//         warningPopupShown.value = false;
//         timeoutId.value = setTimeout(() => showWarning(), 30000);
//       }
//     })
//   );

//   return null;
// });

/* import { component$, useSignal, useContext, useTask$, useOnDocument, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { getLocale } from 'compiled-i18n';
import { PopupContext, UserSessionContext } from '~/root';
import { AuthService } from '~/services/auth.service';

export const AutoLogout = component$(() => {
  const userSession = useContext(UserSessionContext);
  const popupContext = useContext(PopupContext);
  const navigate = useNavigate();

  const warningPopupShown = useSignal(false);
  const timeoutId = useSignal<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimeoutId = useSignal<ReturnType<typeof setTimeout> | null>(null);

  const currentLocale = getLocale();

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

  const showWarning = $(() => {
    if (!warningPopupShown.value) {
      popupContext.open('RESULT_POPUP', {
        title: 'Attenzione!',
        description: 'Sei inattivo da 30 secondi',
        isSuccess: false,
        primaryButtonLabel: 'Continuare la navigazione?',
        onPrimaryAction: $(() => {
          // L'utente ha interagito: chiudi popup e reset timer
          popupContext.close();
          warningPopupShown.value = false;
          resetTimers();
        }),
      });
      warningPopupShown.value = true;

      // Avvia il timer per il logout automatico dopo 30s
      logoutTimeoutId.value = setTimeout(() => {
        logoutUser();
      }, 30000);
    }
  });

  const resetTimers = $(() => {
    if (timeoutId.value) clearTimeout(timeoutId.value);
    if (logoutTimeoutId.value) clearTimeout(logoutTimeoutId.value);

    timeoutId.value = setTimeout(() => {
      showWarning();
    }, 30000);
  });

  useTask$(({ cleanup, track }) => {
    track(() => userSession.isLoggedIn);

    if (!userSession.isLoggedIn) {
      clearTimeout(timeoutId.value!);
      clearTimeout(logoutTimeoutId.value!);
      warningPopupShown.value = false;
      return;
    }

    resetTimers();

    cleanup(() => {
      clearTimeout(timeoutId.value!);
      clearTimeout(logoutTimeoutId.value!);
    });
  });

  useOnDocument(
    'mousemove',
    $(() => {
      if (userSession.isLoggedIn) {
        resetTimers();
        warningPopupShown.value = false;
      }
    })
  );

  useOnDocument(
    'keydown',
    $(() => {
      if (userSession.isLoggedIn) {
        resetTimers();
        warningPopupShown.value = false;
      }
    })
  );

  return null;
});
 */

// import { $, component$, useContext, useSignal, useTask$, useOnDocument } from '@builder.io/qwik';
// import { useNavigate } from '@builder.io/qwik-city';
// import { getLocale } from 'compiled-i18n';
// import { PopupContext, UserSessionContext } from '~/root';
// import { AuthService } from '~/services/auth.service';

// export const AutoLogout = component$(() => {
//   const userSession = useContext(UserSessionContext);
//   const popupContext = useContext(PopupContext);
//   const warningPopupShown = useSignal(false);
//   const warningTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const logoutTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const navigate = useNavigate();
//   const currentLocale = getLocale();

//   const clearTimers = $(() => {
//     if (warningTimeout.value) {
//       clearTimeout(warningTimeout.value);
//       warningTimeout.value = null;
//     }
//     if (logoutTimeout.value) {
//       clearTimeout(logoutTimeout.value);
//       logoutTimeout.value = null;
//     }
//   });

//   const showWarning = $(() => {
//     if (!warningPopupShown.value) {
//       popupContext.open('RESULT_POPUP', {
//         title: 'Attenzione!',
//         description: 'Sei inattivo da 30 secondi',
//         isSuccess: false,
//         primaryButtonLabel: 'Continuare la navigazione ?',
//         onPrimaryAction: $(() => {
//           warningPopupShown.value = false;
//           clearTimers();
//           startInactivityTimers(); // riparte il conteggio
//           popupContext.close(); // chiude popup
//         }),
//       });
//       warningPopupShown.value = true;

//       // Imposta logout tra altri 30s
//       logoutTimeout.value = setTimeout(async () => {
//         try {
//           await popupContext.close();
//           await AuthService.signOut();
//           await navigate(`/${currentLocale}/`);
//         } catch (error) {
//           console.error('Logout failed:', error);
//         }
//       }, 30000); // altri 30s dopo il popup
//     }
//   });

//   const startInactivityTimers = $(() => {
//     clearTimers();

//     warningTimeout.value = setTimeout(() => {
//       showWarning();
//     }, 30000); // 30s: mostra warning
//   });

//   useTask$(({ track, cleanup }) => {
//     track(() => userSession.isLoggedIn);
//     console.log('AutoLogout task running, userSession.isLoggedIn:', userSession.isLoggedIn);
//     if (!userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       return;
//     }

//     startInactivityTimers();

//     cleanup(() => {
//       clearTimers();
//     });
//   });

//   const resetInactivity = $(() => {
//     if (userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       startInactivityTimers();
//     }
//   });

//   useOnDocument('mousemove', resetInactivity);
//   useOnDocument('keydown', resetInactivity);

//   return null;
// });

// import { $, component$, useContext, useSignal, useTask$, useOnDocument } from '@builder.io/qwik';
// import { useNavigate } from '@builder.io/qwik-city';
// import { getLocale } from 'compiled-i18n';
// import { PopupContext, UserSessionContext } from '~/root';
// import { AuthService } from '~/services/auth.service';

// export const AutoLogout = component$(() => {
//   const userSession = useContext(UserSessionContext);
//   const popupContext = useContext(PopupContext);
//   const warningPopupShown = useSignal(false);
//   const warningTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const logoutTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const navigate = useNavigate();
//   const currentLocale = getLocale();

//   const clearTimers = $(() => {
//     if (warningTimeout.value) {
//       clearTimeout(warningTimeout.value);
//       warningTimeout.value = null;
//     }
//     if (logoutTimeout.value) {
//       clearTimeout(logoutTimeout.value);
//       logoutTimeout.value = null;
//     }
//   });

//   const showWarning = $(() => {
//     if (!warningPopupShown.value) {
//       popupContext.open('RESULT_POPUP', {
//         title: 'Attenzione!',
//         description: 'Sei inattivo da 30 secondi',
//         isSuccess: false,
//         primaryButtonLabel: 'Continuare la navigazione ?',
//         onPrimaryAction: $(() => {
//           warningPopupShown.value = false;
//           clearTimers();
//           startInactivityTimers(); // riparte il conteggio
//           popupContext.close(); // chiude popup
//         }),
//       });
//       warningPopupShown.value = true;

//       // Imposta logout tra altri 30s
//       logoutTimeout.value = setTimeout(async () => {
//         try {
//           await popupContext.close();
//           await AuthService.signOut();
//           await navigate(`/${currentLocale}/`);
//         } catch (error) {
//           console.error('Logout failed:', error);
//         }
//       }, 30000); // altri 30s dopo il popup
//     }
//   });

//   const startInactivityTimers = $(() => {
//     clearTimers();

//     warningTimeout.value = setTimeout(() => {
//       showWarning();
//     }, 30000); // 30s: mostra warning
//   });

//   useTask$(({ track, cleanup }) => {
//     track(() => userSession.isLoggedIn);
//     console.log('AutoLogout task running, userSession.isLoggedIn:', userSession.isLoggedIn);
//     if (!userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       return;
//     }

//     startInactivityTimers();

//     cleanup(() => {
//       clearTimers();
//     });
//   });

//   const resetInactivity = $(() => {
//     if (userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       startInactivityTimers();
//     }
//   });

//   useOnDocument('mousemove', resetInactivity);
//   useOnDocument('keydown', resetInactivity);

//   return null;
// });

// import { $, component$, useContext, useSignal, useTask$, useOnDocument } from '@builder.io/qwik';
// import { useNavigate } from '@builder.io/qwik-city';
// import { getLocale } from 'compiled-i18n';
// import { PopupContext, UserSessionContext } from '~/root';
// import { AuthService } from '~/services/auth.service';

// export const AutoLogout = component$(() => {
//   const userSession = useContext(UserSessionContext);
//   const popupContext = useContext(PopupContext);
//   const warningPopupShown = useSignal(false);
//   const warningTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const logoutTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const navigate = useNavigate();
//   const currentLocale = getLocale();

//   const clearTimers = $(() => {
//     if (warningTimeout.value) {
//       clearTimeout(warningTimeout.value);
//       warningTimeout.value = null;
//     }
//     if (logoutTimeout.value) {
//       clearTimeout(logoutTimeout.value);
//       logoutTimeout.value = null;
//     }
//   });

//   const showWarning = $(() => {
//     if (!warningPopupShown.value) {
//       popupContext.open('RESULT_POPUP', {
//         title: 'Attenzione!',
//         description: 'Sei inattivo da 10 secondi',
//         isSuccess: false,
//         primaryButtonLabel: 'Continuare la navigazione?',
//         onPrimaryAction: $(() => {
//           warningPopupShown.value = false;
//           clearTimers();
//           startInactivityTimers();
//           popupContext.close();
//         }),
//       });
//       warningPopupShown.value = true;

//       // Imposta il logout dopo altri 30 secondi
//       logoutTimeout.value = setTimeout(async () => {
//         try {
//           await popupContext.close();
//           await AuthService.signOut();
//           await navigate(`/${currentLocale}/`);
//         } catch (error) {
//           console.error('Logout failed:', error);
//         }
//       }, 10000); // altri 15 secondi dopo il popup
//     }
//   });

//   const startInactivityTimers = $(() => {
//     clearTimers();

//     warningTimeout.value = setTimeout(() => {
//       showWarning();
//     }, 10000); // 15 secondi: mostra il warning
//   });

//   useTask$(({ track, cleanup }) => {
//     track(() => userSession.isLoggedIn);
//     console.log('AutoLogout task running, userSession.isLoggedIn:', userSession.isLoggedIn);
//     if (!userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       return;
//     }

//     startInactivityTimers();

//     cleanup(() => {
//       clearTimers();
//     });
//   });

//   const resetInactivity = $(() => {
//     if (userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       startInactivityTimers();
//     }
//   });

//   useOnDocument('mousemove', resetInactivity);
//   useOnDocument('keydown', resetInactivity);

//   return null;
// });

// import { $, component$, useContext, useSignal, useTask$, useOnDocument } from '@builder.io/qwik';
// import { useNavigate } from '@builder.io/qwik-city';
// import { getLocale } from 'compiled-i18n';
// import { PopupContext, UserSessionContext } from '~/root';
// import { AuthService } from '~/services/auth.service';

// export const AutoLogout = component$(() => {
//   const userSession = useContext(UserSessionContext);
//   const popupContext = useContext(PopupContext);
//   const warningPopupShown = useSignal(false);
//   const warningTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const logoutTimeout = useSignal<ReturnType<typeof setTimeout> | null>(null);
//   const navigate = useNavigate();
//   const currentLocale = getLocale();

//   const clearTimers = $(() => {
//     if (warningTimeout.value) {
//       clearTimeout(warningTimeout.value);
//       warningTimeout.value = null;
//     }
//     if (logoutTimeout.value) {
//       clearTimeout(logoutTimeout.value);
//       logoutTimeout.value = null;
//     }
//   });

//   const showWarning = $(() => {
//     if (!warningPopupShown.value) {
//       popupContext.open('RESULT_POPUP', {
//         title: 'Attenzione!',
//         description: 'Sei inattivo da 10 secondi',
//         isSuccess: false,
//         primaryButtonLabel: 'Continuare la navigazione?',
//         onPrimaryAction: $(() => {
//           warningPopupShown.value = false;
//           clearTimers();
//           startInactivityTimers();
//           popupContext.close();
//         }),
//       });
//       warningPopupShown.value = true;

//       logoutTimeout.value = setTimeout(async () => {
//         try {
//           await popupContext.close();
//           await AuthService.signOut();
//           await navigate(`/${currentLocale}/`);
//         } catch (error) {
//           console.error('Logout failed:', error);
//         }
//       }, 15000); // altri 15 secondi dopo il popup
//     }
//   });

//   const startInactivityTimers = $(() => {
//     clearTimers();
//     warningTimeout.value = setTimeout(() => {
//       showWarning();
//     }, 10000); // 10 secondi: mostra il warning
//   });

//   useTask$(({ track, cleanup }) => {
//     track(() => userSession.isLoggedIn);

//     if (userSession.isLoggedIn) {
//       startInactivityTimers();
//     } else {
//       clearTimers();
//       warningPopupShown.value = false;
//     }

//     cleanup(() => {
//       clearTimers();
//     });
//   });

//   const resetInactivity = $(() => {
//     if (userSession.isLoggedIn) {
//       clearTimers();
//       warningPopupShown.value = false;
//       startInactivityTimers();
//     }
//   });

//   useOnDocument('mousemove', resetInactivity);
//   useOnDocument('keydown', resetInactivity);

//   return null;
// });

// import { component$, useSignal, useOnDocument, useVisibleTask$, $, useContext } from '@builder.io/qwik';
// import { PopupContext } from '~/root';

// export const AutoLogout = component$(() => {
//   const popupContext = useContext(PopupContext);
//   const isInactive = useSignal(false);
//   const lastActivity = useSignal(Date.now());
//   const INACTIVITY_TIMEOUT = 5000; // 5 secondi

//   // Resetta il timer su attività
//   const resetActivity = $(() => {
//     lastActivity.value = Date.now();
//     isInactive.value = false;
//   });

//   // Eventi document-level
//   useOnDocument('mousemove', resetActivity);
//   useOnDocument('keydown', resetActivity);
//   useOnDocument('click', resetActivity);
//   useOnDocument('scroll', resetActivity);
//   useOnDocument('touchstart', resetActivity);

//   // Polling solo sul client
//   useVisibleTask$(({ cleanup }) => {
//     const interval = setInterval(() => {
//       const now = Date.now();
//       if (now - lastActivity.value > INACTIVITY_TIMEOUT) {
//         isInactive.value = true;

//         popupContext.open('RESULT_POPUP', {
//           title: 'Attenzione!',
//           description: 'Sei inattivo da 10 secondi',
//           isSuccess: false,
//           primaryButtonLabel: 'Continuare la navigazione?',
//           onPrimaryAction: $(() => {
//             isInactive.value = false;
//             lastActivity.value = Date.now();

//             resetActivity();
//           }),
//         });
//       }
//     }, 1000);

//     cleanup(() => clearInterval(interval));
//   });

//   return (
//     <div>
//       <h2>Auto Logout</h2>
//       <p>Stato: {isInactive.value ? '🛑 Inattivo (logout simulato)' : '✅ Attivo'}</p>
//     </div>
//   );
// });

// import { component$, useSignal, useOnDocument, useVisibleTask$, useContext, $ } from '@builder.io/qwik';

// import { PopupContext, UserSessionContext } from '~/root';

// export const AutoLogout = component$(() => {
//   const isInactive = useSignal(false);
//   const lastActivity = useSignal(Date.now());
//   const popupContext = useContext(PopupContext);
//   const userSession = useContext(UserSessionContext);

//   const INACTIVITY_TIMEOUT = 10000; // 10 secondi

//   const resetActivity = $(() => {
//     lastActivity.value = Date.now();
//     isInactive.value = false;
//   });

//   useOnDocument('mousemove', resetActivity);
//   useOnDocument('keydown', resetActivity);
//   useOnDocument('click', resetActivity);
//   useOnDocument('scroll', resetActivity);
//   useOnDocument('touchstart', resetActivity);

//   useVisibleTask$(({ cleanup }) => {
//     const interval = setInterval(() => {
//       if (!userSession.isLoggedIn) {
//         // Se non loggato, non faccio nulla e resetto
//         isInactive.value = false;
//         lastActivity.value = Date.now();
//         return;
//       }

//       const now = Date.now();
//       if (now - lastActivity.value > INACTIVITY_TIMEOUT && !isInactive.value) {
//         isInactive.value = true;

//         popupContext.open('RESULT_POPUP', {
//           title: 'Attenzione!',
//           description: 'Sei inattivo da 10 secondi',
//           isSuccess: false,
//           primaryButtonLabel: 'Continuare la navigazione?',
//           onPrimaryAction: $(() => {
//             isInactive.value = false;
//             lastActivity.value = Date.now();
//             resetActivity();
//             //popupContext.close();
//           }),
//         });
//       }
//     }, 1000);

//     cleanup(() => clearInterval(interval));
//   });

//   return (
//     <div>
//       <h2>Auto Logout</h2>
//       <p>Stato: {isInactive.value ? '🛑 Inattivo' : '✅ Attivo'}</p>
//     </div>
//   );
// });

// import { component$, useSignal, useOnDocument, useVisibleTask$, useContext, $ } from '@builder.io/qwik';

// import { PopupContext, UserSessionContext } from '~/root';

// import { useNavigate } from '@builder.io/qwik-city';
// import { AuthService } from '~/services/auth.service';
// import { getLocale } from 'compiled-i18n';

// export const AutoLogout = component$(() => {
//   const isInactive = useSignal(false);
//   const lastActivity = useSignal(Date.now());
//   const popupContext = useContext(PopupContext);
//   const userSession = useContext(UserSessionContext);
//   const navigate = useNavigate();
//   const currentLocale = getLocale();

//   const INACTIVITY_TIMEOUT = 10000; // 10 secondi
//   const LOGOUT_TIMEOUT = 20000; // 20 secondi

//   const logoutExecuted = useSignal(false);

//   const resetActivity = $(() => {
//     lastActivity.value = Date.now();
//     isInactive.value = false;
//     logoutExecuted.value = false;
//   });

//   // Funzione logout da eseguire
//   const logoutUser = $(async () => {
//     try {
//       await AuthService.signOut();
//       await navigate(`/${currentLocale}/`);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       userSession.isLoggedIn = false;
//       userSession.userId = '';
//       popupContext.close();
//     }
//   });

//   useOnDocument('mousemove', resetActivity);
//   useOnDocument('keydown', resetActivity);
//   useOnDocument('click', resetActivity);
//   useOnDocument('scroll', resetActivity);
//   useOnDocument('touchstart', resetActivity);

//   useVisibleTask$(({ cleanup }) => {
//     const interval = setInterval(() => {
//       if (!userSession.isLoggedIn) {
//         isInactive.value = false;
//         logoutExecuted.value = false;
//         lastActivity.value = Date.now();
//         return;
//       }

//       const now = Date.now();
//       const inactivityDuration = now - lastActivity.value;

//       if (inactivityDuration > LOGOUT_TIMEOUT && !logoutExecuted.value) {
//         logoutExecuted.value = true;
//         isInactive.value = false;
//         logoutUser(); // Esegui logout qui
//       } else if (inactivityDuration > INACTIVITY_TIMEOUT && !isInactive.value) {
//         isInactive.value = true;
//         popupContext.open('RESULT_POPUP', {
//           title: 'Attenzione!',
//           description: 'Sei inattivo da 10 secondi',
//           isSuccess: false,
//           primaryButtonLabel: 'Continuare la navigazione?',
//           onPrimaryAction: $(() => {
//             resetActivity();
//             //popupContext.close();
//           }),
//         });
//       }
//     }, 1000);

//     cleanup(() => clearInterval(interval));
//   });

//   return (
//     <div>
//       <h2>Auto Logout</h2>
//       <p>Stato: {isInactive.value ? '🛑 Inattivo' : '✅ Attivo'}</p>
//     </div>
//   );
// });

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

  const INACTIVITY_TIMEOUT = 10000; // 10 secondi
  const LOGOUT_TIMEOUT = 20000; // 20 secondi

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

  return (
    <div>
      <h2>Auto Logout</h2>
      <p>Stato: {isInactive.value ? '🛑 Inattivo' : '✅ Attivo'}</p>
    </div>
  );
});
