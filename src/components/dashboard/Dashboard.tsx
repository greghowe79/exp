import { component$, useStyles$ } from '@builder.io/qwik';
import { _, getLocale } from 'compiled-i18n';
import styles from './styles.css?inline';

import UserProfileForm from '../user-profile-form/UserProfileForm';
import { Link } from '@builder.io/qwik-city';

const Dashboard = component$(() => {
  useStyles$(styles);
  const currentLocale = getLocale();
  return (
    <main>
      <h1 class="sr-only">Titolo</h1>
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <UserProfileForm />
    </main>
  );
});

export default Dashboard;
