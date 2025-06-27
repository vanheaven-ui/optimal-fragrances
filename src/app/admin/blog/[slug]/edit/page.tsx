// src/app/admin/blog/edit/[slug]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../../components/AdminLayout"; // Adjusted relative path
import { blogPosts, BlogPost } from "../../../../../data/blogPosts"; // Adjusted relative path
import BlogPostForm from "../../new/page"; // Import the reusable form component

// This component acts as a wrapper for the BlogPostForm when editing.
// It retrieves the blog post slug from the URL and passes the corresponding blog post data
// to the BlogPostForm.
export default function EditBlogPostPage() {
  const [blogPostToEdit, setBlogPostToEdit] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Manually parse the blog post slug from window.location.pathname
    // Expected path: /admin/blog/SLUG/edit
    const pathParts = window.location.pathname.split("/");
    // The slug is typically at index `pathParts.length - 2`
    const postSlug = pathParts[pathParts.length - 2];

    if (postSlug) {
      const foundPost = blogPosts.find((post) => post.slug === postSlug);
      if (foundPost) {
        setBlogPostToEdit(foundPost);
        setLoading(false);
      } else {
        setError("Blog post not found.");
        setLoading(false);
      }
    } else {
      setError("Blog post slug not found in URL.");
      setLoading(false);
    }
  }, []); // Run once on mount

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-ug-text-dark text-lg">
          Loading blog post data...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-red-500 text-lg">
          {error}
          <div className="mt-4">
            <a
              href="/admin/blog"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Back to Blog Posts
            </a>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Render the BlogPostForm with the loaded blog post data
  return <BlogPostForm initialPost={blogPostToEdit || undefined} />;
}
