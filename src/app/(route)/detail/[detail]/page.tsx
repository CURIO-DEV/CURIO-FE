import Image from "next/image";
import ActionBar from "../_components/action-bar";
import { LikeFilledIcon, LikeOutlineIcon, LogoHeadIcon } from "assets";

export default function Detail() {
  return (
    <div className="mt-12 mb-10">
      <ActionBar />
      <div className="mr-14 ml-35.5">
        <h1 className="heading2 font-semibold">
          “급한 일부터 산불 챙긴 韓… ‘통상 전쟁’도 발등의 불🔥
        </h1>
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
          <Image src="/images/image.png" width={742} height={523} alt="image" />
          <p className="subtitle1 font-medium">
            한 권한대행 앞에는 통상 압박 수위를 높이고 있는 도널드 트럼프 미국
            행정부와의 관계 개선 및 통상전쟁 피해 최소화, 국내 경기 회복, 의대
            정상화 등 난제가 산적해 있다. 마은혁 헌법재판관 임명과 ‘김건희
            상설특검’ 후보자 추천을 재촉하는 야당의 압박도 큰 부담이다.
          </p>
          <div className="my-0.5 flex items-center">
            <p className="caption1 mr-6 font-medium">
              이 내용이 마음에 드시나요?
            </p>
            <LikeFilledIcon />
            <div className="bg-primary-200 mx-2 h-5 w-[0.5px]" />
            <LikeOutlineIcon />
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
