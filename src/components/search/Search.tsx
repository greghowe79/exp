import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { _, getLocale } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Button, Card, Input } from '@greghowe79/the-lib';
import { SearchIcon } from '~/assets/search';
import { useDebouncer$ } from '~/utility/debouncer';
import { FaGlobeLight } from '~/assets/worldLight';

import { ArrowRight } from '~/assets/arrow_right';
import { ArrowLeft } from '~/assets/arrow_left';

interface Suggestion {
  id: string;
  name: string;
  job_title: string;
  position: string;
  img_url: string;
}

const Search = component$(() => {
  const currentLocale = getLocale();
  const suggestions = useSignal<Suggestion[]>([]);
  const searchResults = useSignal<any[]>([]);
  const rawInput = useSignal('');
  const loading = useSignal(false);
  const message = useSignal('');
  const currentPage = useSignal(1);
  const totalPages = useSignal(1);

  useStyles$(styles);

  const fetchSuggestions = $(async (query: string) => {
    if (!query) {
      suggestions.value = [];
      message.value = '';
      return;
    }

    loading.value = true;
    try {
      const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}&locale=${currentLocale}`);
      const data = await res.json();
      suggestions.value = Array.isArray(data.suggestions) ? data.suggestions : [];
      message.value = data.message ?? '';
    } catch (err) {
      console.error('Errore nel recupero suggerimenti:', err);
      suggestions.value = [];
      message.value = 'Si è verificato un errore durante la ricerca.';
    } finally {
      loading.value = false;
    }
  });

  const debounce = useDebouncer$((value: string) => {
    fetchSuggestions(value);
  }, 500);

  const handleSuggestion = $(async (suggestion: Suggestion | string, page = 1) => {
    let query = '';

    if (typeof suggestion === 'string') {
      query = suggestion;
    } else {
      query = `${suggestion.job_title} ${suggestion.position}`;
    }

    rawInput.value = query;
    suggestions.value = [];

    loading.value = true;

    try {
      const res = await fetch(`/api/search-results?q=${encodeURIComponent(rawInput.value)}&locale=${currentLocale}&page=${page}`);
      const data = await res.json();
      searchResults.value = Array.isArray(data.results) ? data.results : [];

      currentPage.value = data.page ?? 1;
      totalPages.value = data.totalPages ?? 1;
    } catch (err) {
      console.error('Errore nel recupero risultati:', err);
      searchResults.value = [];
    } finally {
      loading.value = false;
    }
  });

  return (
    <main class="search-container">
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <div class="content-container">
        <img class="logo" src="http://localhost:5173/logo.svg" width="150" height="150" alt="Site Snap logo" />
        <form
          preventdefault:submit
          onSubmit$={async (event) => {
            event.preventDefault();
            if (rawInput.value.length > 0) await handleSuggestion(rawInput.value);
          }}
        >
          <Input
            id="input_search"
            type="search"
            label="Cerca professionisti o organizzazioni"
            placeholder="Cerca con Site Snap"
            value={rawInput}
            onInput$={(_, target) => {
              rawInput.value = target.value;
              debounce(target.value);
            }}
            icon={<SearchIcon fill={'#232323'} />}
            bgLight
          />
          <button class="hidden-button" type="submit" aria-label="submit">
            submit
          </button>
        </form>

        <div class="suggestions-container">
          <ul class="suggestions-list">
            {Array.isArray(suggestions.value) &&
              suggestions.value.map((s) => (
                <li key={s.id} class="suggestion-item" onClick$={() => handleSuggestion(s)}>
                  <img src={s.img_url} alt={s.name} class="thumbnail" width={40} height={40} />
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
          {!loading.value && message.value && suggestions.value.length === 0 && <p class="no-results">{message.value}</p>}
        </div>
      </div>
      {searchResults.value.length > 0 && (
        <div class="results-container">
          {searchResults.value.map((result) => {
            console.log('Result item:', result);
            return (
              <div class="results-content" key={result.id}>
                <Card
                  item={result}
                  icon={FaGlobeLight}
                  subtitle={_('profile_about_section')}
                  link={result.has_access ? _('profile_card_link') : _('profile_unavailable')}
                  path={result.has_access ? `/${currentLocale}/${_('slug_website')}/${result.id}` : '#'}
                  disabled={!result.has_access}
                />
              </div>
            );
          })}
        </div>
      )}

      {searchResults.value.length > 0 && (
        <div class="pagination-container">
          <div style={{ visibility: currentPage.value > 1 ? 'visible' : 'hidden' }}>
            <Button
              id="btn_back_step"
              type="button"
              onClick$={() => handleSuggestion(rawInput.value, currentPage.value - 1)}
              variant="icon"
              size="lg"
              icon={<ArrowLeft fill="#232323" />}
            />
          </div>

          <span>{`${_('page')} ${currentPage.value} ${_('of')} ${totalPages.value}`}</span>

          <div style={{ visibility: currentPage.value < totalPages.value ? 'visible' : 'hidden' }}>
            <Button
              id="btn_next_step"
              type="button"
              onClick$={() => handleSuggestion(rawInput.value, currentPage.value + 1)}
              variant="icon"
              size="lg"
              icon={<ArrowRight fill="#232323" />}
            />
          </div>
        </div>
      )}
    </main>
  );
});

export default Search;
