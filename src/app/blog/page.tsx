"use client"; // This is a client component due to potential future filtering/pagination

import React, { useState, useEffect } from "react";
// import { blogPosts } from "@/blogPosts"; // REMOVE THIS: Data will come from Firestore
import BlogPostCard from "components/BlogPostCard";
import Link from "next/link";
import { useFirebase } from "../../context/FirebaseContext";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { BlogPost } from "../../data/blogPosts";
import FragranceLoader from "components/FragranceLoader";

// // Re-define or import the BlogPost interface if it's not globally available
// // Ensure this matches the structure you're saving to Firestore.
// export interface BlogPost {
//   id: string;
//   title: string;
//   author: string;
//   date: string; // Stored as a date string (YYYY-MM-DD)
//   imageUrl?: string;
//   excerpt: string;
//   content: string;
//   slug: string;
//   seoTitle?: string;
//   seoDescription?: string;
//   keywords?: string[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export default function BlogPage() {
  const { db, isAuthReady } = useFirebase(); // Get db instance and auth status
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to fetch if Firebase is ready and db instance is available
    if (!isAuthReady || !db) {
      if (!isAuthReady) {
        setLoading(true); // Keep loading if Firebase isn't ready yet
        setError(null);
      } else if (!db) {
        setError("Firebase Firestore instance is not available.");
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);

    const blogPostsCollectionRef = collection(db, "blogPosts");
    // Create a query to order by date, newest first (assuming 'date' field exists and is sortable)
    // If 'createdAt' is a more reliable timestamp, use that instead.
    const q = query(blogPostsCollectionRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q, // Use the ordered query
      (snapshot) => {
        const postsList: BlogPost[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as DocumentData; // Cast to DocumentData
          postsList.push({
            id: doc.id,
            title: data.title,
            author: data.author,
            date: data.date, // Assuming date is stored as a string or compatible format
            imageUrl: data.imageUrl || undefined,
            excerpt: data.excerpt,
            content: data.content,
            slug: data.slug,
            seoTitle: data.seoTitle || undefined,
            seoDescription: data.seoDescription || undefined,
            keywords: data.keywords || [],
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : undefined,
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : undefined,
          });
        });
        setBlogPosts(postsList);
        setLoading(false);
      },
      (err: FirebaseError) => {
        console.error("Firestore blog posts fetch error:", err);
        setError("Failed to load blog posts. Please try again.");
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [db, isAuthReady]); // Re-run effect if db or auth state changes

  if (loading) {
    return <FragranceLoader message="Loading blog posts..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link
          href="/"
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6">
        Our Fragrance Blog
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-2xl mx-auto mb-8">
        Dive into the world of scents with our articles on perfume trends, tips,
        and the art of fragrance.
      </p>

      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          &larr; Back to Home
        </Link>
      </div>

      {blogPosts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-2xl text-ug-text-dark mb-4">
            No blog posts available at the moment.
          </p>
          <p className="text-lg text-ug-text-dark">
            Please check back soon for new content!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
