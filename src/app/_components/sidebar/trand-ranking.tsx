import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { trends } from "@/mocks/trends";
import { ArrowDownIcon, ArrowUpIcon } from "assets";

export default function TrendRanking() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.SEARCH);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /* TODO: API 연결 후 대체 */
  const dummyTimestamp = "2024.04.20 17:32";

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
            {dummyTimestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
