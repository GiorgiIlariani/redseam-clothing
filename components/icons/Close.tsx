"use client";

import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

const Close: React.FC<IconProps> = ({ className, width = 24, height = 24 }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Close;


