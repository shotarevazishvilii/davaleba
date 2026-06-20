import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchSongById } from '../api/songs';
import { useQuery } from '@tanstack/react-query';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL_MS) || 5 * 60 * 1000;

const SongDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: song,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['song', id],
    queryFn: () => {
      console.log('fetching song detail for id:', id);
      return fetchSongById(Number(id));
    },
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL,
    enabled: !!id,
  });

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  if (loading)
    return (
      <div className="w-md flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    );

  if (error || !song) return null;

  return (
    <aside className="w-md flex flex-col animate-in slide-in-from-right duration-300 py-4 border-l border-white/10">
      <div className=" bg-[#2d3135] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/5">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white w-7 h-7 rounded-full flex items-center justify-center transition-all border border-white/10 text-[10px]"
        >
          ✕
        </button>
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={song.artworkUrl100.replace('100x100', '600x600')}
            alt={song.artistName}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 from-[#2d3135] via-transparent to-transparent opacity-40" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
              {song.trackName}
            </h2>
            <p className="text-blue-400 font-medium text-sm truncate">
              {song.artistName}
            </p>
          </div>
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Album
              </span>
              <p className="text-gray-300 text-xs line-clamp-2 italic leading-relaxed">
                {song.collectionName}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Genre
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 text-[10px] w-fit">
                {song.primaryGenreName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SongDetail;
