import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <main id="contenuto-home" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Benvenuto nel nostro sito!</h1>
        <p>Questo è il contenuto principale della pagina.</p>
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
