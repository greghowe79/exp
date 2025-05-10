import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const Login = component$(() => {
  return (
    <div>
      <main id="contenuto-login" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Login Page</h1>
        <p>Qgdfgdgf gfdfgdfgdfgdfgdfgfg</p>
      </main>
    </div>
  );
});

export default Login;

export const head: DocumentHead = {
  title: 'Login',
  meta: [
    {
      name: 'Login',
      content: 'Login description',
    },
  ],
};
