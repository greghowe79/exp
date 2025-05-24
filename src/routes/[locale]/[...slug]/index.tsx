import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { About } from '~/components/about/About';
import { Services } from '~/components/services/Services';
import { Contact } from '~/components/contact/Contact';
import { resolvePageKey } from '~/lib/pageMap';
import { Login } from '~/components/login/Login';
import { SignUp } from '~/components/signup/SignUp';

import Dashboard from '~/components/dashboard/Dashboard';
import { ResetPassword } from '~/components/reset-password/ResetPassword';
import { UpdatePassword } from '~/components/update-password/UpdatePassword';

export default component$(() => {
  const loc = useLocation();
  const lang = loc.params.locale;
  const slugParam = loc.params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];
  const userId = slugArr[0].split('/')[1];

  const pageKey = resolvePageKey(slug, lang);

  switch (pageKey) {
    case 'about':
      return <About />;
    case 'services':
      return <Services />;
    case 'contact':
      return <Contact />;
    case 'login':
      return <Login />;
    case 'signup':
      return <SignUp />;
    case `dashboard`:
      return userId ? <Dashboard userId={userId} /> : <h1>404 - Page Not Found</h1>;
    case `reset`:
      return <ResetPassword />;
    case `update`:
      return <UpdatePassword />;
    default:
      return <h1>404 - Page Not Found</h1>;
  }
});
