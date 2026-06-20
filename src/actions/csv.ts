'use server';

export interface CsvTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
}

export interface CsvDownloadState {
  csv: string | null;
  filename: string | null;
  error: string | null;
}

const initialState: CsvDownloadState = {
  csv: null,
  filename: null,
  error: null,
};

export async function downloadCsvAction(
  _prevState: CsvDownloadState,
  formData: FormData
): Promise<CsvDownloadState> {
  try {
    const itemsJson = String(formData.get('items') ?? '[]');
    const items = JSON.parse(itemsJson) as CsvTrack[];

    if (!Array.isArray(items) || items.length === 0) {
      return { ...initialState, error: 'No items selected' };
    }

    const header = 'trackId,trackName,artistName,collectionName';
    const rows = items.map(
      (item) =>
        `${item.trackId},"${item.trackName.replace(/"/g, '""')}","${item.artistName.replace(/"/g, '""')}","${item.collectionName.replace(/"/g, '""')}"`
    );
    const csv = [header, ...rows].join('\n');

    return {
      csv,
      filename: `${items.length}_items.csv`,
      error: null,
    };
  } catch {
    return { ...initialState, error: 'Failed to generate CSV' };
  }
}
