import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

const defaultProps = {
  trackId: 1,

  image: 'https://example.com/image.jpg',
  artistName: 'Kendrick Lamar',
  songName: 'HUMBLE.',
  collectionName: 'DAMN.',
};

describe('Card', () => {
  it('renders song name', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />{' '}
      </MemoryRouter>
    );
    expect(screen.getByText('HUMBLE.')).toBeInTheDocument();
  });

  it('renders artist name', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />{' '}
      </MemoryRouter>
    );
    expect(screen.getByText('Kendrick Lamar')).toBeInTheDocument();
  });

  it('renders collection name', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />{' '}
      </MemoryRouter>
    );
    expect(screen.getByText('DAMN.')).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />{' '}
      </MemoryRouter>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Kendrick Lamar');
  });

  it('renders with empty strings without crashing', () => {
    render(
      <MemoryRouter>
        <Card
          trackId={0}
          image=""
          artistName=""
          songName=""
          collectionName=""
        />
      </MemoryRouter>
    );
  });
});
