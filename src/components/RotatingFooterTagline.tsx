"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TAGLINES = [
  "Optimal Fragrances – Where Every Scent Tells Your Story.",
  "Unveil Your Essence with Optimal Fragrances.",
  "Crafted Notes. Timeless Luxury. Optimal Fragrances.",
  "Where Signature Scents Meet Unmatched Sophistication.",
  "Optimal Fragrances – Elevate Your Aura.",
  "Indulge in the Art of Scent. Only at Optimal.",
  "For Every Mood, A Masterpiece. Optimal Fragrances.",
  "Your Scent. Your Identity. Your Optimal.",
  "Luxury in Every Drop. Uniquely You.",
  "Where Fragrance Becomes a Statement.",
];

const RotatingFooterTagline: React.FC = () => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rotateTagline = useCallback(() => {
    setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % TAGLINES.length);
  }, []);

  useEffect(() => {
    // Start rotating taglines every 7 seconds (you can adjust this timing)
    intervalRef.current = setInterval(rotateTagline, 7000);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [rotateTagline]); // Depend on rotateTagline to ensure correct closure behavior

  return (
    <p className="italic mb-4">
      <span className="text-sm font-semibold bg-gradient-to-r from-ug-purple-primary via-white to-pink-400 text-transparent bg-clip-text">
        {TAGLINES[currentTaglineIndex]}
      </span>
    </p>
  );
};

export default RotatingFooterTagline;
