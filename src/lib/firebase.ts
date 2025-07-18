// src/lib/firebase.ts
"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
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
import { FirebaseError } from "firebase/app"; // Import FirebaseError

// Use environment variables (MUST start with NEXT_PUBLIC_ for client-side access)
const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Instances
let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

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
    if (!getApps().length) {
      appInstance = initializeApp(FIREBASE_CONFIG);
    } else {
      appInstance = getApp(); // use existing app
    }

    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);

    return {
      app: appInstance,
      db: dbInstance,
      auth: authInstance,
      error: null,
    };
  } catch (caughtError: unknown) {
    console.error("Error initializing Firebase:", caughtError);

    let errorMessage: string =
      "An unknown error occurred during Firebase initialization.";
    let errorObject: Error | FirebaseError | unknown = caughtError; // Keep the original for logging

    if (caughtError instanceof FirebaseError) {
      errorMessage = `Firebase Error: ${caughtError.message} (Code: ${caughtError.code})`;
      // If you want to return a FirebaseError instance, use it directly
      errorObject = caughtError;
    } else if (caughtError instanceof Error) {
      errorMessage = `General Error: ${caughtError.message}`;
      // If you want to return a standard Error instance, use it directly
      errorObject = caughtError;
    } else if (typeof caughtError === "string") {
      errorMessage = `String Error: ${caughtError}`;
      errorObject = new Error(errorMessage); // Wrap string in Error object for consistency
    }

    // Return an Error object for consistency in the 'error' property.
    // We now use errorObject, which might be a FirebaseError, Error, or wrapped string.
    // Casting to Error ensures consistency with the return type of the hook.
    return { app: null, db: null, auth: null, error: errorObject as Error };
  }
};

// Re-export Firebase utilities
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

// Export instances (may be null until getFirebaseInstances() is called)
export { dbInstance as db, authInstance as auth };
