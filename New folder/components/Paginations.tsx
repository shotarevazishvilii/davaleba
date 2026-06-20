import { useSearchParams } from 'react-router-dom';
import { useSelectedStore } from '../store/useSelectedStore';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(newPage),
    });
    window.scrollTo(0, 0);
  };

  const { selectedItems } = useSelectedStore();

  const isFlyoutOpen = selectedItems.length > 0;

  return (
    <div
      className={`flex justify-center gap-2 mt-4 ${isFlyoutOpen ? 'mb-30' : 'mb-5'}`}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            p === page
              ? 'bg-white text-black'
              : 'bg-[#2d3135] text-white hover:bg-[#383d42]'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
