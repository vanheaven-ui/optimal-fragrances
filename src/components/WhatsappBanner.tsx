"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppBannerProps {
  channelLink: string;
}

const WhatsAppBanner: React.FC<WhatsAppBannerProps> = ({ channelLink }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-green-600 text-white p-2 text-center text-sm sm:text-base relative flex items-center justify-center">
      <p className="mr-2">Join our WhatsApp Channel for updates!</p>
      <Link
        href={channelLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded-full transition duration-300"
      >
        <FaWhatsapp className="mr-1" /> Join Channel
      </Link>
      <button
        onClick={handleClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close banner"
      >
        &times;
      </button>
    </div>
  );
};

export default WhatsAppBanner;
