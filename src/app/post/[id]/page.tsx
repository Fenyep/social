import Head from 'next/head';
import { Post, User, PostWithAuthor } from '../../../entities';
import PostPage from '@/components/page/PostPage';

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;

  const [postResponse, usersResponse] = await Promise.all([
    fetch(`https://dummyjson.com/posts/${postId}`),
    fetch('https://dummyjson.com/users?limit=30'),
  ]);

  if (!postResponse.ok) {
    return { notFound: true };
  }

  const post: Post = await postResponse.json();
  const usersData = await usersResponse.json();
  const users: User[] = usersData.users;

  const author = users.find((user) => user.id === post.userId) || {
    id: post.userId,
    firstName: 'Unknown',
    lastName: 'Author',
    email: '',
    image: '',
    username: 'unknown',
  };

  const postWithAuthor: PostWithAuthor = {
    ...post,
    author,
  };

  return (
    <>
      <Head>
        <title>{post.title} - Blog Post Viewer</title>
        <meta name="description" content={post.body.substring(0, 160)} />
      </Head>

      <PostPage post={postWithAuthor} />
    </>
  );
}
