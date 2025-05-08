import { cn } from "@/utils/cn";

interface InputProps {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "border-primary-100 rounded-sm border px-2 py-1.5 focus:outline-none",
        className,
      )}
    />
  );
}
