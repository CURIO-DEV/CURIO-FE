import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { trends } from "@/mocks/trends";
import { ArrowUpIcon } from "assets";

export default function TrendRanking() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.SEARCH);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const now = new Date();
  const formattedNow = now.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex w-75 flex-col border-y border-gray-200">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div className="group body1 flex w-58 items-center gap-3 font-medium text-black">
          <span>1</span>
          <span className="cursor-pointer group-hover:underline">
            {trends[0]}
          </span>
        </div>
        <ArrowUpIcon
          onClick={toggleDropdown}
          className={`${isOpen ? "" : "rotate-180"}`}
        />
      </div>

      <div
        className={`overflow-hidden px-5 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {trends.slice(1).map((trends, index) => (
          <div
            key={trends}
            className="mb-3 flex items-center justify-between"
            onClick={() => handleClick()}
          >
            <div className="group body1 flex w-58 cursor-pointer items-center gap-3 font-medium text-black">
              <span>{index + 2}</span>
              <span className="group-hover:underline">{trends}</span>
            </div>
          </div>
        ))}
        <div className="mb-2.5 flex h-4.5 justify-end">
          <span className="caption1 font-medium text-gray-300">
            {formattedNow}
          </span>
        </div>
      </div>
    </div>
  );
}
