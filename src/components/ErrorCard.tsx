'use client';

import { useTranslations } from 'next-intl';

interface ErrorCardProps {
  errorMessage: string;
  onReset?: () => void;
}

const ErrorCard = ({ errorMessage, onReset }: ErrorCardProps) => {
  const t = useTranslations('ErrorCard');

  return (
    <div className="mx-auto my-10 flex max-w-md flex-col items-center justify-center rounded-2xl border-2 border-red-900/50 bg-[#2a1a1a] p-8 text-center shadow-[0_0_30px_rgba(220,38,38,0.15)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-red-600/20">
        <span className="text-2xl font-bold text-red-500">!</span>
      </div>

      <h2 className="mb-2 text-xl font-bold tracking-tight text-red-500">
        {t('title')}
      </h2>

      <p className="mb-6 text-sm leading-relaxed text-red-200/60">
        {errorMessage}
      </p>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-red-600 px-8 py-2.5 font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-red-500 active:scale-95"
        >
          {t('tryAgain')}
        </button>
      ) : null}
    </div>
  );
};

export default ErrorCard;
