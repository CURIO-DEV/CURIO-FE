import { useState } from "react";
import OptionSelector from "./option-selector";
import { FontSizeIcon } from "assets";

export default function FontSize() {
  const fontSizes = [12, 24, 32];
  const [selectedFontIndex, setSelectedFontIndex] = useState<number | null>(1);

  const handleFontClick = (index: number) => {
    setSelectedFontIndex(index);
  };
  return (
    <OptionSelector
      type="SIDEBAR"
      label="글자크기"
      rootClassName="mt-13.5"
      className="relative px-11.5"
    >
      <div className="flex w-full items-center justify-between">
        {fontSizes.map((size, index) => (
          <button
            key={index}
            onClick={() => handleFontClick(index)}
            className={`flex items-center justify-center rounded-full border border-gray-200 p-2 ${selectedFontIndex === index ? "bg-primary-100" : "bg-gray-50"} `}
            style={{
              width: `${16 + size}px`,
              height: `${16 + size}px`,
            }}
          >
            <FontSizeIcon
              width={size}
              height={size}
              className={`${
                selectedFontIndex === index
                  ? "text-primary-600"
                  : "text-gray-900"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="absolute top-11.25 -z-1 h-px w-50 bg-gray-200" />
    </OptionSelector>
  );
}
