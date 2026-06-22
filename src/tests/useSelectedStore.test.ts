import { describe, expect, it } from 'vitest';
import { useSelectedStore } from '@/store/useSelectedStore';

describe('useSelectedStore', () => {
  it('adds and removes selected items', () => {
    useSelectedStore.setState({ selectedItems: [] });

    useSelectedStore.getState().addItem({
      trackId: 1,
      trackName: 'Song',
      artistName: 'Artist',
      collectionName: 'Album',
      artworkUrl100: 'image.jpg',
    });

    expect(useSelectedStore.getState().selectedItems).toHaveLength(1);

    useSelectedStore.getState().removeItem(1);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });
});
