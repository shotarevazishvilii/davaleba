import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="pt-24 px-4">
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border-2 border-zinc-800 max-w-md mx-auto text-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <h1 className="text-white font-bold text-4xl mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-zinc-300 font-semibold text-lg mb-2">
          Page not found
        </h2>
        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
          The page you are looking for doesnt exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-zinc-100 hover:bg-white text-zinc-900 px-8 py-2.5 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-black/20"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
