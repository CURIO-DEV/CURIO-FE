"use client";

import { LeftIcon } from "assets";
import Index from "./_components";
import { useRouter } from "next/navigation";

const getTodayDate = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${month}월 ${date}일`;
};

export default function SnackNews() {
  const router = useRouter();
  const today = getTodayDate();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="mt-6 pr-41 pl-21">
      <div className="flex gap-2">
        <LeftIcon onClick={handleBack} />
        <p className="body1 font-semibold">{today} 큑</p>
      </div>
      <Index />
    </div>
  );
}
