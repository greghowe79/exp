import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { About } from '~/components/about/About';
import { Services } from '~/components/services/Services';
import { Contact } from '~/components/contact/Contact';
import { resolvePageKey } from '~/lib/pageMap';
import { Login } from '~/components/login/Login';
import { SignUp } from '~/components/signup/SignUp';
import Dashboard from '~/components/dashboard/Dashboard';
import { ResetPassword } from '~/components/reset-password/ResetPassword';
import { UpdatePassword } from '~/components/update-password/UpdatePassword';
import { verifyTokenWithSupabase } from '~/lib/auth-utils';
//import { _ } from 'compiled-i18n';

export const useAuthCheck = routeLoader$<{
  isAuthenticated: boolean;
  userId: string | null;
}>(async (event) => {
  const token = event.cookie.get('server-access-token')?.value;

  if (!token) {
    return { isAuthenticated: false, userId: null };
  }

  try {
    const user = await verifyTokenWithSupabase(token);
    return { isAuthenticated: true, userId: user.id };
  } catch {
    return { isAuthenticated: false, userId: null };
  }
});

export default component$(() => {
  const loc = useLocation();
  const lang = loc.params.locale;
  const slugParam = loc.params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];
  const userIdParam = slugArr[0].split('/')[1];
  const pageKey = resolvePageKey(slug, lang);
  const auth = useAuthCheck();
  //const nav = useNavigate();

  // useVisibleTask$(async () => {
  //   if (!auth.value.isAuthenticated) await nav(`/${lang}/${_('slug_login')}/`);
  // });

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
    // case `dashboard`:
    //   return auth.value.isAuthenticated && auth.value.userId && auth.value.userId === userIdParam ? (
    //     <Dashboard userId={auth.value.userId} />
    //   ) : (
    //     <h1>403 - Access Denied</h1>
    //   );

    case 'dashboard':
      if (auth.value.isAuthenticated && auth.value.userId && auth.value.userId === userIdParam) {
        return <Dashboard userId={auth.value.userId} />;
      } else {
        // redirect o messaggio di accesso negato

        return <h1>403 - Access Denied</h1>;
      }

    case `reset`:
      return <ResetPassword />;
    case `update`:
      return <UpdatePassword />;
    default:
      return <h1>404 - Page Not Found</h1>;
  }
});
