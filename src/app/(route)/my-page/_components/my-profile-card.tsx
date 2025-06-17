"use client";

import Image from "next/image";
import { SettingIcon } from "assets";
import { useEffect, useState } from "react";
import { IMAGES_PATH } from "@/constants/images";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/stores/use-user-store";
import { useGetUserMe, useGetUserProfile } from "@/hooks/use-user";

export default function MyProfileCard() {
  const router = useRouter();

  const { data: userMe } = useGetUserMe();

  const { data: userProfile } = useGetUserProfile({
    enabled: !!userMe?.isLogin,
  });

  const setProfile = useUserStore((s) => s.setProfile);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile, setProfile]);

  const handleClick = () => {
    router.push(ROUTES.SETTING);
  };

  const profileImage = userProfile?.profile_image_url || IMAGES_PATH.LOGO_HEAD;
  const nickname = userProfile?.nickname || "닉네임";

  return (
    <div className="box-border flex flex-col items-center rounded-lg border border-gray-100">
      <div className="relative mt-11.25 flex items-center justify-center rounded-full border border-gray-200">
        <Image
          src={profileImage}
          alt="profile"
          width={115}
          height={96}
          className="h-42 w-42 rounded-full object-cover"
        />
        <button className="absolute right-0 bottom-0" onClick={handleClick}>
          <SettingIcon className="h-10 w-10" />
        </button>
      </div>
      <span className="subtitle1 mt-4.75 mb-14.5 font-medium">{nickname}</span>
    </div>
  );
}
