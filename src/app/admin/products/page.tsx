// src/app/admin/products/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { formatPrice } from "../../../utils/currencyFormatter"; // Path: src/app/admin/products/page.tsx -> src/utils/currencyFormatter.ts
// Import Firebase functions and types from the central utility
import {
  getFirebaseInstances,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "../../../lib/firebase"; // Path: src/app/admin/products/page.tsx -> src/lib/firebase.ts
import { FirebaseError } from "firebase/app"; // Specific Firebase error type
import AdminLayout from "../../../components/AdminLayout"; // Path: src/app/admin/products/page.tsx -> src/components/AdminLayout.tsx
import { DocumentData, Firestore, QuerySnapshot } from "firebase/firestore";
import { Product } from "../../../data/product";

export default function AdminProductsPage() {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null); // State to hold the Firestore instance

  // Initialize Firebase when the component mounts
  useEffect(() => {
    const { db, error: initError } = getFirebaseInstances();
    if (initError) {
      setError(
        "Failed to initialize Firebase: " + (initError as Error).message
      );
      setLoading(false);
    } else if (db) {
      setDbInstance(db);
      // Data fetching will proceed in the next useEffect
    } else {
      setError("Firebase Firestore instance is not available.");
      setLoading(false);
    }
  }, []);

  // Fetch and listen to real-time product updates from Firestore
  useEffect(() => {
    if (!dbInstance) {
      // Don't try to fetch if Firestore isn't available yet
      // Loading is already handled by the first useEffect
      return;
    }

    setLoading(true);
    setError(null);

    // Assuming products are in a root collection named 'products' for simplicity
    // If you're using /artifacts/{appId}/public/data/products, you'd need the appId here.
    const productsCollectionRef = collection(dbInstance, "products");

    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const productsList: Product[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const productData: Product = {
            id: doc.id,
            name: data.name as string,
            brand: data.brand as string,
            price: data.price as number,
            imageUrl: data.imageUrl as string,
            description: data.description as string,
            category: data.category as "men" | "women" | "unisex",
            featured: data.featured as boolean,
            volume: data.volume || undefined,
            scentNotes: data.scentNotes
              ? {
                  topNotes: (data.scentNotes.topNotes as string) || "",
                  heartNotes: (data.scentNotes.heartNotes as string) || "",
                  baseNotes: (data.scentNotes.baseNotes as string) || "",
                }
              : undefined,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
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

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dbInstance]); // Re-run when dbInstance changes

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
        // onSnapshot listener will automatically update currentProducts state
      } catch (err: any) {
        alert(`Failed to delete product: ${(err as Error).message}`);
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-ug-text-dark text-lg">
          Loading products...
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
      {/* Sticky header for title and add button */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 z-20 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-ug-text-heading">
          Manage Products
        </h1>
        <a
          href="/admin/products/new"
          className="bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          + Add New Product
        </a>
      </div>

      {currentProducts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl text-ug-text-dark">No products found.</p>
          <p className="text-ug-text-dark mt-2">
            Click "Add New Product" to create one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-ug-neutral-light table-auto w-full">
            <thead className="bg-ug-neutral-bg sticky top-[128px] z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[10%]"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[20%]"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[10%]"
                >
                  Brand
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[10%]"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[10%]"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[5%]"
                >
                  Featured
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-ug-text-dark uppercase tracking-wider w-[15%]"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-ug-neutral-light">
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-ug-text-heading">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/64x64/CCCCCC/000000?text=No+Image"; // Fallback
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-ug-text-heading break-words">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark">
                    {formatPrice(product.price, "UGX", 0)}{" "}
                    {/* Removed extra arguments */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ug-text-dark capitalize">
                    {product.category}
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
                    <a
                      href={`/admin/products/${product.id}/edit`} // Use id for editing
                      className="text-ug-purple-primary hover:text-ug-purple-accent mr-3"
                    >
                      Edit
                    </a>
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
      )}
    </AdminLayout>
  );
}
