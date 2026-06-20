import React, { type ErrorInfo, type ReactNode } from 'react';
import ErrorCard from './ErrorCard';

type Props = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

export default class ErrorBoundary extends React.Component<
  Props,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render(): ReactNode {
    return this.state.hasError ? (
      <ErrorCard
        onReset={this.resetError}
        errorMessage={this.state.errorMessage}
      />
    ) : (
      this.props.children
    );
  }
}
