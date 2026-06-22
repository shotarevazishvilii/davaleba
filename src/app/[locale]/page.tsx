import {
  fetchSongById,
  fetchSongs,
  paginateSongs,
  type Song,
} from '@/api/songs';
import CardList from '@/components/CardList';
import Flyout from '@/components/Flyout';
import HomeActions from '@/components/HomeActions';
import Pagination from '@/components/Pagination';
import SearchForm from '@/components/SearchForm';
import SongDetailPanel from '@/components/SongDetailPanel';
import { getTranslations } from 'next-intl/server';

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    selected?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: HomePageProps) {
  const t = await getTranslations('Home');
  const { q = 'rap', page = '1', selected } = await searchParams;
  const pageNumber = Number(page) || 1;
  const selectedId = selected ? Number(selected) : null;

  let songs: Song[] = [];
  let errorMessage: string | null = null;

  try {
    songs = await fetchSongs(q);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch songs';
  }

  const { currentSongs, totalPages, safePage } = paginateSongs(
    songs,
    pageNumber
  );

  const selectedSong =
    selectedId && !errorMessage ? await fetchSongById(selectedId) : null;

  return (
    <main>
      <header className="pt-20 text-center text-5xl font-semibold tracking-tight">
        <h1>{t('title')}</h1>
      </header>

      <div className="flex items-start justify-center">
        <SearchForm initialQuery={q} />
      </div>

      <div className="flex items-start justify-center">
        <section className="flex-1">
          <CardList
            songs={currentSongs}
            errorMessage={errorMessage}
            emptyMessage={t('noSongs')}
            query={q}
            page={safePage}
            selectedId={selectedId}
          />
          {songs.length > 0 && (
            <Pagination
              totalPages={totalPages}
              query={q}
              currentPage={safePage}
              selectedId={selectedId}
            />
          )}
        </section>
        {selectedId ? (
          <SongDetailPanel
            song={selectedSong}
            query={q}
            page={safePage}
          />
        ) : (
          <aside
            className="w-md flex flex-col py-4"
            aria-label="Song details panel"
          />
        )}
      </div>

      <HomeActions query={q} page={safePage} selectedId={selectedId} />
      <Flyout />
    </main>
  );
}
