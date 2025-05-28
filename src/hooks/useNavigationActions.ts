import { $, useContext, type Signal } from '@builder.io/qwik';
import type { RouteNavigate } from '@builder.io/qwik-city';
import { _ } from 'compiled-i18n';
import { FaGlobe } from '~/assets/world';
import { supabase } from '~/lib/db';
import { UserSessionContext } from '~/root';

type ButtonVariant = 'primary' | 'icon' | 'secondary';

export const useNavigationActions = (navigate: RouteNavigate, isModalOpen: Signal<boolean>, currentLocale: string) => {
  const userSession = useContext(UserSessionContext);
  if (userSession.isLoggedIn) {
    return [
      {
        id: 'login',
        label: _('navbar_logout'),
        onClick$: $(async () => {
          await supabase.auth.signOut();
          await navigate(`/${currentLocale}/`);
        }),
        variant: 'primary' as ButtonVariant,
      },
    ];
  }
  return [
    {
      id: 'login',
      label: _('navbar_login'),
      onClick$: $(async () => {
        await navigate(`/${currentLocale}/${_('slug_login')}/`);
      }),
      variant: 'primary' as ButtonVariant,
    },
    {
      id: 'signup',
      label: _('navbar_signup'),
      onClick$: $(async () => {
        await navigate(`/${currentLocale}/${_('slug_signup')}/`);
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
