import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Flyout from '../components/Flyout';
import { useSelectedStore } from '../store/useSelectedStore';

const mockSongs = [
  {
    trackId: 1,
    trackName: 'HUMBLE.',
    artistName: 'Kendrick Lamar',
    collectionName: 'DAMN.',
    artworkUrl100: 'https://example.com/1.jpg',
  },
  {
    trackId: 2,
    trackName: 'DNA.',
    artistName: 'Kendrick Lamar',
    collectionName: 'DAMN.',
    artworkUrl100: 'https://example.com/2.jpg',
  },
];

describe('Flyout', () => {
  beforeEach(() => {
    useSelectedStore.setState({ selectedItems: [] });
  });

  it('renders nothing when no items are selected', () => {
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when at least one item is selected', () => {
    useSelectedStore.setState({ selectedItems: [mockSongs[0]] });
    render(<Flyout />);
    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
  });

  it('shows correct count for multiple items', () => {
    useSelectedStore.setState({ selectedItems: mockSongs });
    render(<Flyout />);
    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });

  it('renders Unselect all button', () => {
    useSelectedStore.setState({ selectedItems: [mockSongs[0]] });
    render(<Flyout />);
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
  });

  it('renders Download button', () => {
    useSelectedStore.setState({ selectedItems: [mockSongs[0]] });
    render(<Flyout />);
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('clears all items when Unselect all is clicked', () => {
    useSelectedStore.setState({ selectedItems: mockSongs });
    render(<Flyout />);
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it('triggers download when Download button is clicked', () => {
    const createObjectURL = vi.fn(() => 'blob:mock');
    const revokeObjectURL = vi.fn();
    window.URL.createObjectURL = createObjectURL;
    window.URL.revokeObjectURL = revokeObjectURL;

    useSelectedStore.setState({ selectedItems: mockSongs });
    render(<Flyout />);
    fireEvent.click(screen.getByRole('button', { name: /download/i }));
    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });
});
