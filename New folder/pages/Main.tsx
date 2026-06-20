import { useState } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import { useSearchParams, useNavigate, useMatch } from 'react-router-dom';
import Pagination from '../components/Paginations';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Flyout from '../components/Flyout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSongs } from '../api/songs';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL_MS) || 5 * 60 * 1000;
const DEFAULT_QUERY = 'rap';

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useLocalStorage('searchQuery', DEFAULT_QUERY);
  const [errorTest, setErrorTest] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: songs = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['songs', query],
    queryFn: () => {
      console.log('fetching songs for:', query);
      return fetchSongs(query);
    },
    staleTime: CACHE_TTL,
    gcTime: CACHE_TTL,
  });

  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(songs.length / ITEMS_PER_PAGE);
  const currentSongs = songs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const navigate = useNavigate();
  const isDetailOpen = useMatch('/details/:id');

  const handleSearch = (q: string) => {
    if (q === query) return;
    setQuery(q);
    setSearchParams({ page: '1' });
  };

  const handleReset = () => {
    queryClient.invalidateQueries({ queryKey: ['songs', query] });
  };

  if (errorTest) throw new Error('Test error');

  return (
    <main
      onClick={() => {
        if (isDetailOpen) navigate(`/?${searchParams.toString()}`);
      }}
    >
      <header className="text-5xl text-center pt-20 font-semibold tracking-tight">
        <h1>Music Search</h1>
      </header>
      <div className="flex items-start justify-center">
        <Search onSearch={handleSearch} initialValue={query} />
      </div>
      <div className="flex items-start justify-center">
        <section className="flex-1">
          <CardList
            songs={currentSongs}
            loading={loading}
            error={error instanceof Error ? error.message : null}
            onReset={handleReset}
          />
          {songs.length > 0 && <Pagination totalPages={totalPages} />}
        </section>
        <Outlet />
      </div>
      <button
        onClick={() => setErrorTest(true)}
        className="pointer fixed bottom-10 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Test Error
      </button>
      <button
        onClick={handleReset}
        className="pointer fixed bottom-10 left-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Refresh
      </button>
      <Flyout />
    </main>
  );
};

export default Main;
