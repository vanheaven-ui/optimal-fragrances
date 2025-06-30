// src/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { collection, getDocs, Firestore, query } from "firebase/firestore";
import { Product } from "../data/product";
import { useFirebase } from "../context/FirebaseContext";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch all products from Firestore.
 * Provides loading and error states.
 */
export const useProducts = (): UseProductsResult => {
  const { db, isAuthReady } = useFirebase(); // Get db instance and auth readiness from context
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (firestoreDb: Firestore) => {
      setLoading(true);
      setError(null);
      try {
        // Reference to the 'products' collection
        const productsCollectionRef = collection(firestoreDb, "products");
        // Create a query to get all documents in the collection
        const q = query(productsCollectionRef);
        // Execute the query
        const querySnapshot = await getDocs(q);

        // Map the Firestore documents to your Product interface
        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]; // Type assertion to ensure correct type

        setProducts(fetchedProducts); // <--- RESOLVED: Using setProducts here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // Catch any errors during the fetch operation
        console.error("Error fetching products:", err);
        setError("Failed to load products. " + err.message);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete (or error occurs)
      }
    };

    // Only attempt to fetch data if Firestore db is initialized and authentication is ready
    if (db && isAuthReady) {
      fetchProducts(db);
    } else if (isAuthReady === true && !db) {
      // auth is ready but db is null, indicating an init error
      setError("Firebase not initialized. Please check your configuration.");
      setLoading(false);
    }
  }, [db, isAuthReady]); // Dependencies: re-run effect if db instance or auth readiness changes

  console.log(products)

  return { products, loading, error };
};
