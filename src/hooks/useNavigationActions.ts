import { $, useContext, type Signal } from '@builder.io/qwik';
import type { RouteNavigate } from '@builder.io/qwik-city';
//import { _ } from 'compiled-i18n';
import { FaGlobe } from '~/assets/world';
import { UserSessionContext } from '~/root';
import { AuthService } from '~/services/auth.service';

type ButtonVariant = 'primary' | 'icon' | 'secondary';

import itIT from '../../i18n/it_IT.json';
import enUS from '../../i18n/en_US.json';
import esES from '../../i18n/es_ES.json';
import frFR from '../../i18n/fr_FR.json';
import ptPT from '../../i18n/pt_PT.json';
import jaJP from '../../i18n/ja_JP.json';
import zhCN from '../../i18n/zh_CN.json';

const TRANSLATIONS: Record<string, any> = {
  it_IT: itIT,
  en_US: enUS,
  es_ES: esES,
  fr_FR: frFR,
  pt_PT: ptPT,
  ja_JP: jaJP,
  zh_CN: zhCN,
};

export const useNavigationActions = (navigate: RouteNavigate, isModalOpen: Signal<boolean>, currentLocale: string) => {
  const t = TRANSLATIONS[currentLocale]?.translations || TRANSLATIONS.en_US.translations;
  const userSession = useContext(UserSessionContext);

  if (userSession.isLoggedIn) {
    // return [
    //   {
    //     id: 'dashboard',
    //     label: _('navbar_dashboard'),
    //     onClick$: $(async () => {
    //       await navigate(`/${currentLocale}/${_('slug_dashboard')}/${userSession.userId}`);
    //     }),
    //     variant: 'primary' as ButtonVariant,
    //   },
    //   {
    //     id: 'logout',
    //     label: _('navbar_logout'),
    //     onClick$: $(async () => {
    //       try {
    //         await AuthService.signOut();
    //         await navigate(`/${currentLocale}/`);
    //       } catch (error) {
    //         console.error('Logout failed:', error);
    //       }
    //     }),
    //     variant: 'primary' as ButtonVariant,
    //   },
    // ];

    return [
      {
        id: 'dashboard',
        label: t.navbar_dashboard,
        onClick$: $(async () => {
          await navigate(`/${currentLocale}/${t.slug_dashboard}/${userSession.userId}`);
        }),
        variant: 'primary' as ButtonVariant,
      },
      {
        id: 'logout',
        label: t.navbar_logout,
        onClick$: $(async () => {
          try {
            await AuthService.signOut();
            await navigate(`/${currentLocale}/`);
          } catch (error) {
            console.error('Logout failed:', error);
          }
        }),
        variant: 'primary' as ButtonVariant,
      },
    ];
  }
  // return [
  //   {
  //     id: 'login',
  //     label: _('navbar_login'),
  //     onClick$: $(async () => {
  //       await navigate(`/${currentLocale}/${_('slug_login')}/`);
  //     }),
  //     variant: 'primary' as ButtonVariant,
  //   },
  //   {
  //     id: 'signup',
  //     label: _('navbar_signup'),
  //     onClick$: $(async () => {
  //       await navigate(`/${currentLocale}/${_('slug_signup')}/`);
  //     }),
  //     variant: 'primary' as ButtonVariant,
  //   },
  //   {
  //     id: 'language',
  //     onClick$: $(() => (isModalOpen.value = !isModalOpen.value)),
  //     icon: FaGlobe,
  //     variant: 'icon' as ButtonVariant,
  //     ariaLabel: 'Language',
  //   },
  // ];

  return [
    {
      id: 'login',
      label: t.navbar_login,
      onClick$: $(async () => {
        await navigate(`/${currentLocale}/${t.slug_login}/`);
      }),
      variant: 'primary' as ButtonVariant,
    },
    {
      id: 'signup',
      label: t.navbar_signup,
      onClick$: $(async () => {
        await navigate(`/${currentLocale}/${t.slug_signup}/`);
      }),
      variant: 'primary' as ButtonVariant,
    },
    {
      id: 'language',
      onClick$: $(() => (isModalOpen.value = !isModalOpen.value)),
      icon: FaGlobe,
      variant: 'icon' as ButtonVariant,
      ariaLabel: 'Language',
    },
  ];
};
