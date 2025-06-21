import { PostWithAuthor } from '@/entities/post.entity';
import Link from 'next/link';

interface PostCardProps {
  post: PostWithAuthor;
  isLiked: boolean;
  onLike: () => void;
}

export default function PostCard({ post, isLiked, onLike }: PostCardProps) {
  return (
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
        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {post.body}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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

        {/* Author */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={
                post.author.image ||
                `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=6366f1&color=fff`
              }
              alt={`${post.author.firstName} ${post.author.lastName}`}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=6366f1&color=fff`;
              }}
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-900 text-sm">
                {post.author.firstName} {post.author.lastName}
              </p>
              <p className="text-gray-500 text-xs">@{post.author.username}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/post/${post.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Read More
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <button
            title="likeButton"
            onClick={onLike}
            className={`p-2 rounded-full transition-all transform hover:scale-110 ${
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
  );
}
