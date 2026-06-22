'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

export async function searchAction(
  _prevState: unknown,
  formData: FormData
) {
  const locale = await getLocale();
  const query = String(formData.get('query') ?? '').trim() || 'rap';

  redirect({
    href: {
      pathname: '/',
      query: { q: query, page: '1' },
    },
    locale,
  });
}

export async function refreshSearchAction(formData: FormData) {
  const locale = await getLocale();
  const query = String(formData.get('query') ?? 'rap');
  const page = String(formData.get('page') ?? '1');
  const selected = formData.get('selected');

  redirect({
    href: {
      pathname: '/',
      query: {
        q: query,
        page,
        ...(selected ? { selected: String(selected) } : {}),
      },
    },
    locale,
  });
}
