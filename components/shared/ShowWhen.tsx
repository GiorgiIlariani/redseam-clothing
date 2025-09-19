"use client";

import { ReactNode } from "react";

interface ShowWhenProps {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export const ShowWhen = ({
  condition,
  children,
  fallback = null,
}: ShowWhenProps) => {
  return <>{condition ? children : fallback}</>;
};
