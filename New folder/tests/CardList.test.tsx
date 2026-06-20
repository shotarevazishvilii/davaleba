import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardList from '../components/CardList';
import type { Song } from '../api/songs';

const mockSongs: Song[] = [
  {
    trackId: 1,
    trackName: 'HUMBLE.',
    artistName: 'Kendrick Lamar',
    collectionName: 'DAMN.',
    artworkUrl100: 'https://example.com/1.jpg',
    primaryGenreName: 'Hip-Hop',
    previewUrl: 'https://example.com/preview1.mp3',
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
    previewUrl: 'https://example.com/preview2.mp3',
    releaseDate: '2017-04-14T07:00:00Z',
    trackTimeMillis: 185000,
  },
];

describe('CardList', () => {
  it('shows a loading spinner when loading is true', () => {
    const { container } = render(
      <CardList songs={[]} loading={true} error={null} onReset={() => {}} />
    );
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('does not show cards when loading', () => {
    render(
      <MemoryRouter>
        <CardList
          songs={mockSongs}
          loading={true}
          error={null}
          onReset={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText('HUMBLE.')).not.toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <CardList
        songs={[]}
        loading={false}
        error="Network error"
        onReset={() => {}}
      />
    );
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('shows empty state message when songs array is empty', () => {
    render(
      <CardList songs={[]} loading={false} error={null} onReset={() => {}} />
    );
    expect(screen.getByText(/no songs found/i)).toBeInTheDocument();
  });

  it('renders the correct number of cards', () => {
    render(
      <MemoryRouter>
        <CardList
          songs={mockSongs}
          loading={false}
          error={null}
          onReset={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('renders all song names', () => {
    render(
      <MemoryRouter>
        <CardList
          songs={mockSongs}
          loading={false}
          error={null}
          onReset={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('HUMBLE.')).toBeInTheDocument();
    expect(screen.getByText('DNA.')).toBeInTheDocument();
  });

  it('calls onReset when Try Again is clicked on error state', async () => {
    const onReset = vi.fn();
    render(
      <CardList songs={[]} loading={false} error="Oops" onReset={onReset} />
    );
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when Try Again is clicked on empty state', async () => {
    const onReset = vi.fn();
    render(
      <CardList songs={[]} loading={false} error={null} onReset={onReset} />
    );
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
