import { component$, Resource, useResource$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import type { UserProfile } from '~/root';
import { FaGlobeLight } from '~/assets/worldLight';
// import { _, getLocale } from 'compiled-i18n';
import { getLocale } from 'compiled-i18n';
import { Card } from '@greghowe79/the-lib';

interface TranslationsProps {
  t: Record<string, string>;
}

const Preview = component$<TranslationsProps>(({ t }) => {
  const location = useLocation();
  const id = location.params.slug.split('/')[1];
  const showPreview = useSignal(false);
  const isPremium = useSignal(false);
  const currentLocale = getLocale();
  const nav = useNavigate();

  const data = useResource$(async () => {
    const { data, error } = await supabase.from('professionals').select('*').eq('id', id).single();

    if (error) throw new Error(error.message);
    return data as UserProfile;
  });

  useStyles$(styles);

  return (
    <main class="preview-container">
      <Link href={`/${currentLocale}`} class="back_button">
        {/* ← {_('form_back_home')} */} ← {t.form_back_home}
      </Link>

      <Resource
        value={data}
        onPending={() => <p>Caricamento...</p>}
        onRejected={(err) => <p>Errore: {err.message}</p>}
        onResolved={(item) => (
          <>
            <div class="card-wrapper">
              {/* <span class="card-label">{_('public_card')}</span> */}
              <span class="card-label">{t.public_card}</span>
              {/* <Card item={item} icon={FaGlobeLight} subtitle={_('profile_about_section')} link={_('profile_card_link')} path="#" /> */}
              <Card item={item} icon={FaGlobeLight} subtitle={t.profile_about_section} link={t.profile_card_link} path="#" />
            </div>

            {!isPremium.value && (
              <button onClick$={() => (showPreview.value = !showPreview.value)} class="preview-button">
                {/* {showPreview.value ? _('hide_preview') : _('show_preview')} */}
                {showPreview.value ? t.hide_preview : t.show_preview}
              </button>
            )}

            {showPreview.value && (
              <div class="website-preview">
                <div class="preview-overlay">
                  {/* <iframe src={`/${currentLocale}/${_('slug_website')}/${id}?preview=true`} class="preview-iframe" /> */}
                  <iframe src={`/${currentLocale}/${t.slug_website}/${id}?preview=true`} class="preview-iframe" />
                  <div class="iframe-click-blocker" />
                  <div class="preview-upsell">
                    {/* <h3>✨ {_('unlock_full_site')}</h3> */}
                    <h3>✨ {t.unlock_full_site}</h3>

                    <ul class="check-list">
                      <li>
                        {/* {_('sub_page_before')} */}
                        {t.sub_page_before}
                        {/* <strong>{_('sub_page_strong')}</strong> */}
                        <strong>{t.sub_page_strong}</strong>
                      </li>
                      {/* <li>{_('sub_visitors')}</li> */}
                      <li>{t.sub_visitors}</li>
                      {/* <li>{_('sub_search')}</li> */}
                      <li>{t.sub_search}</li>
                      {/* <li>{_('sub_visibility')}</li> */}
                      <li>{t.sub_visibility}</li>
                    </ul>
                    {/* <button class="upgrade-button" onClick$={() => nav(`/${currentLocale}/${_('slug_pricing')}/`)}> */}
                    <button class="upgrade-button" onClick$={() => nav(`/${currentLocale}/${t.slug_pricing}/`)}>
                      {/* {_('upgrade_to_premium')} */}
                      {t.upgrade_to_premium}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isPremium.value && (
              <a href={`/websites/${id}`} class="full-profile-button">
                {/* {_('go_to_full_profile')} */}
                {t.go_to_full_profile}
              </a>
            )}
          </>
        )}
      />
    </main>
  );
});

export default Preview;
