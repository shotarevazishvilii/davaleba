import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-800/90 backdrop-blur-md border-b border-zinc-700">
      <div className="flex h-14 items-center justify-center gap-12">
        <Link
          to="/"
          className="text-zinc-100 hover:text-white text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-zinc-100 hover:text-white text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105"
        >
          About
        </Link>
        <button
          onClick={toggleTheme}
          className="text-zinc-100 hover:text-white text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 cursor-pointer"
        >
          {theme === 'dark' ? ' Light' : ' Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
