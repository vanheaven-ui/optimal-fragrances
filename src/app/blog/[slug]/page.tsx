"use client"; // This is a client component as it needs to access URL parameters

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// import { BlogPost, blogPosts } from "@/blogPosts"; // REMOVE THIS: Data will come from Firestore
import Image from "next/image";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

// Re-import the BlogPost interface from a consistent source (e.g., from the new blog form)
// Ideally, this interface would be in a shared types file like '@/types/blogPost.ts'
import { BlogPost } from "../../../data/blogPosts";
import { useFirebase } from "../../../context/FirebaseContext";
import FragranceLoader from "components/FragranceLoader";

const BlogPostDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string; // Get the slug from the URL
  const { db, isAuthReady } = useFirebase(); // Get db instance and auth status

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to fetch if we have a slug and Firebase is ready
    if (!slug || !isAuthReady || !db) {
      if (!isAuthReady || !db) {
        setLoading(true); // Keep loading if Firebase isn't ready yet
        setError(null);
      } else if (!slug) {
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
        // Create a query to find the document where the 'slug' field matches the URL slug
        const q = query(blogPostsCollectionRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming slugs are unique, there should be only one document
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data() as DocumentData; // Cast to DocumentData

          const fetchedPost: BlogPost = {
            id: docSnap.id, // Get the Firestore document ID
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
            // Convert Firebase Timestamps to Date objects if they exist
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : undefined,
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : undefined,
          };
          setPost(fetchedPost);
        } else {
          setPost(null); // No post found for the given slug
          setError("Blog post not found.");
        }
      } catch (err: any) {
        console.error("Error fetching blog post:", err);
        setError(`Error loading blog post: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, db, isAuthReady]); // Re-run effect if slug, db, or auth state changes

  if (loading) {
    return <FragranceLoader message="Loading blog post..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Error Loading Blog Post
        </h1>
        <p className="text-ug-text-dark mb-8">{error}</p>
        <Link
          href="/blog"
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  // If post is null after loading and no error, it means it wasn't found
  if (!post) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-ug-text-heading mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-ug-text-dark mb-8">
          The blog post you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <article className="bg-white rounded-lg shadow-lg p-6 md:p-10 lg:p-12">
        {/* Navigation back to blog listing */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-ug-purple-primary hover:text-ug-purple-accent font-semibold transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to All Posts
          </Link>
        </div>

        {/* Blog Post Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-ug-text-heading mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-ug-text-dark text-lg mb-6 border-b pb-4 border-ug-neutral-light">
          By <span className="font-semibold">{post.author}</span>
          <span className="mx-1">on</span>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Main Image */}
        {post.imageUrl && ( // Only render Image if imageUrl exists
          <div className="mb-8 relative w-full h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-md">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill // Use fill for responsive images in parent div
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400/CCCCCC/000000?text=Image+Error";
              }} // Fallback
            />
          </div>
        )}

        {/* Blog Post Content (rendered as raw HTML from Markdown) */}
        <div
          className="prose prose-lg max-w-none text-ug-text-dark leading-relaxed" // Using prose for basic markdown styling
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* SEO Keywords (optional, for display or dev review) */}
        {post.keywords && post.keywords.length > 0 && (
          <div className="mt-10 pt-6 border-t border-ug-neutral-light">
            <h3 className="text-xl font-bold text-ug-text-heading mb-3">
              Keywords:
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-ug-neutral-light text-ug-text-dark text-sm px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostDetailPage;
