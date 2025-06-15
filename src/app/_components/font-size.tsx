"use client";

import OptionSelector from "./option-selector";
import { FontSizeIcon } from "assets";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetUserMe } from "@/hooks/use-user";
import { useUserSettings } from "@/hooks/use-setting";

const fontApiToQuery = (v: "small" | "medium" | "large") =>
  v === "small" ? "small" : v === "medium" ? "default" : "big";

export default function FontSize({
  rootClassName,
}: {
  rootClassName?: string;
}) {
  const fontSizes = [12, 24, 32] as const;
  const sizeKeys = ["small", "default", "big"] as const;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: userMe } = useGetUserMe();
  const { data: settings } = useUserSettings();

  const currentKey = (searchParams.get("font") ??
    (settings ? fontApiToQuery(settings.fontSize) : "default")) as
    | "small"
    | "default"
    | "big";

  const selectedFontIndex = sizeKeys.indexOf(currentKey);

  const handleFontClick = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("font", sizeKeys[index]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <OptionSelector
      type="SIDEBAR"
      label="글자크기"
      rootClassName={cn("mt-13.5", rootClassName)}
      className="relative px-11.5"
    >
      <div className="flex w-full items-center justify-between">
        {fontSizes.map((size, index) => (
          <button
            key={index}
            onClick={() => handleFontClick(index)}
            className={`z-1 flex items-center justify-center rounded-full border border-gray-200 p-2 ${
              selectedFontIndex === index ? "bg-primary-100" : "bg-gray-50"
            }`}
            style={{ width: `${16 + size}px`, height: `${16 + size}px` }}
          >
            <FontSizeIcon
              width={size}
              height={size}
              className={
                selectedFontIndex === index
                  ? "text-primary-600"
                  : "text-gray-900"
              }
            />
          </button>
        ))}
      </div>
      <div className="absolute top-11.25 z-0 h-px w-65 bg-gray-200" />
    </OptionSelector>
  );
}
