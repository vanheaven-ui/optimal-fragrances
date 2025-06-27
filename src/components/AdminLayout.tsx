// src/components/AdminLayout.tsx
"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signOut, Auth } from "firebase/auth";
import { getFirebaseInstances } from "../lib/firebase"; // Corrected import path to the central utility

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
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
      // No redirect here, display error on page
      return;
    }
    if (!firebaseAuth) {
      setFirebaseInitError(
        "Firebase Auth instance not available after initialization."
      );
      setIsAuthenticated(false);
      setLoadingAuth(false);
      setAuthInstance(null);
      // No redirect here, display error on page
      return;
    }

    setAuthInstance(firebaseAuth);

    // This listener will fire once initially with the current auth state,
    // and then again on any auth state changes.
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Only redirect to login if we are *not* already on the login page.
        // This prevents infinite redirects.
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
      setLoadingAuth(false); // Authentication check is definitively complete here
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []); // Empty dependency array, runs once.

  const handleLogout = async () => {
    if (authInstance) {
      // Use the state-managed auth instance
      try {
        await signOut(authInstance);
        // The onAuthStateChanged listener will handle the redirect after signOut.
      } catch (error) {
        console.error("Error signing out:", error);
        alert("Error logging out. Please try again."); // Replace with custom modal later
      }
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // Show loading indicator while authentication status is being determined
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-ug-neutral-bg">
        <p className="text-2xl text-ug-text-dark">Verifying admin access...</p>
      </div>
    );
  }

  // If Firebase initialization failed, display a prominent error.
  if (firebaseInitError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-ug-neutral-bg p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-xl text-red-500 mb-6">{firebaseInitError}</p>
        <p className="text-ug-text-dark text-lg">
          Please ensure your Firebase configuration is correctly set in
          src/lib/firebase.ts.
        </p>
        <a
          href="/admin/login"
          className="mt-8 bg-ug-purple-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
        >
          Go to Login Page
        </a>
      </div>
    );
  }

  // If not authenticated, and no firebaseInitError, it means the onAuthStateChanged
  // listener has already handled the redirection to /admin/login. So, return null.
  if (!isAuthenticated && !firebaseInitError) {
    return null;
  }

  // If authenticated, render the layout
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
              <a
                href="/admin"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/blog"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Manage Blog Posts
              </a>
            </li>
            <li>
              <a
                href="/admin/products"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
              >
                Manage Products
              </a>
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
              <a
                href="/admin"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/blog"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Manage Blog Posts
              </a>
            </li>
            <li>
              <a
                href="/admin/products"
                className="block p-3 rounded-lg hover:bg-ug-purple-primary transition-colors duration-200"
                onClick={closeSidebar}
              >
                Manage Products
              </a>
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
