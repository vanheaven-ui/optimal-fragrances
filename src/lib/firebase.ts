// src/lib/firebase.ts
"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// IMPORTANT: FOR LOCAL DEVELOPMENT ONLY.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAvxfY-M697XiIIEATiZ_W_PM_w9Ol6P3w",
  authDomain: "optimal-fragrances.firebaseapp.com",
  projectId: "optimal-fragrances",
  storageBucket: "optimal-fragrances.firebasestorage.app",
  messagingSenderId: "462977682528",
  appId: "1:462977682528:web:aca4a37ca9bc0234b58705",
  measurementId: "G-CYKVE8JKJ4",
};
// END OF LOCAL DEVELOPMENT CONFIG

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

/**
 * Initializes Firebase and returns the initialized instances.
 * This function ensures Firebase is initialized only once.
 * It does NOT perform any automatic sign-in (anonymous or custom token).
 * Authentication must be handled explicitly by components (e.g., login page).
 */
export const getFirebaseInstances = () => {
  if (appInstance && dbInstance && authInstance) {
    return {
      app: appInstance,
      db: dbInstance,
      auth: authInstance,
      error: null,
    };
  }

  try {
    const configToUse = FIREBASE_CONFIG; // Directly use the hardcoded config for local dev

    if (
      !configToUse ||
      Object.keys(configToUse).length === 0 ||
      !configToUse.apiKey ||
      configToUse.apiKey === "YOUR_API_KEY"
    ) {
      const errorMessage =
        "Firebase configuration is missing or incomplete. Please update FIREBASE_CONFIG in src/lib/firebase.ts with your actual credentials.";
      console.error(errorMessage);
      return {
        app: null,
        db: null,
        auth: null,
        error: new Error(errorMessage),
      };
    }

    appInstance = initializeApp(configToUse);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);

    console.log("Firebase initialized successfully!");
    return {
      app: appInstance,
      db: dbInstance,
      auth: authInstance,
      error: null,
    };
  } catch (e: any) {
    console.error("Error initializing Firebase:", e);
    return { app: null, db: null, auth: null, error: e };
  }
};

// Re-export Firebase functions for convenience, associated with the lazy-initialized instances
export {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
};

// Export instances themselves, but they will be null until getFirebaseInstances is called
export { dbInstance as db, authInstance as auth };
