// src/components/AdminLayout.tsx
"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Next 13+ app router
import Link from "next/link"; // Import Link for internal navigation
import { onAuthStateChanged, signOut, Auth } from "firebase/auth";
import { getFirebaseInstances } from "../lib/firebase"; // Your Firebase utility
import FragranceLoader from "./FragranceLoader";

// Inline SVG for Hamburger icon
const IconBars = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);

// Inline SVG for Close icon
const IconTimes = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // NEW STATE for logout loading
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);
  const [firebaseInitError, setFirebaseInitError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const { auth: firebaseAuth, error: initError } = getFirebaseInstances();

    if (initError) {
      setFirebaseInitError(
        `Firebase initialization error: ${initError.message}`
      );
      setIsAuthenticated(false);
      setLoadingAuth(false);
      setAuthInstance(null);
      return;
    }
    if (!firebaseAuth) {
      setFirebaseInitError(
        "Firebase Auth instance not available after initialization."
      );
      setIsAuthenticated(false);
      setLoadingAuth(false);
      setAuthInstance(null);
      return;
    }

    setAuthInstance(firebaseAuth);

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // If we were logging out and the user becomes null, it means logout was successful.
      // We can stop showing the logout loading screen.
      if (isLoggingOut && !user) {
        setIsLoggingOut(false);
      }

      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Only redirect if not already on the login page AND not currently logging out
        // The isLoggingOut check prevents double redirects/flicker if signOut is explicitly called.
        if (window.location.pathname !== "/admin/login" && !isLoggingOut) {
          router.push("/admin/login");
        }
      }
      setLoadingAuth(false);
    });

    return () => {
      unsubscribe();
    };
  }, [router, isLoggingOut]); // Added isLoggingOut to dependency array

  const handleLogout = async () => {
    if (authInstance) {
      setIsLoggingOut(true); // Start showing the custom logout loading screen
      try {
        await signOut(authInstance);
        // The onAuthStateChanged listener will detect the user change and redirect
        // We set isLoggingOut to false in the onAuthStateChanged callback once user is null
      } catch (error) {
        console.error("Error signing out:", error);
        alert("Error logging out. Please try again.");
        setIsLoggingOut(false); // Stop showing loading screen on error
      }
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // --- CUSTOM LOGOUT LOADING SCREEN ---
  if (isLoggingOut) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-ug-purple-primary to-ug-purple-accent text-white p-8">
        <div className="relative w-24 h-24 mb-6">
          {/* A simple spinning circle or pulse for a loading animation */}
          <div className="absolute inset-0 border-4 border-ug-neutral-light border-t-ug-text-heading rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">✨</span>{" "}
            {/* A fragrance-related emoji */}
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Optimal Fragrances
        </h1>
        <p className="text-xl text-center">Logging you out...</p>
        <p className="text-md text-center mt-2 opacity-80">
          Please wait a moment.
        </p>
      </div>
    );
  }
  // --- END CUSTOM LOGOUT LOADING SCREEN ---

  if (loadingAuth) {
    return <FragranceLoader message="Verifying admin access..." />;
  }

  if (firebaseInitError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-ug-neutral-bg p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-xl text-red-500 mb-6">{firebaseInitError}</p>
        <p className="text-ug-text-dark text-lg">
          Please ensure your Firebase configuration is correctly set in{" "}
          <code className="bg-ug-neutral-light p-1 rounded">
            src/lib/firebase.ts
          </code>
          .
        </p>
        <Link
          href="/admin/login"
          className="mt-8 bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          Go to Login Page
        </Link>
      </div>
    );
  }

  if (!isAuthenticated && !firebaseInitError) {
    // If not authenticated and no init error, it means onAuthStateChanged
    // has already handled the redirect. Return null to prevent flicker.
    return null;
  }

  return (
    <div className="flex min-h-screen bg-ug-neutral-bg">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-64 bg-ug-text-heading text-white p-6 shadow-lg fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8 text-ug-purple-primary mt-10">
          Admin Panel
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin/blog"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Manage Blog Posts
              </Link>
            </li>
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin/products"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 mt-4"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar - Mobile (Drawer) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-ug-text-heading text-white p-6 shadow-2xl z-50
                     transform transition-transform duration-300 ease-in-out md:hidden
                     ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-ug-purple-primary mt-10">
            Admin
          </h2>
          <button
            onClick={closeSidebar}
            className="text-white text-3xl focus:outline-none"
          >
            <IconTimes />
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Dashboard
              </Link>
            </li>
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin/blog"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Manage Blog Posts
              </Link>
            </li>
            <li>
              {/* Use Link for internal navigation */}
              <Link
                href="/admin/products"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Manage Products
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 mt-4"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 md:pt-16">
        {/* Top Bar for Mobile */}
        <header className="bg-white shadow-sm p-4 flex items-center md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-ug-text-heading text-2xl focus:outline-none mr-4"
          >
            <IconBars />
          </button>
          <h1 className="text-2xl font-bold text-ug-text-heading">
            Admin Panel
          </h1>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
