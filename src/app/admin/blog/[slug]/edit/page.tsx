"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../../components/AdminLayout";
import BlogPostForm, { BlogPost } from "../../new/page"; 
import { useParams } from "next/navigation"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirebase } from "../../../../../context/FirebaseContext";
import Link from "next/link";
import FragranceLoader from "../../../../../components/FragranceLoader";

// This component acts as a wrapper for the BlogPostForm when editing.
// It retrieves the blog post slug from the URL using useParams and fetches
// the corresponding blog post data from Firestore.
export default function EditBlogPostPage() {
  const params = useParams();
  const postSlug = params.slug as string; // Get the slug from the URL parameters
  const { db, isAuthReady } = useFirebase(); // Use the Firebase context

  const [blogPostToEdit, setBlogPostToEdit] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to fetch if we have a postSlug and Firebase is ready
    if (!postSlug || !isAuthReady || !db) {
      if (!isAuthReady || !db) {
        setLoading(true);
        setError(null);
      } else if (!postSlug) {
        setError("Blog post slug not found in URL.");
        setLoading(false);
      }
      return;
    }

    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogPostsCollectionRef = collection(db, "blogPosts");
        // Query for the document where the 'slug' field matches the URL slug
        const q = query(blogPostsCollectionRef, where("slug", "==", postSlug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming slugs are unique, there should be only one document
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();

          const fetchedPost: BlogPost = {
            id: docSnap.id, // Get the Firestore document ID
            title: data.title,
            author: data.author,
            date: data.date,
            imageUrl: data.imageUrl || undefined,
            excerpt: data.excerpt,
            content: data.content,
            slug: data.slug,
            seoTitle: data.seoTitle || undefined,
            seoDescription: data.seoDescription || undefined,
            keywords: data.keywords || [],
            // Convert Firebase Timestamps to Date objects if they exist
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : undefined,
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : undefined,
          };
          setBlogPostToEdit(fetchedPost);
        } else {
          setError("Blog post not found.");
        }
      } catch (caughtError: unknown) {
        // Changed 'err' to 'caughtError' for consistency, and 'any' to 'unknown'
        console.error("Error fetching blog post for edit:", caughtError);
        let errorMessage =
          "Error loading blog post: An unexpected error occurred.";

        // Type narrowing to handle different error types safely
        // You had FirebaseError commented out, but if you re-add it, the check would look like this:
        // if (caughtError instanceof FirebaseError) {
        //   errorMessage = `Error loading blog post: ${caughtError.message} (Code: ${caughtError.code})`;
        // } else
        if (caughtError instanceof Error) {
          errorMessage = `Error loading blog post: ${caughtError.message}`;
        } else if (typeof caughtError === "string") {
          errorMessage = `Error loading blog post: ${caughtError}`;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postSlug, db, isAuthReady]); // Re-run when postSlug, db, or auth state changes

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-ug-text-dark text-lg">
          <FragranceLoader message="Loading blog post data..." />
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
            <Link
              href="/admin/blog"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Back to Blog Posts
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Render the BlogPostForm with the loaded blog post data
  // We explicitly cast to `BlogPost | undefined` as BlogPostForm expects that type
  // Note: if blogPostToEdit is null here, it means it wasn't found or there was an error.
  // The error state above should handle the 'not found' case.
  // If no error, and loading is false, blogPostToEdit should contain the data or be null if no post was found.
  // The BlogPostForm component handles `initialPost` being null/undefined correctly.
  return <BlogPostForm initialPost={blogPostToEdit} />;
}
