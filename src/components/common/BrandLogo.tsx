import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  heightClass?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  heightClass = 'h-12 sm:h-14' 
}) => {
  const [imageError, setImageError] = useState(false);

  // If the high-res image loads cleanly, render it; otherwise seamlessly fall back to the vector SVG
  if (!imageError) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="/assets/images/computer_village_logo.jpg"
          alt="Computer Village - Empowering Your Digital World"
          className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-102`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Exact vector SVG replica of the provided Computer Village logo
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 500 450"
        className={`${heightClass} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Computer Village - Empowering Your Digital World"
      >
        {/* Background Canvas */}
        <rect width="500" height="450" fill="white" />

        {/* --- WiFi Symbol (Top Left) --- */}
        <g stroke="#0e2a5c" strokeWidth="6" strokeLinecap="round">
          {/* Outer arc */}
          <path d="M 172 135 A 46 46 0 0 1 216 135" />
          {/* Middle arc */}
          <path d="M 180 148 A 32 32 0 0 1 208 148" />
          {/* Inner arc */}
          <path d="M 188 161 A 18 18 0 0 1 200 161" />
        </g>
        {/* WiFi Dot */}
        <circle cx="194" cy="175" r="3.5" fill="#0e2a5c" />

        {/* --- Laptop Screen Accent Bar --- */}
        <rect x="225" y="152" width="42" height="6.5" rx="3.25" fill="#0b57d0" />

        {/* --- Floating Pixel / Digital Cubes --- */}
        {/* Small Purple Top Cube */}
        <rect x="300" y="126" width="16" height="16" fill="#7c2d9e" />
        {/* Large Cyan Top-Right Cube */}
        <rect x="323" y="124" width="32" height="32" fill="#0284c7" />
        {/* Medium Sky Blue Cube */}
        <rect x="296" y="146" width="22" height="22" fill="#38bdf8" />
        {/* Dark Blue Center Cube */}
        <rect x="256" y="180" width="14" height="14" fill="#0369a1" />
        {/* Violet Floating Cube */}
        <rect x="278" y="173" width="16" height="16" fill="#8b5cf6" />
        {/* Purple Mid-Low Cube */}
        <rect x="247" y="196" width="18" height="18" fill="#6d28d9" />
        {/* Small Teal Cube */}
        <rect x="269" y="194" width="12" height="12" fill="#06b6d4" />
        {/* Blue Cube near base */}
        <rect x="292" y="189" width="16" height="16" fill="#0284c7" />

        {/* --- Laptop Frame --- */}
        {/* Left vertical bezel */}
        <rect x="190" y="186" width="10" height="48" rx="2" fill="#0854d4" />
        {/* Right vertical bezel */}
        <rect x="316" y="206" width="10" height="28" rx="2" fill="#0854d4" />

        {/* --- Laptop Base (Trapezoid with rounded corners) --- */}
        <path
          d="M 191 234 L 176 256 C 174 260 178 264 183 264 L 333 264 C 338 264 342 260 340 256 L 325 234 Z"
          fill="#0854d4"
        />

        {/* --- Laptop Trackpad (White rounded slot) --- */}
        <rect x="233" y="250" width="48" height="9" rx="4.5" fill="#ffffff" />

        {/* --- COMPUTER VILLAGE Typography --- */}
        <text
          x="250"
          y="314"
          textAnchor="middle"
          fill="#0c2556"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="27"
          letterSpacing="0.04em"
        >
          COMPUTER VILLAGE
        </text>

        {/* --- Thin Divider Line --- */}
        <line
          x1="55"
          y1="327"
          x2="445"
          y2="327"
          stroke="#0c2556"
          strokeWidth="1.2"
        />

        {/* --- Handwritten Tagline: Empowering Your Digital World --- */}
        <text
          x="250"
          y="354"
          textAnchor="middle"
          fill="#1e293b"
          fontFamily="'Caveat', 'Segoe Script', 'Brush Script MT', cursive, sans-serif"
          fontStyle="italic"
          fontWeight="400"
          fontSize="24.5"
          letterSpacing="0.02em"
        >
          Empowering Your Digital World
        </text>
      </svg>
    </div>
  );
};
