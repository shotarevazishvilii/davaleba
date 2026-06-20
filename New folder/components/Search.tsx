import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

const Search = ({ onSearch, initialValue }: SearchProps) => {
  const [term, setTerm] = useState(initialValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleClick = () => {
    onSearch(term.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative flex items-center group">
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Artist for..."
          className="w-full bg-[#2d3135] text-white pl-5 pr-24 py-3 rounded-full border border-transparent focus:border-gray-500 focus:outline-none transition-all placeholder-gray-500"
        />

        <button
          className="absolute right-2 bg-[#d1d5db] hover:bg-white text-black px-6 py-1.5 rounded-full font-medium transition-colors"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
