import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/About';

describe('About', () => {
  it('renders the heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the author name', () => {
    render(<About />);
    expect(screen.getByText(/saba revazishvili/i)).toBeInTheDocument();
  });

  it('renders the RS School link', () => {
    render(<About />);
    expect(screen.getByRole('link', { name: /rs school/i })).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
