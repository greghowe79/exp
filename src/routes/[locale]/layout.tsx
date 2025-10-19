import { component$, Slot, useContext, useSignal } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { NavigationMenu, Modal } from '@greghowe79/the-lib';
import { Logo } from '~/components/logo/logo';
import { useNavigationActions } from '~/hooks/useNavigationActions';
import { getListItems } from '~/data/nav-data';
import { languages } from '~/data/language-selector-data';
import LanguageSelector from '~/components/language-selector/languageSelector';
// import { guessLocale, locales, getLocale, _ } from 'compiled-i18n';
import { guessLocale, locales, getLocale } from 'compiled-i18n';
import { PopupDisplay } from '~/components/popup/Popup';
import { SessionLoadingContext } from '~/root';
// import { AutoLogout } from '~/components/auto-logout/AutoLogout';
//
import { Footer } from '~/components/footer/Footer';

import itIT from '../../../i18n/it_IT.json';
import enUS from '../../../i18n/en_US.json';
import esES from '../../../i18n/es_ES.json';
import frFR from '../../../i18n/fr_FR.json';
import ptPT from '../../../i18n/pt_PT.json';
import jaJP from '../../../i18n/ja_JP.json';
import zhCN from '../../../i18n/zh_CN.json';

const TRANSLATIONS: Record<string, any> = {
  it_IT: itIT,
  en_US: enUS,
  es_ES: esES,
  fr_FR: frFR,
  pt_PT: ptPT,
  ja_JP: jaJP,
  zh_CN: zhCN,
};

const replaceLocale = (pathname: string, oldLocale: string, locale: string) => {
  const idx = pathname.indexOf(oldLocale);
  return pathname.slice(0, idx) + locale + pathname.slice(idx + oldLocale.length);
};

export const onRequest: RequestHandler = async ({ request, url, redirect, pathname, params, locale, cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });

  if (locales.includes(params.locale)) {
    locale(params.locale);
  } else {
    const acceptLang = request.headers.get('accept-language');
    const guessedLocale = guessLocale(acceptLang);
    const path =
      params.locale === '__' || /^([a-z]{2})([_-]([a-z]{2}))?$/i.test(params.locale)
        ? '/' + replaceLocale(pathname, params.locale, guessedLocale)
        : `/${guessedLocale}${pathname}`;
    throw redirect(301, `${path}${url.search}`);
  }
};

export default component$(() => {
  const isModalOpen = useSignal(false);
  const nav = useNavigate();
  const currentLocale = getLocale();
  const location = useLocation();
  const isSessionLoading = useContext(SessionLoadingContext);

  const slug = location.params.slug;
  const id = slug ? slug.split('/')[1] : undefined;

  // Ottieni il percorso senza il locale
  const normalizedPath = location.url.pathname.replace(new RegExp(`^/${currentLocale}/`), '/');

  const actions = useNavigationActions(nav, isModalOpen, currentLocale);

  const listItems = getListItems(currentLocale);

  const newAction = !isSessionLoading.value ? actions : [];

  const t = TRANSLATIONS[location.params.locale]?.translations || TRANSLATIONS.en_US.translations;

  return (
    <>
      {/* {normalizedPath !== `/${_('slug_login')}/` &&
        normalizedPath !== `/${_('slug_signup')}/` &&
        normalizedPath !== `/${_('slug_success')}/` &&
        normalizedPath !== `/${_('slug_search')}/` &&
        normalizedPath !== `/${_('slug_preview')}/${id}/` &&
        normalizedPath !== `/${_('slug_reset_password')}/` &&
        normalizedPath !== `/${_('slug_dashboard')}/${id}/` &&
        normalizedPath !== `/${_('slug_website')}/${id}/` && ( */}
      {normalizedPath !== `/${t.slug_login}/` &&
        normalizedPath !== `/${t.slug_signup}/` &&
        normalizedPath !== `/${t.slug_success}/` &&
        normalizedPath !== `/${t.slug_search}/` &&
        normalizedPath !== `/${t.slug_preview}/${id}/` &&
        normalizedPath !== `/${t.slug_reset_password}/` &&
        normalizedPath !== `/${t.slug_update_password}/` &&
        normalizedPath !== `/${t.slug_dashboard}/${id}/` &&
        normalizedPath !== `/${t.slug_website}/${id}/` && (
          <NavigationMenu
            ariaLabel="Menu principale"
            logoComponent={Logo}
            listItems={listItems}
            actions={newAction}
            locale={currentLocale}
          />
        )}

      {isModalOpen.value && (
        <Modal open={isModalOpen} title="Languages">
          <LanguageSelector languages={languages} isModalOpen={isModalOpen} />
        </Modal>
      )}
      <PopupDisplay />
      <div
        // class={
        //   normalizedPath !== `/${_('slug_login')}/` &&
        //   normalizedPath !== `/${_('slug_signup')}/` &&
        //   normalizedPath !== `/${_('slug_success')}/` &&
        //   normalizedPath !== `/${_('slug_search')}/` &&
        //   normalizedPath !== `/${_('slug_preview')}/${id}/` &&
        //   normalizedPath !== `/${_('slug_reset_password')}/` &&
        //   normalizedPath !== `/${_('slug_dashboard')}/${id}/` &&
        //   normalizedPath !== `/${_('slug_website')}/${id}/` &&
        //   'spacer'
        // }

        class={
          normalizedPath !== `/${t.slug_login}/` &&
          normalizedPath !== `/${t.slug_signup}/` &&
          normalizedPath !== `/${t.slug_success}/` &&
          normalizedPath !== `/${t.slug_search}/` &&
          normalizedPath !== `/${t.slug_preview}/${id}/` &&
          normalizedPath !== `/${t.slug_reset_password}/` &&
          normalizedPath !== `/${t.slug_update_password}/` &&
          normalizedPath !== `/${t.slug_dashboard}/${id}/` &&
          normalizedPath !== `/${t.slug_website}/${id}/` &&
          'spacer'
        }
      >
        <Slot />
      </div>

      {normalizedPath === `/` && <Footer t={t} />}

      {/* <AutoLogout /> */}
    </>
  );
});
