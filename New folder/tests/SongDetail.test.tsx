import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SongDetail from '../components/SongDetail';
import * as songsApi from '../api/songs';

const mockSong = {
  trackId: 1,
  trackName: 'Lose Yourself',
  artistName: 'Eminem',
  collectionName: 'Test Album',
  artworkUrl100: 'https://example.com/100x100bb.jpg',
  primaryGenreName: 'Pop',
  previewUrl: 'https://example.com/preview.mp3',
  releaseDate: '2021-01-01',
  trackTimeMillis: 200000,
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

const renderSongDetail = (id = '1', initialEntry = `/details/${id}`) => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/details/:id" element={<SongDetail />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('SongDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a loading spinner while fetching', () => {
    vi.spyOn(songsApi, 'fetchSongById').mockReturnValue(new Promise(() => {}));
    renderSongDetail();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders all song fields after a successful fetch', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    renderSongDetail();

    await waitFor(() =>
      expect(screen.getByText('Lose Yourself')).toBeInTheDocument()
    );
    expect(screen.getByText('Eminem')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Pop')).toBeInTheDocument();
  });

  it('replaces 100x100 with 600x600 in the artwork URL', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    renderSongDetail();

    await waitFor(() => screen.getByRole('img'));
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/600x600bb.jpg'
    );
  });

  it('sets the img alt to the artist name', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    renderSongDetail();

    await waitFor(() => screen.getByRole('img'));
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Eminem');
  });

  it('renders nothing when the fetch rejects with an Error', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockRejectedValue(
      new Error('Not found')
    );
    renderSongDetail();

    await waitFor(() => expect(songsApi.fetchSongById).toHaveBeenCalledWith(1));
    expect(screen.queryByText('Lose Yourself')).not.toBeInTheDocument();
  });

  it('renders nothing when the fetch rejects with a non-Error value', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockRejectedValue('network failure');
    renderSongDetail();

    await waitFor(() => expect(songsApi.fetchSongById).toHaveBeenCalledWith(1));
    expect(screen.queryByText('Lose Yourself')).not.toBeInTheDocument();
  });

  it('calls fetchSongById with the numeric id from the URL', async () => {
    const spy = vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    renderSongDetail('42', '/details/42');

    await waitFor(() => expect(spy).toHaveBeenCalledWith(42));
  });

  it('close button navigates back to "/"', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    renderSongDetail();

    await waitFor(() => screen.getByText('Lose Yourself'));
    fireEvent.click(screen.getByRole('button', { name: /✕/i }));
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('preserves query params in the URL when closing', async () => {
    vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);
    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/1?query=eminem&page=2']}>
          <Routes>
            <Route path="/details/:id" element={<SongDetail />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText('Lose Yourself'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('does not refetch same song detail when reopened — serves from cache', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: 5 * 60 * 1000 },
      },
    });

    const spy = vi.spyOn(songsApi, 'fetchSongById').mockResolvedValue(mockSong);

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<SongDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    rerender(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<SongDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
  });
});
