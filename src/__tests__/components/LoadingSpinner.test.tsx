// __tests__/components/LoadingSpinner.test.tsx
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('has correct styling classes', () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByRole('status', {
      hidden: true,
    }).parentElement;
    expect(spinnerContainer).toHaveClass(
      'flex',
      'justify-center',
      'items-center',
      'py-12',
    );
  });
});
