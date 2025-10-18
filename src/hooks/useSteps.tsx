import { component$ } from '@builder.io/qwik';
import type { RouteLocation } from '@builder.io/qwik-city';
// import { _, setDefaultLocale } from 'compiled-i18n';
import { setDefaultLocale } from 'compiled-i18n';
import { Register } from '~/assets/register';
import { Rocket } from '~/assets/rocket';
//import { SearchIcon } from '~/assets/search';

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

const IconWrapper = component$<{ icon: any }>(({ icon: Icon }) => {
  return <Icon />;
});

export const useSteps = (location: RouteLocation) => {
  const t = TRANSLATIONS[location.params.locale]?.translations || TRANSLATIONS.en_US.translations;
  //setLocaleGetter(() => location.params.locale);
  if (process.env.NODE_ENV === 'development') {
    setDefaultLocale(location.params.locale || 'en_US');
  }
  return [
    // {
    //   id: 'step-2',
    //   icon: <IconWrapper icon={Register} />,
    //   title: _('step_register'),
    //   description: _('step_register_description'),
    // },
    // {
    //   id: 'step-3',
    //   icon: <IconWrapper icon={Rocket} />,
    //   title: _('step_page_title'),
    //   description: _('step_page_description'),
    // },

    {
      id: 'step-2',
      icon: <IconWrapper icon={Register} />,
      title: t.step_register,
      description: t.step_register_description,
    },
    {
      id: 'step-3',
      icon: <IconWrapper icon={Rocket} />,
      title: t.step_page_title,
      description: t.step_page_description,
    },
  ];
};
