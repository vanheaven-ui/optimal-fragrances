// src/components/ClientLayoutContent.tsx
"use client"; // This directive is crucial for this component

import DrawerNavigation from "components/DrawerNavigation";
import DeliveryMotorbikeSVG from "components/DeliveryBikeSVG";
import Footer from "components/Footer";
import { FirebaseProvider } from "context/FirebaseContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import MessageOfTheWeek from "./MessageOfTheWeek";
import WhatsAppBanner from "./WhatsappBanner";

export default function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // usePathname requires 'use client'
  const whatsappChannelLink =
    "https://whatsapp.com/channel/0029Vaf9cCC1iUxWVnXWlO1i";

  return (
    <>
      {/* NEW: WhatsApp Banner at the very top of the ClientLayoutContent.
        This will appear above everything else.
      */}
      <WhatsAppBanner channelLink={whatsappChannelLink} />

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
            // IMPORTANT: Adjust padding-top here if the banner covers your content.
            // A simple way is to add a dynamic class or extra padding.
            // For example, if the banner is ~40px tall: `pt-[calc(4rem+40px)]`
            // Assuming default pt-16 (4rem) is for DrawerNavigation.
            // You might need to adjust this based on the exact height of your banner.
            // Or use a more robust layout like flexbox column and make content scrollable below banner.
            className="flex-grow pt-16 relative"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <MessageOfTheWeek />

        <Footer />
      </FirebaseProvider>
    </>
  );
}
