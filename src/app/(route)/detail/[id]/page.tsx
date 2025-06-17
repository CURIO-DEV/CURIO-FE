"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import {
  LikeOutlineIcon,
  LikeFilledIcon,
  DislikeOutlineIcon,
  DislikeFilledIcon,
  LogoHeadIcon,
} from "assets";
import ActionBar from "../_components/action-bar";

import { useArticleHeadline } from "@/hooks/use-article-headlines";
import { useArticleSummary } from "@/hooks/use-article-summary";
import { useGetUserMe } from "@/hooks/use-user";
import { useUserSettings } from "@/hooks/use-setting";
import {
  useRecommendStatus,
  useNotRecommendStatus,
  useToggleRecommend,
  useToggleNotRecommend,
} from "@/hooks/use-article-recommand";
import { SummaryType } from "types/summary-type";
import { toast } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";

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

  const fontClass = {
    small: "body1",
    default: "subtitle1",
    big: "title",
  }[fontKey];

  const { data: headline, isLoading: hlLoading } =
    useArticleHeadline(articleId);
  const { data: summary, isLoading: smLoading } = useArticleSummary(
    articleId,
    computedSummaryType,
  );

  const { data: recStatus } = useRecommendStatus(articleId, !!userMe?.isLogin);
  const { data: nrecStatus } = useNotRecommendStatus(
    articleId,
    !!userMe?.isLogin,
  );
  const [recommended, setRecommended] = useState(!!recStatus?.status);
  const [notRec, setNotRec] = useState(!!nrecStatus?.status);

  const toggleRec = useToggleRecommend();
  const toggleNotRec = useToggleNotRecommend();

  const guard = () => {
    if (!userMe?.isLogin) {
      toast.warning("로그인 후 이용 가능합니다.");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (recStatus) setRecommended(recStatus.status);
  }, [recStatus]);

  useEffect(() => {
    if (nrecStatus) setNotRec(nrecStatus.status);
  }, [nrecStatus]);

  const handleRecommend = () => {
    if (!guard()) return;
    const next = !recommended;
    toggleRec.mutate(
      { articleId, status: next },
      {
        onSuccess: (res) => {
          setRecommended(res.status);
          if (res.status) setNotRec(false);
          toast.success(res.message);
        },
        onError: () => toast.error("다시 시도해 주세요."),
      },
    );
  };

  const handleNotRecommend = () => {
    if (!guard()) return;
    const next = !notRec;
    toggleNotRec.mutate(
      { articleId, status: next },
      {
        onSuccess: (res) => {
          setNotRec(res.status);
          if (res.status) setRecommended(false);
          toast.success(res.message);
        },
        onError: () => toast.error("다시 시도해 주세요."),
      },
    );
  };

  if (hlLoading || smLoading || settingsLoading) return <LoadingSpinner />;
  if (!headline) return <div>기사 정보가 없습니다.</div>;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
      d.getDate(),
    ).padStart(2, "0")}`;
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
              Curi가 해당기사를 요약했습니다.
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

          <div className="my-0.5 mt-4 flex items-center">
            <p className="caption1 mr-6 font-medium">
              이 내용이 마음에 드시나요?
            </p>
            {recommended ? (
              <LikeFilledIcon
                onClick={handleRecommend}
                className="text-primary-600 cursor-pointer"
              />
            ) : (
              <LikeOutlineIcon
                onClick={handleRecommend}
                className="text-primary-600 cursor-pointer"
              />
            )}

            <div className="bg-primary-200 mx-2 h-5 w-[0.5px]" />

            {notRec ? (
              <DislikeFilledIcon
                onClick={handleNotRecommend}
                className="text-primary-600 cursor-pointer"
              />
            ) : (
              <DislikeOutlineIcon
                onClick={handleNotRecommend}
                className="text-primary-600 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
