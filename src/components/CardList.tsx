import Card from '@/components/Card';
import ErrorCard from '@/components/ErrorCard';
import RefreshButton from '@/components/RefreshButton';
import { type Song } from '@/api/songs';

interface CardListProps {
  songs: Song[];
  errorMessage: string | null;
  emptyMessage: string;
  query: string;
  page: number;
  selectedId: number | null;
}

const CardList = ({
  songs,
  errorMessage,
  emptyMessage,
  query,
  page,
  selectedId,
}: CardListProps) => {
  if (errorMessage) {
    return (
      <RefreshButton query={query} page={page} selectedId={selectedId}>
        <ErrorCard errorMessage={errorMessage} />
      </RefreshButton>
    );
  }

  if (songs.length === 0) {
    return (
      <RefreshButton query={query} page={page} selectedId={selectedId}>
        <ErrorCard errorMessage={emptyMessage} />
      </RefreshButton>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {songs.map((song) => (
        <Card
          key={song.trackId}
          trackId={song.trackId}
          image={song.artworkUrl100}
          artistName={song.artistName}
          songName={song.trackName}
          collectionName={song.collectionName}
          query={query}
          page={page}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default CardList;
