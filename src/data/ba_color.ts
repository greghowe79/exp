// import { _ } from 'compiled-i18n';

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

export const getListColor = (locale: string) => {
  const t = TRANSLATIONS[locale]?.translations || TRANSLATIONS.en_US.translations;
  return [
    // { label: _('color_preview_first'), value: 'rgb(191, 3, 31)' },
    // { label: _('color_preview_second'), value: 'rgb(120, 120, 120)' },
    // { label: _('color_preview_third'), value: 'rgb(0 149 174)' },
    { label: t.color_preview_first, value: 'rgb(191, 3, 31)' },
    { label: t.color_preview_second, value: 'rgb(120, 120, 120)' },
    { label: t.color_preview_third, value: 'rgb(0 149 174)' },
  ];
};
