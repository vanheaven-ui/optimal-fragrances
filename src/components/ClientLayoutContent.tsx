"use client";

import { useState, useCallback } from "react";
import DrawerNavigation from "components/DrawerNavigation";
import DeliveryMotorbikeSVG from "components/DeliveryBikeSVG";
import Footer from "components/Footer";
import { FirebaseProvider } from "context/FirebaseContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import MessageOfTheWeek from "./MessageOfTheWeek";
import WhatsAppBanner from "./WhatsappBanner";
import ThemeToggle from "./ThemeToggle";

interface ClientLayoutContentProps {
  children: React.ReactNode;
}

// Estimated WhatsApp Banner height in pixels
const WHATSAPP_BANNER_HEIGHT_PX = 44;

export default function ClientLayoutContent({
  children,
}: ClientLayoutContentProps) {
  const pathname = usePathname();
  const whatsappChannelLink =
    "https://whatsapp.com/channel/0029Vaf9cCC1iUxWVnXWlO1i";

  // Track WhatsApp banner visibility
  const [isWhatsappBannerVisible, setIsWhatsappBannerVisible] = useState(true);

  const handleBannerVisibilityChange = useCallback((isVisible: boolean) => {
    setIsWhatsappBannerVisible(isVisible);
  }, []);

  // Compute dynamic top padding for main content
  const basePadding = { default: 90, sm: 110, md: 130 };
  const dynamicPadding = {
    default: isWhatsappBannerVisible
      ? basePadding.default + WHATSAPP_BANNER_HEIGHT_PX
      : basePadding.default,
    sm: isWhatsappBannerVisible
      ? basePadding.sm + WHATSAPP_BANNER_HEIGHT_PX
      : basePadding.sm,
    md: isWhatsappBannerVisible
      ? basePadding.md + WHATSAPP_BANNER_HEIGHT_PX
      : basePadding.md,
  };

  return (
    <>
      <WhatsAppBanner
        channelLink={whatsappChannelLink}
        onVisibilityChange={handleBannerVisibilityChange}
      />

      <FirebaseProvider>
        <DrawerNavigation />
        <ThemeToggle />

        {/* Fixed Delivery Motorbike Icon */}
        <div
          className="fixed bottom-4 right-4 z-40 w-20 animate-moveBike cursor-pointer
                     transition-transform duration-300 hover:scale-105 sm:w-24 md:w-28 lg:w-32"
        >
          <DeliveryMotorbikeSVG />
        </div>

        {/* Main content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            style={{ paddingTop: dynamicPadding.default }}
            className={`flex-grow relative pb-20 sm:pb-24`}
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
