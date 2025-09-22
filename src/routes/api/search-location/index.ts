import { type RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ query, json }) => {
  const q = query.get('q');
  if (!q || q.length < 3) {
    json(200, []);
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    q
  )}&format=json&addressdetails=1&limit=5&accept-language=it`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'my-qwik-app (alessandromosca3011@gmail.com)',
      },
    });

    if (!res.ok) {
      console.error('Errore Nominatim:', res.status, res.statusText);
      json(500, []);
      return;
    }

    const data = await res.json();
    json(200, data);
  } catch (err) {
    console.error('Errore fetch Nominatim:', err);
    json(500, []);
  }
};
