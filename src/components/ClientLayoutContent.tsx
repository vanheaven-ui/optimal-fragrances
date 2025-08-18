"use client";

import DrawerNavigation from "components/DrawerNavigation";
import DeliveryMotorbikeSVG from "components/DeliveryBikeSVG";
import Footer from "components/Footer";
import { FirebaseProvider } from "context/FirebaseContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import MessageOfTheWeek from "./MessageOfTheWeek";
import WhatsAppBanner from "./WhatsappBanner";
import ThemeToggle from "./ThemeToggle";

export default function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const whatsappChannelLink =
    "https://whatsapp.com/channel/0029Vaf9cCC1iUxWVnXWlO1i";

  return (
    <>
      <WhatsAppBanner channelLink={whatsappChannelLink} />

      <FirebaseProvider>
        <DrawerNavigation />
        <ThemeToggle />

        {/* Delivery Motorbike Container (fixed bottom-right) */}
        <div
          className="fixed bottom-4 right-4 z-40
                     w-20 animate-moveBike cursor-pointer
                     transition-transform duration-300 hover:scale-105
                     sm:w-24 md:w-28 lg:w-32"
        >
          <DeliveryMotorbikeSVG />
        </div>

        {/* AnimatePresence and motion.main */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="flex-grow pt-[90px] sm:pt-[110px] md:pt-[130px] relative pb-20 sm:pb-24"
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
