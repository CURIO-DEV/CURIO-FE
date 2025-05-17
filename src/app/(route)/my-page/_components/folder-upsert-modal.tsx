"use client";

import { useState } from "react";
import {
  FolderNameIcon,
  CoAutherIcon,
  TagIcon,
  InfoIcon,
  CheckIcon,
  MemberDelIcon,
} from "assets";
import { ColorKey, colorMap } from "@/constants/color";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { cn } from "@/utils/cn";

interface FolderUpsertModalProps {
  onClick: () => void;
  mode: "create" | "edit";
}
export default function FolderUpsertModal({
  onClick,
  mode,
}: FolderUpsertModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<ColorKey>("red");
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onClick();
    // TODO : 저장토스트
  };

  const MAX_MEMBERS = 3;
  const [limitReached, setLimitReached] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (members.length >= MAX_MEMBERS) {
        setLimitReached(true);
        return;
      }

      const newEmail = inputValue.trim();
      if (!members.includes(newEmail)) {
        setMembers([...members, newEmail]);
      }
      setInputValue("");
      setLimitReached(false);
    }
  };

  const removeMember = (email: string) => {
    const updated = members.filter((c) => c !== email);
    setMembers(updated);
    if (updated.length < MAX_MEMBERS) {
      setLimitReached(false);
    }
  };

  return (
    <Modal
      title={mode === "create" ? "폴더 추가하기" : "폴더 수정하기"}
      onClick={onClick}
    >
      <div className="mt-8 flex w-80 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FolderNameIcon />
            <span className="body1 font-semibold">이름</span>
          </div>
          <Input
            className="caption1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름 입력"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TagIcon />
            <span className="body1 font-semibold">폴더색상</span>
          </div>
          <div className="flex gap-2">
            {(Object.keys(colorMap) as ColorKey[]).map((colorKey) => (
              <div
                key={colorKey}
                onClick={() => setColor(colorKey)}
                className={cn(
                  "relative h-6.25 w-6.25 cursor-pointer rounded",
                  colorMap[colorKey].bg,
                )}
              >
                {color === colorKey && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CheckIcon />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <div className="flex items-center gap-2">
              <CoAutherIcon />
              <span className="body1 font-semibold">공동 작업자</span>
            </div>
            <div className="flex items-center gap-0.75">
              <InfoIcon />
              <p className="caption2 text-gray-300">
                엔터 키 입력 시 공동작업자가 추가됩니다.
              </p>
            </div>
          </div>

          <Input
            className="caption1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="h-22.75">
            <div className="flex flex-wrap gap-1">
              {members.map((email) => (
                <div
                  key={email}
                  className="bg-primary-100 flex items-center gap-2.5 rounded-xs px-1 py-0.5"
                >
                  <span className="caption2 text-primary-600">{email}</span>
                  <MemberDelIcon
                    type="button"
                    onClick={() => removeMember(email)}
                  />
                </div>
              ))}
              {limitReached ? (
                <p className="caption2 text-primary-500">
                  ⚠️ 공동 작업자는 최대 3명까지 추가할 수 있습니다.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleSave} className="mt-8">
        저장하기
      </Button>
    </Modal>
  );
}
