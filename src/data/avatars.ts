// import { _ } from 'compiled-i18n';
import manOneUrl from '../assets/images/man_one.png';
import manTwoUrl from '../assets/images/man_two.png';
import manThreeUrl from '../assets/images/man_three.png';
import womanOneUrl from '../assets/images/woman_one.png';
import womanTwoUrl from '../assets/images/woman_two.png';
import womanThreeUrl from '../assets/images/woman_three.png';

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

export const getListAvatars = (locale: string) => {
  const t = TRANSLATIONS[locale]?.translations || TRANSLATIONS.en_US.translations;
  return [
    // { label: _('name_avatar_one'), value: 'creative', url: manOneUrl },
    // { label: _('name_avatar_two'), value: 'understated', url: manTwoUrl },
    // { label: _('name_avatar_three'), value: 'meticulous', url: manThreeUrl },
    // { label: _('name_avatar_four'), value: 'thoughtful', url: womanOneUrl },
    // { label: _('name_avatar_five'), value: 'bubbly', url: womanTwoUrl },
    // { label: _('name_avatar_six'), value: 'brilliant', url: womanThreeUrl },
    { label: t.name_avatar_one, value: 'creative', url: manOneUrl },
    { label: t.name_avatar_two, value: 'understated', url: manTwoUrl },
    { label: t.name_avatar_three, value: 'meticulous', url: manThreeUrl },
    { label: t.name_avatar_four, value: 'thoughtful', url: womanOneUrl },
    { label: t.name_avatar_five, value: 'bubbly', url: womanTwoUrl },
    { label: t.name_avatar_six, value: 'brilliant', url: womanThreeUrl },
  ];
};
