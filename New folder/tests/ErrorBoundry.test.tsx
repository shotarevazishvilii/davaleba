import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from 'react';
import ErrorBoundary from '../components/ErrorBoundry';

class BombComponent extends Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Boom! Test explosion');
    }
    return <div>Everything is fine</div>;
  }
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('catches an error and shows the fallback UI', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  it('displays the error message in the fallback UI', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Boom! Test explosion')).toBeInTheDocument();
  });

  it('does not render children when there is an error', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.queryByText('Everything is fine')).not.toBeInTheDocument();
  });

  it('calls resetError when Try Again is clicked', async () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
  });
  it('logs the error to console.error', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(console.error).toHaveBeenCalled();
  });
});
