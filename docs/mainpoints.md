**I. Introduction to Next.js Optimization**

*   **Main Point:** The section focuses on two key optimization areas in Next.js applications: image optimization and metadata for search engines.
*   **Sub-points:**
    *   Image optimization utilizes Next.js's built-in Image component for better loading and performance.
    *   Search engine optimization (SEO) is improved by adding page metadata (title, description, etc.).
    *   The official Next.js documentation provides further optimization techniques, but this section focuses on core concepts.

**II. Next.js Image Optimization**

*   **Main Point:** Next.js provides an `Image` component for optimized image loading and display.
*   **Sub-points:**
    *   **Benefits of `Image` Component:**
        *   Automatic optimization of image size and format.
        *   Prevention of layout shifts during page load (visual stability).
        *   Lazy loading of images by default (improves initial load time).
        *   Serving of different image sizes for different screen densities
    *   **Local Images (Imported):**
        *   When importing local images, the `src` prop of the `Image` component expects the entire imported object, not just the `src` property of it.
        *   Next.js automatically extracts `width` and `height` from the imported image file.
        *   `width` and `height` attributes are crucial to avoid layout shift.
        *   `srcset` is automatically generated to provide different images for different screen resolutions.
        *   **Overriding Dimensions:**
            *   The `width` and `height` props can override the default sizes, which could be used to quickly resize an image, but not recommended.
            *   The `sizes` prop is the recommended way of doing responsive image resizing instead
    *   **The `priority` Prop:**
        *   Use on images always visible when page loads (e.g., header logos).
        *   Disables lazy loading and preloads the image.
        *   Sets `fetchpriority="high"` attribute.
    *   **User-Generated Images (External):**
        *   The `fill` prop is used when size is unknown, making the image fill its container.
        *   **Configuration:**
            *   External image hostnames need to be configured in `next.config.js` under `images` -> `remotePatterns`.
            *   The parent container of an image with the fill prop must have `position: relative`.
            *   Width and height of the container must be specified via CSS, not on the image element directly.
        *   **The `loader` Prop:**
            *   Allows manipulation of image URLs before loading, useful for CDNs like Cloudinary.
            *   The loader function receives a `config` object with source, width, and quality.
            *   Cloudinary-specific URL transformations can be added (e.g., resizing, quality).
            *    The recommended approach is to set width only in the Cloudinary URL and let the library generate the height so the aspect ratio can be preserved.
    *   **Sizes Prop** 
       * It is recommended to use this prop in conjuction with the fill prop on images when not knowing the width or height of an image
       * if not using the fill prop, you must specify both width and height, but since this prop is required and is not always known, it can be set to any value, and then resize using css

**III. Next.js Metadata Optimization**

*   **Main Point:** Metadata is crucial for SEO and social sharing and is settable in layouts and pages
*   **Sub-points:**
    *   **Static Metadata:**
        *   Export a `metadata` object in a `page.js` or `layout.js` file.
        *   Include properties like `title`, `description`, and `openGraph`.
    *   **Dynamic Metadata:**
        *   Export an async function called `generateMetadata` in a `page.js` or `layout.js` file.
        *   This function receives data passed by Next.js and fetches dynamic data necessary to generate a page's metadata.
        *   Return a metadata object with dynamic values.
        *   Example: use the number of posts in the title
    *   **Layout Metadata:**
        *   Set metadata in layout files to apply to all pages or all pages in a route.
        *   Layout metadata will be merged with page-specific metadata.
        *   Page metadata overrides layout metadata if both are set for the same property.
