"use client";

import { DefaultIcon, DetailedIcon, SimpleIcon } from "assets";
import OptionSelector from "./option-selector";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SummaryType } from "types/summary-type";
import { useGetUserMe } from "@/hooks/use-user";
import { useUserSettings } from "@/hooks/use-setting";

export default function Summary({ rootClassName }: { rootClassName?: string }) {
  const iconList = [SimpleIcon, DefaultIcon, DetailedIcon];
  const typeMap: SummaryType[] = ["short", "medium", "long"];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: userMe } = useGetUserMe();
  const { data: settings } = useUserSettings();

  const currentType = (searchParams.get("type") ??
    settings?.summaryType ??
    "medium") as SummaryType;

  const selectedIndex = typeMap.indexOf(currentType);

  const handleSummaryClick = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", typeMap[index]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <OptionSelector
      type="SIDEBAR"
      label="요약 정도"
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
            className={
              selectedIndex === index ? "text-primary-600" : "text-gray-900"
            }
          />
        </button>
      ))}
    </OptionSelector>
  );
}
