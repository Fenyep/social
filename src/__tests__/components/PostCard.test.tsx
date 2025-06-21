import '@testing-library/jest-dom';

// __tests__/components/PostCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from '../../components/PostCard';
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

const mockPost: PostWithAuthor = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is a test post body content that should be displayed in the card.',
  tags: ['test', 'javascript', 'react'],
  reactions: {
    likes: 42,
    dislikes: 5,
  },
  views: 150,
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

describe('PostCard Component', () => {
  const mockOnLike = jest.fn();

  beforeEach(() => {
    mockOnLike.mockClear();
  });

  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} isLiked={false} onLike={mockOnLike} />);

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test post body content/),
    ).toBeInTheDocument();
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('displays correct number of tags', () => {
    render(<PostCard post={mockPost} isLiked={false} onLike={mockOnLike} />);

    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument(); // Only shows first 2 tags + count
  });

  it('calls onLike when like button is clicked', () => {
    render(<PostCard post={mockPost} isLiked={false} onLike={mockOnLike} />);

    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });

  it('shows different styling when post is liked', () => {
    const { rerender } = render(
      <PostCard post={mockPost} isLiked={false} onLike={mockOnLike} />,
    );

    let likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('text-gray-400');

    rerender(<PostCard post={mockPost} isLiked={true} onLike={mockOnLike} />);

    likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('text-red-500');
  });

  it('renders fallback avatar when image fails to load', () => {
    const postWithoutImage = {
      ...mockPost,
      author: { ...mockPost.author, image: '' },
    };

    render(
      <PostCard post={postWithoutImage} isLiked={false} onLike={mockOnLike} />,
    );

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toHaveAttribute(
      'src',
      expect.stringContaining('ui-avatars.com'),
    );
  });

  it('has correct link to post detail page', () => {
    render(<PostCard post={mockPost} isLiked={false} onLike={mockOnLike} />);

    const readMoreLink = screen.getByRole('link', { name: /read more/i });
    expect(readMoreLink).toHaveAttribute('href', '/post/1');
  });
});
