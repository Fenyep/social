import { PostWithAuthor } from '@/entities';
import Image from 'next/image';

export default function PostAvatar({ post }: { post: PostWithAuthor }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Image
          src={
            post.author.image ||
            `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=6366f1&color=fff`
          }
          width={0}
          height={0}
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
  );
}
