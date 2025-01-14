'use server';

import { updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';

// https://nextjs.org/docs/app/api-reference/functions/revalidatePath
export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
}
