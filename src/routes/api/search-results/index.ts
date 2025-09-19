// // import { type RequestHandler } from '@builder.io/qwik-city';
// // import { supabase } from '~/lib/db';
// // import { _, setLocaleGetter } from 'compiled-i18n';

// // export const onGet: RequestHandler = async ({ query, json }) => {
// //   const q = query.get('q')?.toLowerCase().trim() || '';
// //   const currentLocale = query.get('locale') || 'it-IT';
// //   setLocaleGetter(() => currentLocale);

// //   if (!q) {
// //     json(200, { results: [] });
// //     return;
// //   }

// //   const terms = q.split(/\s+/).filter(Boolean);

// //   const searchableFields = [
// //     'first_name',
// //     'last_name',
// //     'job_title',
// //     'position',
// //     'service_title',
// //     'service_primary_name',
// //     'service_secondary_name',
// //   ];

// //   // Creo una stringa OR con tutti i termini e campi
// //   const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

// //   const { data, error } = await supabase
// //     .from('professionals')
// //     .select('id, first_name, last_name, job_title, position, img_url')
// //     .or(orConditions)
// //     .limit(50);

// //   if (error) {
// //     console.error('Supabase error:', error);
// //     json(500, { error: 'Errore durante la ricerca' });
// //     return;
// //   }

// //   const filtered = data.filter((item) =>
// //     terms.every((term) =>
// //       searchableFields.some((field) => {
// //         const value = (item[field as keyof typeof item] ?? '').toLowerCase();

// //         const words = value.split(/\s+/);

// //         return words.some((word: string) => word.startsWith(term));
// //       })
// //     )
// //   );

// //   if (filtered.length === 0) {
// //     json(200, {
// //       results: [],
// //       message: `${_('no_search_results')} "${q}"`,
// //     });
// //     return;
// //   }

// //   json(200, {
// //     results: filtered.map((p) => ({
// //       id: p.id,
// //       name: `${p.first_name} ${p.last_name.charAt(0)}.`,
// //       job_title: p.job_title,
// //       position: p.position,
// //       img_url: p.img_url,
// //     })),
// //   });
// // };

// // import { type RequestHandler } from '@builder.io/qwik-city';
// // import { supabase } from '~/lib/db';
// // import { _, setLocaleGetter } from 'compiled-i18n';

// // export const onGet: RequestHandler = async ({ query, json }) => {
// //   const q = query.get('q')?.toLowerCase().trim() || '';
// //   const currentLocale = query.get('locale') || 'it-IT';
// //   setLocaleGetter(() => currentLocale);

// //   if (!q) {
// //     json(200, { results: [] });
// //     return;
// //   }

// //   const terms = q
// //     .replace(/,/g, ' ') // Rimuove virgole
// //     .split(/\s+/) // Divide per spazi
// //     .filter(Boolean); // Rimuove stringhe vuote

// //   const searchableFields = [
// //     'first_name',
// //     'last_name',
// //     'job_title',
// //     'position',
// //     'service_title',
// //     'service_primary_name',
// //     'service_secondary_name',
// //   ];

// //   // Costruisco condizioni OR da passare a Supabase
// //   const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

// //   const { data, error } = await supabase
// //     .from('professionals')
// //     .select('id, first_name, last_name, job_title, position, img_url')
// //     .or(orConditions)
// //     .limit(50);

// //   if (error) {
// //     console.error('Supabase error:', error);
// //     json(500, { error: 'Errore durante la ricerca' });
// //     return;
// //   }

// //   const filtered = data.filter((item) =>
// //     terms.every((term) =>
// //       searchableFields.some((field) => {
// //         const value = (item[field as keyof typeof item] ?? '').toLowerCase();
// //         return value.includes(term);
// //       })
// //     )
// //   );

// //   // Nessun filtro extra client-side, lasciamo gestire tutto a Supabase
// //   json(200, {
// //     results: filtered.map((p) => ({
// //       id: p.id,
// //       name: `${p.first_name} ${p.last_name.charAt(0)}.`,
// //       job_title: p.job_title,
// //       position: p.position,
// //       img_url: p.img_url,
// //     })),
// //   });
// // };

// import { type RequestHandler } from '@builder.io/qwik-city';
// import { supabase } from '~/lib/db';
// import { _, setLocaleGetter } from 'compiled-i18n';

// export const onGet: RequestHandler = async ({ query, json }) => {
//   const q = query.get('q')?.toLowerCase().trim() || '';
//   const currentLocale = query.get('locale') || 'it-IT';
//   const page = parseInt(query.get('page') || '1');
//   const limit = parseInt(query.get('limit') || '10');
//   const offset = (page - 1) * limit;
//   setLocaleGetter(() => currentLocale);

//   if (!q) {
//     json(200, { results: [] });
//     return;
//   }

//   const terms = q
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((term) => term.replace(/,/g, ''));

//   const searchableFields = [
//     'first_name',
//     'last_name',
//     'job_title',
//     'position',
//     'service_title',
//     'service_primary_name',
//     'service_secondary_name',
//     'description',
//   ];

//   // Query ampia con OR
//   const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

//   const { data, error, count } = await supabase
//     .from('professionals')
//     .select(
//       'id, first_name, last_name, job_title, position, img_url, service_title, service_primary_name, service_secondary_name, description, has_access',
//       { count: 'exact' }
//     )
//     .or(orConditions)
//     //.limit(100);
//     .range(offset, offset + limit - 1);

//   if (error) {
//     console.error('Supabase error:', error);
//     json(500, { error: 'Errore durante la ricerca' });
//     return;
//   }

