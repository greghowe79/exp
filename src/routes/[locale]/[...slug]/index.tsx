import { component$ } from '@builder.io/qwik';
import { type DocumentHead, type RequestEvent, useLocation } from '@builder.io/qwik-city';
import { About } from '~/components/about/About';
import { Services } from '~/components/services/Services';
import { Contact } from '~/components/contact/Contact';
import { resolvePageKey } from '~/lib/pageMap';
import { Login } from '~/components/login/Login';
import { SignUp } from '~/components/signup/SignUp';
import Dashboard from '~/components/dashboard/Dashboard';

import Preview from '~/components/preview/Preview';
import { ResetPassword } from '~/components/reset-password/ResetPassword';
import { UpdatePassword } from '~/components/update-password/UpdatePassword';
import { Website } from '~/components/website/Website';
import { verifyTokenWithSupabase } from '~/lib/auth-utils';
import { _ } from 'compiled-i18n';
import { Pricing } from '~/components/pricing/Pricing';
import { Success } from '~/components/success/Success';
import Search from '~/components/search/Search';

import itIT from '../../../../i18n/it_IT.json';
import enUS from '../../../../i18n/en_US.json';
import esES from '../../../../i18n/es_ES.json';
import frFR from '../../../../i18n/fr_FR.json';
import ptPT from '../../../../i18n/pt_PT.json';
import jaJP from '../../../../i18n/ja_JP.json';
import zhCN from '../../../../i18n/zh_CN.json';

const TRANSLATIONS: Record<string, any> = {
  it_IT: itIT,
  en_US: enUS,
  es_ES: esES,
  fr_FR: frFR,
  pt_PT: ptPT,
  ja_JP: jaJP,
  zh_CN: zhCN,
};

export const onGet = async ({ cookie, redirect, params, locale }: RequestEvent) => {
  const currentLocale = params.locale || 'it_IT';
  const slugParam = params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];

  //setLocaleGetter(() => locale);
  locale(currentLocale);

  // if (slug.startsWith('.well-known')) {
  //   return;
  // }

  if (slug.startsWith('node_modules') || slug.startsWith('.well-known')) {
    return;
  }

  console.log('CURRENT-LOCALE:', currentLocale, 'SLUG DENTRO ONGET:', slug);

  if (slug === _('slug_dashboard') || slug === _('slug_preview') || slug === _('slug_success')) {
    const token = cookie.get('server-access-token')?.value;

    if (!token) {
      throw redirect(302, `/${currentLocale}/${_('slug_login')}/`);
    }

    try {
      const user = await verifyTokenWithSupabase(token);
      if (!user.id) {
        throw redirect(302, `/${currentLocale}/${_('slug_login')}/`);
      }
    } catch {
      throw redirect(302, `/${currentLocale}/${_('slug_login')}/`);
    }
  }
};

export default component$(() => {
  const loc = useLocation();
  const lang = loc.params.locale;
  const slugParam = loc.params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];

  if (slug.startsWith('node_modules') || slug.startsWith('.well-known')) {
    return;
  }

  const pageKey = resolvePageKey(slug, lang);
  //pageKey = inglese, slug = è nella lingua selezionata, locale = formato en_US
  console.log('Rendering pageKey:', pageKey, 'for slug:', slug, 'and locale:', lang);
  const t = TRANSLATIONS[lang]?.translations || TRANSLATIONS.en_US.translations;
  switch (pageKey) {
    case 'about':
      return <About />;
    case 'services':
      return <Services t={t} />;
    case 'contact':
      return <Contact />;
    case 'pricing':
      return <Pricing t={t} />;
    case 'login':
      return <Login t={t} />;
    case 'signup':
      return <SignUp t={t} />;
    case 'dashboard':
      return <Dashboard t={t} />;
    case 'preview':
      return <Preview />;
    case `reset`:
      return <ResetPassword />;
    case `update`:
      return <UpdatePassword />;
    case `website`:
      return <Website />;
    case `success`:
      return <Success t={t} />;
    case 'search':
      return <Search t={t} />;
    default:
      return <h1>404 - Page Not Found</h1>;
  }
});

export const head: DocumentHead = ({ params }) => {
  const t = TRANSLATIONS[params.locale]?.translations || TRANSLATIONS.en_US.translations;
  const slugParam = params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];

  const pageKey = resolvePageKey(slug, params.locale);
  const key = typeof pageKey === 'string' ? pageKey : '';

  // const titles: Record<string, string> = {
  //   about: _('page_about'),
  //   services: _('page_services'),
  //   contact: _('page_contact'),
  //   login: _('page_login'),
  //   signup: _('page_signup'),
  //   dashboard: _('page_dashboard'),
  //   preview: _('page_preview'),
  //   reset: _('page_reset'),
  //   update: _('page_update'),
  //   pricing: _('page_pricing'),
  //   success: _('page_success'),
  //   search: _('page_search'),
  //   //website: _('page_website'),
  // };

  const titles: Record<string, string> = {
    about: t.page_about,
    services: t.page_services,
    contact: t.page_contact,
    login: t.page_login,
    signup: t.page_signup,
    dashboard: t.page_dashboard,
    preview: t.page_preview,
    reset: t.page_reset,
    update: t.page_update,
    pricing: t.page_pricing,
    success: t.page_success,
    search: t.page_search,
    //website: t.page_website,
  };

  // const descriptions: Record<string, string> = {
  //   about: _('desc_about'),
  //   services: _('desc_services'),
  //   contact: _('desc_contact'),
  //   login: _('desc_login'),
  //   signup: _('desc_signup'),
  //   dashboard: _('desc_dashboard'),
  //   preview: _('desc_preview'),
  //   reset: _('desc_reset'),
  //   update: _('desc_update'),
  //   pricing: _('desc_pricing'),
  //   success: _('desc_success'),
  //   search: _('desc_search'),
  //   //website: _('desc_website'),
  // };

  const descriptions: Record<string, string> = {
    about: t.desc_about,
    services: t.desc_services,
    contact: t.desc_contact,
    login: t.desc_login,
    signup: t.desc_signup,
    dashboard: t.desc_dashboard,
    preview: t.desc_preview,
    reset: t.desc_reset,
    update: t.desc_update,
    pricing: t.desc_pricing,
    success: t.desc_success,
    search: t.desc_search,
    //website: t.desc_website,
  };

  return {
    title: titles[key] || 'Pagina',
    meta: [
      {
        name: 'description',
        content: descriptions[key] || 'Pagina del sito.',
      },
    ],
  };
};
