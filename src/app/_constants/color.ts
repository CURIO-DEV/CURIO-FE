export const colorMap = {
  red: { text: "text-surface-red", bg: "bg-surface-red" },
  orange: { text: "text-surface-orange", bg: "bg-surface-orange" },
  yellow: { text: "text-surface-yellow", bg: "bg-surface-yellow" },
  green: { text: "text-surface-green", bg: "bg-surface-green" },
  blue: { text: "text-surface-blue", bg: "bg-surface-blue" },
  indigo: { text: "text-surface-indigo", bg: "bg-surface-indigo" },
  purple: { text: "text-surface-purple", bg: "bg-surface-purple" },
} as const;

export type ColorKey = keyof typeof colorMap;
