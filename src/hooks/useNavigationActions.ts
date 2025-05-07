import { $, type Signal } from '@builder.io/qwik';
import { type RouteNavigate } from '@builder.io/qwik-city';
import { FaGlobe } from '../assets/world';

// Define or import ButtonVariant
type ButtonVariant = 'primary' | 'icon' | 'secondary';

export const useNavigationActions = (navigate: RouteNavigate, isModalOpen: Signal<boolean>) => [
  {
    id: 'login',
    label: 'Login',
    onClick$: $(async () => {
      await navigate('/login/');
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
  /* ADD OTHER BUTTON ACTIONS HERE */
];
