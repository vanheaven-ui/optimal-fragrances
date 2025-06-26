import { BlogPost } from "@/blogPosts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                      overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
      >
        {/* Blog Post Image */}
        <div className="relative w-full" style={{ paddingBottom: "66.66%" }}>
          <Image
            src={post.image}
            alt={post.title}
            width={100}
            height={100}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400/CCCCCC/000000?text=Image+Error";
            }} // Fallback for image loading errors
          />
        </div>

        {/* Blog Post Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-ug-text-heading mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-ug-text-dark text-sm mb-3">
            By {post.author} on{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-ug-text-dark text-base flex-grow mb-4">
            {post.excerpt}
          </p>
          <span className="text-ug-purple-primary font-semibold hover:underline mt-auto">
            Read More &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
