// src/app/blog/[slug]/page.tsx
"use client"; // This is a client component as it needs to access URL parameters

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlogPost, blogPosts } from "@/blogPosts";
import Image from "next/image";

const BlogPostDetailPage: React.FC = () => {
  console.log(blogPosts);

  const params = useParams();
  const slug = params?.slug as string; // Get the slug from the URL
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = blogPosts.find((p) => p.slug === slug);
      setPost(foundPost || null);
    }
  }, [slug]); // Added slug to dependency array as it's a dependency

  if (!post) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-ug-text-heading mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-ug-text-dark mb-8">
          The blog post you are looking for does not exist or has been moved.
        </p>
        <Link // Changed <a> back to Link
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
          <Link // Changed <a> back to Link
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
        <div className="mb-8 relative w-full h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-md">
          <Image
            src={post.image}
            alt={post.title}
            width={100} // Explicit width
            height={100} // Explicit height
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400/CCCCCC/000000?text=Image+Error";
            }} // Fallback
          />
        </div>

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
