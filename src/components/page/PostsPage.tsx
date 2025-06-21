'use client';

import { PostWithAuthor } from '@/entities';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import PostCard from '../PostCard';

interface HomeProps {
  initialPosts: PostWithAuthor[];
}

export default function PostsPage({ initialPosts }: HomeProps) {
  const [posts] = useState<PostWithAuthor[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] =
    useState<PostWithAuthor[]>(initialPosts);
  const [searchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const postsPerPage = 6;

  // Load liked posts from localStorage on component mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedPosts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, posts]);

  // Handle like functionality
  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    localStorage.setItem('likedPosts', JSON.stringify([...newLikedPosts]));
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Summary */}
      <div className="mb-8">
        <p className="text-gray-600">
          {searchTerm ? (
            <>
              Found{' '}
              <span className="font-semibold">{filteredPosts.length}</span>{' '}
              posts matching &quot;searchTerm&quot;
            </>
          ) : (
            <>
              Showing <span className="font-semibold">{posts.length}</span>{' '}
              posts
            </>
          )}
        </p>
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPosts.has(post.id)}
                onLike={() => handleLike(post.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      )}
    </main>
  );
}
