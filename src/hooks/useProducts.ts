// src/hooks/useProducts.ts
"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  Firestore,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Product } from "@/product";
import { useFirebase } from "context/FirebaseContext";


interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetches all products from Firestore.
 * Handles loading, error, and auth-ready states gracefully.
 */
export const useProducts = (): UseProductsResult => {
  const { db, isAuthReady } = useFirebase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db || !isAuthReady) return;

    let isMounted = true; // prevent setting state after unmount

    const fetchProducts = async (firestoreDb: Firestore) => {
      try {
        setLoading(true);
        setError(null);

        const productsRef = collection(firestoreDb, "products");
        const q = query(productsRef);
        const snapshot = await getDocs(q);

        if (!isMounted) return;

        const fetched: Product[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Product
        );

        setProducts(fetched);
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching products:", err);
        }

        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        if (isMounted) setError(`Failed to load products: ${message}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts(db);

    return () => {
      isMounted = false;
    };
  }, [db, isAuthReady]);

  return { products, loading, error };
};
