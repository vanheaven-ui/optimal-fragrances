// src/app/admin/blog/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app"; // Keep this import, it's useful for Firestore errors
import AdminLayout from "../../../components/AdminLayout";
import { useFirebase } from "../../../context/FirebaseContext";

// Define the BlogPost interface (ideally from a shared types file like "@/types/blogPost.ts")
// For now, defining it here to ensure consistency.
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string; // Storing as string, but could be Firebase Timestamp / Date
  excerpt: string;
  content: string; // Full blog post content
  imageUrl?: string; // Optional image URL for the blog post
  slug: string; // Unique slug for URL
  createdAt?: Date; // Added for Firestore timestamps
  updatedAt?: Date; // Added for Firestore timestamps
}

export default function AdminBlogPage() {
  const { db, isAuthReady } = useFirebase(); // Use the Firebase context hook
  const [currentBlogPosts, setCurrentBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null); // State to track which post is being deleted
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Effect to fetch blog posts from Firestore
  useEffect(() => {
    // Wait for Firebase to be ready and db instance to be available
    if (!isAuthReady || !db) {
      if (!isAuthReady) {
        setLoading(true); // Keep loading state true if auth is not ready
        setError(null);
      } else if (!db) {
        // If db is null after auth is ready (shouldn't happen with proper setup)
        setError("Firebase Firestore instance is not available.");
        setLoading(false);
      }
      return;
    }

    setLoading(true); // Always set loading true when starting fetch
    setError(null); // Clear previous errors

    const blogPostsCollectionRef = collection(db, "blogPosts");

    const unsubscribe = onSnapshot(
      blogPostsCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const postsList: BlogPost[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const postData: BlogPost = {
            id: doc.id,
            title: data.title,
            author: data.author,
            date: data.date, // Assuming date is stored as a string or can be converted
            excerpt: data.excerpt,
            content: data.content,
            imageUrl: data.imageUrl || undefined,
            slug: data.slug,
            // Convert Firebase Timestamps to Date objects if they exist
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : undefined,
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : undefined,
          };
          postsList.push(postData);
        });
        setCurrentBlogPosts(postsList);
        setLoading(false);
        setStatusMessage(null); // Clear any previous status messages on successful load
      },
      (err: FirebaseError) => {
        console.error("Firestore blog posts fetch error:", err);
        setError("Failed to load blog posts: " + err.message);
        setLoading(false);
        setStatusMessage({
          type: "error",
          message: "Failed to load blog posts. Please try again.",
        });
      }
    );

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [db, isAuthReady]); // Depend on db and isAuthReady

  const handleDelete = async (id: string): Promise<void> => {
    if (!db) {
      setStatusMessage({
        type: "error",
        message: "Firestore not initialized. Cannot delete.",
      });
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setDeletingPostId(id); // Set the ID of the post being deleted
      setStatusMessage(null); // Clear previous messages
      try {
        const blogPostDocRef = doc(db, "blogPosts", id);
        await deleteDoc(blogPostDocRef);
        // The onSnapshot listener will automatically update currentBlogPosts state
        setStatusMessage({
          type: "success",
          message: "Blog post deleted successfully!",
        });
      } catch (err: unknown) {
        // Changed 'any' to 'unknown' here
        console.error("Error deleting blog post:", err);
        let errorMessage =
          "Failed to delete blog post: An unexpected error occurred.";

        if (err instanceof FirebaseError) {
          // If it's a specific Firebase error, use its message
          errorMessage = `Failed to delete blog post: ${err.message}`;
        } else if (err instanceof Error) {
          // If it's a general JavaScript Error, use its message
          errorMessage = `Failed to delete blog post: ${err.message}`;
        } else if (typeof err === "string") {
          // If a string was thrown
          errorMessage = `Failed to delete blog post: ${err}`;
        }

        setStatusMessage({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setDeletingPostId(null); // Reset the deleting state
        setTimeout(() => setStatusMessage(null), 3000); // Clear status message after 3 seconds
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-ug-text-dark text-lg">
          Loading blog posts...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-red-500 text-lg">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 z-20 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-ug-text-heading">
          Manage Blog Posts
        </h1>
        {/* Use Link for internal navigation */}
        <Link
          href="/admin/blog/new"
          className="bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          + Add New Post
        </Link>
      </div>

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

      {currentBlogPosts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl text-ug-text-dark">No blog posts found.</p>
          <p className="text-ug-text-dark mt-2">
            Click &quot;Add New Post&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                    {/* Use Link for internal navigation */}
                    <Link
                      href={`/admin/blog/${post.slug}/edit`} // Use slug for editing
                      className="text-ug-purple-primary hover:text-ug-purple-accent mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={deletingPostId === post.id} // Disable if this post is being deleted
                    >
                      {deletingPostId === post.id ? "Deleting..." : "Delete"}
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
