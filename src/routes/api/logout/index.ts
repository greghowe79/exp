import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = ({ cookie, json }) => {
  try {
    cookie.delete('server-access-token', {
      path: '/',
      sameSite: 'lax',
    });
    cookie.delete('server-refresh-token', {
      path: '/',
      sameSite: 'lax',
    });
    json(200, { message: 'Logout eseguito con successo' });
  } catch (error) {
    json(500, { message: 'Errore durante il logout', error });
  }
};
