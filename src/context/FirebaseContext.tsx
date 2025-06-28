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
  signInWithCustomToken,
  signOut,
  Auth,
  User,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

interface FirebaseContextType {
  db: Firestore | null;
  auth: Auth | null;
  userId: string | null;
  isAuthReady: boolean;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

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

    try {
      const firebaseConfigString =
        typeof window !== "undefined" ? window.__firebase_config : undefined;
      let firebaseConfig: object;

      if (firebaseConfigString) {
        try {
          firebaseConfig = JSON.parse(firebaseConfigString);
        } catch (e) {
          console.error("Error parsing __firebase_config:", e);
          firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
            messagingSenderId:
              process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
          };
        }
      } else {
        console.warn("No __firebase_config found. Using fallback config.");
        firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
        };
      }

      if (!getApps().length) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApp();
      }

      const firestoreInstance = getFirestore(firebaseApp);
      const authInstance = getAuth(firebaseApp);

      setDb(firestoreInstance);
      setAuth(authInstance);

      const initialAuthToken =
        typeof window !== "undefined" ? window.__initial_auth_token : undefined;

      const authenticate = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(authInstance, initialAuthToken);
            console.log("Firebase: Authenticated with custom token.");
          }
        } catch (error) {
          console.error("Firebase Authentication failed:", error);
        } finally {
          setIsAuthReady(true);
        }
      };

      authenticate();
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setIsAuthReady(true);
    }
  }, []);

  // Listen for changes in auth state
  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          setUserId(user.uid);
          console.log("Firebase Auth State Changed: User ID set:", user.uid);
        } else {
          setUserId(null);
          console.log("Firebase Auth State Changed: No authenticated user.");
        }
      });
      return () => unsubscribe();
    }
  }, [auth]);

  // Clean logout function
  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        setUserId(null);
        console.log("User signed out successfully.");
        // Optional: Clear token from localStorage or cookies if used
        // localStorage.removeItem("your_custom_token");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  const contextValue = { db, auth, userId, isAuthReady, logout };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
