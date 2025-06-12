"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { SettingIcon } from "assets";

export default function ProfileCard({ ...props }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.MYPAGE);
  };

  const handleSettingClick = () => {
    router.push(ROUTES.SETTING);
  };

  return (
    <div className="mt-6 flex h-23 w-75 items-center rounded-lg border border-gray-200 pl-3.75">
      <div className="relative">
        <div className="flex h-13.75 w-13.75 items-center justify-center rounded-full border border-gray-200">
          {props.profile_image_url && (
            <Image
              src={props.profile_image_url || "/images/logo-head.png"}
              alt="profile"
              width={38}
              height={32}
              className="h-13.75 w-13.75 rounded-full border border-gray-200 object-cover"
            />
          )}
        </div>
        <button
          className="absolute right-0 bottom-0"
          onClick={handleSettingClick}
        >
          <SettingIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="ml-3.25 flex flex-col">
        <div className="flex items-end gap-1">
          <span className="body1 text font-medium">{props?.nickname}</span>
          <button
            className="caption2 font-regular mt-2.25 text-gray-500 hover:underline"
            onClick={handleClick}
          >
            마이페이지
          </button>
        </div>

        <span className="caption1 font-medium text-gray-700">
          {props?.email}
        </span>
      </div>
    </div>
  );
}
