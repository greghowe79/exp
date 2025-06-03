import { component$, Resource, useResource$, useSignal } from '@builder.io/qwik';
import { useLocation, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { Button, Hero, OnboardingSteps } from '@greghowe79/the-lib';
import { _, setLocaleGetter } from 'compiled-i18n';
//import SearchBar from '~/components/search-bar/SearchBar';
import { useSteps } from '~/hooks/useSteps';

export default component$(() => {
  const location = useLocation();
  const steps = useSteps(location);
  const query = useSignal('');
  const result = useSignal(0);
  const nav = useNavigate();

  setLocaleGetter(() => location.params.locale);

  const jokes = useResource$<{ value: string }[]>(async ({ track, cleanup }) => {
    track(() => query.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());

    if (query.value.length < 3) {
      return [];
    }

    const url = new URL('https://api.chucknorris.io/jokes/search');
    url.searchParams.set('query', query.value);

    const resp = await fetch(url, { signal: controller.signal });
    const json = (await resp.json()) as { result: { value: string }[] };
    result.value = json.result.length;
    return json.result;
  });

  return (
    <main id="contenuto-home">
      <section id="home_hero">
        <Hero title={_('hero_title')} content={_('hero_content')}>
          <div id="cta">
            <Button
              id="call_to_action"
              label={_('hero_cta')}
              size="sm"
              onClick$={async () => await nav(`/${location.params.locale}/${_('slug_signup')}/`)}
            />
          </div>
          {/*  <SearchBar query={query} /> */}
        </Hero>
      </section>
      <section id="home_step">
        <OnboardingSteps steps={steps} />
      </section>
      <section>
        <Resource
          value={jokes}
          onPending={() => <>loading...</>}
          onResolved={(jokes) => (
            <ul>
              {jokes.map((joke, i) => (
                <li key={i}>{joke.value}</li>
              ))}
            </ul>
          )}
        />
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
