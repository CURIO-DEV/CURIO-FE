"use client";

import React, { useState } from "react";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import ActionBar from "../_components/action-bar";
import {
  LikeOutlineIcon,
  LikeFilledIcon,
  DislikeOutlineIcon,
  DislikeFilledIcon,
  LogoHeadIcon,
} from "assets";
import { useArticleHeadline } from "@/hooks/use-article-headlines";
import { useArticleSummary } from "@/hooks/use-article-summary";
import { SummaryType } from "types/summary-type";
import { useGetUserMe } from "@/hooks/use-user";
import { useUserSettings } from "@/hooks/use-setting";
import { toast } from "sonner";
import {
  useToggleRecommend,
  useToggleNotRecommend,
} from "@/hooks/use-article-recommand";

const fontApiToQuery = (v: "small" | "medium" | "large") =>
  v === "small" ? "small" : v === "medium" ? "default" : "big";

export default function DetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const articleId = Number(id);

  const { data: userMe } = useGetUserMe();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();

  const computedSummaryType = (searchParams.get("type") ??
    settings?.summaryType ??
    "medium") as SummaryType;

  const fontKey = (searchParams.get("font") ??
    (settings ? fontApiToQuery(settings.fontSize) : "default")) as
    | "small"
    | "default"
    | "big";

  const fontClass =
    {
      small: "body1",
      default: "subtitle1",
      big: "title",
    }[fontKey] || "subtitle1";

  const { data: headline, isLoading: hlLoading } =
    useArticleHeadline(articleId);

  const { data: summary, isLoading: smLoading } = useArticleSummary(
    articleId,
    computedSummaryType,
  );

  /* 추천 / 비추천 state & mutation */
  const [recommended, setRecommended] = useState(false);
  const [notRec, setNotRec] = useState(false);
  const toggleRec = useToggleRecommend();
  const toggleNotRec = useToggleNotRecommend();

  const guard = () => {
    if (!userMe?.isLogin) {
      toast.warning("로그인 후 이용 가능합니다.");
      return false;
    }
    return true;
  };

  const handleRecommend = () => {
    if (!guard()) return;
    toggleRec.mutate(articleId, {
      onSuccess: (res) => {
        setRecommended(res.data === "추천");
        toast.success(res.message);
      },
      onError: () => toast.error("다시 시도해 주세요."),
    });
  };

  const handleNotRecommend = () => {
    if (!guard()) return;
    toggleNotRec.mutate(articleId, {
      onSuccess: (res) => {
        setNotRec(res.data === "비추천");
        toast.success(res.message);
      },
      onError: () => toast.error("다시 시도해 주세요."),
    });
  };

  if (hlLoading || smLoading || settingsLoading) return <div>로딩 중…</div>;
  if (!headline) return <div>기사 정보가 없습니다.</div>;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  return (
    <div className="mt-12 mb-10">
      <ActionBar newsId={articleId} />
      <div className="mr-14 ml-35.5">
        <h1 className="heading2 font-semibold">{headline.title}</h1>
        <p className="caption1 flex gap-3 font-medium text-gray-500">
          <span>게시 {formatDate(headline.createdAt)}</span>
          <span>업데이트 {formatDate(headline.updatedAt)}</span>
        </p>
        <div className="flex flex-col gap-2.5">
          <div className="mt-4 flex gap-2">
            <LogoHeadIcon />
            <p className="body1 font-semibold">
              Curi가 N개의 기사를 요약했습니다.
            </p>
          </div>
          <Image
            src={headline.imageUrl}
            alt="기사 이미지"
            width={1200}
            height={800}
            quality={80}
            sizes="100vw"
            className="h-auto w-full"
          />
          <p className={`font-medium ${fontClass}`}>{summary?.summary}</p>

          <div className="my-0.5 flex items-center">
            <p className="caption1 mr-6 font-medium">
              이 내용이 마음에 드시나요?
            </p>
            {recommended ? (
              <LikeFilledIcon onClick={handleRecommend} />
            ) : (
              <LikeOutlineIcon onClick={handleRecommend} />
            )}

            <div className="bg-primary-200 mx-2 h-5 w-[0.5px]" />

            {notRec ? (
              <DislikeFilledIcon onClick={handleNotRecommend} />
            ) : (
              <DislikeOutlineIcon onClick={handleNotRecommend} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
