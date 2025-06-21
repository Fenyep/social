'use client';

import Link from 'next/link';
import { PostWithAuthor } from '@/entities/post.entity';
import { useEffect, useState } from 'react';

interface PostPageProps {
  post: PostWithAuthor;
}

export default function PostPage({ post }: PostPageProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedPosts');
    if (savedLikes) {
      const likedPosts = JSON.parse(savedLikes);
      setIsLiked(likedPosts.includes(post.id));
    }
  }, [post.id]);

  const handleLike = () => {
    const savedLikes = localStorage.getItem('likedPosts');
    const likedPosts = savedLikes ? JSON.parse(savedLikes) : [];

    if (isLiked) {
      const updatedLikes = likedPosts.filter((id: number) => id !== post.id);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      setIsLiked(false);
    } else {
      likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      setIsLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Posts
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Post Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags as string[]).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Post Stats */}
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                {post.views} views
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                {post.reactions.likes} likes
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.body}
              </p>
            </div>

            {/* Like Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleLike}
                className={`flex items-center px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  isLiked
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <svg
                  className={`w-6 h-6 mr-2 transition-colors ${
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
                {isLiked ? 'Liked' : 'Like this post'}
              </button>
            </div>

            {/* Author Info */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center">
                <img
                  src={
                    post.author.image ||
                    `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=6366f1&color=fff`
                  }
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=6366f1&color=fff`;
                  }}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.author.firstName} {post.author.lastName}
                  </h3>
                  <p className="text-gray-600">@{post.author.username}</p>
                  <p className="text-gray-500 text-sm">{post.author.email}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
