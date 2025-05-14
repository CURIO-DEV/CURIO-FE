"use client";

import Button from "@/components/button";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function Banner() {
  const route = useRouter();

  const handleClick = () => {
    route.push(ROUTES.SNACK_NEWS);
  };
  return (
    <div className="flex h-100 w-full">
      <div className="bg-primary-100 w-63">
        <div className="mt-22 ml-7">
          <p className="subtitle font-semibold">
            관심있는 분야에 <br /> 핫한 뉴스를 모아보세요
          </p>
          <Button
            onClick={handleClick}
            className="caption1 font-regular mt-4 px-5"
          >
            큨! 보러가기
          </Button>
        </div>
      </div>
      <div className="bg-primary-50 flex-grow">시각화 컴포넌트</div>
    </div>
  );
}
