import { component$, Slot, useSignal } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { NavigationMenu, Modal } from '@greghowe79/the-lib';
import { Logo } from '~/components/logo/logo';
import { useNavigationActions } from '~/hooks/useNavigationActions';
import { listItems } from '~/data/nav-data';
import { languages } from '~/data/language-selector-data';
import LanguageSelector from '~/components/language-selector/languageSelector';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const isModalOpen = useSignal(false);
  const nav = useNavigate();
  const actions = useNavigationActions(nav, isModalOpen);
  const location = useLocation();

  return (
    <>
      {location.url.pathname !== '/login/' && (
        <NavigationMenu ariaLabel="Menu principale" logoComponent={Logo} listItems={listItems} actions={actions} />
      )}

      {isModalOpen.value && (
        <Modal open={isModalOpen} title="Languages">
          <LanguageSelector languages={languages} onClick$={() => (isModalOpen.value = false)} />
        </Modal>
      )}

      <Slot />
    </>
  );
});
