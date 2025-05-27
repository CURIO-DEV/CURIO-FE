"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useArticleHeadline } from "@/hooks/use-article-headlines";
import { useArticleSummary } from "@/hooks/use-article-summary";
import Image from "next/image";
import ActionBar from "../_components/action-bar";
import {
  LikeFilledIcon,
  LikeOutlineIcon,
  LogoHeadIcon,
  DislikeFilledIcon,
  DislikeOutlineIcon,
} from "assets";
import { SummaryType } from "types/summary-type";

export default function DetailPage() {
  const { detail: articleId } = useParams() as { detail: string };

  const searchParams = useSearchParams();
  const summaryType = (searchParams.get("type") ?? "medium") as SummaryType;

  const fontKey = (searchParams.get("font") ?? "default") as
    | "small"
    | "default"
    | "big";

  const fontClass = {
    small: "body1",
    default: "subtitle1",
    big: "title",
  }[fontKey];

  const { data: hl, isLoading: hlLoading } = useArticleHeadline(articleId);
  const { data: sm, isLoading: smLoading } = useArticleSummary(
    articleId,
    summaryType,
  );

  if (hlLoading || smLoading) return <div>로딩 중…</div>;
  if (!hl) return <div>기사 정보가 없습니다.</div>;
  return (
    <>
      <div className="mt-12 mb-10">
        <ActionBar />
        <div className="mr-14 ml-35.5">
          <h1 className="heading2 font-semibold">{hl.title}</h1>
          <p className="caption1 flex gap-3 font-medium text-gray-500">
            <span>게시 2025. 03. 11 </span>
            <span>업데이트 2025. 03. 14</span>
          </p>
          <div className="flex flex-col gap-2.5">
            <div className="mt-4 flex gap-2">
              <LogoHeadIcon />
              <p className="body1 font-semibold">
                Curi가 N개의 기사를 요약했습니다.
              </p>
            </div>
            <Image
              src={hl.imageUrl}
              alt="기사 이미지"
              width={1200}
              height={800}
              quality={80}
              sizes="100vw"
              className="h-auto w-full"
            />
            <p className={`font-medium ${fontClass}`}>{sm?.summary}</p>

            <div className="my-0.5 flex items-center">
              <p className="caption1 mr-6 font-medium">
                이 내용이 마음에 드시나요?
              </p>
              <LikeOutlineIcon />
              <div className="bg-primary-200 mx-2 h-5 w-[0.5px]" />
              <DislikeOutlineIcon />
            </div>
            <p className="body1 font-medium">
              SK㈜ 사내이사 재선임⋯올해도 리밸런싱 김건희 상설특검’ 후보자
              마은혁 헌법재판관 도널드 트럼프 미국 행정부
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
