// src/app/layout.tsx
// NO 'use client' directive here anymore! This file is now a Server Component.

import "./globals.css"; // Your global styles
import ClientLayoutContent from "components/ClientLayoutContent"; // Import the new client component

export const metadata = {
  title: {
    default: "Optimal Fragrance - Discover Your Scent",
    template: "%s | Optimal Fragrance", // Template for dynamic titles
  },
  description:
    "Explore a luxurious collection of exquisite perfumes for every occasion at Optimal Fragrance.",
  icons: {
    // The 'icon' property is the primary one for modern browsers
    icon: "/optimal.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  // You can add more global metadata here, like Open Graph, Twitter Cards, etc.
  openGraph: {
    title: "Optimal Fragrance",
    description: "Discover unique scents for every personality.",
    url: "https://www.optimalfragrance.ug", // Replace with your actual domain
    siteName: "Optimal Fragrance",
    images: [
      {
        url: "https://www.optimalfragrance.ug/og-image.jpg", // Path to your OG image
        width: 1200,
        height: 630,
        alt: "Optimal Fragrance Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimal Fragrance",
    description: "Discover unique scents for every personality.",
    creator: "@optimalfragrance", // Your Twitter handle
    images: ["https://www.optimalfragrance.ug/twitter-image.jpg"], // Path to your Twitter image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        The <body> tag's classNames should ideally be here as part of the Server Component.
        The client component (ClientLayoutContent) will receive `children`
        and render the rest of the layout inside the <body>.
      */}
      <body className={`font-sans bg-ug-neutral-bg text-ug-text-dark relative`}>
        {/* Render your new ClientLayoutContent component, passing `children` to it */}
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </body>
    </html>
  );
}
