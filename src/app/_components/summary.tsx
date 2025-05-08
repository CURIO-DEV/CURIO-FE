"use client";

import { DefaultIcon, DetailedIcon, SimpleIcon } from "assets";
import OptionSelector from "./option-selector";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface SummaryProps {
  rootClassName?: string;
}

export default function Summary({ rootClassName }: SummaryProps) {
  const iconList = [SimpleIcon, DefaultIcon, DetailedIcon];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);

  const handleSummaryClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <OptionSelector
      type="SIDEBAR"
      label="옵션"
      className="flex justify-between px-5"
      rootClassName={cn("mt-4 mb-8", rootClassName)}
    >
      {iconList.map((Icon, index) => (
        <button
          key={index}
          onClick={() => handleSummaryClick(index)}
          className={`flex h-12.5 w-12.5 items-center justify-center rounded-[5px] border border-gray-100 ${
            selectedIndex === index ? "bg-primary-100" : "bg-gray-50"
          }`}
        >
          <Icon
            className={`${
              selectedIndex === index ? "text-primary-600" : "text-gray-900"
            }`}
          />
        </button>
      ))}
    </OptionSelector>
  );
}
