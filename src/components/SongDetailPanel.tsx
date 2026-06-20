import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { type Song } from '@/api/songs';
import { getTranslations } from 'next-intl/server';

interface SongDetailPanelProps {
  song: Song | null;
  query: string;
  page: number;
}

const SongDetailPanel = async ({
  song,
  query,
  page,
}: SongDetailPanelProps) => {
  const t = await getTranslations('SongDetail');

  if (!song) {
    return (
      <aside className="flex w-md items-center justify-center py-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-white" />
      </aside>
    );
  }

  const imageUrl = song.artworkUrl100.replace('100x100', '600x600');

  return (
    <aside className="flex w-md animate-in flex-col border-l border-white/10 py-4 duration-300 slide-in-from-right">
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#2d3135] shadow-2xl">
        <Link
          href={{
            pathname: '/',
            query: { q: query, page: String(page) },
          }}
          scroll={false}
          className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[10px] text-white backdrop-blur-md transition-all hover:bg-black/60"
          aria-label="Close details"
        >
          ✕
        </Link>

        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={song.artistName}
            fill
            sizes="400px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 from-[#2d3135] via-transparent to-transparent opacity-40" />
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="min-w-0">
            <h2 className="mb-1 line-clamp-2 text-lg leading-tight font-bold text-white">
              {song.trackName}
            </h2>
            <p className="truncate text-sm font-medium text-blue-400">
              {song.artistName}
            </p>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                {t('album')}
              </span>
              <p className="line-clamp-2 text-xs leading-relaxed text-gray-300 italic">
                {song.collectionName}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                {t('genre')}
              </span>
              <span className="w-fit rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-400">
                {song.primaryGenreName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SongDetailPanel;
