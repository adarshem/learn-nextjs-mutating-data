'use client';

import { togglePostLikeStatus } from '@/actions/post';
import { formatDate } from '@/lib/format';
import { PostObj } from '@/lib/types';
import LikeButton from './like-icon';
import { useOptimistic } from 'react';

// https://react.dev/reference/react/useOptimistic
function Post({ post }: { post: PostObj }) {
  const [optimisticPost, updatePostOptimistically] = useOptimistic(
    post,
    (prevPost, postId) => {
      if (!postId) {
        return prevPost;
      }

      return {
        ...prevPost,
        isLiked: !prevPost.isLiked,
      };
    }
  );

  async function onUpdatePost(postId: number) {
    updatePostOptimistically(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <article className="post">
      <div className="post-image">
        <img src={optimisticPost.image} alt={optimisticPost.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{optimisticPost.title}</h2>
            <p>
              Shared by {optimisticPost.userFirstName} on{' '}
              <time dateTime={optimisticPost.createdAt}>
                {formatDate(optimisticPost.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/** bind the postId arguement s */}
            <form
              action={onUpdatePost.bind(null, optimisticPost.id)}
              className={optimisticPost.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{optimisticPost.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: PostObj[] }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
