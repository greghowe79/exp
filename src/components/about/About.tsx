import { component$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';

export const About = component$(() => {
  return <h1>{_('page_about_title')}</h1>;
});
