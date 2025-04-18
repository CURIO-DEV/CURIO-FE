import { IMAGES_PATH } from "@/constants/images";
import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";

export default function Subscribe() {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const handleClick = () => {
    SetIsModalOpen(true);
  };
  return (
    <>
      <div
        className="group relative w-75 overflow-hidden rounded-2xl border border-gray-100 py-6 pl-6"
        onClick={handleClick}
      >
        <p className="body1 font-regular">
          실시간 트렌드를 메일로 받아봐요!
          <br />
          <span className="text-primary-600 flex font-semibold group-hover:underline">
            지금 바로 메일로 받아보기
            {/* // TODO: svgr로 바꾸기 */}
            <img src="/assets/shortcut.svg" className="ml-0.5" />
          </span>
        </p>
        <Image
          src={IMAGES_PATH.LOGO}
          alt="logo"
          width={145}
          height={145}
          className="absolute -top-4.75 -right-2.5 opacity-3"
        />
      </div>
    </>
  );
}
