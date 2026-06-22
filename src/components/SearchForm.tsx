'use client';

import { searchAction } from '@/actions/search';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

interface SearchFormProps {
  initialQuery: string;
}

const SearchForm = ({ initialQuery }: SearchFormProps) => {
  const t = useTranslations('Home');
  const [, formAction, isPending] = useActionState(searchAction, null);

  return (
    <form action={formAction} className="mx-auto w-full max-w-2xl p-4">
      <div className="group relative flex items-center">
        <input
          type="text"
          name="query"
          defaultValue={initialQuery}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-full border border-transparent bg-[#2d3135] py-3 pr-24 pl-5 text-white transition-all placeholder:text-gray-500 focus:border-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-2 rounded-full bg-[#d1d5db] px-6 py-1.5 font-medium text-black transition-colors hover:bg-white disabled:opacity-60"
        >
          {t('search')}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
