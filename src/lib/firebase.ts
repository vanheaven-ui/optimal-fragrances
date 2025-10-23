"use client";

import {
  initializeApp,
  getApps,
  getApp,
  FirebaseApp,
  FirebaseError,
} from "firebase/app";
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

/**
 * Firebase configuration using environment variables.
 * All values must be prefixed with NEXT_PUBLIC_ for client-side access.
 */
const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate environment variables once at startup (helps prevent silent runtime errors)
for (const [key, value] of Object.entries(FIREBASE_CONFIG)) {
  if (!value) {
    console.warn(
      `⚠️ Firebase config key "${key}" is missing in environment variables.`
    );
  }
}

// Instances (cached to avoid re-initialization)
let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

interface FirebaseInstances {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  error: Error | null;
}

/**
 * Safely initializes Firebase and returns app, auth, and Firestore instances.
 * Automatically reuses existing instances if available.
 */
export const getFirebaseInstances = (): FirebaseInstances => {
  if (appInstance && dbInstance && authInstance) {
    return {
      app: appInstance,
      db: dbInstance,
      auth: authInstance,
      error: null,
    };
  }

  try {
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Cache instances for reuse
    appInstance = app;
    authInstance = auth;
    dbInstance = db;

    return { app, db, auth, error: null };
  } catch (err: unknown) {
    console.error("❌ Firebase initialization failed:", err);

    let error: Error;
    if (err instanceof FirebaseError) {
      error = new Error(`Firebase Error (${err.code}): ${err.message}`);
    } else if (err instanceof Error) {
      error = err;
    } else {
      error = new Error("Unknown error initializing Firebase.");
    }

    return { app: null, db: null, auth: null, error };
  }
};

// Named exports for convenience in other files
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

// Lazy exports for compatibility (note: may be null until initialized)
export { dbInstance as db, authInstance as auth };