//   // 🔍 Filtro lato codice: tutti i termini devono matchare almeno un campo
//   const filtered = data.filter((item) =>
//     terms.every((term) =>
//       searchableFields.some((field) => {
//         const value = (item[field as keyof typeof item] ?? '').toLowerCase();
//         const words = value.split(/\s+/);
//         return words.some((word: string) => word.startsWith(term));
//       })
//     )
//   );

//   if (filtered.length === 0) {
//     json(200, {
//       results: [],
//       message: `${_('no_search_results')} "${q}"`,
//     });
//     return;
//   }
//   const totalPages = Math.ceil((count ?? 0) / limit);
//   json(200, {
//     results: filtered.map((p) => ({
//       id: p.id,
//       first_name: p.first_name,
//       last_name: `${p.last_name.charAt(0)}.`,
//       job_title: p.job_title,
//       description: p.description,
//       position: p.position,
//       img_url: p.img_url,
//       has_access: p.has_access,
//     })),
//     page,
//     totalPages,
//   });
// };

// import { type RequestHandler } from '@builder.io/qwik-city';
// import { supabase } from '~/lib/db';
// import { _, setLocaleGetter } from 'compiled-i18n';

// export const onGet: RequestHandler = async ({ query, json }) => {
//   const q = query.get('q')?.toLowerCase().trim() || '';
//   const currentLocale = query.get('locale') || 'it-IT';
//   setLocaleGetter(() => currentLocale);

//   const maxPerPage = 9; // massimo risultati per pagina
//   let page = parseInt(query.get('page') || '1');

//   if (!q) {
//     json(200, { results: [], page: 1, totalPages: 1 });
//     return;
//   }

//   const terms = q
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((t) => t.replace(/,/g, ''));
//   const searchableFields = [
//     'first_name',
//     'last_name',
//     'job_title',
//     'position',
//     'service_title',
//     'service_primary_name',
//     'service_secondary_name',
//     'description',
//   ];

//   const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

//   // Recupera tutti i record matching
//   const { data, error, count } = await supabase
//     .from('professionals')
//     .select(
//       'id, first_name, last_name, job_title, position, img_url, service_title, service_primary_name, service_secondary_name, description, has_access',
//       { count: 'exact' }
//     )
//     .or(orConditions);

//   if (error) {
//     console.error('Supabase error:', error);
//     json(500, { error: 'Errore durante la ricerca' });
//     return;
//   }

//   const totalResults = count ?? 0;
//   const totalPages = Math.ceil(totalResults / maxPerPage);

//   // fallback se la pagina richiesta è maggiore del totale
//   if (page > totalPages) page = totalPages || 1;

//   // prendi i risultati corretti per la pagina
//   const offset = (page - 1) * maxPerPage;
//   const results = (data ?? []).slice(offset, offset + maxPerPage);

//   if (results.length === 0) {
//     json(200, {
//       results: [],
//       message: `${_('no_search_results')} "${q}"`,
//       page,
//       totalPages,
//     });
//     return;
//   }

//   json(200, {
//     results: results.map((p) => ({
//       id: p.id,
//       first_name: p.first_name,
//       last_name: `${p.last_name.charAt(0)}.`,
//       job_title: p.job_title,
//       description: p.description,
//       position: p.position,
//       img_url: p.img_url,
//       has_access: p.has_access,
//     })),
//     page,
//     totalPages,
//   });
// };

import { type RequestHandler } from '@builder.io/qwik-city';
import { supabase } from '~/lib/db';
import { _, setLocaleGetter } from 'compiled-i18n';

export const onGet: RequestHandler = async ({ query, json }) => {
  const q = query.get('q')?.toLowerCase().trim() || '';
  const currentLocale = query.get('locale') || 'it-IT';
  setLocaleGetter(() => currentLocale);

  const maxPerPage = 9; // massimo risultati per pagina
  let page = parseInt(query.get('page') || '1');

  if (!q) {
    json(200, { results: [], page: 1, totalPages: 1 });
    return;
  }

  const terms = q
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.replace(/,/g, ''));
  const searchableFields = [
    'first_name',
    'last_name',
    'job_title',
    'position',
    'service_title',
    'service_primary_name',
    'service_secondary_name',
    'description',
  ];

  // Query OR lato Supabase per limitare i record recuperati
  const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

  const { data, error } = await supabase
    .from('professionals')
    .select(
      'id, first_name, last_name, job_title, position, img_url, service_title, service_primary_name, service_secondary_name, description, has_access'
    )
    .or(orConditions);

  if (error) {
    console.error('Supabase error:', error);
    json(500, { error: 'Errore durante la ricerca' });
    return;
  }

  // 🔍 Filtro lato codice: tutti i termini devono matchare almeno un campo
  const filtered = data.filter((item) =>
    terms.every((term) =>
      searchableFields.some((field) => {
        const value = (item[field as keyof typeof item] ?? '').toLowerCase();
        const words = value.split(/\s+/);
        return words.some((word: string) => word.startsWith(term));
      })
    )
  );

  const totalResults = filtered.length;
  const totalPages = Math.ceil(totalResults / maxPerPage);

  if (page > totalPages) page = totalPages || 1;

  const offset = (page - 1) * maxPerPage;
  const results = filtered.slice(offset, offset + maxPerPage);

  if (results.length === 0) {
    json(200, {
      results: [],
      message: `${_('no_search_results')} "${q}"`,
      page,
      totalPages,
    });
    return;
  }

  json(200, {
    results: results.map((p) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: `${p.last_name.charAt(0)}.`,
      job_title: p.job_title,
      description: p.description,
      position: p.position,
      img_url: p.img_url,
      has_access: p.has_access,
    })),
    page,
    totalPages,
  });
};
