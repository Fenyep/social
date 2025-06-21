import NavBar from '@/components/Navbar';
import PostPage from '@/components/page/PostsPage';
import { Post, PostWithAuthor } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import Head from 'next/head';

interface HomeProps {
  initialPosts: PostWithAuthor[];
}

export default async function Home() {
  // Fetch posts and users concurrently
  const [postsResponse, usersResponse] = await Promise.all([
    fetch('https://dummyjson.com/posts?limit=30'),
    fetch('https://dummyjson.com/users?limit=30'),
  ]);

  const postsData = await postsResponse.json();
  const usersData = await usersResponse.json();

  console.log(postsData);

  const posts: Post[] = postsData.posts;
  const users: User[] = usersData.users;

  // Create a user lookup map for efficient author matching
  const userMap = new Map(users.map((user) => [user.id, user]));

  // Combine posts with their authors
  const postsWithAuthors: PostWithAuthor[] = posts.map((post) => ({
    ...post,
    author: userMap.get(post.userId) || {
      id: post.userId,
      firstName: 'Unknown',
      lastName: 'Author',
      email: '',
      image: '',
      username: 'unknown',
    },
  }));

  return (
    <>
      <Head>
        <title>Blog Post Viewer</title>
        <meta
          name="description"
          content="A beautiful blog post viewer application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <NavBar />

        {/* Main Content */}
        <PostPage initialPosts={postsWithAuthors} />
      </div>
    </>
  );
}
