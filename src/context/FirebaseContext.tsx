// src/context/FirebaseContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  Auth,
  User,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Define the shape of the context value
interface FirebaseContextType {
  db: Firestore | null;
  auth: Auth | null;
  userId: string | null;
  isAuthReady: boolean; // Indicates if Firebase Auth has completed its initial check
}

// Create the context with a default null value
const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

// Define global variables provided by the Canvas environment
declare global {
  interface Window {
    __firebase_config?: string;
    __initial_auth_token?: string;
    __app_id?: string;
  }
}

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    let firebaseApp: FirebaseApp;
    let firestoreInstance: Firestore;
    let authInstance: Auth;

    try {
      // 1. Initialize Firebase App
      const firebaseConfigString =
        typeof window !== "undefined" ? window.__firebase_config : undefined;
      let firebaseConfig: object;

      if (firebaseConfigString) {
        try {
          firebaseConfig = JSON.parse(firebaseConfigString);
        } catch (e) {
          console.error("Error parsing __firebase_config:", e);
          // Fallback to dummy config if parsing fails
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
      } else {
        console.warn(
          "No __firebase_config found. Using dummy Firebase config. For local testing, replace with your actual Firebase project config."
        );
        // Fallback for local testing outside Canvas
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

      if (!getApps().length) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApp();
      }

      firestoreInstance = getFirestore(firebaseApp);
      authInstance = getAuth(firebaseApp);

      setDb(firestoreInstance);
      setAuth(authInstance);

      // 2. Authenticate
      const initialAuthToken =
        typeof window !== "undefined" ? window.__initial_auth_token : undefined;

      const authenticate = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(authInstance, initialAuthToken);
            console.log("Firebase: Authenticated with custom token.");
          } else {
            await signInAnonymously(authInstance);
            console.log("Firebase: Signed in anonymously.");
          }
        } catch (error) {
          console.error("Firebase Authentication failed:", error);
          // If anonymous sign-in fails, a random UUID will be used for userId
        } finally {
          setIsAuthReady(true); // Mark auth as ready regardless of success
        }
      };

      authenticate(); // Call authentication
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setIsAuthReady(true); // Even if init fails, mark as ready to prevent infinite loading states
    }
  }, []); // Empty dependency array means this runs once on mount

  // Listen for Auth state changes to set userId
  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          setUserId(user.uid);
          console.log("Firebase Auth State Changed: User ID set:", user.uid);
        } else {
          // If no user is authenticated (e.g., sign out, or initial anonymous failed)
          // For private collections, we need a unique ID per user session even if anonymous sign-in fails
          // For public collections, request.auth != null is usually sufficient.
          const currentUserId = localStorage.getItem("localUserId");
          if (currentUserId) {
            setUserId(currentUserId);
            console.log(
              "Firebase Auth State Changed: Using existing local user ID:",
              currentUserId
            );
          } else {
            const newId = crypto.randomUUID();
            setUserId(newId);
            localStorage.setItem("localUserId", newId);
            console.log(
              "Firebase Auth State Changed: Generated new local user ID:",
              newId
            );
          }
        }
      });
      return () => unsubscribe(); // Cleanup subscription on unmount
    }
  }, [auth]);

  // Provide the context value
  const contextValue = { db, auth, userId, isAuthReady };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to easily consume the Firebase context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
