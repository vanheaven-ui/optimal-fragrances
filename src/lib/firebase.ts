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
    return { app: appInstance, db: dbInstance, auth: authInstance, error: null };
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
  } catch (e: any) {
    console.error("Error initializing Firebase:", e);
    return { app: null, db: null, auth: null, error: e };
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
