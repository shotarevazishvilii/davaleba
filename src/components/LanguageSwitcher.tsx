'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

const LanguageSwitcher = () => {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <label className="flex items-center gap-2 text-sm text-zinc-100">
      <span className="sr-only">{t('label')}</span>
      <select
        value={locale}
        onChange={handleChange}
        aria-label={t('label')}
        className="cursor-pointer rounded-md border border-zinc-600 bg-zinc-700 px-2 py-1 text-sm text-white"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
