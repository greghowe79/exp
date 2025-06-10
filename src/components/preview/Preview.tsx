import { component$, Resource, useResource$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import { useLocation } from '@builder.io/qwik-city';
import type { UserProfile } from '~/root';
import { FaGlobeLight } from '~/assets/worldLight';
import { _ } from 'compiled-i18n';
import { Card } from '@greghowe79/the-lib';
// import { FacebookLight } from '~/assets/facebookLight';
// import { TwitterLight } from '~/assets/twitterLight';
// import { InstagramLight } from '~/assets/instagramLight';
// import { LinkedinLight } from '~/assets/linkedinLight';

const Preview = component$(() => {
  const location = useLocation();
  const id = location.params.slug.split('/')[1];

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
          <Card item={item} icon={FaGlobeLight} subtitle={_('profile_about_section')} link={_('profile_card_link')} path="#" />
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
