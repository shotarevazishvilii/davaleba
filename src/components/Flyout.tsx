'use client';

import {
  downloadCsvAction,
  type CsvDownloadState,
} from '@/actions/csv';
import { useSelectedStore } from '@/store/useSelectedStore';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

const initialState: CsvDownloadState = {
  csv: null,
  filename: null,
  error: null,
};

const Flyout = () => {
  const t = useTranslations('Flyout');
  const { selectedItems, clearAll } = useSelectedStore();
  const [state, formAction, isPending] = useActionState(
    downloadCsvAction,
    initialState
  );

  useEffect(() => {
    if (!state.csv || !state.filename) return;

    const blob = new Blob([state.csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = state.filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [state.csv, state.filename]);

  if (selectedItems.length === 0) return null;

  return (
    <div className="animate-fade-in-up fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-2xl border border-gray-700/50 bg-[#1e2225]/80 px-6 py-4 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <span className="text-sm font-medium text-gray-200 sm:text-base">
          {t('selected', { count: selectedItems.length })}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={clearAll}
          className="rounded-xl px-4 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white"
        >
          {t('unselectAll')}
        </button>
        <form action={formAction}>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(selectedItems)}
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-95 disabled:opacity-60"
          >
            <span>{t('downloadCsv')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Flyout;
