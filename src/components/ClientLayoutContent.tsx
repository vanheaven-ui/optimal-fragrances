// src/components/ClientLayoutContent.tsx
"use client"; // This directive is crucial for this component

import DrawerNavigation from "components/DrawerNavigation";
import DeliveryMotorbikeSVG from "components/DeliveryBikeSVG";
import Footer from "components/Footer";
import { FirebaseProvider } from "context/FirebaseContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // usePathname requires 'use client'

  return (
    // Your <body> content goes here, but without the <html> tag
    // The className for <body> will be handled by the parent layout
    <>
      <FirebaseProvider>
        <DrawerNavigation />
        <div className="fixed top-4 right-4 z-10 w-20 sm:w-28 animate-moveBike">
          <DeliveryMotorbikeSVG />
        </div>

        {/* AnimatePresence and motion.main need 'use client' */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="flex-grow pt-16 relative"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </FirebaseProvider>
    </>
  );
}
