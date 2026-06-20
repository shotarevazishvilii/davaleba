import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('renders Go Home link pointing to "/"', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
