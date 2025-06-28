// src/app/admin/products/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams
import Link from "next/link"; // Import Link for internal navigation
import AdminProductForm, { Product } from "../../new/page"; // Import the reusable form component AND Product interface
import AdminLayout from "components/AdminLayout";
import { doc, getDoc, DocumentData } from "firebase/firestore"; // Import Firestore functions
import { FirebaseError } from "firebase/app"; // Import FirebaseError for specific error handling
import { useFirebase } from "../../../../../context/FirebaseContext";
import FragranceLoader from "components/FragranceLoader";

// This component acts as a wrapper for the AdminProductForm when editing.
// It retrieves the product ID from the URL using useParams and fetches the
// corresponding product data from Firestore, then passes it to AdminProductForm.
export default function EditProductPage() {
  const params = useParams();
  // Ensure productId is a string, as dynamic routes parameters are strings
  const productId = params?.id as string;
  const { db, isAuthReady } = useFirebase(); // Use the Firebase context

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to fetch if we have a productId and Firebase is ready
    if (!productId || !isAuthReady || !db) {
      if (!isAuthReady || !db) {
        // Firebase is still initializing or DB instance is not available
        setLoading(true); // Keep loading state if Firebase isn't ready
        setError(null); // Clear any previous errors
      } else if (!productId) {
        // This case should ideally not happen if route is configured correctly
        setError("Product ID not found in URL.");
        setLoading(false);
      }
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data() as DocumentData; // Cast data to DocumentData
          const fetchedProduct: Product = {
            id: productSnap.id,
            name: data.name,
            brand: data.brand,
            price: Number(data.price), // Ensure price is a number
            imageUrl: data.imageUrl,
            description: data.description,
            category: data.category,
            featured: data.featured,
            volume: data.volume || undefined, // Handle optional field
            // Ensure scentNotes structure matches, including handling undefined
            scentNotes: data.scentNotes
              ? {
                  topNotes: data.scentNotes.topNotes || "",
                  heartNotes: data.scentNotes.heartNotes || "",
                  baseNotes: data.scentNotes.baseNotes || "",
                }
              : undefined,
            // Convert Firestore Timestamps to Date objects if they exist
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : undefined,
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : undefined,
          };
          setProductToEdit(fetchedProduct);
        } else {
          setError("Product not found.");
          setProductToEdit(null); // Ensure post is null if not found
        }
      } catch (err: any) {
        console.error("Error fetching product for edit:", err);
        // Cast err to FirebaseError if specific details are needed, otherwise generic Error
        setError(`Error loading product: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, db, isAuthReady]); // Re-run effect when productId, db, or auth state changes

  // Always render AdminLayout to prevent unintended unmount/logout
  return (
    <>
      {loading ? (
        <FragranceLoader message="Loading product data..." />
      ) : error ? (
        <div className="text-center py-10 text-red-500 text-lg">
          {error}
          <div className="mt-4">
            {/* Use Link for internal navigation */}
            <Link
              href="/admin/products"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Back to Product List
            </Link>
          </div>
        </div>
      ) : (
        // Render the AdminProductForm with the loaded product data
        // We explicitly cast to `Product | undefined` as AdminProductForm expects that type
        // It's safe because if we're here and not loading/error, productToEdit is definitely not null.
        <AdminProductForm
          initialProduct={productToEdit as Product | undefined}
        />
      )}
    </>
  );
}
