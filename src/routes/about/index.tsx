import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const About = component$(() => {
  return (
    <div>
      <main id="contenuto-about" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>About Page</h1>
        <p>Qgdfgdgf gfdfgdfgdfgdfgdfgfg</p>
      </main>
    </div>
  );
});

export default About;

export const head: DocumentHead = {
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'About description',
    },
  ],
};
