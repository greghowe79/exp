import { component$, type Signal, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { useLocation } from '@builder.io/qwik-city';
import { pageMap, resolvePageKey } from '~/lib/pageMap';

export interface LanguagesProps {
  languages: Array<{ code: string; label: string; region: string }>;
  // onClick$?: QRL<() => void> | QRL<() => boolean> | QRL<() => Promise<void>>;
  isModalOpen: Signal<boolean>;
}

const LanguageSelector = component$<LanguagesProps>(({ languages, isModalOpen }) => {
  useStyles$(styles);
  const location = useLocation();
  const lang = location.params.locale;
  const slug = location.params.slug;
  const pageKey = resolvePageKey(slug, lang);

  return (
    <ul class="list" aria-label="Language list">
      {languages.map((language) => {
        const translatedSlug = pageKey ? pageMap[pageKey]?.[language.code] : '';
        const href = translatedSlug ? `/${language.code}/${translatedSlug}` : `/${language.code}`;
        return (
          <li key={language.code} class="list-item">
            <a
              href={href}
              onClick$={() => {
                isModalOpen.value = false;
              }}
              class="language-link"
            >
              <div class="language-selector">
                <div>{language.label}</div>
                <div class="region">{language.region}</div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
});

export default LanguageSelector;
