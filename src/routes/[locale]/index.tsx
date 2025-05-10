import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { _ } from 'compiled-i18n';

export default component$(() => {
  return (
    <div>
      <main id="contenuto-home" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>{_('welcome')}</h1>
        <p>{_('main_content')}</p>
      </main>
    </div>
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
