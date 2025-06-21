// __tests__/pages/index.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostsPage from '../../components/page/PostsPage';
import { PostWithAuthor } from '../../entities';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

const mockPosts: PostWithAuthor[] = [
  {
    id: 1,
    title: 'First Test Post',
    body: 'This is the first test post content.',
    tags: ['javascript', 'react'],
    reactions: { likes: 10, dislikes: 2 },
    views: 100,
    userId: 1,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      image: '',
      username: 'johndoe',
    },
  },
  {
    id: 2,
    title: 'Second Test Post',
    body: 'This is the second test post content about TypeScript.',
    tags: ['typescript', 'programming'],
    reactions: { likes: 5, dislikes: 1 },
    views: 50,
    userId: 2,
    author: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      image: '',
      username: 'janesmith',
    },
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders page title and description', () => {
    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    expect(screen.getByText('Blog Explorer')).toBeInTheDocument();
    expect(
      screen.getByText('Discover amazing stories and insights'),
    ).toBeInTheDocument();
  });

  it('displays all posts initially', () => {
    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    expect(screen.getByText('First Test Post')).toBeInTheDocument();
    expect(screen.getByText('Second Test Post')).toBeInTheDocument();
    expect(screen.getByText(/Showing 2 posts/)).toBeInTheDocument();
  });

  it('filters posts based on search term', async () => {
    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    const searchInput = screen.getByPlaceholderText(
      /search posts, tags, or content/i,
    );
    fireEvent.change(searchInput, { target: { value: 'TypeScript' } });

    await waitFor(() => {
      expect(screen.getByText('Second Test Post')).toBeInTheDocument();
      expect(screen.queryByText('First Test Post')).not.toBeInTheDocument();
      expect(
        screen.getByText(/Found 1 posts matching "TypeScript"/),
      ).toBeInTheDocument();
    });
  });

  it('shows no results message when search has no matches', async () => {
    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    const searchInput = screen.getByPlaceholderText(
      /search posts, tags, or content/i,
    );
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
      expect(
        screen.getByText('Try adjusting your search terms'),
      ).toBeInTheDocument();
    });
  });

  it('handles liking posts and saves to localStorage', async () => {
    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    const likeButton = screen.getAllByRole('button', { name: /like/i })[0];
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'likedPosts',
        JSON.stringify([1]),
      );
    });
  });

  it('loads liked posts from localStorage on mount', () => {
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify([1]));

    render(<PostsPage initialPosts={mockPosts} initialUsers={[]} />);

    // The first post should be marked as liked
    const likeButtons = screen.getAllByRole('button', { name: /like/i });
    expect(likeButtons[0]).toHaveClass('text-red-500');
  });
});
