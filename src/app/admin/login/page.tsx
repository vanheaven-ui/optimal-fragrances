"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { getFirebaseInstances } from "../../../lib/firebase";
import FragranceLoader from "components/FragranceLoader";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Manages loading state during initial auth check
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

    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      // The onAuthStateChanged listener above will handle the redirect
    } catch (firebaseError: any) {
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
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-ug-purple-primary text-white p-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
