import Card from './Card';
import { type Song } from '../api/songs';
import ErrorCard from './ErrorCard';

interface CardListProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  onReset: () => void;
}

const CardList = ({ songs, loading, error, onReset }: CardListProps) => {
  if (loading)
    return (
      <div className="flex justify-center items-center p-20">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    );

  if (error) return <ErrorCard onReset={onReset} errorMessage={error} />;

  if (songs.length === 0)
    return (
      <ErrorCard
        onReset={onReset}
        errorMessage="No songs found. Try a different search term."
      />
    );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {songs.map((song) => (
        <Card
          trackId={song.trackId}
          key={song.trackId}
          image={song.artworkUrl100}
          artistName={song.artistName}
          songName={song.trackName}
          collectionName={song.collectionName}
        />
      ))}
    </div>
  );
};

export default CardList;
