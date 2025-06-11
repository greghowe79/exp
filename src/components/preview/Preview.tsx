import { component$, Resource, useResource$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import { useLocation } from '@builder.io/qwik-city';
import type { UserProfile } from '~/root';
import { FaGlobeLight } from '~/assets/worldLight';
import { _, getLocale } from 'compiled-i18n';
import { Card } from '@greghowe79/the-lib';
// import { FacebookLight } from '~/assets/facebookLight';
// import { TwitterLight } from '~/assets/twitterLight';
// import { InstagramLight } from '~/assets/instagramLight';
// import { LinkedinLight } from '~/assets/linkedinLight';

const Preview = component$(() => {
  const location = useLocation();
  const id = location.params.slug.split('/')[1];
  const showPreview = useSignal(false);
  const isPremium = useSignal(false);
  const currentLocale = getLocale();

  const data = useResource$(async () => {
    const { data, error } = await supabase.from('professionals').select('*').eq('id', id).single();

    if (error) throw new Error(error.message);
    return data as UserProfile;
  });

  useStyles$(styles);

  return (
    <main>
      <Resource
        value={data}
        onPending={() => <p>Caricamento...</p>}
        onRejected={(err) => <p>Errore: {err.message}</p>}
        onResolved={(item) => (
          // <Card item={item} icon={FaGlobeLight} subtitle={_('profile_about_section')} link={_('profile_card_link')} path="#" />
          <>
            <Card item={item} icon={FaGlobeLight} subtitle={_('profile_about_section')} link={_('profile_card_link')} path="#" />

            {!isPremium.value && (
              <button onClick$={() => (showPreview.value = !showPreview.value)} class="preview-button">
                {showPreview.value ? _('hide_preview') : _('show_preview')}
              </button>
            )}

            {showPreview.value && (
              <div class="website-preview">
                <div class="preview-overlay">
                  <iframe src={`/${currentLocale}/${_('slug_website')}/${id}`} class="preview-iframe" />
                  <div class="iframe-click-blocker" />
                  <div class="preview-upsell">
                    <h3>✨ {_('unlock_full_site')}</h3>
                    <p>{_('premium_features_intro')}</p>
                    <ul>
                      <li>{_('premium_feature_remove_blur')}</li>
                      <li>{_('premium_feature_custom_domain')}</li>
                      <li>{_('premium_feature_advanced_stats')}</li>
                    </ul>
                    <button class="upgrade-button">{_('upgrade_to_premium')}</button>
                  </div>
                </div>
              </div>
            )}

            {isPremium.value && (
              <a href={`/websites/${id}`} class="full-profile-button">
                {_('go_to_full_profile')}
              </a>
            )}
          </>
        )}
      />
    </main>
  );
});

export default Preview;

{
  /* <div class="card-social">
                {item.facebook && (
                  <a href={item.facebook} target="_blank" rel="noopener noreferrer">
                    <FacebookLight />
                  </a>
                )}
                {item.twitter && (
                  <a href={item.twitter} target="_blank" rel="noopener noreferrer">
                    <TwitterLight />
                  </a>
                )}
                {item.instagram && (
                  <a href={item.instagram} target="_blank" rel="noopener noreferrer">
                    <InstagramLight />
                  </a>
                )}
                {item.linkedin && (
                  <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinLight />
                  </a>
                )}
              </div> */
}
