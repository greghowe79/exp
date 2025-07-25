import { type RequestHandler } from '@builder.io/qwik-city';
import { supabase } from '~/lib/db';
import { _, setLocaleGetter } from 'compiled-i18n';

export const onGet: RequestHandler = async ({ query, json }) => {
  const q = query.get('q')?.toLowerCase().trim() || '';
  const currentLocale = query.get('locale') || 'it-IT';
  setLocaleGetter(() => currentLocale);

  if (!q) {
    json(200, { suggestions: [] });
    return;
  }

  const terms = q.split(/\s+/).filter(Boolean);

  const searchableFields = [
    'first_name',
    'last_name',
    'job_title',
    'position',
    'service_title',
    'service_primary_name',
    'service_secondary_name',
  ];

  // Creo una stringa OR con tutti i termini e campi
  const orConditions = terms.flatMap((term) => searchableFields.map((field) => `${field}.ilike.%${term}%`)).join(',');

  const { data, error } = await supabase
    .from('professionals')
    .select('id, first_name, last_name, job_title, position, img_url')
    .or(orConditions)
    .limit(50);

  if (error) {
    console.error('Supabase error:', error);
    json(500, { error: 'Errore durante la ricerca' });
    return;
  }

  const filtered = data.filter((item) =>
    terms.every((term) =>
      searchableFields.some((field) => {
        const value = (item[field as keyof typeof item] ?? '').toLowerCase();

        const words = value.split(/\s+/);

        return words.some((word: string) => word.startsWith(term));
      })
    )
  );

  if (filtered.length === 0) {
    json(200, {
      suggestions: [],
      message: `${_('no_search_results')} "${q}"`,
    });
    return;
  }

  json(200, {
    suggestions: filtered.slice(0, 6).map((p) => ({
      id: p.id,
      name: `${p.first_name} ${p.last_name.charAt(0)}.`,
      job_title: p.job_title,
      position: p.position,
      img_url: p.img_url,
    })),
  });
};
