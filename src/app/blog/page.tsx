"use client"; // This is a client component due to potential future filtering/pagination

import { blogPosts } from "@/blogPosts";
import BlogPostCard from "components/BlogPostCard";
import Link from "next/link";

export default function BlogPage() {
  // Sort posts by date, newest first
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-ug-text-heading text-center mb-6">
        Our Fragrance Blog
      </h1>
      <p className="text-xl text-ug-text-dark text-center max-w-2xl mx-auto mb-8">
        Dive into the world of scents with our articles on perfume trends, tips,
        and the art of fragrance.
      </p>

      {/* Navigation back to homepage */}
      <div className="text-center mb-10">
        <Link
          href="/"
          className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          &larr; Back to Home
        </Link>
      </div>

      {sortedBlogPosts.length === 0 ? (
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
          {sortedBlogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
