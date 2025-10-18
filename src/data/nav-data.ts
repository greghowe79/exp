// import { _ } from 'compiled-i18n';

// export const getListItems = (locale: string) => {
//   return [
//     { label: _('navbar_search'), href: `/${locale}/${_('slug_search')}/` },
//     { label: _('navbar_services'), href: `/${locale}/${_('slug_services')}/` },
//     { label: _('navbar_contact'), href: `/${locale}/${_('slug_contact')}/` },
//     { label: _('navbar_pricing'), href: `/${locale}/${_('slug_pricing')}/` },
//   ];
// };

// import { _ } from 'compiled-i18n';
// // Definisci i tipi delle locales
// type Locale = 'it_IT' | 'en_US' | 'es_ES' | 'fr_FR' | 'pt_PT' | 'ja_JP' | 'zh_CN';
// // Mappa statica degli slug per locale
// const SLUGS: Record<Locale, Record<string, string>> = {
//   it_IT: {
//     search: 'ricerca',
//     services: 'servizi',
//     contact: 'contatti',
//     pricing: 'prezzi',
//   },
//   en_US: {
//     search: 'search',
//     services: 'services',
//     contact: 'contact',
//     pricing: 'pricing',
//   },
//   es_ES: {
//     search: 'busqueda',
//     services: 'servicios',
//     contact: 'contacto',
//     pricing: 'precios',
//   },
//   fr_FR: {
//     search: 'recherche',
//     services: 'services',
//     contact: 'contact',
//     pricing: 'prix',
//   },
//   pt_PT: {
//     search: 'pesquisa',
//     services: 'servicos',
//     contact: 'contacto',
//     pricing: 'preços',
//   },
//   ja_JP: {
//     search: 'search',
//     services: 'サービス',
//     contact: 'お問い合わせ',
//     pricing: '価格設定',
//   },
//   zh_CN: {
//     search: 'search',
//     services: '服务',
//     contact: '联系',
//     pricing: '定价',
//   },
// };

// const isValidLocale = (locale: string): locale is Locale => {
//   return locale in SLUGS;
// };
// export const getListItems = (locale: string) => {
//   const slugs = isValidLocale(locale) ? SLUGS[locale] : SLUGS.it_IT;

//   return [
//     {
//       label: _('navbar_search'), // ✅ Le label vanno bene con _()
//       href: `/${locale}/${slugs.search}/`, // ✅ Usa la mappa statica per gli slug
//     },
//     {
//       label: _('navbar_services'),
//       href: `/${locale}/${slugs.services}/`,
//     },
//     {
//       label: _('navbar_contact'),
//       href: `/${locale}/${slugs.contact}/`,
//     },
//     {
//       label: _('navbar_pricing'),
//       href: `/${locale}/${slugs.pricing}/`,
//     },
//   ];
// };

// src/data/nav-data.ts
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

export const getListItems = (locale: string) => {
  const t = TRANSLATIONS[locale]?.translations || TRANSLATIONS.en_US.translations;

  return [
    {
      label: t.navbar_search, // 👈 Direttamente dal JSON
      href: `/${locale}/${t.slug_search}/`,
    },
    {
      label: t.navbar_services,
      href: `/${locale}/${t.slug_services}/`,
    },
    {
      label: t.navbar_contact,
      href: `/${locale}/${t.slug_contact}/`,
    },
    {
      label: t.navbar_pricing,
      href: `/${locale}/${t.slug_pricing}/`,
    },
  ];
};
