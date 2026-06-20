import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search';

describe('Search', () => {
  it('renders the input field', () => {
    render(<Search onSearch={() => {}} initialValue="" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the Search button', () => {
    render(<Search onSearch={() => {}} initialValue="" />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows the initialValue in the input', () => {
    render(<Search onSearch={() => {}} initialValue="eminem" />);
    expect(screen.getByRole('textbox')).toHaveValue('eminem');
  });

  it('updates input value when user types', async () => {
    render(<Search onSearch={() => {}} initialValue="" />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'drake');
    expect(input).toHaveValue('drake');
  });

  it('calls onSearch with trimmed input when Search button is clicked', async () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} initialValue="" />);
    await userEvent.type(screen.getByRole('textbox'), '  kanye  ');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('kanye');
  });

  it('calls onSearch with empty string when input is cleared and searched', async () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} initialValue="" />);
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('calls onSearch with initialValue when button clicked without typing', async () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} initialValue="rap" />);
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('rap');
  });
});
