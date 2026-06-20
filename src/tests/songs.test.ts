import { describe, expect, it } from 'vitest';
import { paginateSongs, type Song } from '@/api/songs';

const mockSongs: Song[] = Array.from({ length: 24 }, (_, index) => ({
  trackId: index + 1,
  trackName: `Song ${index + 1}`,
  artistName: 'Artist',
  collectionName: 'Album',
  artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/100x100.jpg',
  primaryGenreName: 'Pop',
  previewUrl: '',
  releaseDate: '2020-01-01',
  trackTimeMillis: 180000,
}));

describe('paginateSongs', () => {
  it('returns first page of songs', () => {
    const result = paginateSongs(mockSongs, 1);
    expect(result.currentSongs).toHaveLength(12);
    expect(result.totalPages).toBe(2);
    expect(result.safePage).toBe(1);
  });

  it('clamps page number to valid range', () => {
    const result = paginateSongs(mockSongs, 99);
    expect(result.safePage).toBe(2);
    expect(result.currentSongs).toHaveLength(12);
  });
});
