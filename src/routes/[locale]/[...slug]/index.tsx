import { component$ } from '@builder.io/qwik';
import { type DocumentHead, type RequestEvent, useLocation } from '@builder.io/qwik-city';
import { About } from '~/components/about/About';
import { Services } from '~/components/services/Services';
import { Contact } from '~/components/contact/Contact';
import { resolvePageKey } from '~/lib/pageMap';
import { Login } from '~/components/login/Login';
import { SignUp } from '~/components/signup/SignUp';
import Dashboard from '~/components/dashboard/Dashboard';
import Preview from '~/components/preview/Preview';
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

  if (slug === _('slug_dashboard') || slug === _('slug_preview')) {
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
    case 'preview':
      return <Preview />;
    case `reset`:
      return <ResetPassword />;
    case `update`:
      return <UpdatePassword />;
    default:
      return <h1>404 - Page Not Found</h1>;
  }
});

export const head: DocumentHead = ({ params }) => {
  const slugParam = params.slug;
  const slugArr = Array.isArray(slugParam) ? slugParam : [slugParam];
  const slug = slugArr[0].split('/')[0];

  const pageKey = resolvePageKey(slug, params.locale);
  const key = typeof pageKey === 'string' ? pageKey : '';

  const titles: Record<string, string> = {
    about: _('page_about'),
    services: _('page_services'),
    contact: _('page_contact'),
    login: _('page_login'),
    signup: _('page_signup'),
    dashboard: _('page_dashboard'),
    preview: _('page_preview'),
    reset: _('page_reset'),
    update: _('page_update'),
  };

  const descriptions: Record<string, string> = {
    about: _('desc_about'),
    services: _('desc_services'),
    contact: _('desc_contact'),
    login: _('desc_login'),
    signup: _('desc_signup'),
    dashboard: _('desc_dashboard'),
    preview: _('desc_preview'),
    reset: _('desc_reset'),
    update: _('desc_update'),
  };

  return {
    title: titles[key] || 'Pagina',
    meta: [
      {
        name: 'description',
        content: descriptions[key] || 'Pagina del sito.',
      },
    ],
  };
};
