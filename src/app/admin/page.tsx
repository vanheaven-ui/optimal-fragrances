// src/app/admin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
// Remove local data imports as we will fetch from Firebase
// import { products } from "@/product";
// import { blogPosts } from "@/blogPosts";

import AdminLayout from "../../components/AdminLayout";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { FirebaseError } from "firebase/app";
import { useFirebase } from "../../context/FirebaseContext";
import FragranceLoader from "components/FragranceLoader";

export default function AdminDashboardPage() {
  const { db, isAuthReady } = useFirebase(); // Get db instance and auth status
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalBlogPosts, setTotalBlogPosts] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to fetch data if Firebase is ready and db instance is available
    if (!isAuthReady || !db) {
      if (!isAuthReady) {
        setLoading(true);
        setError(null);
      } else if (!db) {
        setError("Firebase Firestore instance is not available.");
        setLoading(false);
      }
      return;
    }

    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch total products count
        const productsCollectionRef = collection(db, "products");
        const productSnapshot = await getDocs(productsCollectionRef);
        setTotalProducts(productSnapshot.size);

        // Fetch total blog posts count
        const blogPostsCollectionRef = collection(db, "blogPosts");
        const blogPostSnapshot = await getDocs(blogPostsCollectionRef);
        setTotalBlogPosts(blogPostSnapshot.size);

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching dashboard counts:", err);
        setError(`Failed to load dashboard data: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    fetchCounts();
    // No need for onSnapshot here as counts don't need real-time updates on dashboard
    // A one-time fetch on load is sufficient.
  }, [db, isAuthReady]); // Re-run effect if db or auth state changes

  if (loading) {
    return (
      <AdminLayout>
        <FragranceLoader message="Loading dashboard data..." />
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
              {totalProducts !== null ? totalProducts : "N/A"}
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
              {totalBlogPosts !== null ? totalBlogPosts : "N/A"}
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
