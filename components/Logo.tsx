import React from "react";

// components/Logo.tsx
export const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle
      cx="50"
      cy="50"
      r="48"
      fill="url(#gradient)"
      stroke="#e0e0e0"
      strokeWidth="2"
    />

    {/* Dashboard Bars */}
    <rect x="28" y="50" width="10" height="20" rx="2" fill="white" />
    <rect x="45" y="40" width="10" height="30" rx="2" fill="white" />
    <rect x="62" y="30" width="10" height="40" rx="2" fill="white" />

    {/* Gradient Definition */}
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#22C55E" />
        <stop offset="1" stopColor="#0F3225" />
      </linearGradient>
    </defs>
  </svg>
);
