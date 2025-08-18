// components/admin/blog/BlogPostForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useFirebase } from "../context/FirebaseContext";

// BlogPost interface
export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  author: string;
  date: string; // Stored as a date string (YYYY-MM-DD)
  imageUrl?: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// This component can be re-used for editing by passing `initialPost` prop
interface BlogPostFormProps {
  initialPost?: BlogPost | null; // Optional: if provided, it's an edit form
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialPost }) => {
  const { db, isAuthReady } = useFirebase();
  const router = useRouter();

  const [formData, setFormData] = useState<BlogPost>(
    initialPost || {
      slug: "",
      title: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      imageUrl: "",
      excerpt: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      keywords: [],
    }
  );
  const [isEditMode, setIsEditMode] = useState(!!initialPost);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    // Only update formData and isEditMode if initialPost actually changes
    // This prevents unnecessary resets if the parent re-renders without initialPost changing
    if (initialPost && initialPost.id !== formData.id) {
      // Compare by ID to prevent infinite loop/unnecessary updates
      setFormData(initialPost);
      setIsEditMode(true);
    } else if (!initialPost && isEditMode) {
      // If initialPost becomes null in edit mode, reset
      setFormData({
        slug: "",
        title: "",
        author: "",
        date: new Date().toISOString().split("T")[0],
        imageUrl: "",
        excerpt: "",
        content: "",
        seoTitle: "",
        seoDescription: "",
        keywords: [],
      });
      setIsEditMode(false);
    }
  }, [initialPost]);

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
    const keywordsArray = e.target.value
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      keywords: keywordsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!isAuthReady || !db) {
      setStatusMessage({
        type: "error",
        message: "Firebase not initialized. Please try again.",
      });
      return;
    }

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

    setLoading(true);

    const cleanSlug = formData.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    try {
      if (isEditMode && formData.id) {
        const postRef = doc(db, "blogPosts", formData.id);
        await updateDoc(postRef, {
          ...formData,
          slug: cleanSlug,
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "Blog post updated successfully!",
        });
      } else {
        const postsCollectionRef = collection(db, "blogPosts");
        await addDoc(postsCollectionRef, {
          ...formData,
          slug: cleanSlug,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "New blog post added successfully!",
        });
        // Reset form for new entry if successfully added
        setFormData({
          slug: "",
          title: "",
          author: "",
          date: new Date().toISOString().split("T")[0],
          imageUrl: "",
          excerpt: "",
          content: "",
          seoTitle: "",
          seoDescription: "",
          keywords: [],
        });
      }

      setTimeout(() => {
        setStatusMessage(null);
        router.push("/admin/blog");
      }, 2000);
    } catch (err: unknown) {
      console.error("Error saving blog post:", err);
      let errorMessage =
        "Failed to save blog post: An unexpected error occurred.";

      if (err instanceof Error) {
        errorMessage = `Failed to save blog post: ${err.message}`;
      } else if (typeof err === "string") {
        errorMessage = `Failed to save blog post: ${err}`;
      }

      setStatusMessage({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-6"
    >
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-ug-text-dark text-sm font-semibold mb-2"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleChange}
          className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
          placeholder="https://example.com/blog-image.png"
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
            ? "Update Post"
            : "Add Post"}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
