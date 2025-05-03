import Image from "next/image";
import { IMAGES_PATH } from "@/constants/images";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { SettingIcon } from "assets";

export default function ProfileCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.MYPAGE);
  };
  return (
    <div className="mt-6 flex h-23 w-75 items-center rounded-lg border border-gray-200 pl-3.75">
      <div className="relative">
        <div className="flex h-13.75 w-13.75 items-center justify-center rounded-full border border-gray-200">
          <Image
            src={IMAGES_PATH.LOGO_HEAD}
            alt="profile"
            width={38}
            height={32}
          />
        </div>
        <button className="absolute right-0 bottom-0" onClick={handleClick}>
          <SettingIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="ml-3.25 flex flex-col">
        <div className="flex items-end gap-1">
          {/* // TODO:API 연결 시 사용자 닉네임(랜덤?) 넣어주기 */}
          <span className="body1 text font-medium">닉네임</span>
          <button
            className="caption2 font-regular mt-2.25 text-gray-500 hover:underline"
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
