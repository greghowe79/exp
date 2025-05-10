import { component$, type Signal, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { useLocation } from '@builder.io/qwik-city';

export interface LanguagesProps {
  languages: Array<{ code: string; label: string; region: string }>;
  // onClick$?: QRL<() => void> | QRL<() => boolean> | QRL<() => Promise<void>>;
  isModalOpen: Signal<boolean>;
}

const LanguageSelector = component$<LanguagesProps>(({ languages, isModalOpen }) => {
  useStyles$(styles);
  const location = useLocation();

  const currentPathWithoutLocale = location.url.pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');

  return (
    <ul class="list" aria-label="Language list">
      {languages.map((language) => {
        return (
          <li key={language.code} class="list-item">
            <a
              href={`/${language.code}${currentPathWithoutLocale}`}
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
