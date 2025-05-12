import { component$, Slot, useSignal } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { NavigationMenu, Modal } from '@greghowe79/the-lib';
import { Logo } from '~/components/logo/logo';
import { useNavigationActions } from '~/hooks/useNavigationActions';
import { getListItems } from '~/data/nav-data';
import { languages } from '~/data/language-selector-data';
import LanguageSelector from '~/components/language-selector/languageSelector';
import { guessLocale, locales, getLocale, _ } from 'compiled-i18n';

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

  // Ottieni il percorso senza il locale
  const normalizedPath = location.url.pathname.replace(new RegExp(`^/${currentLocale}/`), '/');

  const actions = useNavigationActions(nav, isModalOpen, currentLocale);

  const listItems = getListItems(currentLocale);

  return (
    <>
      {normalizedPath !== `/${_('slug_login')}/` && (
        <NavigationMenu ariaLabel="Menu principale" logoComponent={Logo} listItems={listItems} actions={actions} locale={currentLocale} />
      )}

      {isModalOpen.value && (
        <Modal open={isModalOpen} title="Languages">
          <LanguageSelector languages={languages} isModalOpen={isModalOpen} />
        </Modal>
      )}

      <Slot />
    </>
  );
});
