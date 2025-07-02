import { component$, useContext, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { useReward } from 'qwik-rewards';
import { getLocale, _ } from 'compiled-i18n';
import { useNavigate } from '@builder.io/qwik-city';
import styles from './styles.css?inline';
import { UserSessionContext } from '~/root';
import { supabase } from '~/lib/db';
import { Button } from '@greghowe79/the-lib';

export const Success = component$(() => {
  useStyles$(styles);
  const locale = getLocale();
  const hasWebsite = useSignal(true);
  const isLoading = useSignal(true);
  const nav = useNavigate();
  const userSession = useContext(UserSessionContext);

  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      userSession.userId = session.user.id;
      const { data, error } = await supabase.from('professionals').select('*').eq('id', userSession.userId);
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
  });

  const { reward: rainConfetti } = useReward('confetti-anchor', 'confetti', {
    angle: 270,
    spread: 160,
    startVelocity: 30,
    elementCount: 200,
    decay: 0.9,
    zIndex: 9999,
    colors: ['#00bfff', '#ff69b4', '#ffcc00', '#00ff99', '#ff6f61'],
  });

  // eslint-disable-next-line
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      rainConfetti();
    }, 3000);

    cleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <div class="success-container">
      <div id="confetti-anchor" />
      <h1>🎉 {_('premium_success_title')}</h1>
      <p>{_('premium_success_message')}</p>
      {hasWebsite.value ? (
        <Button
          id="redirect_website_btn"
          label={_('button_go_live_site')}
          size="lg"
          isLoading={isLoading}
          disabled={isLoading.value}
          onClick$={async () => await nav(`/${locale}/${_('slug_website')}/${userSession.userId}`)}
        ></Button>
      ) : (
        <Button
          id="redirect_dashboard_btn"
          label={_('button_go_to_dashboard')}
          size="lg"
          isLoading={isLoading}
          disabled={isLoading.value}
          onClick$={async () => await nav(`/${locale}/${_('slug_dashboard')}/${userSession.userId}`)}
        ></Button>
      )}
    </div>
  );
});
