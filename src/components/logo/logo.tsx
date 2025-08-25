import { component$ } from '@builder.io/qwik';

export const Logo = component$(() => {
  return <img alt="Qwik Logo" width={60} height={60} src="http://localhost:5173/logo.svg" />;
});
