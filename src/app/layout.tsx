// src/app/layout.tsx
// NO 'use client' directive here anymore! This file is now a Server Component.

import "./globals.css"; // Your global styles
import ClientLayoutContent from "components/ClientLayoutContent"; // Import the existing client component
import { ThemeProvider } from "components/ThemeProvider"; // <--- Import the new ThemeProvider

export const metadata = {
  title: {
    default: "Optimal Fragrance - Discover Your Scent",
    template: "%s | Optimal Fragrance",
  },
  description:
    "Explore a luxurious collection of exquisite perfumes for every occasion at Optimal Fragrance.",
  icons: {
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
  openGraph: {
    title: "Optimal Fragrance",
    description: "Discover unique scents for every personality.",
    url: "https://optimalfragrance.vercel.app",
    siteName: "Optimal Fragrance",
    images: [
      {
        url: "https://www.optimalfragrance.ug/og-image.jpg",
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
    creator: "@optimalfragrance",
    images: ["https://www.optimalfragrance.ug/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // The classes for body will now implicitly be handled by Tailwind's dark mode
        // based on whether the 'dark' class is present on the html element.
        // You generally don't need to change this part of the className
        className={`font-sans bg-ug-neutral-bg text-ug-text-dark relative overflow-x-hidden`}
      >
        {/* Wrap ClientLayoutContent with ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayoutContent>{children}</ClientLayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
