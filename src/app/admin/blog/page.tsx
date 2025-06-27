// src/app/admin/blog/page.tsx
"use client";

import React, { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { BlogPost, blogPosts } from "@/blogPosts";

// For unique ID generation (simple, not UUID)
// This will ensure that when the page reloads, nextBlogId continues from the highest existing ID
let nextBlogId = Math.max(...blogPosts.map((p) => parseInt(p.id) || 0)) + 1; // Added || 0 for safety
if (blogPosts.length === 0) {
  nextBlogId = 1;
}

export default function AdminBlogPage() {
  const [currentBlogPosts, setCurrentBlogPosts] =
    useState<BlogPost[]>(blogPosts);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const updatedPosts = currentBlogPosts.filter((post) => post.id !== id);
      // In a real app, you'd make an API call to delete from the backend.
      // For now, we update the local state.
      setCurrentBlogPosts(updatedPosts);
      // You might also want to update the original 'blogPosts' array if it's mutable
      // For demonstration, we're just updating currentBlogPosts state.
      // If blogPosts was intended to be the single source of truth,
      // it would need to be passed down or managed via a global state.
      alert("Blog post deleted successfully!"); // Using alert for simplicity, would replace with custom modal
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 z-20 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-ug-text-heading">
          Manage Blog Posts
        </h1>
        <a
          href="/admin/blog/new"
          className="bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          + Add New Post
        </a>
      </div>

      {currentBlogPosts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl text-ug-text-dark">No blog posts found.</p>
          <p className="text-ug-text-dark mt-2">
            Click "Add New Post" to create one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          {/* Added table-auto and w-full for better responsiveness */}
          <table className="min-w-full divide-y divide-ug-neutral-light table-auto w-full">
            <thead className="bg-ug-neutral-bg">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/4"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/6"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/12"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/3"
                >
                  Excerpt
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/6"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-ug-neutral-light">
              {currentBlogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 text-sm font-medium text-ug-text-heading break-words">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-ug-text-dark break-words">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-ug-text-dark whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-ug-text-dark max-w-xs overflow-hidden text-ellipsis break-words">
                    {post.excerpt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <a
                      href={`/admin/blog/${post.slug}/edit`} // Use slug for editing
                      className="text-ug-purple-primary hover:text-ug-purple-accent mr-3"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
