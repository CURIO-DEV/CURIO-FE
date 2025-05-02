import Image from "next/image";
import { IMAGES_PATH } from "@/constants/images";
import { SettingIcon } from "assets";

export default function SidebarProfile() {
  const handleClick = () => {
    /* TODO 마이페이지 제작 완료 후 연결하기*/
    alert("마이페이지 구현 전입니다");
  };
  return (
    <div className="mt-6 flex h-23 w-75 items-center rounded-lg border border-gray-200 pl-3.75">
      <div className="relative">
        <div className="flex h-13.75 w-13.75 items-center justify-center rounded-full border border-gray-200">
          <Image
            src={IMAGES_PATH.LOGO_HEAD}
            alt="profile"
            width={37.649}
            height={31.43}
          />
        </div>
        <button className="absolute right-0 bottom-0" onClick={handleClick}>
          <SettingIcon />
        </button>
      </div>

      <div className="ml-3.25 flex flex-col">
        <div className="flex items-end gap-1">
          {/* // TODO:API 연결 시 사용자 닉네임(랜덤?) 넣어주기 */}
          <span className="body1 text font-medium">닉네임</span>
          <button
            className="caption2 font-regular mt-2.25 text-gray-500"
            onClick={handleClick}
          >
            마이페이지
          </button>
        </div>
        {/* // TODO:API 연결 시 사용자 이메일 넣어주기 */}
        <span className="caption1 font-medium text-gray-700">
          abcdefg@kakao.com
        </span>
      </div>
    </div>
  );
}
