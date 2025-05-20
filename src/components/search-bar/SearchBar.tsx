// src/components/SearchBar.tsx
import { component$, type Signal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Input } from '@greghowe79/the-lib';

export interface SerchBarProps {
  query: Signal<string>;
}
const SearchBar = component$<SerchBarProps>(({ query }) => {
  useStylesScoped$(styles);
  // const query = useSignal('');
  // const result = useSignal(0);

  // const jokes = useResource$<{ value: string }[]>(async ({ track, cleanup }) => {
  //   track(() => query.value);
  //   // A good practice is to use `AbortController` to abort the fetching of data if
  //   // new request comes in. We create a new `AbortController` and register a `cleanup`
  //   // function which is called when this function re-runs.
  //   const controller = new AbortController();
  //   cleanup(() => controller.abort());

  //   if (query.value.length < 3) {
  //     return [];
  //   }

  //   const url = new URL('https://api.chucknorris.io/jokes/search');
  //   url.searchParams.set('query', query.value);

  //   const resp = await fetch(url, { signal: controller.signal });
  //   const json = (await resp.json()) as { result: { value: string }[] };
  //   result.value = json.result.length;
  //   return json.result;
  // });

  return (
    <div class="search-bar-container">
      <Input id="input_search" type="text" placeholder="Search..." value={query} bgLight />
      {/* <Resource
        value={jokes}
        onPending={() => <>loading...</>}
        onResolved={(jokes) => (
          <ul>
            {jokes.map((joke, i) => (
              <li key={i}>{joke.value}</li>
            ))}
          </ul>
        )}
      /> */}
    </div>
  );
});
export default SearchBar;
