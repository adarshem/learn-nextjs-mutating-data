import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata() {
  const posts = await getPosts(100);
  const numberOfPosts = posts.length;
  return {
    title: `Browser all our ${numberOfPosts} posts.`,
    description: 'List of all posts'
  };
}

export default async function FeedPage() {
  const posts = await getPosts(100);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
