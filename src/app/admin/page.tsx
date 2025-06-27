// src/app/admin/page.tsx
"use client";

import { products } from "@/product";
// Adjusted import paths to be more direct from a perceived 'src' root
import AdminLayout from "../../components/AdminLayout";
import { blogPosts } from "@/blogPosts";

export default function AdminDashboardPage() {
  const totalProducts = products.length;
  const totalBlogPosts = blogPosts.length;

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold text-ug-text-heading mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card for Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0 bg-ug-purple-primary p-3 rounded-full text-white">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-ug-text-dark text-lg">Total Products</p>
            <h2 className="text-4xl font-bold text-ug-text-heading">
              {totalProducts}
            </h2>
          </div>
        </div>

        {/* Card for Total Blog Posts */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0 bg-ug-purple-primary p-3 rounded-full text-white">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-ug-text-dark text-lg">Total Blog Posts</p>
            <h2 className="text-4xl font-bold text-ug-text-heading">
              {totalBlogPosts}
            </h2>
          </div>
        </div>

        {/* Example: Quick Links */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-bold text-ug-text-heading mb-4">
            Quick Actions
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/admin/blog/new"
                className="text-ug-purple-primary hover:underline font-semibold"
              >
                + Add New Blog Post
              </a>
            </li>
            <li>
              <a
                href="/admin/products/new"
                className="text-ug-purple-primary hover:underline font-semibold"
              >
                + Add New Product
              </a>
            </li>
            <li>
              <a
                href="/admin/blog"
                className="text-ug-purple-primary hover:underline font-semibold"
              >
                View All Blog Posts
              </a>
            </li>
            <li>
              <a
                href="/admin/products"
                className="text-ug-purple-primary hover:underline font-semibold"
              >
                View All Products
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
