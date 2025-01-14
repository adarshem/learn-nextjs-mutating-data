'use server';

import { updatePostLikeStatus } from '@/lib/posts';

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
}
