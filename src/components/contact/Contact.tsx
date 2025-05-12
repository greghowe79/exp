import { component$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';

export const Contact = component$(() => {
  return <h1>{_('page_contact_title')}</h1>;
});
