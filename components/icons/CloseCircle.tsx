"use client";

import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CloseCircle: React.FC<IconProps> = ({ className, width = 24, height = 24 }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M15 9L9 15M9 9l6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CloseCircle;


