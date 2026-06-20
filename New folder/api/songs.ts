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
    `${BASE_URL}/search?term=${encodeURIComponent(term)}&entity=song&limit=48`
  );

  if (!res.ok)
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);

  const data: ItunesResponse = await res.json();
  return data.results;
}

export async function fetchSongById(id: number): Promise<Song> {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  if (!res.ok)
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  const data: ItunesResponse = await res.json();
  return data.results[0];
}
