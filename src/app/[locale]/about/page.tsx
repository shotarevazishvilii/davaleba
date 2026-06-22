import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-sm rounded-2xl border border-zinc-700 bg-zinc-800/90 p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
        <p className="mt-2 text-zinc-400">{t('author')}</p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
        >
          {t('courseLink')}
        </a>
      </div>
    </main>
  );
}
