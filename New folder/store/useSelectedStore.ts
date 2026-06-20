import { create } from 'zustand';

interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
}

interface SelectedStore {
  selectedItems: Track[];
  addItem: (item: Track) => void;
  removeItem: (id: number) => void;
  clearAll: () => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
  selectedItems: [],
  addItem: (item) =>
    set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((i) => i.trackId !== id),
    })),
  clearAll: () => set({ selectedItems: [] }),
}));
