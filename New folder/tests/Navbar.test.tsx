import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeProvider';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('renders Home and About links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('Home link points to "/"', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('About link points to "/about"', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('renders a nav element', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
