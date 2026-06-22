const BASE_URL = 'https://itunes.apple.com';

export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  primaryGenreName: string;
  previewUrl: string;
  releaseDate: string;
  trackTimeMillis: number;
}

interface ItunesResponse {
  resultCount: number;
  results: Song[];
}

export async function fetchSongs(term: string): Promise<Song[]> {
  const res = await fetch(
    `${BASE_URL}/search?term=${encodeURIComponent(term)}&entity=song&limit=48`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  const data: ItunesResponse = await res.json();
  return data.results;
}

export async function fetchSongById(id: number): Promise<Song | null> {
  const res = await fetch(`${BASE_URL}/lookup?id=${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  const data: ItunesResponse = await res.json();
  return data.results[0] ?? null;
}

export function paginateSongs(songs: Song[], page: number, itemsPerPage = 12) {
  const totalPages = Math.max(1, Math.ceil(songs.length / itemsPerPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const currentSongs = songs.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  return { currentSongs, totalPages, safePage };
}
