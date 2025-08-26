import { component$, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { Button, Hero, OnboardingSteps } from '@greghowe79/the-lib';
import { _, setLocaleGetter } from 'compiled-i18n';
import Network from '~/components/network/Network';
import { useSteps } from '~/hooks/useSteps';
import { supabase } from '~/lib/db';
import { UserSessionContext } from '~/root';

export default component$(() => {
  const location = useLocation();
  const steps = useSteps(location);
  const nav = useNavigate();
  const userSession = useContext(UserSessionContext);
  const hasWebsite = useSignal(true);
  const isLoading = useSignal(true);

  setLocaleGetter(() => location.params.locale);

  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      userSession.userId = session.user.id;
      const { data, error } = await supabase.from('professionals').select('*').eq('id', userSession.userId);
      const { data: user } = await supabase.from('profiles').select().eq('id', userSession.userId).single();

      if (user) {
        userSession.hasAccess = user.has_access;
      }

      if (error) {
        hasWebsite.value = false;
        isLoading.value = false;
        throw new Error(error.message);
      }

      if (data.length === 1) {
        hasWebsite.value = true;
      } else {
        hasWebsite.value = false;
      }
      isLoading.value = false;
    }
    isLoading.value = false;
  });

  return (
    <main id="contenuto-home">
      <section id="home_hero">
        <Hero
          title={userSession.isLoggedIn ? _('hero_title_logged') : _('hero_title')}
          content={userSession.isLoggedIn ? _('hero_content_logged') : _('hero_content')}
        >
          <div id="cta">
            {isLoading.value ? (
              <Button id="placeholder_btn" label={_('hero_cta')} size="sm" isLoading={true} disabled={true} />
            ) : !userSession.isLoggedIn ? (
              <Button
                id="call_to_action"
                label={_('hero_cta')}
                size="sm"
                isLoading={isLoading}
                disabled={isLoading.value}
                onClick$={async () => await nav(`/${location.params.locale}/${_('slug_login')}/`)}
              />
            ) : hasWebsite.value ? (
              <Button
                id="redirect_website_btn"
                label={userSession.hasAccess ? _('button_go_live_site') : _('button_preview_site')}
                size="lg"
                isLoading={isLoading}
                disabled={isLoading.value}
                onClick$={async () =>
                  userSession.hasAccess
                    ? await nav(`/${location.params.locale}/${_('slug_website')}/${userSession.userId}`)
                    : await nav(`/${location.params.locale}/${_('slug_preview')}/${userSession.userId}`)
                }
              />
            ) : (
              <Button
                id="redirect_dashboard_btn"
                label={_('button_go_to_dashboard')}
                size="lg"
                isLoading={isLoading}
                disabled={isLoading.value}
                onClick$={async () => await nav(`/${location.params.locale}/${_('slug_dashboard')}/${userSession.userId}`)}
              />
            )}
          </div>
        </Hero>
      </section>
      <section id="home_step">
        <OnboardingSteps steps={steps} />
      </section>

      <section id="professional_network">
        <Network />
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Home description',
    },
  ],
};
