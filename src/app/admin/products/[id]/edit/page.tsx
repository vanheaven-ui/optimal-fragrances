// src/app/admin/products/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import AdminProductForm from "../../new/page"; // Import the reusable form component
import { Product, products } from "@/product";
import AdminLayout from "components/AdminLayout";

// This component acts as a wrapper for the AdminProductForm when editing.
// It retrieves the product ID from the URL and passes the corresponding product data
// to the AdminProductForm.
export default function EditProductPage() {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Manually parse the product ID from window.location.pathname
    // Expected path: /admin/products/PRODUCT_ID/edit
    const pathParts = window.location.pathname.split("/");
    // The ID is typically at index `pathParts.length - 2`
    const productId = pathParts[pathParts.length - 2];

    if (productId) {
      const foundProduct = products.find((p) => p.id === productId);
      if (foundProduct) {
        setProductToEdit(foundProduct);
        setLoading(false);
      } else {
        setError("Product not found.");
        setLoading(false);
      }
    } else {
      setError("Product ID not found in URL.");
      setLoading(false);
    }
  }, []); // Run once on mount

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-ug-text-dark text-lg">
          Loading product data...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-red-500 text-lg">
          {error}
          <div className="mt-4">
            <a
              href="/admin/products"
              className="inline-block bg-ug-purple-primary text-white hover:bg-ug-purple-accent px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Back to Product List
            </a>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Render the AdminProductForm with the loaded product data
  return <AdminProductForm initialProduct={productToEdit || undefined} />;
}
