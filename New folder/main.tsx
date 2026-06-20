import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundry.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL_MS) || 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
      gcTime: CACHE_TTL,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
