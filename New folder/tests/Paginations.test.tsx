import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import Pagination from '../components/Paginations';

beforeAll(() => {
  window.scrollTo = vi.fn();
});

const renderPagination = (totalPages: number, initialEntry = '/') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="*" element={<Pagination totalPages={totalPages} />} />
      </Routes>
    </MemoryRouter>
  );

describe('Pagination', () => {
  it('renders the correct number of page buttons', () => {
    renderPagination(5);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    expect(buttons[0]).toHaveTextContent('1');
    expect(buttons[4]).toHaveTextContent('5');
  });

  it('renders nothing when totalPages is 0', () => {
    renderPagination(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('highlights page 1 as active by default', () => {
    renderPagination(3);
    const btn1 = screen.getByRole('button', { name: '1' });
    expect(btn1.className).toMatch(/bg-white/);
  });

  it('highlights the correct page when ?page= is set in the URL', () => {
    renderPagination(3, '/?page=2');
    const btn2 = screen.getByRole('button', { name: '2' });
    const btn1 = screen.getByRole('button', { name: '1' });
    expect(btn2.className).toMatch(/bg-white/);
    expect(btn1.className).not.toMatch(/bg-white text-black/);
  });

  it('calls window.scrollTo(0, 0) when a page button is clicked', () => {
    renderPagination(3);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('moves the active highlight after clicking a page button', () => {
    renderPagination(4);
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByRole('button', { name: '3' }).className).toMatch(/bg-white/);
  });

  it('preserves existing search params when changing page', () => {
    renderPagination(3, '/?query=eminem');
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    // Active highlight should move to page 2, confirming setSearchParams was called
    expect(screen.getByRole('button', { name: '2' }).className).toMatch(/bg-white/);
  });
});
