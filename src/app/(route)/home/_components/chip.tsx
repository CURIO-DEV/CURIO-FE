interface ChipProps {
  children: string;
  selected: boolean;
  onClick: () => void;
}

export default function Chip({
  children,
  selected = false,
  onClick,
}: ChipProps) {
  const selectedStyle = selected
    ? "bg-primary-300 border border-primary-400 text-white"
    : "border border-primary-200";
  return (
    <button
      className={`body1 font-regular rounded-[40px] px-5 py-1.5 ${selectedStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
