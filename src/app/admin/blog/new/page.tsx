// src/app/admin/blog/new/page.tsx
"use client";

import { BlogPost, blogPosts } from "@/blogPosts";
import AdminLayout from "components/AdminLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// A simple way to get a unique ID for new posts.
// In a real app, this would come from the database.
const generateUniqueId = (): string => {
  const existingIds = blogPosts.map((p) => parseInt(p.id) || 0);
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return (maxId + 1).toString();
};

// This component can be re-used for editing by passing `initialPost` prop
interface BlogPostFormProps {
  initialPost?: BlogPost; // Optional: if provided, it's an edit form
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialPost }) => {
  const [formData, setFormData] = useState<BlogPost>(
    initialPost || {
      id: generateUniqueId(), // New ID for new posts
      slug: "",
      title: "",
      author: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
      image: "",
      excerpt: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      keywords: [],
    }
  );
  const [isEditMode, setIsEditMode] = useState(!!initialPost);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // If this page is loaded directly for editing (e.g., /admin/blog/some-slug/edit),
  // we'd need to fetch the post based on the slug. For now, assume initialPost is passed.
  // In a real Next.js dynamic route ([slug]/edit), you'd get the slug from params and fetch.
  useEffect(() => {
    // This useEffect is primarily for when the component is mounted directly as an edit page
    // and the initialPost needs to be loaded based on a URL parameter (e.g., actual dynamic routing)
    // For this simplified example, we rely on the initialPost prop being set correctly.
    // If we were using Next.js route params, this is where you'd retrieve the slug
    // and find the corresponding blog post from `blogPosts` array.
    if (initialPost) {
      setFormData(initialPost);
      setIsEditMode(true);
    } else {
      // Ensure a new ID is generated if we are truly creating a new post
      setFormData((prev) => ({ ...prev, id: generateUniqueId() }));
      setIsEditMode(false);
    }
  }, [initialPost]); // Re-run if initialPost changes (e.g., navigating from New to Edit)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Split by comma, trim spaces, filter out empty strings
    const keywordsArray = e.target.value
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      keywords: keywordsArray,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null); // Clear previous messages

    // Basic validation
    if (
      !formData.title ||
      !formData.author ||
      !formData.date ||
      !formData.content ||
      !formData.slug
    ) {
      setStatusMessage({
        type: "error",
        message:
          "Please fill in all required fields (Title, Author, Date, Slug, Content).",
      });
      return;
    }

    // Ensure slug is clean for URL
    let cleanSlug = formData.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!cleanSlug) {
      cleanSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      if (!cleanSlug) {
        cleanSlug = `post-${formData.id}`; // Fallback slug
      }
    }

    if (isEditMode) {
      // Find and update the existing post in the global array
      const index = blogPosts.findIndex((p) => p.id === formData.id);
      if (index !== -1) {
        blogPosts[index] = { ...formData, slug: cleanSlug }; // Update with clean slug
        setStatusMessage({
          type: "success",
          message: "Blog post updated successfully!",
        });
      } else {
        setStatusMessage({
          type: "error",
          message: "Error: Blog post not found for update.",
        });
      }
    } else {
      // Add new post to the global array
      const newPost = { ...formData, id: generateUniqueId(), slug: cleanSlug }; // Ensure new ID and clean slug
      blogPosts.push(newPost); // Directly modifying the imported array
      setStatusMessage({
        type: "success",
        message: "New blog post added successfully!",
      });
      // Reset form for next entry, but keep new ID logic
      setFormData({
        id: generateUniqueId(),
        slug: "",
        title: "",
        author: "",
        date: new Date().toISOString().split("T")[0],
        image: "",
        excerpt: "",
        content: "",
        seoTitle: "",
        seoDescription: "",
        keywords: [],
      });
    }

    // After successful submission (add or edit), consider redirecting or showing success
    // For now, we show a status message.
    setTimeout(() => {
      setStatusMessage(null);
      // Optional: Redirect back to blog list after a short delay
      // window.location.href = '/admin/blog';
    }, 3000);
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold text-ug-text-heading mb-8">
        {isEditMode ? "Edit Blog Post" : "Add New Blog Post"}
      </h1>

      {statusMessage && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Slug (URL path) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="e.g., the-art-of-perfume-layering"
            required
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="https://example.com/blog-image.png"
          />
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="A short summary of the blog post..."
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Content (Markdown/HTML) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary font-mono text-sm"
            placeholder="Write your blog post content here using Markdown or HTML..."
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="seoTitle"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            SEO Title
          </label>
          <input
            type="text"
            id="seoTitle"
            name="seoTitle"
            value={formData.seoTitle || ""}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="Short, keyword-rich title for search engines"
          />
        </div>

        <div>
          <label
            htmlFor="seoDescription"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            SEO Description
          </label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            value={formData.seoDescription || ""}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="Concise summary for search engine results"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="keywords"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords ? formData.keywords.join(", ") : ""}
            onChange={handleKeywordsChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="perfume, fragrance, layering, trends"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/blog"
            className="px-6 py-3 bg-ug-neutral-light text-ug-text-dark rounded-lg font-semibold hover:bg-ug-neutral-bg transition duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-ug-purple-primary text-white rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
          >
            {isEditMode ? "Update Post" : "Add Post"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BlogPostForm;
