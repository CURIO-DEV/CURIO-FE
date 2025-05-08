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
      ? "bg-primary-600 text-white hover:bg-primary-500 "
      : "bg-primary-50 text-primary-600 hover:bg-primary-100 ";

  return (
    <button
      type="button"
      className={cn("rounded-lg px-10 py-1.5", buttonStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
}
