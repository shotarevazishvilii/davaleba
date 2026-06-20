import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorCard from '../components/ErrorCard';

describe('ErrorCard', () => {
  it('renders the error message', () => {
    render(
      <ErrorCard errorMessage="Network request failed" onReset={() => {}} />
    );
    expect(screen.getByText('Network request failed')).toBeInTheDocument();
  });

  it('renders the "Something went wrong" heading', () => {
    render(<ErrorCard errorMessage="oops" onReset={() => {}} />);
    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  it('renders the Try Again button', () => {
    render(<ErrorCard errorMessage="oops" onReset={() => {}} />);
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('calls onReset when Try Again is clicked', async () => {
    const onReset = vi.fn();
    render(<ErrorCard errorMessage="oops" onReset={onReset} />);
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('displays different error messages correctly', () => {
    const { rerender } = render(
      <ErrorCard errorMessage="Network error" onReset={() => {}} />
    );
    expect(screen.getByText('Network error')).toBeInTheDocument();

    rerender(<ErrorCard errorMessage="Not found" onReset={() => {}} />);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
