import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const Services = component$(() => {
  return (
    <div>
      <main id="contenuto-services" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Services Page</h1>
        <p>Qgdfgdgf gfdfgdfgdfgdfgdfgfg</p>
      </main>
    </div>
  );
});

export default Services;

export const head: DocumentHead = {
  title: 'Services',
  meta: [
    {
      name: 'Services',
      content: 'Services description',
    },
  ],
};
