"use client";

import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

const FilterAdjust: React.FC<IconProps> = ({ className, width = 20, height = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18M6 12h12M9 18h6" />
  </svg>
);

export default FilterAdjust;


