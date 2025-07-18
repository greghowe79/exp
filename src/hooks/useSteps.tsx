import { component$ } from '@builder.io/qwik';
import type { RouteLocation } from '@builder.io/qwik-city';
import { _, setLocaleGetter } from 'compiled-i18n';
import { Register } from '~/assets/register';
import { Rocket } from '~/assets/rocket';
//import { Search } from '~/assets/search';

const IconWrapper = component$<{ icon: any }>(({ icon: Icon }) => {
  return <Icon />;
});

export const useSteps = (location: RouteLocation) => {
  setLocaleGetter(() => location.params.locale);
  return [
    // {
    //   id: 'step-1',
    //   icon: <IconWrapper icon={Search} />,
    //   title: _('step_search'),
    //   description: _('step_search_description'),
    // },
    {
      id: 'step-2',
      icon: <IconWrapper icon={Register} />,
      title: _('step_register'),
      description: _('step_register_description'),
    },
    {
      id: 'step-3',
      icon: <IconWrapper icon={Rocket} />,
      title: _('step_page_title'),
      description: _('step_page_description'),
    },
  ];
};
