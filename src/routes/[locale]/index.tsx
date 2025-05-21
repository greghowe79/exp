import { component$, Resource, useResource$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Hero, OnboardingSteps } from '@greghowe79/the-lib';
import { _ } from 'compiled-i18n';
import SearchBar from '~/components/search-bar/SearchBar';
import { useSteps } from '~/hooks/useSteps';

export default component$(() => {
  const steps = useSteps();
  const query = useSignal('');
  const result = useSignal(0);

  const heroTitle = _('hero_title');
  const heroContent = _('hero_content');

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
        <Hero title={heroTitle} content={heroContent}>
          <SearchBar query={query} />
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
