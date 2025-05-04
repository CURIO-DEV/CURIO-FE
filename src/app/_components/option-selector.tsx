import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface OptionSelectorProps {
  label: string;
  children: ReactNode;
  type: "SIDEBAR" | "SETTING";
  className?: string;
  rootClassName?: string;
}

export default function OptionSelector({
  label,
  children,
  type,
  className,
  rootClassName,
}: OptionSelectorProps) {
  const typeStyle =
    type === "SIDEBAR" ? "body1 font-semibold" : "body2 font-medium";
  return (
    <div className={rootClassName}>
      <p className={`subtitle2 mb-2 font-semibold ${typeStyle}`}>{label}</p>
      <div
        className={cn(
          `flex w-full justify-center rounded-[5px] border border-gray-100 py-5 ${className}`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
