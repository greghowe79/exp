// import { type RequestHandler } from '@builder.io/qwik-city';
// import { supabase } from '~/lib/db';

// export const onGet: RequestHandler = async ({ query, json }) => {
//   const q = query.get('q')?.toLowerCase().trim() || '';

//   if (!q || q.length < 1) {
//     json(200, { suggestions: [] });
//     return;
//   }

//   // Query con più campi, filtro su più colonne usando 'or' per match parziali
//   const { data, error } = await supabase
//     .from('professionals')
//     .select('id, first_name, last_name, job_title, position, img_url, service_primary_name, service_secondary_name')
//     .or(
//       `first_name.ilike.%${q}%,last_name.ilike.%${q}%,job_title.ilike.%${q}%,position.ilike.%${q}%,service_title.ilike.%${q}%,service_primary_name.ilike.%${q}%,service_secondary_name.ilike.%${q}%`
//     )
//     .limit(6);

//   if (error) {
//     console.error('Supabase error:', error);
//     json(500, { error: 'Errore durante la ricerca' });
//     return;
//   }

//   json(200, {
//     suggestions: data.map((p) => ({
//       id: p.id,
//       name: `${p.first_name} ${p.last_name}`,
//       job_title: p.job_title,
//       position: p.position,
//       img_url: p.img_url,
//     })),
//   });
// };

import { type RequestHandler } from '@builder.io/qwik-city';
import { supabase } from '~/lib/db';

export const onGet: RequestHandler = async ({ query, json }) => {
  const q = query.get('q')?.toLowerCase().trim() || '';

  if (!q || q.length < 1) {
    json(200, { suggestions: [] });
    return;
  }

  const terms = q.split(/\s+/).filter(Boolean); // divide in parole chiave

  const searchableFields = [
    'first_name',
    'last_name',
    'job_title',
    'position',
    'service_title',
    'service_primary_name',
    'service_secondary_name',
  ];

  // Costruisci la query .or con ogni campo e ogni parola
  const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

  const { data, error } = await supabase
    .from('professionals')
    .select('id, first_name, last_name, job_title, position, img_url')
    .or(orConditions) // <-- match se almeno un termine è presente in un campo
    .limit(6);

  if (error) {
    console.error('Supabase error:', error);
    json(500, { error: 'Errore durante la ricerca' });
    return;
  }

  json(200, {
    suggestions: data.map((p) => ({
      id: p.id,
      name: `${p.first_name} ${p.last_name}`,
      job_title: p.job_title,
      position: p.position,
      img_url: p.img_url,
    })),
  });
};
