"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
import { cn } from "@/utils/cn";

import { useUserSettings, useUpdateUserSettings } from "@/hooks/use-setting";
import { SummaryType } from "types/summary-type";
import { useGetUserMe, useGetUserProfile } from "@/hooks/use-user";

export default function Card() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: userMe } = useGetUserMe();

  const { data: profile } = useGetUserProfile({
    enabled: !!userMe?.isLogin,
  });
  // ────────────────────────────────────
  // remote data
  // ────────────────────────────────────
  const { data, isLoading } = useUserSettings();
  const updateSettings = useUpdateUserSettings();

  // ────────────────────────────────────
  // local state
  // ────────────────────────────────────
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(DEFAULT_CATEGORIES);
  const [newsletterOn, setNewsletterOn] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const fontApiToQuery = (v: "small" | "medium" | "large") =>
    v === "small" ? "small" : v === "medium" ? "default" : "big";

  const fontQueryToApi = (v: "small" | "default" | "big") =>
    v === "small" ? "small" : v === "default" ? "medium" : "large";

  const syncSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) !== value) {
      params.set(key, value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // ────────────────────────────────────
  // side‑effect: hydrate UI from API
  // ────────────────────────────────────
  useEffect(() => {
    if (!data) return;

    // 1. 요약 정도 (URL 쿼리)
    syncSearchParam("type", data.summaryType);

    // 2. 글자 크기
    syncSearchParam("font", fontApiToQuery(data.fontSize));

    // 3. 이메일 수신
    setNewsletterOn(data.receiveNewsletter);
    setNewsletterEmail(data.newsletterEmail ?? "");

    // 4. 카테고리
    setSelectedCategories(data.categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCategoryClick = (item: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item)
          : prev.length < 4
            ? [...prev, item]
            : prev, // TODO: toast
    );
  };

  const handleCancel = () => router.back();

  const handleConfirm = () => {
    const params = new URLSearchParams(searchParams.toString());
    updateSettings.mutate({
      summaryType: params.get("type") as SummaryType,
      fontSize: fontQueryToApi(
        (params.get("font") ?? "default") as "small" | "default" | "big",
      ),
      receiveNewsletter: newsletterOn,
      newsletterEmail: newsletterOn ? newsletterEmail : null,
      categories: selectedCategories,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="mt-10 mb-30 flex h-full flex-col items-center rounded-xl border border-gray-200 px-21 pb-13.5">
      <div className="mt-13.75 flex h-42 w-42 items-center justify-center rounded-full border border-gray-200">
        {profile?.profile_image_url && (
          <Image
            src={profile?.profile_image_url}
            width={115}
            height={96}
            alt="logo-head"
          />
        )}
      </div>
      <p className="mt-4">{profile?.nickname}</p>
      <div className="flex w-full flex-col gap-10">
        <label className="body2 flex w-full flex-col font-medium">
          이메일
          <div className="flex items-center gap-5">
            <Input className="mt-3 mb-2 flex-grow" disabled defaultValue="" />
            <KakaoIcon />
          </div>
          <span className="caption1 font-regular">
            *(카카오)로 가입한 계정이예요
          </span>
        </label>
        <label className="body2 flex w-full flex-col font-medium">
          수신 이메일
          <div className="flex items-center gap-5">
            <Input
              className="mt-3 mb-2 flex-grow"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={!newsletterOn}
            />
            <Switch checked={newsletterOn} onCheckedChange={setNewsletterOn} />
          </div>
        </label>
        <label className="flex flex-col">
          <span>카테고리</span>
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
        onClick={() => router.push(ROUTES.DELETE_ACCOUNT)}
      >
        탈퇴하기
      </p>
    </div>
  );
}
