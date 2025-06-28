// src/components/DeliveryMotorbikeSVG.tsx
import React from 'react';

const DeliveryMotorbikeSVG = () => (
  <svg className="w-28 h-auto" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Road */}
    <rect x="0" y="400" width="1000" height="100" fill="#4A5568"/>
    <line x1="0" y1="450" x2="1000" y2="450" stroke="#CBD5E0" strokeWidth="10" strokeDasharray="20 20"/>

    {/* Front Wheel */}
    <circle cx="200" cy="380" r="70" fill="#2D3748" stroke="#CBD5E0" strokeWidth="8"/>
    {/* Back Wheel */}
    <circle cx="800" cy="380" r="70" fill="#2D3748" stroke="#CBD5E0" strokeWidth="8"/>

    {/* Body of Motorbike */}
    <path d="M180 380 L250 250 C300 200 400 200 450 250 L500 380 L180 380 Z" fill="#6B46C1"/>
    <path d="M480 380 L550 280 C600 230 700 230 750 280 L820 380 L480 380 Z" fill="#805AD5"/>

    {/* Seat */}
    <path d="M400 240 C450 220 550 220 600 240 L580 270 C530 290 470 290 420 270 Z" fill="#2D3748"/>

    {/* Handlebars */}
    <path d="M280 230 L350 180 L360 200 L290 250 Z" fill="#2D3748"/>
    <circle cx="350" cy="180" r="15" fill="#F7FAFC"/>

    {/* Exhaust Pipe */}
    <path d="M820 360 L850 340 L880 350 L870 370 L830 380 Z" fill="#CBD5E0"/>

    {/* Delivery Box - Adjusted width and x position for more space on the left and right */}
    <rect
      x="650" // Moved further left
      y="50"
      width="320" // Increased width significantly
      height="230"
      rx="10"
      ry="10"
      fill="#38A169"
      stroke="#FFFFFF"
      strokeWidth="8"
    />
    <text
      x="810" // Adjusted x-position slightly right to center better within the new box
      y="180" // Adjusted y-position slightly down for better vertical centering
      fontFamily="Arial"
      fontSize="60"
      fontWeight="bold"
      fill="#FFFFFF"
      textAnchor="middle"
      transform="rotate(-25 810 180)" // Updated rotation origin to match new text position
    >
      DELIVERY
    </text>

    {/* Rider */}
    <circle cx="500" cy="180" r="60" fill="#2D3748"/>
    <rect x="470" y="230" width="60" height="80" fill="#6B46C1" rx="10" ry="10"/>
    <path d="M490 310 L470 350 L530 350 L510 310 Z" fill="#2D3748"/>
    <line x1="490" y1="260" x2="430" y2="290" stroke="#2D3748" strokeWidth="15" strokeLinecap="round"/>
    <line x1="510" y1="260" x2="570" y2="290" stroke="#2D3748" strokeWidth="15" strokeLinecap="round"/>
  </svg>
);

export default DeliveryMotorbikeSVG;
