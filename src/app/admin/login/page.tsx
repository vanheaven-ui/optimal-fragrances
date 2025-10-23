"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { getFirebaseInstances } from "../../../lib/firebase";
import FragranceLoader from "components/FragranceLoader";

// -----------------------------------------------------
// NEW COMPONENT: UniquePulsingButtonLoader
// -----------------------------------------------------
const UniquePulsingButtonLoader: React.FC = () => (
  // Container for the animation
  <div className="flex items-center justify-center space-x-1">
    <div className="relative w-4 h-4">
      {/* Central "Orbiting" Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow-reverse"></div>

      {/* Outer Rotating Dot (The unique part) */}
      <div className="absolute w-full h-full animate-spin-slow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-lg"></div>
      </div>
    </div>
    <span className="text-sm font-medium">Logging in...</span>
  </div>
);

// NOTE: You need to add the following keyframes to your global CSS (e.g., globals.css or tailwind.config.js):
/*
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-slow-reverse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }
*/

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Manages loading state during initial auth check

  // NEW STATE: Manages loading state during the signInWithEmailAndPassword attempt
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [authInstance, setAuthInstance] = useState<Auth | null>(null); // State to hold the Firebase Auth instance

  useEffect(() => {
    const { auth: firebaseAuth, error: initError } = getFirebaseInstances();
    if (initError) {
      setError(`Firebase initialization error: ${initError.message}`);
      setLoading(false);
      return;
    }
    if (!firebaseAuth) {
      setError(
        "Firebase Auth instance not available. Please check initialization."
      );
      setLoading(false);
      return;
    }

    setAuthInstance(firebaseAuth);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // If a user is logged in, redirect them from the login page
      if (user) {
        window.location.href = "/admin"; // Redirect to admin dashboard
      } else {
        setLoading(false); // Only set loading to false if no user is found
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!authInstance) {
      setError(
        "Authentication service not available. Firebase not initialized."
      );
      return;
    }

    // START SIGN-IN LOADING
    setIsSigningIn(true);

    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      // Success: The onAuthStateChanged listener will handle the redirect
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firebaseError: any
    ) {
      // Handle Firebase specific errors
      let errorMessage = "An unexpected error occurred during login.";
      switch (firebaseError.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login attempts. Please try again later.";
          break;
        default:
          errorMessage = firebaseError.message;
      }
      setError(errorMessage);

      // END SIGN-IN LOADING ON FAILURE
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return <FragranceLoader message="Checking authentication status..." />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-ug-neutral-bg">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-ug-text-heading text-center mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSigningIn}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSigningIn}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* UPDATED BUTTON WITH LOADER LOGIC */}
          <button
            type="submit"
            className={`w-full text-white p-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center
                ${
                  isSigningIn
                    ? "bg-ug-purple-accent cursor-not-allowed" // Loading state style
                    : "bg-ug-purple-primary hover:bg-ug-purple-accent" // Default state style
                }`}
            disabled={isSigningIn}
          >
            {isSigningIn ? <UniquePulsingButtonLoader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
