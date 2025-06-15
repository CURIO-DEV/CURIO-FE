"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Button from "@/components/button";
import FontSize from "@/components/font-size";
import Input from "@/components/input";
import Summary from "@/components/summary";
import { CATEGORIES } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { Switch } from "@/styles/components/ui/switch";
import Chip from "app/(route)/home/_components/chip";
import { KakaoIcon, GoogleIcon } from "assets";
import { toast } from "sonner";
import { useUserSettings, useUpdateUserSettings } from "@/hooks/use-setting";
import { useGetUserMe, useGetUserProfile } from "@/hooks/use-user";
import { SummaryType } from "types/summary-type";

export default function Card() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: userMe } = useGetUserMe();
  const { data: profile } = useGetUserProfile({ enabled: !!userMe?.isLogin });

  const { data, isLoading } = useUserSettings();
  const updateSettings = useUpdateUserSettings();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newsletterOn, setNewsletterOn] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const fontApiToQuery = (v: "small" | "medium" | "large") =>
    v === "small" ? "small" : v === "medium" ? "default" : "big";
  const fontQueryToApi = (v: "small" | "default" | "big") =>
    v === "small" ? "small" : v === "default" ? "medium" : "large";

  const syncParam = (k: string, v: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(k) !== v) {
      params.set(k, v);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (!data) return;

    syncParam("type", data.summaryType);
    syncParam("font", fontApiToQuery(data.fontSize));

    setNewsletterOn(!!data.receiveNewsletter);
    setNewsletterEmail(data.newsletterEmail ?? "");

    setSelectedCategories(
      Array.isArray(data.categories) ? data.categories : [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) =>
      prev.includes(c)
        ? prev.filter((i) => i !== c)
        : prev.length < 4
          ? [...prev, c]
          : prev,
    );

  const handleConfirm = () => {
    const q = new URLSearchParams(searchParams.toString());
    updateSettings.mutate(
      {
        summaryType: q.get("type") as SummaryType,
        fontSize: fontQueryToApi(
          (q.get("font") ?? "default") as "small" | "default" | "big",
        ),
        receiveNewsletter: newsletterOn,
        newsletterEmail: newsletterOn ? newsletterEmail : null,
        categories: selectedCategories,
      },
      {
        onSuccess: () => {
          toast.success("설정이 저장되었습니다.");
          router.back();
        },
        onError: () => toast.error("저장에 실패했습니다. 다시 시도해 주세요."),
      },
    );
  };

  const providerNames = ["", "카카오", "구글"] as const;
  const providerIcons = [null, KakaoIcon, GoogleIcon] as const;
  const socialIdx = data?.socialType === 2 ? 2 : 1; // 기본 1(카카오)
  const ProviderIcon = providerIcons[socialIdx]!;
  const providerLabel = providerNames[socialIdx];

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="mt-10 mb-30 flex h-full flex-col items-center rounded-xl border border-gray-200 px-21 pb-13.5">
      <div className="relative mt-13.75 h-42 w-42 overflow-hidden rounded-full border border-gray-200">
        {profile?.profile_image_url && (
          <Image
            src={profile.profile_image_url}
            alt="profile"
            width={115}
            height={96}
            className="h-42 w-42 object-cover"
          />
        )}
      </div>
      <p className="mt-4">{profile?.nickname ?? "닉네임"}</p>

      <div className="flex w-full flex-col gap-10">
        <label className="body2 flex w-full flex-col font-medium">
          이메일
          <div className="flex items-center gap-5">
            <Input
              className="mt-3 mb-2 flex-grow"
              disabled
              defaultValue={profile?.email ?? ""}
            />
            <ProviderIcon />
          </div>
          <span className="caption1 font-regular">
            *({providerLabel})로 가입한 계정이예요
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
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                selected={selectedCategories.includes(c)}
                onClick={() => toggleCategory(c)}
              >
                {c}
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
        <Button onClick={() => router.back()} variant="secondary">
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
