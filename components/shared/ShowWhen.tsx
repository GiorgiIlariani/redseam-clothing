"use client";

import { ReactNode } from "react";
import { ShowWhenProps } from "@/types/components";

interface ExtendedShowWhenProps extends ShowWhenProps {
  fallback?: ReactNode;
}

export const ShowWhen = ({
  condition,
  children,
  fallback = null,
}: ExtendedShowWhenProps) => {
  return <>{condition ? children : fallback}</>;
};
