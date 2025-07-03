// src/app/admin/products/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for internal navigation
// import { formatPrice } from "../../../utils/currencyFormatter"; // REMOVED: No longer needed for display
import {
  getFirebaseInstances,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "../../../lib/firebase";
import { FirebaseError } from "firebase/app";
import AdminLayout from "../../../components/AdminLayout";
import { DocumentData, Firestore, QuerySnapshot } from "firebase/firestore";
import { Product } from "../../../data/product1";
import FragranceLoader from "components/FragranceLoader";
import Image from "next/image";

export default function AdminProductsPage() {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null);

  // Initialize Firebase DB instance
  useEffect(() => {
    const { db, error: initError } = getFirebaseInstances();
    if (initError) {
      setError(
        "Failed to initialize Firebase: " + (initError as Error).message
      );
      setLoading(false);
    } else if (db) {
      setDbInstance(db);
    } else {
      setError("Firebase Firestore instance is not available.");
      setLoading(false);
    }
  }, []);

  // Fetch products from Firestore using onSnapshot for real-time updates
  useEffect(() => {
    if (!dbInstance) return;

    setLoading(true);
    setError(null);

    const productsCollectionRef = collection(dbInstance, "products");

    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const productsList: Product[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const productData: Product = {
            id: doc.id,
            name: data.name,
            brand: data.brand,
            price: data.price, // Keep price in data fetch, but it won't be displayed
            imageUrl: data.imageUrl,
            description: data.description,
            category: data.category,
            featured: data.featured,
            volume: data.volume || undefined,
            scentNotes: data.scentNotes
              ? {
                  topNotes: data.scentNotes.topNotes || "",
                  heartNotes: data.scentNotes.heartNotes || "",
                  baseNotes: data.scentNotes.baseNotes || "",
                }
              : undefined,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            rating: data.rating !== undefined ? data.rating : undefined, // Include rating
            ratingSource:
              data.ratingSource !== undefined ? data.ratingSource : undefined, // Include ratingSource
          };
          productsList.push(productData);
        });
        setCurrentProducts(productsList);
        setLoading(false);
      },
      (err: FirebaseError) => {
        console.error("Firestore products fetch error:", err);
        setError("Failed to load products: " + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [dbInstance]);

  // Handle product deletion
  const handleDelete = async (id: string): Promise<void> => {
    if (!dbInstance) {
      alert("Firestore not initialized.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const productDocRef = doc(dbInstance, "products", id);
        await deleteDoc(productDocRef);
        alert("Product deleted successfully!");
      } catch (err: any) {
        alert(`Failed to delete product: ${(err as Error).message}`);
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <FragranceLoader message="Loading products..." />
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
          Manage Products
        </h1>
        {/* Use Link for internal navigation */}
        <Link
          href="/admin/products/new"
          className="bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          + Add New Product
        </Link>
      </div>

      {currentProducts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl text-ug-text-dark">No products found.</p>
          <p className="text-ug-text-dark mt-2">
            Click &quot;Add New Product&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            {" "}
            <table className="min-w-full divide-y divide-ug-neutral-light table-fixed w-full">
              <thead className="bg-ug-neutral-bg">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[10%]"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-1/4"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[12%]"
                  >
                    Brand
                  </th>
                  {/* REMOVED: Price column */}
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[12%]"
                  >
                    Price
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[12%]"
                  >
                    Category
                  </th>
                  {/* ADDED: Rating column */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[8%]"
                  >
                    Rating
                  </th>
                  {/* ADDED: Rating Source column */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[15%]" // Adjusted width
                  >
                    Rating Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[8%]"
                  >
                    Featured
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[16%]"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-ug-neutral-light">
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-ug-text-heading">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/64x64/CCCCCC/000000?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-ug-text-heading break-words">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark">
                      {product.brand}
                    </td>
                    {/* REMOVED: Price display */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark">
                      {formatPrice(product.price, "UGX", 0)}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark capitalize">
                      {product.category}
                    </td>
                    {/* ADDED: Rating display */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-ug-text-dark">
                      {product.rating !== undefined && product.rating !== null
                        ? product.rating.toFixed(1) // Display rating to one decimal place
                        : "N/A"}
                    </td>
                    {/* ADDED: Rating Source display */}
                    <td className="px-6 py-4 text-sm text-ug-text-dark break-words">
                      {product.ratingSource || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      {product.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {/* Use Link for internal navigation */}
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-ug-purple-primary hover:text-ug-purple-accent mr-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
