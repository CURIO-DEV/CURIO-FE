"use client";

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
          <Image
            src="/images/image.png"
            width={742}
            height={523}
            alt="image"
            className="w-full object-cover"
          />
          <p className="subtitle2 mt-4">
            돈을 받고 본인 명의의 선불 유심을 개통해 타인에게 제공한 행위가
            전기통신사업법 위반으로 대법원 판결되었다. 대법원은 유씨에 대한 무죄
            선고를 파기하고 사건을 대전지법으로 돌려보냈다. 유씨는 선불 유심
            9개를 개통하고 그 대가로 2만∼3만원을 받았으며, 이는 전기통신사업법에
            위반된다고 판단되었다. 대법원은 유씨가 타인에게 제공될 것을 알면서
            행위한 가능성을 고려하여 유씨를 유죄로 판단하였다. 결론적으로 원심은
            고의에 관한 법리를 오해하여 유씨에 대한 무죄 판결이 오류가 있었다고
            판단했다.
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
