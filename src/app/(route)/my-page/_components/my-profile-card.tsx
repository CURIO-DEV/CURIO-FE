"use client";

import Image from "next/image";
import { SettingIcon } from "assets";
import { useState } from "react";
import { IMAGES_PATH } from "@/constants/images";
import { useRouter } from "next/navigation";

export default function MyProfileCard() {
  const router = useRouter();
  const handleClick = () => {
    //TODO (마이페이지-설정) 파일 필요
  };
  /* TODO 닉네임 API연결 */
  const [nickname] = useState("닉네임");

  return (
    <div className="box-border flex flex-col items-center rounded-lg border border-gray-100">
      <div className="relative mt-11.25 flex items-center justify-center rounded-full border border-gray-200 px-[25.5px] py-8.75">
        <Image
          src={IMAGES_PATH.LOGO_HEAD}
          alt="profile"
          width={115}
          height={96}
          style={{ width: "115px", height: "96px" }}
          className="block"
        />
        <button className="absolute right-0 bottom-0" onClick={handleClick}>
          <SettingIcon className="h-10 w-10" />
        </button>
      </div>
      <span className="subtitle1 mt-4.75 mb-14.5 font-medium">{nickname}</span>
    </div>
  );
}
