'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useSelectedStore } from '@/store/useSelectedStore';
import { useTranslations } from 'next-intl';

interface CardProps {
  image: string;
  artistName: string;
  songName: string;
  collectionName: string;
  trackId: number;
  query: string;
  page: number;
  selectedId: number | null;
}

const Card = ({
  image,
  artistName,
  songName,
  collectionName,
  trackId,
  query,
  page,
}: CardProps) => {
  const t = useTranslations('Card');
  const { selectedItems, addItem, removeItem } = useSelectedStore();
  const isSelected = selectedItems.some((item) => item.trackId === trackId);
  const imageUrl = image.replace('100x100', '600x600');

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.checked) {
      addItem({
        trackId,
        trackName: songName,
        artistName,
        collectionName,
        artworkUrl100: image,
      });
    } else {
      removeItem(trackId);
    }
  };

  return (
    <div className="group w-full rounded-2xl bg-[#2d3135] p-4 shadow-lg transition-all duration-300 ease-in-out hover:bg-[#383d42]">
      <Link
        href={{
          pathname: '/',
          query: { q: query, page: String(page), selected: String(trackId) },
        }}
        scroll
        className="block"
      >
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={artistName}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-2">
          <h3 className="text-lg leading-tight font-bold text-wrap text-white">
            {songName}
          </h3>
          <p className="mt-1 text-sm text-wrap text-gray-400">{artistName}</p>
          <p className="text-xs text-wrap text-gray-500">{collectionName}</p>
        </div>
      </Link>

      <label
        className="mt-1 flex cursor-pointer items-center gap-2 select-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex h-5 w-5 items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckbox}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-500 bg-transparent transition-colors duration-200 checked:border-blue-500 checked:bg-blue-500"
          />
          <div className="pointer-events-none absolute top-1 left-1.75 h-2.25 w-1.25 scale-0 rotate-45 border-r-2 border-b-2 border-white transition-transform duration-200 peer-checked:scale-100" />
        </div>
        <span className="text-sm text-gray-400 peer-checked:text-white">
          {t('selectTrack')}
        </span>
      </label>
    </div>
  );
};

export default Card;
