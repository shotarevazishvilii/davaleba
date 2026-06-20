import { useSelectedStore } from '../store/useSelectedStore';

const Flyout = () => {
  const { selectedItems, clearAll } = useSelectedStore();

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    const header = 'trackId,trackName,artistName,collectionName';
    const rows = selectedItems.map(
      (i) =>
        `${i.trackId},"${i.trackName}","${i.artistName}","${i.collectionName}"`
    );
    const csv = [header, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 bg-[#1e2225]/80 backdrop-blur-md border border-gray-700/50 px-6 py-4 flex items-center justify-between rounded-2xl shadow-2xl animate-fade-in-up">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-gray-200 font-medium text-sm sm:text-base">
          {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
          selected
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={clearAll}
          className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2"
        >
          <span>Download CSV</span>
        </button>
      </div>
    </div>
  );
};

export default Flyout;
