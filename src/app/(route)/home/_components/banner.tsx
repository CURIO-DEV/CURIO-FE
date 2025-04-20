"use client";

import Button from "@/components/button";

interface BannerProps {
  onClick: () => void;
}

export default function Banner({ onClick }: BannerProps) {
  return (
    <div className="flex h-100 w-full">
      <div className="bg-primary-100 pt-22 pr-10.5 pl-7">
        <div>
          <p className="subtitle font-semibold">
            관심있는 분야에 <br /> 핫한 뉴스를 모아보세요
          </p>
          <Button onClick={onClick} className="caption1 font-regular mt-4 px-5">
            큨! 보러가기
          </Button>
        </div>
      </div>
      <div className="bg-primary-50 w-full">시각화 컴포넌트</div>
    </div>
  );
}
