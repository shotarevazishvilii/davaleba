import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeProvider';

import App from '../App';

vi.mock('../pages/Main', () => ({
  default: () => (
    <div>
      Main Page
      <Outlet />
    </div>
  ),
}));
vi.mock('../pages/About', () => ({ default: () => <div>About Page</div> }));
vi.mock('../pages/NotFound', () => ({
  default: () => <div>Not Found Page</div>,
}));
vi.mock('../components/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('../components/SongDetail', () => ({
  default: () => <div>Song Detail</div>,
}));

const renderApp = (initialEntry = '/') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('App', () => {
  it('renders Navbar on every route', () => {
    renderApp('/');
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });

  it('renders Main page on "/"', () => {
    renderApp('/');
    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  it('renders About page on "/about"', () => {
    renderApp('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  it('renders NotFound page on an unknown route', () => {
    renderApp('/this-does-not-exist');
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });

  it('renders SongDetail as a nested route inside Main', () => {
    renderApp('/details/1');
    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.getByText('Song Detail')).toBeInTheDocument();
  });
});
