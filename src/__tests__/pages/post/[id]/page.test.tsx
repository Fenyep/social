// __tests__/pages/post/[id].test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PostDetail from '../../../../components/page/PostPage';
import { PostWithAuthor } from '../../../../entities';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/post/[id]',
      pathname: '/post/[id]',
      query: { id: '1' },
      asPath: '/post/1',
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

const mockPost: PostWithAuthor = {
  id: 1,
  title: 'Detailed Test Post',
  body: 'This is a detailed test post content that should be displayed in full on the detail page.',
  tags: ['test', 'javascript', 'nextjs'],
  reactions: {
    likes: 25,
    dislikes: 3,
  },
  views: 200,
  userId: 1,
  author: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    image: 'https://example.com/avatar.jpg',
    username: 'johndoe',
  },
};

describe('PostDetail Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders post details correctly', () => {
    render(<PostDetail post={mockPost} />);

    expect(screen.getByText('Detailed Test Post')).toBeInTheDocument();
    expect(
      screen.getByText(/This is a detailed test post content/),
    ).toBeInTheDocument();
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('#nextjs')).toBeInTheDocument();
    expect(screen.getByText('200 views')).toBeInTheDocument();
    expect(screen.getByText('25 likes')).toBeInTheDocument();
  });

  it('renders author information', () => {
    render(<PostDetail post={mockPost} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('has back to posts link', () => {
    render(<PostDetail post={mockPost} />);

    const backLink = screen.getByRole('link', { name: /back to posts/i });
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('handles like functionality', () => {
    render(<PostDetail post={mockPost} />);

    const likeButton = screen.getByRole('button', { name: /like this post/i });
    fireEvent.click(likeButton);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'likedPosts',
      JSON.stringify([1]),
    );
    expect(screen.getByText('Liked')).toBeInTheDocument();
  });

  it('shows liked state when post is already liked', () => {
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify([1]));

    render(<PostDetail post={mockPost} />);

    expect(screen.getByText('Liked')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /liked/i })).toHaveClass(
      'bg-red-500',
    );
  });

  it('toggles like state correctly', () => {
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify([1]));

    render(<PostDetail post={mockPost} />);

    const likeButton = screen.getByRole('button', { name: /liked/i });
    fireEvent.click(likeButton);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'likedPosts',
      JSON.stringify([]),
    );
    expect(screen.getByText('Like this post')).toBeInTheDocument();
  });
});
