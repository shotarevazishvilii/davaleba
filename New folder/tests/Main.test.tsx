import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from '../pages/Main';

vi.mock('../api/songs.ts', () => ({
  fetchSongs: vi.fn(),
}));

import { fetchSongs } from '../api/songs';
const mockFetchSongs = vi.mocked(fetchSongs);

const mockSongs = [
  {
    trackId: 1,
    trackName: 'HUMBLE.',
    artistName: 'Kendrick Lamar',
    collectionName: 'DAMN.',
    artworkUrl100: 'https://example.com/1.jpg',
    primaryGenreName: 'Hip-Hop',
    previewUrl: 'https://example.com/p1.mp3',
    releaseDate: '2017-04-14T07:00:00Z',
    trackTimeMillis: 177000,
  },
  {
    trackId: 2,
    trackName: 'DNA.',
    artistName: 'Kendrick Lamar',
    collectionName: 'DAMN.',
    artworkUrl100: 'https://example.com/2.jpg',
    primaryGenreName: 'Hip-Hop',
    previewUrl: 'https://example.com/p2.mp3',
    releaseDate: '2017-04-14T07:00:00Z',
    trackTimeMillis: 185000,
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );

  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('Main', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the app heading', () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    expect(
      screen.getByRole('heading', { name: /music search/i })
    ).toBeInTheDocument();
  });

  it('calls fetchSongs on mount with default term "rap" when localStorage is empty', async () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(mockFetchSongs).toHaveBeenCalledWith('rap');
    });
  });

  it('calls fetchSongs on mount with saved query from localStorage', async () => {
    localStorage.setItem('searchQuery', JSON.stringify('eminem'));
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(mockFetchSongs).toHaveBeenCalledWith('eminem');
    });
  });

  it('populates search input with saved localStorage query', () => {
    localStorage.setItem('searchQuery', JSON.stringify('drake'));
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    expect(screen.getByRole('textbox')).toHaveValue('drake');
  });

  it('shows loading spinner while fetching', () => {
    mockFetchSongs.mockReturnValue(new Promise(() => {}));
    const { container } = render(<Main />, { wrapper: createWrapper() });
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows song cards after successful fetch', async () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByText('HUMBLE.')).toBeInTheDocument();
      expect(screen.getByText('DNA.')).toBeInTheDocument();
    });
  });

  it('shows error message when fetchSongs rejects', async () => {
    mockFetchSongs.mockRejectedValue(new Error('Network failure'));
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByText('Network failure')).toBeInTheDocument();
    });
  });

  it('shows empty state when fetchSongs returns empty array', async () => {
    mockFetchSongs.mockResolvedValue([]);
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByText(/no songs found/i)).toBeInTheDocument();
    });
  });

  it('calls fetchSongs with new query when user searches', async () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'travis scott');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(mockFetchSongs).toHaveBeenCalledWith('travis scott');
    });
  });

  it('saves search query to localStorage when user searches', async () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'kanye');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe(JSON.stringify('kanye'));
  });

  it('does not call fetchSongs again if search query has not changed', async () => {
    localStorage.setItem('searchQuery', JSON.stringify('rap'));
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });

    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledTimes(1));
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockFetchSongs).toHaveBeenCalledTimes(1);
  });

  it('re-fetches songs when Try Again is clicked after error', async () => {
    mockFetchSongs.mockRejectedValueOnce(new Error('Oops'));
    render(<Main />, { wrapper: createWrapper() });
    await waitFor(() => screen.getByText('Oops'));

    mockFetchSongs.mockResolvedValue(mockSongs);
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByText('HUMBLE.')).toBeInTheDocument();
    });
  });

  it('renders the Test Error button', () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    expect(
      screen.getByRole('button', { name: /test error/i })
    ).toBeInTheDocument();
  });

  it('renders the Refresh button', () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });

  it('refetches when Refresh button is clicked', async () => {
    mockFetchSongs.mockResolvedValue(mockSongs);
    render(<Main />, { wrapper: createWrapper() });

    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledTimes(1));
    await userEvent.click(screen.getByRole('button', { name: /refresh/i }));

    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledTimes(2));
  });

  it('does not refetch same query twice when navigating back — serves from cache', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: 5 * 60 * 1000 },
      },
    });

    mockFetchSongs.mockResolvedValue(mockSongs);

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MemoryRouter>
    );

    const { rerender } = render(<Main />, { wrapper: Wrapper });
    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledTimes(1));

    rerender(<Main />);
    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledTimes(1));
  });
});
