'use client';

import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-zinc-700 bg-zinc-800/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-center gap-8 sm:gap-12">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-widest text-zinc-100 transition-all hover:scale-105 hover:text-white"
        >
          {t('home')}
        </Link>
        <Link
          href="/about"
          className="text-sm font-semibold uppercase tracking-widest text-zinc-100 transition-all hover:scale-105 hover:text-white"
        >
          {t('about')}
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="cursor-pointer text-sm font-semibold uppercase tracking-widest text-zinc-100 transition-all hover:scale-105 hover:text-white"
        >
          {theme === 'dark' ? t('light') : t('dark')}
        </button>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
