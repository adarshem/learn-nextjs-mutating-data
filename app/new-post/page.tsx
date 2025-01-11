import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';
import FormSubmit from '@/components/form-submit';

/**
 * Notes:  It is not allowed to define inline "use server" annotated Server Actions in Client Components.
 * To use Server Actions in a Client Component:
 *  - you can either export them from a separate file with "use server" at the top,
 *  - Or pass them down through props from a Server Component.
 */
export default function NewPostPage() {
  async function createPost(formData: FormData) {
    'use server';
    const title = formData.get('title') as string | null;
    const image = formData.get('image') as string | null;
    const content = formData.get('content') as string | null;

    await storePost({
      imageUrl: '',
      title: title || '',
      content: content || '',
      userId: 1,
    });

    redirect('/feed');
  }

  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
