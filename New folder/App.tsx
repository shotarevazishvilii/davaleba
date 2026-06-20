import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import SongDetail from './components/SongDetail';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === 'light'
          ? 'bg-white text-black min-h-screen'
          : 'bg-zinc-900 text-white min-h-screen'
      }
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="details/:id" element={<SongDetail />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
