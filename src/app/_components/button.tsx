"use client";

import { ReactNode } from "react";
import { cn } from "../_utils/cn";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonStyles =
    variant === "primary"
      ? "bg-primary-600 text-white"
      : "bg-main-50 text-main-600";

  return (
    <button
      type="button"
      className={cn(
        "hover:bg-primary-500 rounded-lg px-10 py-1.5",
        buttonStyles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
