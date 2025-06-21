// __tests__/components/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
  });

  it('renders search input correctly', () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText(
      /search posts, tags, or content/i,
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  it('displays current search term', () => {
    render(
      <SearchBar searchTerm="javascript" onSearchChange={mockOnSearchChange} />,
    );

    const searchInput = screen.getByDisplayValue('javascript');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText(
      /search posts, tags, or content/i,
    );
    fireEvent.change(searchInput, { target: { value: 'react' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('react');
  });

  it('shows clear button when search term exists', () => {
    render(<SearchBar searchTerm="test" onSearchChange={mockOnSearchChange} />);

    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('hides clear button when search term is empty', () => {
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />);

    const clearButton = screen.queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    render(<SearchBar searchTerm="test" onSearchChange={mockOnSearchChange} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });
});
