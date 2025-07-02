import { component$, useContext, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { useReward } from 'qwik-rewards';
import { getLocale, _ } from 'compiled-i18n';
import { Link } from '@builder.io/qwik-city';
import styles from './styles.css?inline';
import { UserSessionContext } from '~/root';
import { supabase } from '~/lib/db';

export const Success = component$(() => {
  useStyles$(styles);
  const locale = getLocale();
  const hasWebsite = useSignal(false);
  const userSession = useContext(UserSessionContext);

  // const profileResource = useResource$<UserProfile>(async () => {
  //   if (!userSession.userId) {
  //     throw new Error('Missing user ID');
  //   }

  //   const { data, error } = await supabase.from('professionals').select('*').eq('id', userSession.userId).single();

  //   if (error) throw new Error(error.message);
  //   return data;
  // });

  const { reward: rainConfetti } = useReward('confetti-anchor', 'confetti', {
    angle: 270,
    spread: 160,
    startVelocity: 30,
    elementCount: 200,
    decay: 0.9,
    zIndex: 9999,
    colors: ['#00bfff', '#ff69b4', '#ffcc00', '#00ff99', '#ff6f61'],
  });

  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      rainConfetti();
    }, 3000);

    cleanup(() => {
      clearInterval(interval);
    });
  });

  useVisibleTask$(async () => {
    const { error } = await supabase.from('professionals').select('*').eq('id', userSession.userId).single();

    if (error) throw new Error(error.message);

    hasWebsite.value = true;
  });

  return (
    <div class="success-container">
      <div id="confetti-anchor" />
      <h1>🎉 {_('premium_success_title')}</h1>
      <p>{_('premium_success_message')}</p>
      {hasWebsite.value ? (
        <Link href={`/${locale}/${_('slug_website')}/${userSession.userId}`} class="btn-home">
          {_('button_go_live_site')}
        </Link>
      ) : (
        <Link href={`/${locale}/${_('slug_dashboard')}/${userSession.userId}`} class="btn-home">
          ← {_('form_back_home')}
        </Link>
      )}
    </div>
  );

  // return (
  //   <Resource
  //     value={profileResource}
  //     onPending={() => <p>Loading profile...</p>}
  //     onRejected={(error) => <p>Errore: {error.message}</p>}
  //     onResolved={(profile) => (
  //       <div class="success-container">
  //         <div id="confetti-anchor"></div>
  //         <h1>🎉 {_('premium_success_title')}</h1>
  //         <p>{_('premium_success_message')}</p>

  //         {profile.id ? (
  //           <Link href={`/${locale}/${_('slug_website')}/${profile.id}`} class="btn-home">
  //             {_('button_go_live_site')}
  //           </Link>
  //         ) : (
  //           <Link href={`/${locale}/${_('slug_dashboard')}/${profile.id}`} class="btn-home">
  //             ← {_('form_back_home')}
  //           </Link>
  //         )}

  //         {/* <Link href={`/${getLocale()}/${profile?.id ? _('slug_dashboard') + '/' + profile.id : ''}`} class="btn-home">
  //           ← {_('form_back_home')}
  //         </Link> */}
  //       </div>
  //     )}
  //   />
  // );
});
