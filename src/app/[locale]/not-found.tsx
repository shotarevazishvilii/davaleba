import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound');

  return (
    <main className="px-4 pt-24">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border-2 border-zinc-800 bg-zinc-900 p-8 text-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <h1 className="mb-2 text-4xl font-bold tracking-tighter text-white">
          {t('title')}
        </h1>
        <h2 className="mb-2 text-lg font-semibold text-zinc-300">
          {t('heading')}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-zinc-500">
          {t('description')}
        </p>
        <Link
          href="/"
          className="rounded-full bg-zinc-100 px-8 py-2.5 font-semibold text-zinc-900 shadow-lg shadow-black/20 transition-all hover:bg-white active:scale-95"
        >
          {t('goHome')}
        </Link>
      </div>
    </main>
  );
}
