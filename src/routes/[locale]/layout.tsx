import { component$, Slot, useContext, useSignal } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { NavigationMenu, Modal } from '@greghowe79/the-lib';
import { Logo } from '~/components/logo/logo';
import { useNavigationActions } from '~/hooks/useNavigationActions';
import { getListItems } from '~/data/nav-data';
import { languages } from '~/data/language-selector-data';
import LanguageSelector from '~/components/language-selector/languageSelector';
import { guessLocale, locales, getLocale, _ } from 'compiled-i18n';
import { PopupDisplay } from '~/components/popup/Popup';
import { SessionLoadingContext } from '~/root';
import { AutoLogout } from '~/components/auto-logout/AutoLogout';

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

  // Ottieni il percorso senza il locale
  const normalizedPath = location.url.pathname.replace(new RegExp(`^/${currentLocale}/`), '/');

  const actions = useNavigationActions(nav, isModalOpen, currentLocale);

  const listItems = getListItems(currentLocale);

  const newAction = !isSessionLoading.value ? actions : [];

  return (
    <>
      {normalizedPath !== `/${_('slug_login')}/` && normalizedPath !== `/${_('slug_signup')}/` && (
        <NavigationMenu ariaLabel="Menu principale" logoComponent={Logo} listItems={listItems} actions={newAction} locale={currentLocale} />
      )}

      {isModalOpen.value && (
        <Modal open={isModalOpen} title="Languages">
          <LanguageSelector languages={languages} isModalOpen={isModalOpen} />
        </Modal>
      )}
      <PopupDisplay />
      <div class={normalizedPath !== `/${_('slug_login')}/` && normalizedPath !== `/${_('slug_signup')}/` && 'spacer'}>
        <Slot />
      </div>
      <AutoLogout />
    </>
  );
});
