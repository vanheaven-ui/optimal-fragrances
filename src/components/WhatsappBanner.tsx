"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppBannerProps {
  channelLink: string;
  onVisibilityChange?: (isVisible: boolean) => void; // Optional callback prop
}

const WhatsAppBanner: React.FC<WhatsAppBannerProps> = ({
  channelLink,
  onVisibilityChange,
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isIconVisible, setIsIconVisible] = useState(false);

  // Notify parent layout about visibility change
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isBannerVisible);
    }
  }, [isBannerVisible, onVisibilityChange]);

  const handleClose = useCallback(() => {
    setIsBannerVisible(false);
    setIsIconVisible(true);
  }, []);

  const handleOpen = useCallback(() => {
    setIsBannerVisible(true);
    setIsIconVisible(false);
  }, []);

  // Banner and Icon classes
  const bannerClasses = `fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ease-in-out bg-green-600 text-white p-2 text-center text-sm sm:text-base flex items-center justify-center shadow-lg ${
    isBannerVisible
      ? "translate-y-0 opacity-100"
      : "-translate-y-full opacity-0"
  }`;

  const iconClasses = `fixed top-0 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-transform duration-700 ease-in-out shadow-xl bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4 ${
    isIconVisible && !isBannerVisible
      ? "translate-y-4 opacity-100"
      : "-translate-y-[200%] opacity-0 pointer-events-none"
  }`;

  return (
    <>
      {/* Main Banner */}
      <div
        className={bannerClasses}
        style={{ pointerEvents: isBannerVisible ? "auto" : "none" }}
        aria-live="polite"
      >
        <p className="mr-2">Join our WhatsApp Channel for updates! 🚀</p>
        <Link
          href={channelLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded-full transition duration-300"
        >
          <FaWhatsapp className="mr-1 w-4 h-4" /> Join Channel
        </Link>
        <button
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-gray-200 focus:outline-none p-1"
          aria-label="Close banner"
        >
          &times;
        </button>
      </div>

      {/* Floating Icon */}
      <button
        onClick={handleOpen}
        aria-label="Reopen WhatsApp Banner"
        className={iconClasses}
        style={{
          pointerEvents: isIconVisible && !isBannerVisible ? "auto" : "none",
        }}
      >
        <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};

export default WhatsAppBanner;
