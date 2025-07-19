import { component$, useStyles$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { _, getLocale } from 'compiled-i18n';
import styles from './styles.css?inline';

const Search = component$(() => {
  const currentLocale = getLocale();
  useStyles$(styles);
  return (
    <main>
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <div>Search</div>
    </main>
  );
});

export default Search;
