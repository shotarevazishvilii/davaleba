'use client';

import { refreshSearchAction } from '@/actions/search';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

interface RefreshButtonProps {
  query: string;
  page: number;
  selectedId: number | null;
  children: ReactNode;
}

const RefreshButton = ({
  query,
  page,
  selectedId,
  children,
}: RefreshButtonProps) => {
  const t = useTranslations('ErrorCard');

  return (
    <form action={refreshSearchAction}>
      <input type="hidden" name="query" value={query} />
      <input type="hidden" name="page" value={String(page)} />
      {selectedId ? (
        <input type="hidden" name="selected" value={String(selectedId)} />
      ) : null}
      <div className="flex flex-col items-center">
        {children}
        <button
          type="submit"
          className="mt-4 rounded-full bg-red-600 px-8 py-2.5 font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-red-500 active:scale-95"
        >
          {t('tryAgain')}
        </button>
      </div>
    </form>
  );
};

export default RefreshButton;
