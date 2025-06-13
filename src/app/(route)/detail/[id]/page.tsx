"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import ActionBar from "../_components/action-bar";
import { DislikeOutlineIcon, LikeOutlineIcon, LogoHeadIcon } from "assets";
import { useArticleHeadline } from "@/hooks/use-article-headlines";
import { useArticleSummary } from "@/hooks/use-article-summary";
import { SummaryType } from "types/summary-type";
import { useGetUserMe } from "@/hooks/use-user";
import { useUserSettings } from "@/hooks/use-setting";

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
            <LikeOutlineIcon />
            <div className="bg-primary-200 mx-2 h-5 w-[0.5px]" />
            <DislikeOutlineIcon />
          </div>
          <p className="body1 font-medium">
            SK㈜ 사내이사 재선임⋯올해도 리밸런싱 김건희 상설특검’ 후보자 마은혁
            헌법재판관 도널드 트럼프 미국 행정부
          </p>
        </div>
      </div>
    </div>
  );
}
