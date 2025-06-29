// src/app/admin/products/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminLayout from "components/AdminLayout";
import AdminProductForm, { Product } from "../../../../../components/AdminProductForm"; 
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { useFirebase } from "../../../../../context/FirebaseContext";
import FragranceLoader from "components/FragranceLoader";
import { FirebaseError } from "firebase/app";

export default function EditProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { db, isAuthReady } = useFirebase();

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID not found in URL.");
      setLoading(false);
      return;
    }

    if (!isAuthReady || !db) {
      setLoading(true);
      setError(null);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data() as DocumentData;
          const fetchedProduct: Product = {
            id: productSnap.id,
            name: data.name,
            brand: data.brand,
            price: Number(data.price),
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
          setProductToEdit(null);
        }
      } catch (caughtError: unknown) {
        console.error("Error fetching product for edit:", caughtError);
        let errorMessage: string =
          "Error loading product: An unexpected error occurred.";

        if (caughtError instanceof FirebaseError) {
          errorMessage = `Error loading product: ${caughtError.message} (Code: ${caughtError.code})`;
        } else if (caughtError instanceof Error) {
          errorMessage = `Error loading product: ${caughtError.message}`;
        } else if (typeof caughtError === "string") {
          errorMessage = `Error loading product: ${caughtError}`;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, db, isAuthReady]);

  return (
    <AdminLayout>
      {loading ? (
        <FragranceLoader message="Loading product data..." />
      ) : error ? (
        <div className="text-center py-10 text-red-500 text-lg">
          {error}
          <div className="mt-4">
            <Link
              href="/admin/products"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Back to Product List
            </Link>
          </div>
        </div>
      ) : (
        <AdminProductForm
          initialProduct={productToEdit as Product | undefined}
          isEditMode={true} // Explicitly set isEditMode to true for the edit page
        />
      )}
    </AdminLayout>
  );
}
