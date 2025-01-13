import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';
import { FormState } from '@/lib/types';
import PostForm from '@/components/post-form';

/**
 * Notes:  It is not allowed to define inline "use server" annotated Server Actions in Client Components.
 * To use Server Actions in a Client Component:
 *  - you can either export them from a separate file with "use server" at the top,
 *  - Or pass them down through props from a Server Component.
 */
export default function NewPostPage() {
  // Server action can either be created inside a server component and pass it down to the client through prop
  // OR you could store server actions in a separate file and then use it in your client component
  // You just need to make sure that "use server" directive is added at the top of that file.
  async function createPost(prevFormData: FormState, formData: FormData) {
    'use server';
    const title = formData.get('title') as string | null;
    const image = formData.get('image') as File;
    const content = formData.get('content') as string | null;

    let errors = [];

    if (!title || title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!content || content.trim().length === 0) {
      errors.push('Content is required');
    }

    if (!image || image.size === 0) {
      errors.push('Image is required');
    }

    if (errors.length > 0) {
      return { errors };
    }

    await storePost({
      imageUrl: '',
      title: title || '',
      content: content || '',
      userId: 1,
    });

    redirect('/feed');
  }

  return <PostForm action={createPost} />;
}
