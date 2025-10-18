import { type RequestHandler } from '@builder.io/qwik-city';
import { supabase } from '~/lib/db';
import { _ } from 'compiled-i18n';

export const onGet: RequestHandler = async ({ query, json, locale }) => {
  const q = query.get('q')?.toLowerCase().trim() || '';
  const currentLocale = query.get('locale') || 'it_IT';
  //setLocaleGetter(() => currentLocale);
  locale(currentLocale);

  const maxPerPage = 12; // massimo risultati per pagina
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
