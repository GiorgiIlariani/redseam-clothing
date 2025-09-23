"use client";

import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ChevronDown: React.FC<IconProps> = ({ className, width = 16, height = 16 }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ChevronDown;


