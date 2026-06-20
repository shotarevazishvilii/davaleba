import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelectedStore } from '../store/useSelectedStore';

interface CardProps {
  image: string;
  artistName: string;
  songName: string;
  collectionName: string;
  trackId: number;
}

const Card = ({
  image,
  artistName,
  songName,
  collectionName,
  trackId,
}: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedItems, addItem, removeItem } = useSelectedStore();

  const isSelected = selectedItems.some((i) => i.trackId === trackId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    navigate(`/details/${trackId}?${searchParams.toString()}`);
    window.scrollTo(0, 0);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
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
    <div
      onClick={handleClick}
      className="w-full group bg-[#2d3135] rounded-2xl p-4 transition-all duration-300 ease-in-out hover:bg-[#383d42] shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={image.replace('100x100', '600x600')}
          alt={artistName}
          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex justify-between flex-col items-start gap-2">
        <h3 className="text-white font-bold text-lg truncate leading-tight text-wrap">
          {songName}
        </h3>
        <p className="text-gray-400 text-sm mt-1 truncate text-wrap">
          {artistName}
        </p>
        <p className="text-gray-500 text-xs text-wrap">{collectionName}</p>
        <label
          className="flex items-center gap-2 mt-1 cursor-pointer select-none "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckbox}
              className="peer appearance-none w-5 h-5 border-2 border-gray-500 rounded bg-transparent checked:bg-blue-500 checked:border-blue-500 transition-colors duration-200 cursor-pointer"
            />
            <div className="absolute top-1 left-1.75 w-1.25 h-2.25 border-r-2 border-b-2 border-white rotate-45 scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none" />
          </div>
          <span className="text-gray-400 text-sm peer-checked:text-white">
            Select Track
          </span>
        </label>
      </div>
    </div>
  );
};

export default Card;
