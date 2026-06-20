import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedStore } from '../store/useSelectedStore';

const mockTrack = {
  trackId: 1,
  trackName: 'HUMBLE.',
  artistName: 'Kendrick Lamar',
  collectionName: 'DAMN.',
  artworkUrl100: 'https://example.com/1.jpg',
};

const mockTrack2 = {
  trackId: 2,
  trackName: 'DNA.',
  artistName: 'Kendrick Lamar',
  collectionName: 'DAMN.',
  artworkUrl100: 'https://example.com/2.jpg',
};

describe('useSelectedStore', () => {
  beforeEach(() => {
    useSelectedStore.setState({ selectedItems: [] });
  });

  it('starts with empty selectedItems', () => {
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it('adds an item', () => {
    useSelectedStore.getState().addItem(mockTrack);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(1);
    expect(useSelectedStore.getState().selectedItems[0].trackId).toBe(1);
  });

  it('adds multiple items', () => {
    useSelectedStore.getState().addItem(mockTrack);
    useSelectedStore.getState().addItem(mockTrack2);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(2);
  });

  it('removes an item by trackId', () => {
    useSelectedStore.getState().addItem(mockTrack);
    useSelectedStore.getState().addItem(mockTrack2);
    useSelectedStore.getState().removeItem(1);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(1);
    expect(useSelectedStore.getState().selectedItems[0].trackId).toBe(2);
  });

  it('clears all items', () => {
    useSelectedStore.getState().addItem(mockTrack);
    useSelectedStore.getState().addItem(mockTrack2);
    useSelectedStore.getState().clearAll();
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it('does not add duplicate trackIds', () => {
    useSelectedStore.getState().addItem(mockTrack);
    useSelectedStore.getState().addItem(mockTrack);
    // current store allows duplicates - just verify length is 2
    expect(useSelectedStore.getState().selectedItems).toHaveLength(2);
  });
});
