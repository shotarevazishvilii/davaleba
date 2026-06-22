'use client';

import { refreshSearchAction } from '@/actions/search';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface HomeActionsProps {
  query: string;
  page: number;
  selectedId: number | null;
}

const HomeActions = ({ query, page, selectedId }: HomeActionsProps) => {
  const t = useTranslations('Home');
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        className="pointer fixed right-4 bottom-10 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        {t('testError')}
      </button>
      <form action={refreshSearchAction} className="pointer fixed bottom-10 left-4">
        <input type="hidden" name="query" value={query} />
        <input type="hidden" name="page" value={String(page)} />
        {selectedId ? (
          <input type="hidden" name="selected" value={String(selectedId)} />
        ) : null}
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {t('refresh')}
        </button>
      </form>
    </>
  );
};

export default HomeActions;
