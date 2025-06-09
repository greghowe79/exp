import { component$, useContext } from '@builder.io/qwik';
import { UserSessionContext } from '~/root';

import UserProfileForm from '../user-profile-form/UserProfileForm';
import CardPreview from '../card-preview/CardPreview';

const Dashboard = component$(() => {
  const userSession = useContext(UserSessionContext);

  const hasPremium = userSession.plan === 'premium';

  return (
    <section class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Dashboard del Professionista</h1>

      <UserProfileForm />

      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-2">Anteprima Card</h2>
        <CardPreview />
      </div>

      <div class="mt-6 p-4 rounded bg-gray-100 text-sm">
        {hasPremium ? (
          <p>
            ✅ La tua pagina pubblica è attiva e visibile a: <code>/professionisti/{userSession.username}</code>
          </p>
        ) : (
          <p>🔒 Attiva il piano Premium per rendere pubblica la tua pagina personale.</p>
        )}
      </div>
    </section>
  );
});

export default Dashboard;
