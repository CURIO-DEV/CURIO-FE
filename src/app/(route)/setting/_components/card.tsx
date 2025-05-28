"use client";

import Button from "@/components/button";
import FontSize from "@/components/font-size";
import Input from "@/components/input";
import Summary from "@/components/summary";
import { CATEGORIES, DEFAULT_CATEGORIES } from "@/constants/categories";
import { IMAGES_PATH } from "@/constants/images";
import { ROUTES } from "@/constants/routes";
import { Switch } from "@radix-ui/react-switch";
import Chip from "app/(route)/home/_components/chip";
import { KakaoIcon } from "assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export default function Card() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(DEFAULT_CATEGORIES);
  const [on, setOn] = useState(false);

  const handleCategoryClick = (item: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        if (prev.length < 4) {
          return [...prev, item];
        } else {
          return prev;
          //TODO: 토스트 이벤트
        }
      }
    });
  };

  const handleCancel = () => {};
  const handleConfirm = () => {};
  const handleClick = () => {
    router.push(ROUTES.DELETE_ACCOUNT);
  };

  return (
    <div className="mt-10 mb-30 flex h-full flex-col items-center rounded-xl border border-gray-200 px-21 pb-13.5">
      <div className="mt-13.75 flex h-42 w-42 items-center justify-center rounded-full border border-gray-200">
        <Image
          src={IMAGES_PATH.LOGO_HEAD}
          width={115}
          height={96}
          alt="logo-head"
        />
      </div>
      <p className="mt-4">닉네임</p>
      <div className="flex w-full flex-col gap-10">
        <label className="body2 flex w-full flex-col font-medium">
          이메일
          <div className="flex items-center gap-5">
            <Input className="mt-3 mb-2 flex-grow" />
            <KakaoIcon />
          </div>
          <span className="caption1 font-regular">
            *(카카오)로 가입한 계정이예요
          </span>
        </label>
        <label className="body2 flex w-full flex-col font-medium">
          수신 이메일
          <div className="flex items-center gap-5">
            <Input className="mt-3 mb-2 flex-grow" />
            <Switch checked={on} onCheckedChange={setOn} />
          </div>
          <span className="caption1 font-regular"></span>
        </label>
        <label className="flex flex-col">
          <span> 카테고리</span>
          <div className="mt-3 flex w-102 flex-wrap justify-center gap-x-2 gap-y-3">
            {CATEGORIES.map((item) => (
              <Chip
                key={item}
                selected={selectedCategories.includes(item)}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
        </label>
        <Suspense fallback={<div>로딩중...</div>}>
          <Summary rootClassName="m-0" />
        </Suspense>
        <Suspense fallback={<div>로딩중...</div>}>
          <FontSize rootClassName="m-0" />
        </Suspense>
      </div>
      <div className="mt-16 flex gap-4">
        <Button onClick={handleCancel} variant="secondary">
          취소하기
        </Button>
        <Button onClick={handleConfirm}>확인하기</Button>
      </div>
      <p
        className="caption1 mt-4 cursor-pointer font-medium text-gray-700 underline"
        onClick={handleClick}
      >
        탈퇴하기
      </p>
    </div>
  );
}
