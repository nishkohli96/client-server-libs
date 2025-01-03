/**
 * Refer -
 * https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 *
 * There also is a dedicated error boundary component mentioned in the
 * above page -
 * https://github.com/bvaughn/react-error-boundary
 */

'use client';

import { Component, ReactNode } from 'react';
import { styles } from './styles';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: Error | null };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error | null, info: { componentStack: string }) {
    console.error(error);
    console.error(info.componentStack);
  }

  handleReload = () => window.location.reload();

  handleGoHome = () => (window.location.href = '/');

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <div style={styles.buttons}>
            <button onClick={this.handleGoHome} style={styles.button}>
              Go to Homepage
            </button>
            <button onClick={this.handleReload} style={styles.button}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
