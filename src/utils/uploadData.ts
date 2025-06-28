// src/utils/uploadData.ts

// This utility script is designed to be run manually when you need to populate Firestore with initial data.
// It uses the client-side Firebase SDK.

// Ensure you have these installed:
// npm install firebase

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import { products } from "../data/product"
import { blogPosts } from "../data/blogPosts";

// --- Type definitions for global Canvas variables ---
// This tells TypeScript that these global variables exist on the window object.
declare global {
  interface Window {
    __firebase_config?: string;
    __initial_auth_token?: string;
  }
}

// --- Firebase Configuration (for local development/manual run) ---
// IMPORTANT: In the Canvas environment, __firebase_config and __initial_auth_token are provided globally.
// For local testing outside Canvas, you might need to manually set these or your own config.
// For production Canvas deployments, these global vars will handle authentication.
let firebaseConfig = {};
let initialAuthToken: string | null = null;

console.log("Entering firebase...")

if (
  typeof window !== "undefined" &&
  typeof window.__firebase_config !== "undefined"
) {
  try {
    firebaseConfig = JSON.parse(window.__firebase_config);
  } catch (e) {
    console.error("Error parsing __firebase_config:", e);
  }
} else {
  // Fallback for local testing outside Canvas (replace with your actual config if needed)
  console.warn(
    "Using dummy Firebase config. For local testing, replace with your actual Firebase project config."
  );
  firebaseConfig = {
    apiKey: "AIzaSyAvxfY-M697XiIIEATiZ_W_PM_w9Ol6P3w",
    authDomain: "optimal-fragrances.firebaseapp.com",
    projectId: "optimal-fragrances",
    storageBucket: "optimal-fragrances.firebasestorage.app",
    messagingSenderId: "462977682528",
    appId: "1:462977682528:web:aca4a37ca9bc0234b58705",
    measurementId: "G-CYKVE8JKJ4",
  };
}

if (
  typeof window !== "undefined" &&
  typeof window.__initial_auth_token !== "undefined"
) {
  initialAuthToken = window.__initial_auth_token;
} else {
  console.warn(
    "No __initial_auth_token found. Will attempt anonymous sign-in or may fail without proper auth."
  );
  // For local testing, if you need authenticated writes, you'll need to set up Firebase Auth
  // and either get a custom token or allow unauthenticated writes via Security Rules (NOT RECOMMENDED for prod).
}

// Initialize Firebase App
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); 
}

const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Uploads initial product and blog post data to Firestore.
 * Requires appropriate Firebase Security Rules for write access.
 */
export async function uploadInitialData() {
  console.log("Starting data upload to Firestore...");

  try {
    // Authenticate (important for write access if security rules require it)
    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
      console.log("Authenticated with custom token.");
    } else {
      // Attempt anonymous sign-in if no custom token (might fail if rules disallow)
      await signInAnonymously(auth);
      console.log(
        "Signed in anonymously. Ensure your Firestore rules allow this or use a custom token."
      );
    }

    // --- Upload Products ---
    console.log("Uploading products to 'products' collection...");
    // for (const product of products) {
    //   try {
    //     // Using setDoc with explicit ID to ensure your predefined IDs are used
    //     const productDocRef = doc(db, "products", product.id);
    //     await setDoc(productDocRef, {
    //       ...product,
    //       createdAt: serverTimestamp(), // Set server timestamp for creation
    //       updatedAt: serverTimestamp(), // Set server timestamp for last update
    //     });
    //     console.log(`✅ Uploaded product: ${product.name} (ID: ${product.id})`);
    //   } catch (error) {
    //     console.error(
    //       `❌ Failed to upload product ${product.name} (ID: ${product.id}):`,
    //       error
    //     );
    //   }
    // }
    // console.log("Products upload complete.");

    // --- Upload Blog Posts ---
    console.log("Uploading blog posts to 'blogPosts' collection...");
    for (const post of blogPosts) {
      try {
        // Using setDoc with explicit ID to ensure your predefined IDs are used
        const blogPostDocRef = doc(db, "blogPosts", post.id);
        await setDoc(blogPostDocRef, {
          ...post,
          createdAt: serverTimestamp(), // Set server timestamp for creation
          updatedAt: serverTimestamp(), // Set server timestamp for last update
        });
        console.log(`✅ Uploaded blog post: ${post.title} (ID: ${post.id})`);
      } catch (error) {
        console.error(
          `❌ Failed to upload blog post ${post.title} (ID: ${post.id}):`,
          error
        );
      }
    }
    console.log("Blog posts upload complete.");
  } catch (authError) {
    console.error("Authentication failed, cannot upload data:", authError);
  }

  console.log("Initial data upload process finished.");
}

// --- CALL THE UPLOAD FUNCTION HERE ---
// This is the missing piece!
uploadInitialData().catch(console.error); // Call the function and catch any top-level errors

// The window.uploadInitialData export below is for browser environments (like the temporary page)
// and is not needed for direct Node.js execution.
// window.uploadInitialData = uploadInitialData;

// You can expose this function globally for easy access in the browser console during development
// For example, in a development build or if this script is included directly in an HTML page.
// window.uploadInitialData = uploadInitialData;

// For production, you'd typically remove this or guard it securely.
