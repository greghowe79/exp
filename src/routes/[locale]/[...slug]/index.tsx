import { component$ } from '@builder.io/qwik';
import { type RequestEvent, useLocation } from '@builder.io/qwik-city';
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
import { _, setLocaleGetter } from 'compiled-i18n';

export const onGet = async ({ cookie, redirect, params }: RequestEvent) => {
  const locale = params.locale || 'it-IT';
  const slugParam = params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];

  setLocaleGetter(() => locale);

  if (slug.startsWith('.well-known')) {
    return;
  }

  if (slug === _('slug_dashboard')) {
    const token = cookie.get('server-access-token')?.value;

    if (!token) {
      throw redirect(302, `/${locale}/${_('slug_login')}/`);
    }

    try {
      const user = await verifyTokenWithSupabase(token);
      if (!user.id) {
        throw redirect(302, `/${locale}/${_('slug_login')}/`);
      }
    } catch {
      throw redirect(302, `/${locale}/${_('slug_login')}/`);
    }
  }
};

export default component$(() => {
  const loc = useLocation();
  const lang = loc.params.locale;
  const slugParam = loc.params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];
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
    case 'dashboard':
      return <Dashboard />;
    case `reset`:
      return <ResetPassword />;
    case `update`:
      return <UpdatePassword />;
    default:
      return <h1>404 - Page Not Found</h1>;
  }
});
