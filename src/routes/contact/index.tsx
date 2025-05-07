import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const Contact = component$(() => {
  return (
    <div>
      <main id="contenuto-contact" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Contact Page</h1>
        <p>Qgdfgdgf gfdfgdfgdfgdfgdfgfg</p>
      </main>
    </div>
  );
});

export default Contact;
export const head: DocumentHead = {
  title: 'Contact',
  meta: [
    {
      name: 'Contact',
      content: 'Contact description',
    },
  ],
};
