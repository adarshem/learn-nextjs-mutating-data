import { Suspense } from 'react';
import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import { title } from 'process';

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  title: 'Latest Posts',
  description: 'Browse our latest posts'
};

async function LatestPosts(): Promise<React.JSX.Element> {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
