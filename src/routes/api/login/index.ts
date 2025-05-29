import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, cookie, json }) => {
  const body = await request.json();
  if (!body?.accessToken || !body?.refreshToken) {
    json(401, { message: 'healthMissing token(s)' });
  }

  const { accessToken, refreshToken } = body;

  const dateAccess = new Date();
  const dateRefresh = new Date();

  dateAccess.setHours(dateAccess.getHours() + 1);
  dateRefresh.setDate(dateRefresh.getDate() + 1);
  cookie.set('server-access-token', accessToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: dateAccess,
    sameSite: 'lax',
    path: '/',
  });

  cookie.set('server-refresh-token', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: dateRefresh,
    sameSite: 'lax',
    path: '/',
  });

  json(200, { message: 'Tokens stored' });
};
