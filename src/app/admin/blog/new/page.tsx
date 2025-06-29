"use client";

import AdminLayout from "components/AdminLayout";
import BlogPostForm from "../../../../components/BlogPostForm";

// The actual page component for /admin/blog/new
const NewBlogPostPage = () => {
  return (
    <AdminLayout>
      <BlogPostForm initialPost={null} /> {/* Pass null for a new post */}
    </AdminLayout>
  );
};

export default NewBlogPostPage;