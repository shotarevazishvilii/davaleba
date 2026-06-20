'use client';

import { Link } from '@/i18n/navigation';
import { useSelectedStore } from '@/store/useSelectedStore';

interface PaginationProps {
  totalPages: number;
  query: string;
  currentPage: number;
  selectedId: number | null;
}

const Pagination = ({
  totalPages,
  query,
  currentPage,
  selectedId,
}: PaginationProps) => {
  const { selectedItems } = useSelectedStore();
  const isFlyoutOpen = selectedItems.length > 0;

  return (
    <div
      className={`mt-4 flex justify-center gap-2 ${isFlyoutOpen ? 'mb-30' : 'mb-5'}`}
    >
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <Link
            key={pageNumber}
            href={{
              pathname: '/',
              query: {
                q: query,
                page: String(pageNumber),
                ...(selectedId ? { selected: String(selectedId) } : {}),
              },
            }}
            scroll
            className={`rounded-full px-4 py-2 font-medium transition-colors ${
              pageNumber === currentPage
                ? 'bg-white text-black'
                : 'bg-[#2d3135] text-white hover:bg-[#383d42]'
            }`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
