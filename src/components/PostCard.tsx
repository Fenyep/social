import { PostWithAuthor } from '@/entities/post.entity';
import PostAvatar from './PostAvatar';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: PostWithAuthor;
  isLiked: boolean;
  onLike: () => void;
}

export default function PostCard({ post, isLiked, onLike }: PostCardProps) {
  const router = useRouter();

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => router.push(`/post/${post.id}`)}
      className="hover:cursor-pointer">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {(post.tags as string[]).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold line-clamp-2 mb-2">{post.title}</h2>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Author */}
          <PostAvatar post={post} />

          <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {post.body}
          </p>

          {/* Actions */}
          <div className="flex w-full items-center justify-between">
            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {post.views}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {post.reactions.likes}
                </span>
              </div>
            </div>
            <button
              title="likeButton"
              onClick={onLike}
              className={`p-2 rounded-full transition-all transform hover:scale-110 z-20 ${
                isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
              }`}>
              <svg
                className={`w-6 h-6 transition-colors ${
                  isLiked ? 'fill-current' : ''
                }`}
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
