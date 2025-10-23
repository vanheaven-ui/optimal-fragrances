"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
  Auth,
  User,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Define context shape
interface FirebaseContextType {
  db: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isAuthReady: boolean;
  logout: () => Promise<void>;
}

// Context
const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

// Props
interface FirebaseProviderProps {
  children: ReactNode;
}

// Firebase init helper (ensures single instance)
function initFirebaseApp(): FirebaseApp {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  };

  if (!getApps().length) {
    return initializeApp(config);
  }
  return getApp();
}

// Provider
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const app = initFirebaseApp();
      const authInstance = getAuth(app);
      const dbInstance = getFirestore(app);

      setAuth(authInstance);
      setDb(dbInstance);

      // Optional: authenticate with a pre-fetched custom token (if provided)
      const token =
        typeof window !== "undefined"
          ? (window as any).__initial_auth_token
          : undefined;

      if (token) {
        signInWithCustomToken(authInstance, token).catch((err) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Firebase: custom token sign-in failed:", err);
          }
        });
      }

      const unsub = onAuthStateChanged(authInstance, (currentUser) => {
        setUser(currentUser);
        setIsAuthReady(true);
      });

      return () => unsub();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Firebase initialization failed:", err);
      }
      setIsAuthReady(true);
    }
  }, []);

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Sign out failed:", err);
      }
    }
  };

  const contextValue = useMemo(
    () => ({ db, auth, user, isAuthReady, logout }),
    [db, auth, user, isAuthReady]
  );

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
