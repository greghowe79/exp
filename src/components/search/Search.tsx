import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { _, getLocale } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Input } from '@greghowe79/the-lib';
import { SearchIcon } from '~/assets/search';
import { useDebouncer$ } from '~/utility/debouncer';
import { Image } from '@unpic/qwik';

interface Suggestion {
  id: string;
  name: string;
  job_title: string;
  position: string;
  img_url: string;
}

const Search = component$(() => {
  const currentLocale = getLocale();
  const suggestions = useSignal<Suggestion[]>([]); // 👈 suggestions list
  const rawInput = useSignal('');
  const loading = useSignal(false);

  const fetchSuggestions = $(async (query: string) => {
    if (!query) {
      suggestions.value = [];
      return;
    }

    loading.value = true;
    try {
      const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      suggestions.value = Array.isArray(data.suggestions) ? data.suggestions : [];
    } catch (err) {
      console.error('Errore nel recupero suggerimenti:', err);
      suggestions.value = [];
    } finally {
      loading.value = false;
    }
  });

  const debounce = useDebouncer$((value: string) => {
    fetchSuggestions(value);
  }, 500);

  useStyles$(styles);

  return (
    <main class="search-container">
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <div class="content-container">
        <img class="logo" src="http://localhost:5173/favicon.svg" width="150" height="150" alt="Site Snap logo" />

        <Input
          id="input_search"
          type="search"
          label="Cerca professionisti o organizzazioni"
          placeholder="Cerca con Site Snap o digita un URL"
          value={rawInput}
          onInput$={(_, target) => {
            rawInput.value = target.value;
            debounce(target.value);
          }}
          icon={<SearchIcon fill={'#232323'} />}
          bgLight
        />

        <div class="suggestions-container">
          <ul class="suggestions-list">
            {Array.isArray(suggestions.value) &&
              suggestions.value.map((s) => (
                <li key={s.id} class="suggestion-item">
                  <Image
                    objectFit="cover"
                    width={40}
                    height={40}
                    src={s.img_url}
                    layout="constrained"
                    decoding="async"
                    loading="lazy"
                    alt={s.name}
                    class="thumbnail"
                  />
                  <div>
                    <strong>{s.job_title}</strong>
                    <br />
                    <small>
                      {s.name} – {s.position}
                    </small>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
});

export default Search;
