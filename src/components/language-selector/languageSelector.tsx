import { component$, type QRL, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';

export interface LanguagesProps {
  languages: Array<{ code: string; label: string; region: string }>;
  onClick$?: QRL<() => void> | QRL<() => boolean> | QRL<() => Promise<void>>;
}

const LanguageSelector = component$<LanguagesProps>(({ languages, onClick$ }) => {
  useStyles$(styles);
  return (
    <ul class="list" aria-label="Language list">
      {languages.map((language) => {
        return (
          <li key={language.code} class="list-item" onClick$={onClick$}>
            <div class="language-selector">
              <div>{language.label}</div>
              <div class="region">{language.region}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
});

export default LanguageSelector;
